<?php

namespace App\Http\Controllers;

use App\Models\Catalogue;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class CatalogueController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $filters = $request->only(['search', 'per_page']);
        $per_page = $filters['per_page'] ?? 10;

        $catalogues = Catalogue::query()
            ->when($request->filled('search'), function ($query) use ($request) {
                $query->where('name', 'like', '%' . $request->search . '%')
                    ->orWhere('description', 'like', '%' . $request->search . '%');
            })
            ->withCount('products')
            ->orderBy('level', 'asc')
            ->orderBy('position', 'asc')
            ->paginate($per_page)
            ->withQueryString();

        return Inertia::render('Catalogues/Index', [
            'catalogues' => $catalogues,
            'filters' => $filters
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        // Lấy danh sách danh mục cha cho dropdown
        $parentCatalogues = Catalogue::where('level', '<', 2)
            ->orderBy('level', 'asc')
            ->orderBy('position', 'asc')
            ->get(['id', 'name', 'level']);

        return Inertia::render('Catalogues/Create', [
            'parentCatalogues' => $parentCatalogues,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Sửa đổi validation rule cho parent_id để chấp nhận giá trị '0'
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'parent_id' => [
                'nullable',
                function ($attribute, $value, $fail) {
                    // Chấp nhận parent_id là '0' (sẽ được convert thành null sau đó)
                    if ($value !== '0' && $value !== 0 && !Catalogue::where('id', $value)->exists()) {
                        $fail('The selected parent id is invalid.');
                    }
                }
            ],
            'is_active' => 'boolean',
            'meta_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string',
            'image' => 'nullable|image|max:1024',
        ]);

        try {
            // Xử lý level
            $level = 0;
            // Xử lý parent_id="0" như là null
            $parentId = ($request->parent_id === '0' || $request->parent_id === 0) ? null : $request->parent_id;
            
            if ($parentId) {
                $parent = Catalogue::findOrFail($parentId);
                $level = $parent->level + 1;
            }

            // Tạo slug từ tên
            $slug = Str::slug($request->name);
            
            // Kiểm tra xem slug đã tồn tại hay chưa
            $count = Catalogue::where('slug', $slug)->count();
            if ($count > 0) {
                $slug = $slug . '-' . time();
            }

            // Tạo danh mục mới
            $catalogue = Catalogue::create([
                'name' => $request->name,
                'slug' => $slug,
                'description' => $request->description,
                'parent_id' => $parentId,
                'level' => $level,
                'position' => Catalogue::where('parent_id', $parentId)->max('position') + 1,
                'is_active' => $request->is_active ?? true,
                'meta_title' => $request->meta_title,
                'meta_description' => $request->meta_description,
            ]);

            // Xử lý upload ảnh
            if ($request->hasFile('image')) {
                $catalogue->addMediaFromRequest('image')
                    ->toMediaCollection('thumbnail');
            }

            return Redirect::route('catalogues.index')->with([
                'toast' => true,
                'toast.type' => 'success',
                'toast.message' => 'Catalogue created successfully!'
            ]);
        } catch (\Exception $e) {
            Log::error('Error creating catalogue: ' . $e->getMessage());
            
            return back()->with([
                'toast' => true,
                'toast.type' => 'error',
                'toast.message' => 'Error creating catalogue: ' . $e->getMessage()
            ]);
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Catalogue $catalogue)
    {
        // Lấy danh sách danh mục cha cho dropdown (Không bao gồm chính nó và con của nó)
        $parentCatalogues = Catalogue::where('id', '!=', $catalogue->id)
            ->where('level', '<', 2)
            ->where(function($query) use ($catalogue) {
                $query->whereNull('parent_id')
                    ->orWhere('parent_id', '!=', $catalogue->id);
            })
            ->orderBy('level', 'asc')
            ->orderBy('position', 'asc')
            ->get(['id', 'name', 'level']);

        // Lấy thông tin ảnh đại diện
        $thumbnailUrl = $catalogue->getFirstMediaUrl('thumbnail');

        return Inertia::render('Catalogues/Edit', [
            'catalogue' => [
                'id' => $catalogue->id,
                'name' => $catalogue->name,
                'slug' => $catalogue->slug,
                'description' => $catalogue->description,
                'parent_id' => $catalogue->parent_id,
                'level' => $catalogue->level,
                'position' => $catalogue->position,
                'is_active' => $catalogue->is_active,
                'meta_title' => $catalogue->meta_title,
                'meta_description' => $catalogue->meta_description,
                'thumbnail' => $thumbnailUrl,
                'created_at' => $catalogue->created_at,
                'updated_at' => $catalogue->updated_at,
            ],
            'parentCatalogues' => $parentCatalogues,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Catalogue $catalogue)
    {
        // Sửa đổi validation rule cho parent_id để chấp nhận giá trị '0'
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'parent_id' => [
                'nullable',
                function ($attribute, $value, $fail) use ($catalogue) {
                    // Chấp nhận parent_id là '0' (sẽ được convert thành null sau đó)
                    if ($value === '0' || $value === 0) {
                        return;
                    }
                    // Kiểm tra xem parent_id có tồn tại trong bảng catalogues không
                    if (!Catalogue::where('id', $value)->exists()) {
                        $fail('The selected parent id is invalid.');
                    }
                    // Kiểm tra xem catalogue có phải là parent của chính nó không
                    if ($value == $catalogue->id) {
                        $fail('A catalogue cannot be its own parent.');
                    }
                }
            ],
            'is_active' => 'boolean',
            'meta_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string',
            'image' => 'nullable|image|max:1024',
        ]);

        try {
            // Xử lý level
            $level = 0;
            // Xử lý parent_id="0" như là null
            $parentId = ($request->parent_id === '0' || $request->parent_id === 0) ? null : $request->parent_id;
            
            if ($parentId) {
                $parent = Catalogue::findOrFail($parentId);
                
                // Kiểm tra xem parent_id có phải là con của danh mục hiện tại không
                $childIds = Catalogue::where('parent_id', $catalogue->id)->pluck('id')->toArray();
                if (in_array($parentId, $childIds)) {
                    return back()->with([
                        'toast' => true,
                        'toast.type' => 'error',
                        'toast.message' => 'Cannot set a child category as parent.'
                    ]);
                }
                
                $level = $parent->level + 1;
            }

            // Cập nhật danh mục
            $catalogue->update([
                'name' => $request->name,
                'description' => $request->description,
                'parent_id' => $parentId,
                'level' => $level,
                'is_active' => $request->is_active ?? true,
                'meta_title' => $request->meta_title,
                'meta_description' => $request->meta_description,
            ]);

            // Xử lý upload ảnh mới
            if ($request->hasFile('image')) {
                $catalogue->clearMediaCollection('thumbnail');
                $catalogue->addMediaFromRequest('image')
                    ->toMediaCollection('thumbnail');
            }

            return Redirect::route('catalogues.index')->with([
                'toast' => true,
                'toast.type' => 'success',
                'toast.message' => 'Catalogue updated successfully!'
            ]);
        } catch (\Exception $e) {
            Log::error('Error updating catalogue: ' . $e->getMessage());
            
            return back()->with([
                'toast' => true,
                'toast.type' => 'error',
                'toast.message' => 'Error updating catalogue: ' . $e->getMessage()
            ]);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Catalogue $catalogue)
    {
        try {
            // Kiểm tra xem danh mục có con không
            $hasChildren = $catalogue->children()->exists();
            
            if ($hasChildren) {
                return back()->with([
                    'toast' => true,
                    'toast.type' => 'error',
                    'toast.message' => 'Cannot delete catalogue with children. Please delete all children first.'
                ]);
            }
            
            // Kiểm tra xem danh mục có sản phẩm không
            $hasProducts = $catalogue->products()->exists();
            
            if ($hasProducts) {
                return back()->with([
                    'toast' => true,
                    'toast.type' => 'error',
                    'toast.message' => 'Cannot delete catalogue with products. Please move or delete all products first.'
                ]);
            }
            
            // Xóa media
            $catalogue->clearMediaCollection('thumbnail');
            
            // Xóa danh mục
            $catalogue->delete();
            
            return Redirect::route('catalogues.index')->with([
                'toast' => true,
                'toast.type' => 'success',
                'toast.message' => 'Catalogue deleted successfully!'
            ]);
        } catch (\Exception $e) {
            Log::error('Error deleting catalogue: ' . $e->getMessage());
            
            return back()->with([
                'toast' => true,
                'toast.type' => 'error',
                'toast.message' => 'Error deleting catalogue: ' . $e->getMessage()
            ]);
        }
    }
}
