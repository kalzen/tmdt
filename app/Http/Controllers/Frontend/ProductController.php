<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    /**
     * Display the product detail page.
     *
     * @param  int  $id
     * @return \Inertia\Response
     */
    public function show($slug)
    {
        $product = Product::with(['store', 'catalogues', 'attributes.attribute'])
            ->where('slug', $slug)
            ->firstOrFail();
            
        // Get related products from same category
        $relatedProducts = Product::whereHas('catalogues', function($query) use ($product) {
                $query->whereIn('catalogues.id', $product->catalogues->pluck('id'));
            })
            ->where('id', '!=', $product->id)
            ->where('is_active', true)
            ->inRandomOrder()
            ->limit(8)
            ->get()
            ->map(function ($relatedProduct) {
                return [
                    'id' => $relatedProduct->id,
                    'name' => $relatedProduct->title, // Use title instead of name
                    'slug' => $relatedProduct->slug,
                    'price' => $relatedProduct->price,
                    'sale_price' => $relatedProduct->sale_price,
                    'image' => $relatedProduct->getFirstMediaUrl('thumbnail') ?: asset('product-placeholder.jpeg'),
                    'store' => [
                        'id' => $relatedProduct->store->id,
                        'name' => $relatedProduct->store->name,
                        'slug' => $relatedProduct->store->slug, // Add store slug
                    ],
                ];
            });
            
        // Breadcrumbs
        $breadcrumbs = [];
        $breadcrumbs[] = [
            'id' => null,
            'name' => 'Home',
            'slug' => null,
        ];
        
        // Add category if available
        if ($product->catalogues->isNotEmpty()) {
            $mainCategory = $product->catalogues->first();
            $breadcrumbs[] = [
                'id' => $mainCategory->id,
                'name' => $mainCategory->name,
                'slug' => $mainCategory->slug,
            ];
        }
        
        // Add product
        $breadcrumbs[] = [
            'id' => $product->id,
            'name' => $product->title, // Use title instead of name for consistency
            'slug' => null,
        ];
        
        // Group attributes
        $groupedAttributes = $product->attributes->groupBy(function ($item) {
            return $item->attribute->type;
        });
        
        // Format product data for frontend
        $productData = [
            'id' => $product->id,
            'name' => $product->title, // Use title field as name
            'slug' => $product->slug,
            'sku' => $product->sku,
            'description' => $product->description,
            'content' => $product->content,
            'price' => $product->price,
            'sale_price' => $product->sale_price,
            'discount_percentage' => $product->sale_price 
                ? round(($product->price - $product->sale_price) / $product->price * 100) 
                : 0,
            'stock_quantity' => $product->stock_quantity,
            'is_active' => $product->is_active,
            'is_featured' => $product->is_featured,
            'image' => $product->getFirstMediaUrl('thumbnail') ?: asset('product-placeholder.jpeg'),
            'gallery' => $product->getMedia('gallery')->map(function($media) {
                return [
                    'id' => $media->id,
                    'url' => $media->getUrl(),
                    'name' => $media->name,
                ];
            }),
            'categories' => $product->catalogues->map(function($catalogue) {
                return [
                    'id' => $catalogue->id,
                    'name' => $catalogue->name,
                    'slug' => $catalogue->slug, // Make sure slug is included for each category
                ];
            })->values()->all(), // Convert to array with reindexed keys
            'attributes' => $groupedAttributes->map(function($group) {
                return $group->map(function($attribute) {
                    return [
                        'name' => $attribute->attribute->name,
                        'value' => $attribute->text_value,
                    ];
                });
            }),
            'store' => $product->store ? [
                'id' => $product->store->id,
                'name' => $product->store->name,
                'logo' => $product->store->getFirstMediaUrl('logo') ?: asset('store-placeholder.jpeg'),
                'slug' => $product->store->slug, // Ensure store slug is included
            ] : null,
            'created_at' => $product->created_at->format('Y-m-d'),
        ];

        return Inertia::render('frontend/product-detail', [
            'product' => $productData,
            'relatedProducts' => $relatedProducts,
            'breadcrumbs' => $breadcrumbs,
        ]);
    }

    /**
     * Display the products listing page.
     *
     * @param Request $request
     * @return \Inertia\Response
     */
    public function index(Request $request)
    {
        $query = Product::with(['store', 'catalogues'])
            ->where('is_active', true);

        // Apply filters
        if ($request->has('catalogue') && !empty($request->catalogue)) {
            $query->whereHas('catalogues', function($q) use ($request) {
                $q->where('catalogues.id', $request->catalogue);
            });
        }

        if ($request->has('store') && !empty($request->store)) {
            $query->where('store_id', $request->store);
        }

        // Filter by price range
        if ($request->has('min_price') && is_numeric($request->min_price)) {
            $query->where('price', '>=', $request->min_price);
        }

        if ($request->has('max_price') && is_numeric($request->max_price)) {
            $query->where('price', '<=', $request->max_price);
        }

        // Filter by search term
        if ($request->has('search') && !empty($request->search)) {
            $query->where(function($q) use ($request) {
                $q->where('title', 'like', '%' . $request->search . '%')
                  ->orWhere('description', 'like', '%' . $request->search . '%')
                  ->orWhere('sku', 'like', '%' . $request->search . '%');
            });
        }
        
        // Filter by stock availability
        if ($request->has('in_stock') && $request->in_stock == '1') {
            $query->where('stock_quantity', '>', 0);
        }
        
        if ($request->has('out_of_stock') && $request->out_of_stock == '1') {
            $query->where('stock_quantity', '<=', 0);
        }

        // Apply sorting
        $sortField = $request->input('sort_by', 'created_at');
        $sortDirection = $request->input('sort_direction', 'desc');
        
        // Validate sort field to prevent SQL injection
        $allowedSortFields = ['created_at', 'price', 'title'];
        if (!in_array($sortField, $allowedSortFields)) {
            $sortField = 'created_at';
        }
        
        // Map frontend sort field names to database column names
        if ($sortField === 'name') {
            $sortField = 'title';
        }
        
        $query->orderBy($sortField, $sortDirection);

        // Paginate results with consistent format
        $products = $query->paginate($request->input('per_page', 20))
            ->withQueryString();
        
        // Format the data for the frontend with consistent structure
        $formattedData = [
            'data' => collect($products->items())->map(function ($product) {
                return [
                    'id' => $product->id,
                    'name' => $product->title,
                    'slug' => $product->slug,
                    'price' => $product->price,
                    'sale_price' => $product->sale_price,
                    'stock_quantity' => $product->stock_quantity,
                    'discount_percentage' => $product->sale_price 
                        ? round(($product->price - $product->sale_price) / $product->price * 100) 
                        : 0,
                    'image' => $product->getFirstMediaUrl('thumbnail') ?: asset('product-placeholder.jpeg'),
                    'store' => $product->store ? [
                        'id' => $product->store->id,
                        'name' => $product->store->name,
                        'slug' => $product->store->slug,
                    ] : null,
                    'category' => $product->catalogues->isNotEmpty() ? [
                        'id' => $product->catalogues->first()->id,
                        'name' => $product->catalogues->first()->name,
                    ] : null,
                ];
            })->toArray(),
            'meta' => [
                'current_page' => $products->currentPage(),
                'from' => $products->firstItem() ?? 0,
                'last_page' => $products->lastPage(),
                'per_page' => $products->perPage(),
                'to' => $products->lastItem() ?? 0,
                'total' => $products->total(),
            ],
        ];

        return Inertia::render('frontend/products', [
            'products' => $formattedData,
            'filters' => $request->only([
                'catalogue', 'store', 'min_price', 'max_price', 
                'search', 'sort_by', 'sort_direction', 'per_page',
                'in_stock', 'out_of_stock'
            ]),
        ]);
    }
}
