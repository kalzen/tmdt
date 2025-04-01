<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Post;
use App\Http\Resources\PostResource;
use App\Http\Resources\PostCollection;
use App\Http\Requests\StorePostRequest;
use App\Http\Requests\UpdatePostRequest;

class PostController extends Controller
{
    /**
     * Display a listing of posts
     * 
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $posts = Post::with(['categories'])
            ->published()
            ->when($request->search, function($query, $search) {
                return $query->where('title', 'like', "%{$search}%")
                    ->orWhere('content', 'like', "%{$search}%");
            })
            ->when($request->sort_by, function($query, $sortBy) {
                return $query->orderBy($sortBy, request('sort_dir', 'desc'));
            }, function($query) {
                return $query->latest();
            })
            ->paginate($request->per_page ?? 15);
            
        return new PostCollection($posts);
    }
    
    /**
     * Display a single post by slug
     * 
     * @param string $slug
     * @return \Illuminate\Http\Response
     */
    public function show($slug)
    {
        $post = Post::with(['categories'])
            ->where('slug', $slug)
            ->published()
            ->firstOrFail();
            
        return new PostResource($post);
    }
    
    /**
     * Display posts by category slug
     * 
     * @param string $slug
     * @return \Illuminate\Http\Response
     */
    public function getByCategory($slug, Request $request)
    {
        $posts = Post::with(['categories'])
            ->whereHas('categories', function($query) use ($slug) {
                $query->where('slug', $slug);
            })
            ->published()
            ->latest()
            ->paginate($request->per_page ?? 15);
            
        return new PostCollection($posts);
    }
    
    /**
     * Store a new post
     * 
     * @param \App\Http\Requests\StorePostRequest $request
     * @return \Illuminate\Http\Response
     */
    public function store(StorePostRequest $request)
    {
        $post = Post::create($request->validated());
        
        if ($request->has('categories')) {
            $post->categories()->sync($request->categories);
        }
        
        // Handle image upload if provided
        if ($request->hasFile('image')) {
            // Process and store the image, then update the post
            $imagePath = $request->file('image')->store('posts', 'public');
            $post->update(['featured_image' => $imagePath]);
        }
        
        return new PostResource($post);
    }
    
    /**
     * Update an existing post
     * 
     * @param \App\Http\Requests\UpdatePostRequest $request
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function update(UpdatePostRequest $request, $id)
    {
        $post = Post::findOrFail($id);
        $post->update($request->validated());
        
        if ($request->has('categories')) {
            $post->categories()->sync($request->categories);
        }
        
        // Handle image upload if provided
        if ($request->hasFile('image')) {
            // Process and store the image, then update the post
            $imagePath = $request->file('image')->store('posts', 'public');
            $post->update(['featured_image' => $imagePath]);
        }
        
        return new PostResource($post);
    }
    
    /**
     * Delete a post
     * 
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $post = Post::findOrFail($id);
        $post->delete();
        
        return response()->json(['message' => 'Post deleted successfully']);
    }
}
