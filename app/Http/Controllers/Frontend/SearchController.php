<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\Store;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SearchController extends Controller
{
    /**
     * Search for products or stores based on keyword and type.
     *
     * @param Request $request
     * @return \Inertia\Response
     */
    public function search(Request $request)
    {
        $keyword = $request->input('keyword');
        $type = $request->input('type', 'products'); // Default to products if not specified
        
        $results = [];
        $meta = [
            'keyword' => $keyword,
            'type' => $type,
            'count' => 0,
        ];
        
        if ($type === 'products') {
            // Search for products
            $query = Product::with(['store', 'catalogues'])
                ->where('is_active', true)
                ->where(function($q) use ($keyword) {
                    $q->where('title', 'like', "%{$keyword}%")
                      ->orWhere('description', 'like', "%{$keyword}%")
                      ->orWhere('sku', 'like', "%{$keyword}%");
                });
                
            $results = $query->paginate(20)
                ->through(function ($product) {
                    return [
                        'id' => $product->id,
                        'name' => $product->title,
                        'slug' => $product->slug,
                        'price' => $product->price,
                        'sale_price' => $product->sale_price,
                        'image' => $product->getFirstMediaUrl('thumbnail') ?: asset('category-placeholder.jpeg'),
                        'store' => $product->store ? [
                            'id' => $product->store->id,
                            'name' => $product->store->name,
                            'slug' => $product->store->slug,
                        ] : null,
                        'categories' => $product->catalogues->map(function($catalogue) {
                            return [
                                'id' => $catalogue->id,
                                'name' => $catalogue->name,
                                'slug' => $catalogue->slug,
                            ];
                        }),
                    ];
                });
                
            $meta['count'] = $results->total();
            
            return Inertia::render('frontend/search-results', [
                'results' => $results,
                'meta' => $meta,
                'type' => 'products',
            ]);
            
        } else if ($type === 'stores') {
            // Search for stores
            $query = Store::where('is_active', true)
                ->where(function($q) use ($keyword) {
                    $q->where('name', 'like', "%{$keyword}%")
                      ->orWhere('description', 'like', "%{$keyword}%");
                });
                
            $results = $query->withCount('products')
                ->paginate(16)
                ->through(function ($store) {
                    return [
                        'id' => $store->id,
                        'name' => $store->name,
                        'slug' => $store->slug,
                        'logo' => $store->getFirstMediaUrl('logo') ?: asset('category-placeholder.jpeg'),
                        'banner' => $store->getFirstMediaUrl('banner') ?: '/assets/images/banner-placeholder.jpg',
                        'description' => $store->description,
                        'productCount' => $store->products_count,
                        'rating' => $store->rating ?? 4.5,
                        'joinDate' => $store->created_at->format('F Y'),
                    ];
                });
                
            $meta['count'] = $results->total();
            
            return Inertia::render('frontend/search-results', [
                'results' => $results,
                'meta' => $meta,
                'type' => 'stores',
            ]);
        }
        
        // If no valid type is provided, return empty results
        return Inertia::render('frontend/search-results', [
            'results' => [],
            'meta' => $meta,
            'type' => $type,
        ]);
    }
}
