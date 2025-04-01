<?php

namespace App\Http\Controllers;

use App\Models\Config;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Schema;
use Inertia\Inertia;

class ConfigController extends Controller
{
    public function index(Request $request)
    {
        $query = Config::latest();
        
        // Filter theo name hoặc title, thay vì key và display_name
        if ($request->has('search') && $request->search) {
            $searchTerm = $request->search;
            $query->where(function($q) use ($searchTerm) {
                $q->where('name', 'like', '%' . $searchTerm . '%')
                  ->orWhere('title', 'like', '%' . $searchTerm . '%');
            });
        }
        
        // Filter theo group nếu cột group tồn tại
        if (Schema::hasColumn('configs', 'group')) {
            if ($request->has('group') && $request->group) {
                $query->where('group', $request->group);
            }
        }
        
        // Lấy kết quả phân trang
        $paginatedConfigs = $query->paginate($request->input('per_page', 10))
            ->withQueryString();
            
        // Định dạng lại để phù hợp với cấu trúc mà frontend mong đợi
        $configs = [
            'data' => $paginatedConfigs->items(),
            'meta' => [
                'current_page' => $paginatedConfigs->currentPage(),
                'from' => $paginatedConfigs->firstItem(),
                'last_page' => $paginatedConfigs->lastPage(),
                'per_page' => $paginatedConfigs->perPage(),
                'to' => $paginatedConfigs->lastItem(),
                'total' => $paginatedConfigs->total(),
            ],
        ];
            
        // Lấy danh sách các group để tạo bộ lọc (nếu cột group tồn tại)
        $groups = [];
        if (Schema::hasColumn('configs', 'group')) {
            $groups = Config::select('group')
                ->distinct()
                ->whereNotNull('group')
                ->get()
                ->pluck('group');
        }
            
        return Inertia::render('configs/index', [
            'configs' => $configs,
            'filters' => $request->only(['search', 'group', 'per_page']),
            'groups' => $groups
        ]);
    }

    public function create()
    {
        // Kiểm tra xem cột group có tồn tại không
        $hasGroupColumn = Schema::hasColumn('configs', 'group');
        
        return Inertia::render('configs/create', [
            'types' => $this->getAvailableTypes(),
            'hasGroupColumn' => $hasGroupColumn,
            'groups' => $hasGroupColumn ? $this->getDistinctGroups() : [],
        ]);
    }

    public function store(Request $request)
    {
        $validationRules = [
            'name' => 'required|string|max:255|unique:configs',
            'title' => 'required|string|max:255',
            'value' => 'nullable',
            'type' => 'required|string',
            'description' => 'nullable|string',
        ];
        
        // Thêm validation cho group nếu cột tồn tại
        if (Schema::hasColumn('configs', 'group')) {
            $validationRules['group'] = 'nullable|string|max:255';
        }

        $validated = $request->validate($validationRules);

        $config = Config::create($validated);

        $this->handleMediaUploads($request, $config);
        
        // Clear cache after updating configs
        Cache::forget('site-configs');

        return redirect()->route('configs.index')
            ->with([
                'toast' => true,
                'toast.type' => 'success',
                'toast.message' => 'Cấu hình đã được tạo thành công'
            ]);
    }

    public function edit(Config $config)
    {
        // Kiểm tra xem cột group có tồn tại không
        $hasGroupColumn = Schema::hasColumn('configs', 'group');
        
        return Inertia::render('configs/edit', [
            'config' => $config,
            'types' => $this->getAvailableTypes(),
            'hasGroupColumn' => $hasGroupColumn,
            'groups' => $hasGroupColumn ? $this->getDistinctGroups() : [],
            'media' => [
                'logo' => $config->getFirstMediaUrl('logo'),
                'favicon' => $config->getFirstMediaUrl('favicon'),
                'thumbnail' => $config->getFirstMediaUrl('thumbnail'),
            ]
        ]);
    }

    public function update(Request $request, Config $config)
    {
        $validationRules = [
            'name' => 'required|string|max:255|unique:configs,name,'.$config->id,
            'title' => 'required|string|max:255',
            'value' => 'nullable',
            'type' => 'required|string',
            'description' => 'nullable|string',
        ];
        
        // Thêm validation cho group nếu cột tồn tại
        if (Schema::hasColumn('configs', 'group')) {
            $validationRules['group'] = 'nullable|string|max:255';
        }

        $validated = $request->validate($validationRules);

        $config->update($validated);
        
        $this->handleMediaUploads($request, $config);

        // Clear cache after updating configs
        Cache::forget('site-configs');

        return redirect()->route('configs.index')
            ->with([
                'toast' => true,
                'toast.type' => 'success',
                'toast.message' => 'Cấu hình đã được cập nhật thành công'
            ]);
    }

    public function destroy(Config $config)
    {
        $config->delete();
        
        // Clear cache after deleting configs
        Cache::forget('site-configs');

        return redirect()->route('configs.index')
            ->with([
                'toast' => true,
                'toast.type' => 'success',
                'toast.message' => 'Cấu hình đã được xóa thành công'
            ]);
    }

    private function getAvailableTypes()
    {
        return [
            'string' => 'Văn bản ngắn',
            'text' => 'Văn bản dài',
            'number' => 'Số',
            'email' => 'Email',
            'phone' => 'Số điện thoại',
            'datetime' => 'Ngày & Giờ',
            'boolean' => 'Có/Không',
            'image' => 'Hình ảnh',
        ];
    }

    private function handleMediaUploads(Request $request, Config $config)
    {
        if ($config->type === 'image') {
            if ($request->hasFile('logo')) {
                $config->addMediaFromRequest('logo')
                    ->toMediaCollection('logo');
            }
            
            if ($request->hasFile('favicon')) {
                $config->addMediaFromRequest('favicon')
                    ->toMediaCollection('favicon');
            }
            
            if ($request->hasFile('thumbnail')) {
                $config->addMediaFromRequest('thumbnail')
                    ->toMediaCollection('thumbnail');
            }
        }
    }

    /**
     * Lấy danh sách các group khác nhau từ bảng configs
     */
    private function getDistinctGroups()
    {
        return Config::select('group')
            ->distinct()
            ->whereNotNull('group')
            ->get()
            ->pluck('group');
    }
}
