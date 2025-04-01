<?php

namespace App\Http\Controllers\Api;

use App\Models\Category;
use App\Http\Resources\CategoryResource;
use App\Http\Resources\CategoryCollection;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class CategoryController extends ApiController
{
    /**
     * Display a listing of categories.
     * 
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        $categories = Category::withCount('posts')
            ->orderBy('title')
            ->get();
            
        return $this->sendResponse(CategoryResource::collection($categories));
    }
    
    /**
     * Display the specified category with its posts.
     * 
     * @param string $slug
     * @param Request $request
     * @return JsonResponse
     */
    public function show(string $slug, Request $request): JsonResponse
    {
        $category = Category::where('slug', $slug)
            ->firstOrFail();
            
        $perPage = $request->input('per_page', 10);
        $posts = $category->posts()
            ->where('is_published', true)
            ->orderBy('published_at', 'desc')
            ->paginate($perPage);
            
        return $this->sendResponse([
            'category' => new CategoryResource($category),
            'posts' => new PostCollection($posts),
        ]);
    }
}
