<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Models\Catalogue;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoryController extends Controller
{
    /**
     * Display products for a specific category.
     *
     * @param  string  $slug
     * @return \Inertia\Response
     */
    public function show($slug, Request $request)
    {
        // Find the category by slug
        $category = Catalogue::where('slug', $slug)
            ->with(['children'])
            ->withCount('products')
            ->firstOrFail();
        
        // Get category path/breadcrumbs
        $breadcrumbs = $this->getCategoryBreadcrumbs($category);
        
        // Setup filters
        $perPage = $request->input('per_page', 24);
        $sortBy = $request->input('sort', 'created_at|desc');
        [$sortField, $sortDirection] = explode('|', $sortBy);
        $priceMin = $request->input('price_min');
        $priceMax = $request->input('price_max');
        
        // Get all child category IDs including the current category
        $categoryIds = $this->getAllCategoryIds($category);
        
        // Build query for products
        $productsQuery = Product::whereHas('catalogues', function ($query) use ($categoryIds) {
                $query->whereIn('catalogues.id', $categoryIds);
            })
            ->where('is_active', true)
            ->with('store');
        
        // Apply price filters if provided
        if ($priceMin !== null) {
            $productsQuery->where('price', '>=', $priceMin);
        }
        
        if ($priceMax !== null) {
            $productsQuery->where('price', '<=', $priceMax);
        }
        
        // Apply sorting
        $productsQuery->orderBy($sortField, $sortDirection);
        
        // Get paginated products
        $products = $productsQuery->paginate($perPage)
            ->through(function ($product) {
                return [
                    'id' => $product->id,
                    'name' => $product->name,
                    'slug' => $product->slug,
                    'price' => $product->price,
                    'sale_price' => $product->sale_price,
                    'image' => $product->getFirstMediaUrl('product_images') ?: asset('category-placeholder.jpeg'),
                    'store' => $product->store ? [
                        'id' => $product->store->id,
                        'name' => $product->store->name,
                    ] : null,
                ];
            });
        
        // Get child categories for filtering
        $childCategories = $category->children()
            ->withCount('products')
            ->get()
            ->map(function ($child) {
                return [
                    'id' => $child->id,
                    'name' => $child->name,
                    'slug' => $child->slug,
                    'product_count' => $child->products_count,
                ];
            });
        
        // Category data to pass to the frontend
        $categoryData = [
            'id' => $category->id,
            'name' => $category->name,
            'slug' => $category->slug,
            'description' => $category->description,
            'image' => $category->getFirstMediaUrl('image') ?: asset('category-placeholder.jpeg'),
            'product_count' => $category->products_count,
            'children' => $childCategories,
        ];
        
        // Sort options
        $sortOptions = [
            ['value' => 'created_at|desc', 'label' => 'Newest first'],
            ['value' => 'created_at|asc', 'label' => 'Oldest first'],
            ['value' => 'name|asc', 'label' => 'Name: A-Z'],
            ['value' => 'name|desc', 'label' => 'Name: Z-A'],
            ['value' => 'price|asc', 'label' => 'Price: Low to high'],
            ['value' => 'price|desc', 'label' => 'Price: High to low'],
        ];
        
        return Inertia::render('frontend/category-detail', [
            'category' => $categoryData,
            'products' => $products,
            'breadcrumbs' => $breadcrumbs,
            'filters' => [
                'sort' => $sortBy,
                'price_min' => $priceMin,
                'price_max' => $priceMax,
                'per_page' => $perPage,
            ],
            'sortOptions' => $sortOptions,
        ]);
    }
    
    /**
     * Get breadcrumbs for the category.
     *
     * @param  \App\Models\Catalogue  $category
     * @return array
     */
    private function getCategoryBreadcrumbs(Catalogue $category)
    {
        $breadcrumbs = [];
        $current = $category;
        
        // Add the current category
        $breadcrumbs[] = [
            'id' => $current->id,
            'name' => $current->name,
            'slug' => $current->slug,
        ];
        
        // Add all parent categories
        while ($current->parent_id) {
            $current = Catalogue::find($current->parent_id);
            
            array_unshift($breadcrumbs, [
                'id' => $current->id,
                'name' => $current->name,
                'slug' => $current->slug,
            ]);
        }
        
        // Add home at the beginning
        array_unshift($breadcrumbs, [
            'id' => null,
            'name' => 'Home',
            'slug' => null,
        ]);
        
        return $breadcrumbs;
    }
    
    /**
     * Get all category IDs including the current one and all its children recursively.
     *
     * @param  \App\Models\Catalogue  $category
     * @return array
     */
    private function getAllCategoryIds(Catalogue $category)
    {
        $ids = [$category->id];
        
        foreach ($category->children as $child) {
            $ids[] = $child->id;
            // Get IDs of grandchildren if any
            $grandchildrenIds = Catalogue::where('parent_id', $child->id)->pluck('id')->toArray();
            $ids = array_merge($ids, $grandchildrenIds);
        }
        
        return $ids;
    }
}
