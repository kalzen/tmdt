<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Log;

class CategoryController extends Controller
{
    /**
     * Hiển thị danh sách danh mục.
     */
    public function index(Request $request)
    {
        $query = Category::withCount('posts')->latest();
        
        // Filter theo tiêu đề
        if ($request->has('search') && $request->search) {
            $query->where('title', 'like', '%' . $request->search . '%');
        }
        
        $categories = $query->paginate($request->input('per_page', 10))
            ->withQueryString();
            
        return Inertia::render('categories/index', [
            'categories' => $categories->through(function ($category) {
                return [
                    'id' => $category->id,
                    'title' => $category->title,
                    'description' => Str::limit($category->description, 100),
                    'posts_count' => $category->posts_count,
                    'image_url' => $category->image_url,
                    'image_thumb_url' => $category->image_thumb_url,
                    'created_at' => $category->created_at,
                ];
            }),
            'filters' => $request->only(['search', 'per_page'])
        ]);
    }

    /**
     * Hiển thị form tạo danh mục mới.
     */
    public function create()
    {
        return Inertia::render('categories/create');
    }

    /**
     * Lưu danh mục mới vào database.
     */
    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'title' => 'required|string|max:255|unique:categories',
                'description' => 'nullable|string|max:1000',
                'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            ]);

            // Tạo danh mục mới
            $category = Category::create([
                'title' => $validated['title'],
                'description' => $validated['description'] ?? '',
            ]);

            // Xử lý tải lên hình ảnh
            if ($request->hasFile('image')) {
                $category->addMediaFromRequest('image')
                    ->sanitizingFileName(function($fileName) {
                        return Str::slug(pathinfo($fileName, PATHINFO_FILENAME)) . '.' . pathinfo($fileName, PATHINFO_EXTENSION);
                    })
                    ->toMediaCollection('category_image');
                
                Log::info('Đã tải lên hình ảnh cho danh mục ID: ' . $category->id);
            }

            return redirect()->route('categories.index')->with([
                'toast' => true,
                'toast.type' => 'success',
                'toast.message' => 'Danh mục đã được tạo thành công'
            ]);
            
        } catch (\Exception $e) {
            Log::error('Lỗi khi tạo danh mục: ' . $e->getMessage());
            return back()->with([
                'toast' => true,
                'toast.type' => 'error',
                'toast.message' => 'Có lỗi xảy ra khi tạo danh mục'
            ])->withInput();
        }
    }

    /**
     * Hiển thị chi tiết danh mục.
     */
    public function show(Category $category)
    {
        $category->load('posts');
        
        return Inertia::render('categories/show', [
            'category' => [
                'id' => $category->id,
                'title' => $category->title,
                'description' => $category->description,
                'image' => $category->getFirstMediaUrl('category_image'),
                'posts' => $category->posts->map(function ($post) {
                    return [
                        'id' => $post->id,
                        'title' => $post->title,
                        'slug' => $post->slug,
                        'description' => $post->description,
                        'image' => $post->getFirstMediaUrl('featured_image', 'thumb'),
                    ];
                })
            ]
        ]);
    }

    /**
     * Hiển thị form chỉnh sửa danh mục.
     */
    public function edit(Category $category)
    {
        return Inertia::render('categories/edit', [
            'category' => [
                'id' => $category->id,
                'title' => $category->title,
                'description' => $category->description,
                'image' => $category->getFirstMediaUrl('category_image'),
            ]
        ]);
    }

    /**
     * Cập nhật thông tin danh mục.
     */
    public function update(Request $request, Category $category)
    {
        try {
            $validated = $request->validate([
                'title' => 'required|string|max:255|unique:categories,title,' . $category->id,
                'description' => 'nullable|string|max:1000',
                'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            ]);

            // Cập nhật thông tin danh mục
            $category->update([
                'title' => $validated['title'],
                'description' => $validated['description'] ?? $category->description,
            ]);

            // Xử lý tải lên hình ảnh mới nếu có
            if ($request->hasFile('image')) {
                // Xóa hình ảnh cũ
                $category->clearMediaCollection('category_image');
                
                // Thêm hình ảnh mới
                $category->addMediaFromRequest('image')
                    ->sanitizingFileName(function($fileName) {
                        return Str::slug(pathinfo($fileName, PATHINFO_FILENAME)) . '.' . pathinfo($fileName, PATHINFO_EXTENSION);
                    })
                    ->toMediaCollection('category_image');
                
                Log::info('Đã cập nhật hình ảnh cho danh mục ID: ' . $category->id);
            }

            return redirect()->route('categories.index')->with([
                'toast' => true,
                'toast.type' => 'success',
                'toast.message' => 'Danh mục đã được cập nhật thành công'
            ]);
            
        } catch (\Exception $e) {
            Log::error('Lỗi khi cập nhật danh mục: ' . $e->getMessage());
            return back()->with([
                'toast' => true,
                'toast.type' => 'error',
                'toast.message' => 'Có lỗi xảy ra khi cập nhật danh mục'
            ])->withInput();
        }
    }

    /**
     * Xóa danh mục.
     */
    public function destroy(Category $category)
    {
        try {
            // Lấy số lượng bài viết liên quan
            $postsCount = $category->posts()->count();
            
            if ($postsCount > 0) {
                return back()->with([
                    'toast' => true,
                    'toast.type' => 'error',
                    'toast.message' => "Không thể xóa danh mục này vì có {$postsCount} bài viết liên quan"
                ]);
            }
            
            // Xóa tất cả media liên quan
            $category->clearMediaCollection('category_image');
            
            // Xóa danh mục
            $category->delete();
            
            return redirect()->route('categories.index')->with([
                'toast' => true,
                'toast.type' => 'success',
                'toast.message' => 'Danh mục đã được xóa thành công'
            ]);
            
        } catch (\Exception $e) {
            Log::error('Lỗi khi xóa danh mục: ' . $e->getMessage());
            return back()->with([
                'toast' => true,
                'toast.type' => 'error',
                'toast.message' => 'Có lỗi xảy ra khi xóa danh mục'
            ]);
        }
    }
}
