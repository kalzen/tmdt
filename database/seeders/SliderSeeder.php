<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Slider;
use App\Models\SliderItem;

class SliderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create homepage slider
        $homeSlider = Slider::create([
            'name' => 'Homepage',
            'slug' => 'homepage',
            'description' => 'Slider displayed on the website homepage',
            'is_active' => true
        ]);

        // Create items for homepage slider
        $homeSliderItems = [
            [
                'title' => 'New Collection Arrived',
                'description' => 'Check out our latest products with special discounts',
                'button_text' => 'Shop Now',
                'button_url' => '/products',
            ],
            [
                'title' => 'Summer Sale',
                'description' => 'Up to 50% off on selected items',
                'button_text' => 'View Offers',
                'button_url' => '/products/sale',
            ],
            [
                'title' => 'Premium Electronics',
                'description' => 'Discover our high-quality electronic devices',
                'button_text' => 'Explore',
                'button_url' => '/products/electronics',
            ],
        ];
        
        foreach ($homeSliderItems as $index => $item) {
            SliderItem::create([
                'slider_id' => $homeSlider->id,
                'title' => $item['title'],
                'description' => $item['description'],
                'button_text' => $item['button_text'],
                'button_url' => $item['button_url'],
                'sort_order' => $index + 1,
                'is_active' => true
            ]);
        }

        // Create about us slider
        $aboutSlider = Slider::create([
            'name' => 'About Us',
            'slug' => 'about-us',
            'description' => 'Slider displayed on the about us page',
            'is_active' => true
        ]);

        // Create items for about us slider
        $aboutSliderItems = [
            [
                'title' => 'Our Story',
                'description' => 'Learn about our journey and vision',
                'button_text' => 'Contact Us',
                'button_url' => '/contact',
            ],
            [
                'title' => 'Our Team',
                'description' => 'Meet the people behind our success',
                'button_text' => 'Learn More',
                'button_url' => '/about/team',
            ],
        ];
        
        foreach ($aboutSliderItems as $index => $item) {
            SliderItem::create([
                'slider_id' => $aboutSlider->id,
                'title' => $item['title'],
                'description' => $item['description'],
                'button_text' => $item['button_text'],
                'button_url' => $item['button_url'],
                'sort_order' => $index + 1,
                'is_active' => true
            ]);
        }
    }
}
