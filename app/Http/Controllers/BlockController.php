<?php

namespace App\Http\Controllers;

use App\Models\Block;
use App\Models\BlockItem;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class BlockController extends Controller
{
    /**
     * Hiển thị danh sách Block.
     */
    public function index(Request $request)
    {
        $query = Block::withCount('items')
            ->with(['items' => function($query) {
                $query->select('id', 'block_id', 'type', 'name', 'title', 'is_active')
                    ->where('is_active', true)
                    ->limit(3)
                    ->orderBy('sort_order');
            }])
            ->latest();
        
        // Filter theo tên hoặc slug
        if ($request->has('search') && $request->search) {
            $searchTerm = $request->search;
            $query->where(function($q) use ($searchTerm) {
                $q->where('name', 'like', '%' . $searchTerm . '%')
                  ->orWhere('slug', 'like', '%' . $searchTerm . '%');
            });
        }
        
        // Filter theo location
        if ($request->has('location') && $request->location) {
            $query->where('location', $request->location);
        }
        
        // Filter theo trạng thái
        if ($request->has('status')) {
            if ($request->status === 'active') {
                $query->where('is_active', true);
            } elseif ($request->status === 'inactive') {
                $query->where('is_active', false);
            }
        }
        
        $blocks = $query->paginate($request->input('per_page', 10))
            ->withQueryString();
        
        // Lấy danh sách các location để tạo filter
        $locations = Block::select('location')
            ->distinct()
            ->whereNotNull('location')
            ->get()
            ->pluck('location');
        
        return Inertia::render('blocks/index', [
            'blocks' => $blocks,
            'filters' => $request->only(['search', 'location', 'status', 'per_page']),
            'locations' => $locations
        ]);
    }

    /**
     * Hiển thị form tạo Block mới.
     */
    public function create()
    {
        return Inertia::render('blocks/create', [
            'availableLocations' => $this->getAvailableLocations(),
        ]);
    }

    /**
     * Lưu Block mới vào database.
     */
    public function store(Request $request)
    {
        try {
            DB::beginTransaction();
            
            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'slug' => 'nullable|string|max:255|unique:blocks',
                'location' => 'nullable|string|max:100',
                'description' => 'nullable|string',
                'is_active' => 'boolean',
                'sort_order' => 'nullable|integer',
            ]);
            
            // Tự động tạo slug nếu không được cung cấp
            if (empty($validated['slug'])) {
                $validated['slug'] = Str::slug($validated['name']);
            }
            
            $block = Block::create($validated);
            
            DB::commit();
            
            return redirect()->route('blocks.edit', $block->id)
                ->with([
                    'toast' => true,
                    'toast.type' => 'success',
                    'toast.message' => 'Block đã được tạo thành công'
                ]);
                
        } catch (\Exception $e) {
            DB::rollBack();
            
            Log::error('Lỗi khi tạo block: ' . $e->getMessage());
            
            return back()->withInput()->with([
                'toast' => true,
                'toast.type' => 'error',
                'toast.message' => 'Đã có lỗi xảy ra. Vui lòng thử lại.'
            ]);
        }
    }

    /**
     * Hiển thị chi tiết một Block.
     */
    public function show(Block $block)
    {
        $block->load(['items' => function($query) {
            $query->orderBy('sort_order');
        }]);
        
        return Inertia::render('blocks/show', [
            'block' => $block,
        ]);
    }

    /**
     * Hiển thị form chỉnh sửa Block.
     */
    public function edit(Block $block)
    {
        $block->load(['items' => function($query) {
            $query->orderBy('sort_order')->with('media');
        }]);
        
        // Phân loại items theo loại
        $itemsByType = $block->items->groupBy('type');
        
        return Inertia::render('blocks/edit', [
            'block' => $block,
            'itemsByType' => $itemsByType,
            'availableTypes' => BlockItem::types(),
            'buttonTypes' => BlockItem::buttonTypes(),
            'imagePositions' => BlockItem::imagePositions(),
            'availableLocations' => $this->getAvailableLocations(),
        ]);
    }

    /**
     * Cập nhật Block trong database.
     */
    public function update(Request $request, Block $block)
    {
        try {
            DB::beginTransaction();
            
            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'slug' => 'nullable|string|max:255|unique:blocks,slug,' . $block->id,
                'location' => 'nullable|string|max:100',
                'description' => 'nullable|string',
                'is_active' => 'boolean',
                'sort_order' => 'nullable|integer',
            ]);
            
            // Tự động tạo slug nếu không được cung cấp
            if (empty($validated['slug'])) {
                $validated['slug'] = Str::slug($validated['name']);
            }
            
            $block->update($validated);
            
            DB::commit();
            
            return back()->with([
                'toast' => true,
                'toast.type' => 'success',
                'toast.message' => 'Block đã được cập nhật thành công'
            ]);
                
        } catch (\Exception $e) {
            DB::rollBack();
            
            Log::error('Lỗi khi cập nhật block: ' . $e->getMessage());
            
            return back()->withInput()->with([
                'toast' => true,
                'toast.type' => 'error',
                'toast.message' => 'Đã có lỗi xảy ra. Vui lòng thử lại.'
            ]);
        }
    }

    /**
     * Xoá Block khỏi database.
     */
    public function destroy(Block $block)
    {
        try {
            DB::beginTransaction();
            
            // Xoá tất cả các items thuộc block
            foreach ($block->items as $item) {
                $item->clearMediaCollection('block_image');
                $item->delete();
            }
            
            $block->delete();
            
            DB::commit();
            
            return redirect()->route('blocks.index')->with([
                'toast' => true,
                'toast.type' => 'success',
                'toast.message' => 'Block đã được xoá thành công'
            ]);
                
        } catch (\Exception $e) {
            DB::rollBack();
            
            Log::error('Lỗi khi xoá block: ' . $e->getMessage());
            
            return back()->with([
                'toast' => true,
                'toast.type' => 'error',
                'toast.message' => 'Đã có lỗi xảy ra. Vui lòng thử lại.'
            ]);
        }
    }
    
    /**
     * Get available locations for blocks
     */
    private function getAvailableLocations()
    {
        return [
            'header' => 'Header',
            'home-top' => 'Trang chủ (Đầu trang)',
            'home-middle' => 'Trang chủ (Giữa trang)',
            'home-bottom' => 'Trang chủ (Cuối trang)',
            'sidebar' => 'Sidebar',
            'footer' => 'Footer',
            'about-banner' => 'Banner trang Giới thiệu',
            'contact-info' => 'Thông tin liên hệ',
            'custom' => 'Tùy chỉnh',
        ];
    }
}
