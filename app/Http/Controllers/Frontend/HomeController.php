<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Models\Catalogue;
use App\Models\Product;
use App\Models\Slider;
use App\Models\Store;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    /**
     * Display the homepage.
     *
     * @return \Inertia\Response
     */
    public function index()
    {
        // Get featured products
        $featuredProducts = Product::with('store')
            ->where('is_featured', true)
            ->where('is_active', true)
            ->take(10)
            ->get()
            ->map(function ($product) {
                return [
                    'id' => $product->id,
                    'name' => $product->title, // Map title to name
                    'price' => $product->price,
                    'slug' => $product->slug,
                    'image' => $product->getFirstMediaUrl('product_images') ?: asset('category-placeholder.jpeg'),
                    'store' => [
                        'slug' => $product->store->slug,
                        'name' => $product->store->name,
                    ],
                ];
            });

        // Get popular stores
        $popularStores = Store::withCount('products')
            ->where('is_active', true)
            ->orderBy('products_count', 'desc')
            ->take(8)
            ->get()
            ->map(function ($store) {
                return [
                    'id' => $store->id,
                    'name' => $store->name,
                    'slug' => $store->slug, // Add the slug property to fix the route error
                    'logo' => $store->getFirstMediaUrl('logo') ?: asset('category-placeholder.jpeg'),
                    'productCount' => $store->products_count,
                ];
            });

        // Get parent categories with children for megamenu
        $categories = Catalogue::withCount('products')
            ->where('is_active', true)
            ->whereNull('parent_id') // Only get parent categories
            ->take(12)
            ->get()
            ->map(function ($category) {
                // Get first level children
                $children = $category->children()
                    ->where('is_active', true)
                    ->withCount('products')
                    ->get()
                    ->map(function ($childCategory) {
                        // Get second level children
                        $subChildren = $childCategory->children()
                            ->where('is_active', true)
                            ->withCount('products')
                            ->get()
                            ->map(function ($subChildCategory) {
                                return [
                                    'id' => $subChildCategory->id,
                                    'name' => $subChildCategory->name,
                                    'slug' => $subChildCategory->slug,
                                    'productCount' => $subChildCategory->products_count,
                                ];
                            });

                        return [
                            'id' => $childCategory->id,
                            'name' => $childCategory->name,
                            'slug' => $childCategory->slug,
                            'productCount' => $childCategory->products_count,
                            'children' => $subChildren,
                        ];
                    });

                return [
                    'id' => $category->id,
                    'name' => $category->name,
                    'slug' => $category->slug,
                    'image' => $category->getFirstMediaUrl('image') ?: asset('category-placeholder.jpeg'),
                    'productCount' => $category->products_count,
                    'children' => $children,
                ];
            });

        // Get sliders
        $sliders = Slider::where('slug', 'homepage')
            ->first()
            ->items()
            ->where('is_active', true)
            ->orderBy('sort_order', 'asc')
            ->get()
            ->map(function ($item) {
                return [
                    'id' => $item->id,
                    'image' => $item->getFirstMediaUrl('image') ?: '/assets/images/slider-placeholder.jpg',
                    'title' => $item->title,
                    'description' => $item->description,
                    'link' => $item->link,
                ];
            });

        return Inertia::render('frontend/home', [
            'featuredProducts' => $featuredProducts,
            'popularStores' => $popularStores,
            'categories' => $categories,
            'sliders' => $sliders,
        ]);
    }
}
