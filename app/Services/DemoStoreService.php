<?php

namespace App\Services;

use App\Models\User;
use App\Models\Store;
use App\Models\Product;
use App\Models\Catalogue;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Faker\Factory as Faker;

class DemoStoreService
{
    /**
     * Create a demo store with sample products for a new user
     *
     * @param User $user
     * @return Store|null
     */
    public function createDemoStoreForUser(User $user)
    {
        try {
            DB::beginTransaction();
            
            // Create a store for the user
            $store = $this->createStore($user);
            
            // Assign some categories to the store
            $this->assignCategoriesToStore($store);
            
            // Create some demo products
            $this->createDemoProducts($store);
            
            DB::commit();
            
            return $store;
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Failed to create demo store: ' . $e->getMessage());
            return null;
        }
    }
    
    /**
     * Create a store for the user
     *
     * @param User $user
     * @return Store
     */
    private function createStore(User $user)
    {
        $faker = Faker::create();
        
        $storeName = "{$user->name}'s Store";
        $storeSlug = Str::slug($storeName);
        
        $store = Store::create([
            'user_id' => $user->id,
            'name' => $storeName,
            'slug' => $storeSlug,
            'description' => "Welcome to {$storeName}! This is a demo store with sample products.",
            'is_active' => true,
            'is_featured' => false,
            'address' => $faker->streetAddress,
            'city' => $faker->city,
            'state' => $faker->state,
            'postal_code' => $faker->postcode,
            'country' => $faker->country,
            'phone' => $faker->phoneNumber,
            'email' => $user->email,
            'meta_title' => $storeName,
            'meta_description' => "Shop the latest products at {$storeName}",
        ]);
        
        // Add demo store logo
        $logoUrl = public_path('assets/images/demo-store-logo.png');
        if (file_exists($logoUrl)) {
            $store->addMedia($logoUrl)
                ->preservingOriginal()
                ->toMediaCollection('logo');
        }
        
        // Add demo store banner
        $bannerUrl = public_path('assets/images/demo-store-banner.jpg');
        if (file_exists($bannerUrl)) {
            $store->addMedia($bannerUrl)
                ->preservingOriginal()
                ->toMediaCollection('banner');
        }
        
        return $store;
    }
    
    /**
     * Assign categories to the store
     *
     * @param Store $store
     * @return void
     */
    private function assignCategoriesToStore(Store $store)
    {
        // Get some random categories (max 5)
        $categories = Catalogue::whereNull('parent_id')
            ->where('is_active', true)
            ->inRandomOrder()
            ->take(5)
            ->get();
            
        // Attach categories to store
        $categoryIds = $categories->pluck('id')->toArray();
        $store->catalogues()->attach($categoryIds);
    }
    
    /**
     * Create demo products for the store
     *
     * @param Store $store
     * @return void
     */
    private function createDemoProducts(Store $store)
    {
        $faker = Faker::create();
        
        // Get categories associated with this store
        $categoryIds = $store->catalogues()->pluck('catalogues.id')->toArray();
        
        // Create 5-10 demo products
        $productCount = rand(5, 10);
        
        for ($i = 0; $i < $productCount; $i++) {
            $name = $faker->words(rand(2, 5), true);
            $slug = Str::slug($name);
            $basePrice = $faker->numberBetween(999, 99999) / 100; // Generate price between 9.99 and 999.99
            
            // Randomly decide if the product has a sale price
            $salePrice = rand(0, 1) ? round($basePrice * (1 - (rand(10, 30) / 100)), 2) : null;
            
            $product = Product::create([
                'store_id' => $store->id,
                'name' => ucfirst($name),
                'slug' => $slug,
                'sku' => strtoupper(Str::random(8)),
                'description' => $faker->paragraph(2),
                'content' => '<p>' . implode('</p><p>', $faker->paragraphs(rand(3, 6))) . '</p>',
                'price' => $basePrice,
                'sale_price' => $salePrice,
                'stock_quantity' => $faker->numberBetween(10, 100),
                'is_active' => true,
                'is_featured' => rand(0, 1) ? true : false,
            ]);
            
            // Attach random categories (1-3) from the store's categories
            $productCategoryIds = array_rand(array_flip($categoryIds), min(rand(1, 3), count($categoryIds)));
            if (!is_array($productCategoryIds)) {
                $productCategoryIds = [$productCategoryIds];
            }
            $product->catalogues()->attach($productCategoryIds);
            
            // Add demo product images
            $imageNumber = $i % 5 + 1; // Cycle through 5 demo images
            $productImageUrl = public_path("assets/images/demo-product-{$imageNumber}.jpg");
            
            if (file_exists($productImageUrl)) {
                $product->addMedia($productImageUrl)
                    ->preservingOriginal()
                    ->toMediaCollection('thumbnail');
                    
                // Add additional images to gallery for some products
                if (rand(0, 1)) {
                    $galleryImageNumber = ($imageNumber % 5) + 1;
                    $galleryImageUrl = public_path("assets/images/demo-product-{$galleryImageNumber}.jpg");
                    
                    if (file_exists($galleryImageUrl)) {
                        $product->addMedia($galleryImageUrl)
                            ->preservingOriginal()
                            ->toMediaCollection('product_gallery');
                    }
                }
            }
        }
    }
}
