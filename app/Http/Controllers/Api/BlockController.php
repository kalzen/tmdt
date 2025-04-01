<?php

namespace App\Http\Controllers\Api;

use App\Models\Block;
use App\Http\Resources\BlockResource;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class BlockController extends ApiController
{
    /**
     * Display blocks by their location.
     * 
     * @param Request $request
     * @return JsonResponse
     */
    public function getByLocation(Request $request): JsonResponse
    {
        if (!$request->has('location')) {
            return $this->sendError('Location parameter is required', [], 400);
        }
        
        $location = $request->input('location');
        
        $blocks = Block::with(['activeItems' => function($query) {
                $query->orderBy('sort_order');
            }])
            ->where('location', $location)
            ->where('is_active', true)
            ->orderBy('sort_order')
            ->get();
            
        return $this->sendResponse(BlockResource::collection($blocks));
    }
    
    /**
     * Display a specific block by its slug.
     * 
     * @param string $slug
     * @return JsonResponse
     */
    public function getBySlug(string $slug): JsonResponse
    {
        $block = Block::with(['activeItems' => function($query) {
                $query->orderBy('sort_order');
            }])
            ->where('slug', $slug)
            ->where('is_active', true)
            ->first();
            
        if (!$block) {
            return $this->sendError('Block not found', [], 404);
        }
        
        return $this->sendResponse(new BlockResource($block));
    }
}
