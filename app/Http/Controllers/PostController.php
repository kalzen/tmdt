<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Post;
use App\Models\Category;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Post::with('categories')->latest();
        
        // Filter theo tiêu đề
        if ($request->has('search') && $request->search) {
            $query->where('title', 'like', '%' . $request->search . '%');
        }
        
        // Filter theo trạng thái
        if ($request->has('status') && $request->status) {
            if ($request->status === 'published') {
                $query->where('is_published', true);
            } elseif ($request->status === 'draft') {
                $query->where('is_published', false);
            }
        }
        
        // Filter theo danh mục
        if ($request->has('category') && $request->category) {
            $query->whereHas('categories', function($q) use ($request) {
                $q->where('categories.id', $request->category);
            });
        }
        
        $posts = $query->paginate($request->input('per_page', 10))
            ->withQueryString();
        
        return Inertia::render('posts/index', [
            'posts' => $posts->through(function ($post) {
                return [
                    'id' => $post->id,
                    'title' => $post->title,
                    'slug' => $post->slug,
                    'is_published' => $post->is_published,
                    'published_at' => $post->published_at,
                    'created_at' => $post->created_at,
                    'updated_at' => $post->updated_at,
                    'views' => $post->views,
                    'categories' => $post->categories,
                    'featured_image' => $post->getFirstMediaUrl('featured_image'),
                    'featured_image_thumb' => $post->getFirstMediaUrl('featured_image', 'thumb'),
                ];
            }),
            'filters' => $request->only(['search', 'status', 'category', 'per_page']),
            'categories' => Category::select('id', 'title')->get()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('posts/create', [
            'categories' => Category::select('id', 'title')->get()
                ->map(function ($category) {
                    return [
                        'id' => $category->id,
                        'name' => $category->title,
                    ];
                })
        ]);
    }

    /**
     * Lưu bài viết mới vào cơ sở dữ liệu.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(Request $request)
    {
        try {
            // Validate dữ liệu đầu vào
            $validated = $request->validate([
                'title' => 'required|string|max:255',
                'content' => 'required|string',
                'description' => 'required|string|max:500',
                'slug' => 'required|string|max:255|unique:posts',
                'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:5120',
                'is_published' => 'nullable|boolean',
                'published_at' => 'nullable|date',
                'categories' => 'nullable|array',
                'categories.*' => 'exists:categories,id',
            ]);

            // Tự động tạo slug từ tiêu đề nếu không được cung cấp
            if (empty($validated['slug'])) {
                $validated['slug'] = Str::slug($validated['title']);
            }

            // Tạo bài viết mới
            $post = Post::create([
                'title' => $validated['title'],
                'content' => $validated['content'],
                'description' => $validated['description'],
                'slug' => $validated['slug'],
                'user_id' => Auth::id(),
                'is_published' => $validated['is_published'] ?? false,
                'published_at' => $validated['is_published'] ? now() : ($validated['published_at'] ?? null),
            ]);

            // Xử lý tải lên hình ảnh với Spatie Media Library
            if ($request->hasFile('image')) {
                // Thêm hình ảnh vào collection 'featured_image'
                $post->addMediaFromRequest('image')
                    ->sanitizingFileName(function($fileName) {
                        return Str::slug(pathinfo($fileName, PATHINFO_FILENAME)) . '.' . pathinfo($fileName, PATHINFO_EXTENSION);
                    })
                    ->withResponsiveImages() // Tạo các phiên bản responsive
                    ->toMediaCollection('featured_image');
                
                // Ghi log về việc tải lên hình ảnh thành công
                Log::info('Hình ảnh đã được tải lên thành công cho bài viết ID: ' . $post->id);
            }

            // Gắn các danh mục cho bài viết nếu có
            if ($request->has('categories') && is_array($request->categories)) {
                $post->categories()->attach($request->categories);
                
                // Ghi log về việc gắn danh mục
                Log::info('Đã gắn ' . count($request->categories) . ' danh mục cho bài viết ID: ' . $post->id);
            }

            // Thiết lập flash message - cách khác
            session()->flash('toast', true);
            session()->flash('toast.type', 'success');
            session()->flash('toast.message', 'Bài viết đã được tạo thành công');

            return redirect()->route('posts.index');
            
        } catch (ValidationException $e) {
            // Xử lý lỗi validation
            Log::error('Lỗi validation khi tạo bài viết: ' . json_encode($e->errors()));
            return back()->withErrors($e->errors())->withInput()->with([
                'toast' => true, 
                'toast.type' => 'error',
                'toast.message' => 'Dữ liệu nhập không hợp lệ'
            ]);
            
        } catch (\Exception $e) {
            // Xử lý các lỗi khác
            Log::error('Lỗi khi tạo bài viết: ' . $e->getMessage());
            return back()->with([
                'toast' => true,
                'toast.type' => 'error',
                'toast.message' => 'Có lỗi xảy ra khi tạo bài viết. Vui lòng thử lại sau.'
            ])->withInput();
        }
    }

    /**
     * Hiển thị chi tiết bài viết
     */
    public function show(Post $post)
    {
        if (!$post->is_published && !auth()->check()) {
            abort(404);
        }

        // Tăng số lượng xem
        if (!auth()->check() || auth()->id() !== $post->user_id) {
            $post->incrementViews();
        }

        // ...existing code...
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $post = Post::with('categories')->findOrFail($id);
        
        return Inertia::render('posts/edit', [
            'post' => [
                'id' => $post->id,
                'title' => $post->title,
                'content' => $post->content,
                'description' => $post->description,
                'slug' => $post->slug,
                'is_published' => $post->is_published,
                'published_at' => $post->published_at ? $post->published_at->format('Y-m-d\TH:i') : null,
                'categories' => $post->categories->pluck('id')->toArray(),
                'featured_image' => $post->getFirstMediaUrl('featured_image'),
            ],
            'categories' => Category::select('id', 'title')->get()
                ->map(function ($category) {
                    return [
                        'id' => $category->id,
                        'name' => $category->title,
                    ];
                })
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        try {
            $post = Post::findOrFail($id);
            
            $validated = $request->validate([
                'title' => 'required|string|max:255',
                'content' => 'required|string',
                'description' => 'required|string|max:500',
                'slug' => 'required|string|max:255|unique:posts,slug,' . $post->id,
                'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:5120',
                'is_published' => 'nullable|boolean',
                'published_at' => 'nullable|date',
                'categories' => 'nullable|array',
                'categories.*' => 'exists:categories,id',
            ]);

            // Tự động tạo slug từ tiêu đề nếu không được cung cấp
            if (empty($validated['slug'])) {
                $validated['slug'] = Str::slug($validated['title']);
            }

            $post->update([
                'title' => $validated['title'],
                'content' => $validated['content'],
                'description' => $validated['description'],
                'slug' => $validated['slug'],
                'is_published' => $validated['is_published'] ?? false,
                'published_at' => $validated['is_published'] ? now() : ($validated['published_at'] ?? null),
            ]);

            // Xử lý tải lên hình ảnh với Spatie Media Library
            if ($request->hasFile('image')) {
                // Xóa hình ảnh cũ
                $post->clearMediaCollection('featured_image');
                
                // Thêm hình ảnh mới
                $post->addMediaFromRequest('image')
                    ->sanitizingFileName(function($fileName) {
                        return Str::slug(pathinfo($fileName, PATHINFO_FILENAME)) . '.' . pathinfo($fileName, PATHINFO_EXTENSION);
                    })
                    ->withResponsiveImages()
                    ->toMediaCollection('featured_image');
                
                Log::info('Đã cập nhật hình ảnh cho bài viết ID: ' . $post->id);
            }

            // Đồng bộ danh mục
            if ($request->has('categories')) {
                $post->categories()->sync($request->categories);
                Log::info('Đã cập nhật danh mục cho bài viết ID: ' . $post->id);
            }

            return redirect()->route('posts.index')->with([
                'toast' => true,
                'toast.type' => 'success',
                'toast.message' => 'Bài viết đã được cập nhật thành công'
            ]);
            
        } catch (ValidationException $e) {
            Log::error('Lỗi validation khi cập nhật bài viết: ' . json_encode($e->errors()));
            return back()->withErrors($e->errors())->withInput()->with([
                'toast' => true,
                'toast.type' => 'error',
                'toast.message' => 'Dữ liệu nhập không hợp lệ'
            ]);
            
        } catch (\Exception $e) {
            Log::error('Lỗi khi cập nhật bài viết: ' . $e->getMessage());
            return back()->with([
                'toast' => true,
                'toast.type' => 'error',
                'toast.message' => 'Có lỗi xảy ra khi cập nhật bài viết. Vui lòng thử lại sau.'
            ])->withInput();
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $post = Post::findOrFail($id);
        
        // Delete media associated with the post
        $post->clearMediaCollection('featured_image');
        $post->clearMediaCollection('gallery');
        
        // Delete the post (soft delete is enabled)
        $post->delete();

        return redirect()->route('posts.index')->with([
            'toast' => true,
            'toast.type' => 'success',
            'toast.message' => 'Bài viết đã được xóa thành công'
        ]);
    }
}
