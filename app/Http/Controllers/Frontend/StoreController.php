<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Product;
use App\Models\Store;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StoreController extends Controller
{
    /**
     * Display the store detail page.
     *
     * @param int $id
     * @return \Inertia\Response
     */
    public function show($id, Request $request)
    {
        $store = Store::findOrFail($id);

        // Get featured products
        $featuredProducts = Product::where('store_id', $store->id)
            ->where('is_featured', true)
            ->where('is_active', true)
            ->take(5)
            ->get()
            ->map(function ($product) {
                return [
                    'id' => $product->id,
                    'name' => $product->name,
                    'price' => $product->price,
                    'image' => $product->getFirstMediaUrl('product_images') ?: '/assets/images/placeholder.jpg',
                    'category' => [
                        'id' => $product->category->id,
                        'name' => $product->category->name,
                    ],
                ];
            });

        // Get new products
        $newProducts = Product::where('store_id', $store->id)
            ->where('is_active', true)
            ->orderBy('created_at', 'desc')
            ->take(5)
            ->get()
            ->map(function ($product) {
                return [
                    'id' => $product->id,
                    'name' => $product->name,
                    'price' => $product->price,
                    'image' => $product->getFirstMediaUrl('product_images') ?: '/assets/images/placeholder.jpg',
                    'category' => [
                        'id' => $product->category->id,
                        'name' => $product->category->name,
                    ],
                ];
            });

        // Get store categories
        $categories = Category::whereHas('products', function ($query) use ($store) {
            $query->where('store_id', $store->id);
        })
            ->withCount(['products' => function ($query) use ($store) {
                $query->where('store_id', $store->id);
            }])
            ->get()
            ->map(function ($category) {
                return [
                    'id' => $category->id,
                    'name' => $category->name,
                    'productCount' => $category->products_count,
                ];
            });

        // Get all store products with pagination
        $products = Product::where('store_id', $store->id)
            ->where('is_active', true)
            ->with('category')
            ->paginate(20)
            ->through(function ($product) {
                return [
                    'id' => $product->id,
                    'name' => $product->name,
                    'price' => $product->price,
                    'image' => $product->getFirstMediaUrl('product_images') ?: '/assets/images/placeholder.jpg',
                    'category' => [
                        'id' => $product->category->id,
                        'name' => $product->category->name,
                    ],
                ];
            });

        // Format store data for the frontend
        $formattedStore = [
            'id' => $store->id,
            'name' => $store->name,
            'description' => $store->description,
            'logo' => $store->getFirstMediaUrl('logo') ?: '/assets/images/store-placeholder.jpg',
            'banner' => $store->getFirstMediaUrl('banner') ?: '/assets/images/banner-placeholder.jpg',
            'rating' => $store->rating ?? 4.5,
            'reviewCount' => $store->reviews_count ?? 0,
            'productCount' => $store->products()->count(),
            'joinDate' => $store->created_at->format('F Y'),
            'location' => $store->location ?? 'Not specified',
            'email' => $store->email ?? 'contact@example.com',
            'phone' => $store->phone ?? 'Not specified',
            'website' => $store->website ?? '#',
            'openingHours' => $store->opening_hours ?? 'Monday - Friday: 9:00 AM - 5:00 PM',
            'categories' => $categories,
            'featuredProducts' => $featuredProducts,
            'newProducts' => $newProducts,
        ];

        return Inertia::render('frontend/store-detail', [
            'store' => $formattedStore,
            'products' => $products,
        ]);
    }

    /**
     * Display the stores listing page.
     *
     * @param Request $request
     * @return \Inertia\Response
     */
    public function index(Request $request)
    {
        $query = Store::where('is_active', true);

        // Apply filters
        if ($request->has('search')) {
            $query->where('name', 'like', '%' . $request->search . '%');
        }

        // Apply sorting
        $sortField = $request->input('sort_by', 'created_at');
        $sortDirection = $request->input('sort_direction', 'desc');
        $query->orderBy($sortField, $sortDirection);

        // Paginate results
        $stores = $query->withCount('products')
            ->paginate(16)
            ->through(function ($store) {
                return [
                    'id' => $store->id,
                    'name' => $store->name,
                    'logo' => $store->getFirstMediaUrl('logo') ?: '/assets/images/store-placeholder.jpg',
                    'banner' => $store->getFirstMediaUrl('banner') ?: '/assets/images/banner-placeholder.jpg',
                    'description' => $store->description,
                    'productCount' => $store->products_count,
                    'rating' => $store->rating ?? 4.5,
                    'joinDate' => $store->created_at->format('F Y'),
                ];
            });

        return Inertia::render('frontend/stores', [
            'stores' => $stores,
            'filters' => $request->only(['search', 'sort_by', 'sort_direction']),
        ]);
    }
}
