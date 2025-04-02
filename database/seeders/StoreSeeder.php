<?php

namespace Database\Seeders;

use App\Models\Catalogue;
use App\Models\Store;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class StoreSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create 10 sample stores
        $users = User::factory(10)->create();
        
        $storeDescriptions = [
            'We offer high-quality products at reasonable prices. With years of industry experience, we are committed to providing our customers with the best products.',
            'Your trusted source for premium products. We focus on quality, affordability, and excellent customer service.',
            'Established with a mission to provide innovative products that enhance your life. We strive for excellence in everything we do.',
            'A leading marketplace store offering a wide range of products from trusted brands. We value customer satisfaction above all.',
            'Dedicated to bringing you the finest selection of products. Our team is passionate about quality and service excellence.',
        ];
        
        $addresses = [
            '123 Main Street, Downtown, New York',
            '456 Market Avenue, Business District, Los Angeles',
            '789 Commerce Boulevard, Financial Center, Chicago',
            '321 Enterprise Road, Tech Hub, San Francisco',
            '654 Innovation Street, Creative District, Seattle',
        ];
        
        $industries = [
            'Electronics & Technology',
            'Fashion & Apparel',
            'Home & Living',
            'Health & Beauty',
            'Sports & Outdoors',
        ];
        
        foreach ($users as $index => $user) {
            $storeName = $user->name . '\'s Store';
            $industry = $industries[$index % count($industries)];
            $description = $storeDescriptions[$index % count($storeDescriptions)];
            $address = $addresses[$index % count($addresses)];
            
            $store = Store::create([
                'name' => $storeName,
                'slug' => Str::slug($storeName),
                'description' => 'Official store of ' . $user->name . ' specializing in ' . $industry,
                'address' => $address,
                'phone' => '1-' . rand(200, 999) . '-' . rand(200, 999) . '-' . rand(1000, 9999),
                'email' => 'contact@' . Str::slug($user->name) . 'store.com',
                'website' => 'https://www.' . Str::slug($user->name) . 'store.com',
                'primary_color' => '#' . dechex(rand(0, 16777215)),
                'secondary_color' => '#' . dechex(rand(0, 16777215)),
                'about_us' => $description,
                'founding_year' => rand(2000, 2022),
                'employee_count' => rand(5, 200),
                'is_active' => true,
                'is_verified' => rand(0, 1) == 1,
                'user_id' => $user->id,
                'meta_title' => $storeName . ' - Official Store',
                'meta_description' => 'Shop quality products at ' . $storeName . ' with great prices and excellent service.',
            ]);
            
            // Add random categories to the store
            $categories = Catalogue::where('level', 0)->inRandomOrder()->limit(rand(2, 4))->get();
            $store->mainCategories()->attach($categories->pluck('id')->toArray());
        }
    }
}
