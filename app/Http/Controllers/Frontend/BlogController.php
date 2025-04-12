<?php

namespace App\Http\Controllers\frontend;

use App\Http\Controllers\Controller;
use App\Models\Post;
use App\Models\Category;
use Inertia\Inertia;

class BlogController extends Controller
{
    public function index()
    {
        $latestPosts = Post::with(['categories', 'media', 'user'])
            ->where('is_published', true)
            ->orderBy('published_at', 'desc')
            ->take(3)
            ->get();

        $posts = Post::with(['categories', 'media', 'user'])
            ->where('is_published', true)
            ->orderBy('published_at', 'desc')
            ->paginate(9);

        $categories = Category::withCount(['posts' => function($query) {
            $query->where('is_published', true);
        }])->get();

        return Inertia::render('frontend/Blog/Index', [
            'posts' => $posts,
            'categories' => $categories,
            'latestPosts' => $latestPosts
        ]);
    }

    public function show($slug)
    {
        $post = Post::with(['categories', 'media', 'user'])
            ->where('slug', $slug)
            ->where('is_published', true)
            ->firstOrFail();

        // Increment view count
        $post->incrementViews();

        // Get related posts from the same categories
        $relatedPosts = Post::with(['categories', 'media'])
            ->where('id', '!=', $post->id)
            ->where('is_published', true)
            ->whereHas('categories', function($query) use ($post) {
                $query->whereIn('categories.id', $post->categories->pluck('id'));
            })
            ->limit(3)
            ->get();

        // Get popular posts
        $popularPosts = Post::with(['media'])
            ->where('id', '!=', $post->id)
            ->mostViewed(5)
            ->get();

        return Inertia::render('frontend/Blog/Show', [
            'post' => $post,
            'relatedPosts' => $relatedPosts,
            'popularPosts' => $popularPosts
        ]);
    }
}
