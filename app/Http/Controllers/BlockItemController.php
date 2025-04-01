<?php

namespace App\Http\Controllers;

use App\Models\Block;
use App\Models\BlockItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class BlockItemController extends Controller
{
    /**
     * Store a newly created block item.
     */
    public function store(Request $request, Block $block)
    {
        try {
            DB::beginTransaction();
            
            $validated = $request->validate([
                'type' => 'required|string',
                'name' => 'nullable|string|max:255',
                'title' => 'nullable|string|max:255',
                'description' => 'nullable|string',
                'content' => 'nullable|string',
                'button_text' => 'nullable|string|max:255',
                'button_url' => 'nullable|string|max:255',
                'button_type' => 'nullable|string|max:50',
                'image_position' => 'nullable|string|max:50',
                'is_active' => 'boolean',
                'sort_order' => 'nullable|integer',
                'settings' => 'nullable|array',
                'image' => 'nullable|image|max:5120', // Max 5MB
            ]);
            
            // Xác định vị trí sắp xếp nếu không được cung cấp
            if (!isset($validated['sort_order'])) {
                $maxOrder = $block->items()->max('sort_order') ?? 0;
                $validated['sort_order'] = $maxOrder + 1;
            }
            
            $blockItem = $block->items()->create($validated);
            
            // Xử lý upload hình ảnh
            if ($request->hasFile('image')) {
                $blockItem->addMediaFromRequest('image')
                    ->toMediaCollection('block_image');
            }
            
            DB::commit();
            
            return back()->with([
                'toast' => true,
                'toast.type' => 'success',
                'toast.message' => 'Item đã được thêm thành công'
            ]);
                
        } catch (\Exception $e) {
            DB::rollBack();
            
            Log::error('Lỗi khi thêm item: ' . $e->getMessage());
            
            return back()->withInput()->with([
                'toast' => true,
                'toast.type' => 'error',
                'toast.message' => 'Đã có lỗi xảy ra. Vui lòng thử lại.'
            ]);
        }
    }

    /**
     * Show the form for editing the specified block item.
     */
    public function edit(BlockItem $item)
    {
        $block = $item->block;
        
        return Inertia::render('blocks/edit-item', [
            'item' => $item->load('media'),
            'block' => $block,
            'availableTypes' => BlockItem::types(),
            'buttonTypes' => BlockItem::buttonTypes(),
            'imagePositions' => BlockItem::imagePositions(),
            'imageUrl' => $item->getFirstMediaUrl('block_image'),
        ]);
    }

    /**
     * Update the specified block item in storage.
     */
    public function update(Request $request, BlockItem $item)
    {
        try {
            DB::beginTransaction();
            
            $validated = $request->validate([
                'type' => 'required|string',
                'name' => 'nullable|string|max:255',
                'title' => 'nullable|string|max:255',
                'description' => 'nullable|string',
                'content' => 'nullable|string',
                'button_text' => 'nullable|string|max:255',
                'button_url' => 'nullable|string|max:255',
                'button_type' => 'nullable|string|max:50',
                'image_position' => 'nullable|string|max:50',
                'is_active' => 'boolean',
                'sort_order' => 'nullable|integer',
                'settings' => 'nullable|array',
                'image' => 'nullable|image|max:5120', // Max 5MB
            ]);
            
            $item->update($validated);
            
            // Xử lý upload hình ảnh
            if ($request->hasFile('image')) {
                // Xóa ảnh cũ
                $item->clearMediaCollection('block_image');
                
                // Thêm ảnh mới
                $item->addMediaFromRequest('image')
                    ->toMediaCollection('block_image');
            }
            
            DB::commit();
            
            return redirect()->route('blocks.edit', $item->block_id)->with([
                'toast' => true,
                'toast.type' => 'success',
                'toast.message' => 'Item đã được cập nhật thành công'
            ]);
                
        } catch (\Exception $e) {
            DB::rollBack();
            
            Log::error('Lỗi khi cập nhật item: ' . $e->getMessage());
            
            return back()->withInput()->with([
                'toast' => true,
                'toast.type' => 'error',
                'toast.message' => 'Đã có lỗi xảy ra. Vui lòng thử lại.'
            ]);
        }
    }

    /**
     * Remove the specified block item from storage.
     */
    public function destroy(BlockItem $item)
    {
        try {
            $blockId = $item->block_id;
            
            // Xóa media trước
            $item->clearMediaCollection('block_image');
            
            // Xóa item
            $item->delete();
            
            return back()->with([
                'toast' => true,
                'toast.type' => 'success',
                'toast.message' => 'Item đã được xóa thành công'
            ]);
                
        } catch (\Exception $e) {
            Log::error('Lỗi khi xóa item: ' . $e->getMessage());
            
            return back()->with([
                'toast' => true,
                'toast.type' => 'error',
                'toast.message' => 'Đã có lỗi xảy ra. Vui lòng thử lại.'
            ]);
        }
    }
    
    /**
     * Reorder items within a block.
     */
    public function reorder(Request $request)
    {
        try {
            $validated = $request->validate([
                'items' => 'required|array',
                'items.*.id' => 'required|exists:block_items,id',
                'items.*.sort_order' => 'required|integer|min:0',
            ]);
            
            DB::beginTransaction();
            
            foreach ($validated['items'] as $item) {
                BlockItem::where('id', $item['id'])->update([
                    'sort_order' => $item['sort_order']
                ]);
            }
            
            DB::commit();
            
            return back()->with([
                'toast' => true,
                'toast.type' => 'success',
                'toast.message' => 'Thứ tự các item đã được cập nhật thành công'
            ]);
                
        } catch (\Exception $e) {
            DB::rollBack();
            
            Log::error('Lỗi khi sắp xếp lại các item: ' . $e->getMessage());
            
            return back()->with([
                'toast' => true,
                'toast.type' => 'error',
                'toast.message' => 'Đã có lỗi xảy ra. Vui lòng thử lại.'
            ]);
        }
    }
}
