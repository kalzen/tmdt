<?php

namespace App\Http\Controllers;

use App\Models\Slider;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Support\Str;

class SliderController extends Controller
{
    use AuthorizesRequests;

    /**
     * Hiển thị danh sách tất cả slider
     */
    public function index(Request $request)
    {
        $query = Slider::withCount('items')
            ->with(['items' => function ($query) {
                $query->with('media')->orderBy('sort_order');
            }])
            ->latest();
            
        // Tìm kiếm theo tên
        if ($request->has('search') && $request->search) {
            $query->where('name', 'like', '%' . $request->search . '%');
        }
        
        // Lọc theo trạng thái
        if ($request->has('status') && $request->status !== null) {
            $query->where('is_active', $request->status === 'active');
        }
        
        $sliders = $query->paginate(10)
            ->withQueryString();
        
        // Định dạng lại dữ liệu slider để chuyển đến frontend
        $formattedSliders = $sliders->through(function ($slider) {
            return [
                'id' => $slider->id,
                'name' => $slider->name,
                'slug' => $slider->slug,
                'description' => $slider->description,
                'is_active' => $slider->is_active,
                'items_count' => $slider->items_count,
                'items' => $slider->items->map(function ($item) {
                    return [
                        'id' => $item->id,
                        'title' => $item->title,
                        'description' => Str::limit($item->description, 100),
                        'button_text' => $item->button_text,
                        'button_url' => $item->button_url,
                        'sort_order' => $item->sort_order,
                        'is_active' => $item->is_active,
                        'image_url' => $item->image_url,
                        'image_thumb_url' => $item->image_thumb_url,
                    ];
                }),
                'created_at' => $slider->created_at,
                'updated_at' => $slider->updated_at,
            ];
        });
            
        return Inertia::render('sliders/index', [
            'sliders' => $formattedSliders,
            'filters' => $request->only(['search', 'status']),
        ]);
    }
    
    /**
     * Hiển thị form tạo slider mới
     */
    public function create()
    {
        return Inertia::render('sliders/create');
    }
    
    /**
     * Lưu slider mới vào cơ sở dữ liệu
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|max:255',
            'slug' => 'nullable|max:255|unique:sliders',
            'description' => 'nullable',
            'is_active' => 'boolean',
        ]);
        
        // Tự động tạo slug nếu không được cung cấp
        if (empty($validated['slug'])) {
            $validated['slug'] = Str::slug($validated['name']);
        }
        
        $slider = Slider::create($validated);
        
        return redirect()->route('sliders.edit', $slider)
            ->with('message', 'Slider đã được tạo thành công.');
    }
    
    /**
     * Hiển thị chi tiết slider
     */
    public function show(Slider $slider)
    {
        $slider->load(['items' => function ($query) {
            $query->with('media')->orderBy('sort_order');
        }]);
        
        return Inertia::render('sliders/show', [
            'slider' => [
                'id' => $slider->id,
                'name' => $slider->name,
                'slug' => $slider->slug,
                'description' => $slider->description,
                'is_active' => $slider->is_active,
                'items' => $slider->items->map(function ($item) {
                    return [
                        'id' => $item->id,
                        'title' => $item->title,
                        'description' => $item->description,
                        'button_text' => $item->button_text,
                        'button_url' => $item->button_url,
                        'sort_order' => $item->sort_order,
                        'is_active' => $item->is_active,
                        'image_url' => $item->image_url,
                        'image_thumb_url' => $item->image_thumb_url,
                        'image_medium_url' => $item->image_medium_url,
                    ];
                }),
                'created_at' => $slider->created_at,
                'updated_at' => $slider->updated_at,
            ]
        ]);
    }
    
    /**
     * Hiển thị form chỉnh sửa slider
     */
    public function edit(Slider $slider)
    {
        $slider->load(['items' => function ($query) {
            $query->with('media')->orderBy('sort_order');
        }]);
        
        return Inertia::render('sliders/edit', [
            'slider' => [
                'id' => $slider->id,
                'name' => $slider->name,
                'slug' => $slider->slug,
                'description' => $slider->description,
                'is_active' => $slider->is_active,
                'items' => $slider->items->map(function ($item) {
                    return [
                        'id' => $item->id,
                        'title' => $item->title,
                        'description' => $item->description,
                        'button_text' => $item->button_text,
                        'button_url' => $item->button_url,
                        'sort_order' => $item->sort_order,
                        'is_active' => $item->is_active,
                        'image_url' => $item->image_url,
                        'image_thumb_url' => $item->image_thumb_url,
                    ];
                }),
            ]
        ]);
    }
    
    /**
     * Cập nhật slider trong cơ sở dữ liệu
     */
    public function update(Request $request, Slider $slider)
    {
        $validated = $request->validate([
            'name' => 'required|max:255',
            'slug' => 'nullable|max:255|unique:sliders,slug,' . $slider->id,
            'description' => 'nullable',
            'is_active' => 'boolean',
        ]);
        
        // Tự động tạo slug nếu không được cung cấp
        if (empty($validated['slug'])) {
            $validated['slug'] = Str::slug($validated['name']);
        }
        
        $slider->update($validated);
        
        return back()->with('message', 'Slider đã được cập nhật thành công.');
    }
    
    /**
     * Xóa slider khỏi cơ sở dữ liệu
     */
    public function destroy(Slider $slider)
    {
        $slider->delete();
        
        return redirect()->route('sliders.index')
            ->with('message', 'Slider đã được xóa thành công.');
    }
}
