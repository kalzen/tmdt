<?php

namespace App\Http\Controllers;

use App\Models\Slider;
use App\Models\SliderItem;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class SliderItemController extends Controller
{
    use AuthorizesRequests;
    
    /**
     * Lưu item mới cho slider
     */
    public function store(Request $request, Slider $slider)
    {
        $validated = $request->validate([
            'title' => 'nullable|max:255',
            'description' => 'nullable',
            'button_text' => 'nullable|max:255',
            'button_url' => 'nullable|max:255',
            'sort_order' => 'nullable|integer',
            'is_active' => 'boolean',
        ]);
        
        // Mặc định sort_order là cao nhất hiện tại + 1
        if (!isset($validated['sort_order'])) {
            $maxOrder = $slider->items()->max('sort_order') ?? 0;
            $validated['sort_order'] = $maxOrder + 1;
        }
        
        $sliderItem = $slider->items()->create($validated);
        
        // Xử lý tải lên hình ảnh nếu có
        if ($request->hasFile('image')) {
            $sliderItem->addMediaFromRequest('image')
                ->toMediaCollection('slider_image');
        }
        
        return back()->with('message', 'Item đã được thêm vào slider.');
    }
    
    /**
     * Cập nhật item
     */
    public function update(Request $request, SliderItem $item)
    {
        // Thêm debug
        \Log::info('SliderItem update request:', $request->all());
        
        $validated = $request->validate([
            'title' => 'nullable|max:255',
            'description' => 'nullable',
            'button_text' => 'nullable|max:255',
            'button_url' => 'nullable|max:255',
            'sort_order' => 'nullable|integer',
            'is_active' => 'boolean',
        ]);
        
        $item->update($validated);
        
        // Xử lý tải lên hình ảnh nếu có
        if ($request->hasFile('image')) {
            // Xóa media cũ trước khi thêm mới
            $item->clearMediaCollection('slider_image');
            
            $item->addMediaFromRequest('image')
                ->toMediaCollection('slider_image');
        }
        
        // Load lại slider và các mục để trả về
        $slider = $item->slider->load(['items' => function ($query) {
            $query->with('media')->orderBy('sort_order');
        }]);
        
        return back()->with([
            'message' => 'Item đã được cập nhật thành công.',
            'slider' => $slider
        ]);
    }
    
    /**
     * Xóa item
     */
    public function destroy(SliderItem $item)
    {
        $sliderId = $item->slider_id;
        $item->delete();
        
        return back()->with('message', 'Item đã được xóa khỏi slider.');
    }
    
    /**
     * Cập nhật thứ tự sắp xếp
     */
    public function reorder(Request $request)
    {
        $validated = $request->validate([
            'items' => 'required|array',
            'items.*.id' => 'required|exists:slider_items,id',
            'items.*.sort_order' => 'required|integer|min:0',
        ]);
        
        foreach ($validated['items'] as $item) {
            SliderItem::where('id', $item['id'])->update([
                'sort_order' => $item['sort_order']
            ]);
        }
        
        return back()->with('message', 'Thứ tự đã được cập nhật.');
    }
}
