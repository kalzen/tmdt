<?php

namespace App\Http\Controllers\Api;

use App\Models\Slider;
use App\Http\Resources\SliderResource;
use Illuminate\Http\JsonResponse;

class SliderController extends ApiController
{
    /**
     * Display a specific slider by its slug.
     * 
     * @param string $slug
     * @return JsonResponse
     */
    public function getBySlug(string $slug): JsonResponse
    {
        $slider = Slider::with(['items' => function($query) {
                $query->where('is_active', true)->orderBy('sort_order');
            }])
            ->where('slug', $slug)
            ->where('is_active', true)
            ->first();
            
        if (!$slider) {
            return $this->sendError('Slider not found', [], 404);
        }
        
        return $this->sendResponse(new SliderResource($slider));
    }
    
    /**
     * Display all active sliders.
     * 
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        $sliders = Slider::with(['items' => function($query) {
                $query->where('is_active', true)->orderBy('sort_order');
            }])
            ->where('is_active', true)
            ->orderBy('name')
            ->get();
            
        return $this->sendResponse(SliderResource::collection($sliders));
    }
}
