<?php

namespace Database\Seeders;

use App\Models\Catalogue;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class CatalogueSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // List of root categories (level 0)
        $rootCategories = [
            [
                'name' => 'Phones & Tablets',
                'description' => 'Mobile phones, tablets and accessories',
                'meta_title' => 'Genuine Phones & Tablets',
                'meta_description' => 'Shop for genuine phones and tablets at the best prices',
                'position' => 1,
            ],
            [
                'name' => 'Computers & Laptops',
                'description' => 'Desktop computers, laptops and peripherals',
                'meta_title' => 'Genuine Computers & Laptops',
                'meta_description' => 'Shop for computers, laptops and accessories at great prices',
                'position' => 2,
            ],
            [
                'name' => 'Electronics',
                'description' => 'Electronic devices and smart gadgets',
                'meta_title' => 'Genuine Electronics',
                'meta_description' => 'Shop for genuine electronic devices at the best prices',
                'position' => 3,
            ],
            [
                'name' => 'Home Appliances',
                'description' => 'Electrical appliances for home use',
                'meta_title' => 'Genuine Home Appliances',
                'meta_description' => 'Shop for genuine home appliances at great prices',
                'position' => 4,
            ],
            [
                'name' => 'Men\'s Fashion',
                'description' => 'Clothing, footwear and fashion accessories for men',
                'meta_title' => 'Genuine Men\'s Fashion',
                'meta_description' => 'Shop for genuine men\'s fashion at the best prices',
                'position' => 5,
            ],
            [
                'name' => 'Women\'s Fashion',
                'description' => 'Clothing, footwear and fashion accessories for women',
                'meta_title' => 'Genuine Women\'s Fashion',
                'meta_description' => 'Shop for genuine women\'s fashion at great prices',
                'position' => 6,
            ],
            [
                'name' => 'Beauty',
                'description' => 'Cosmetics and beauty care products',
                'meta_title' => 'Genuine Beauty & Cosmetics',
                'meta_description' => 'Shop for genuine cosmetics and beauty products',
                'position' => 7,
            ],
            [
                'name' => 'Health',
                'description' => 'Supplements and health care products',
                'meta_title' => 'Genuine Health Products',
                'meta_description' => 'Shop for genuine health care products',
                'position' => 8,
            ],
            [
                'name' => 'Home & Living',
                'description' => 'Household items, furniture and decoration',
                'meta_title' => 'Home & Living Products',
                'meta_description' => 'Shop for home and living products at the best prices',
                'position' => 9,
            ],
            [
                'name' => 'Sports & Travel',
                'description' => 'Sports equipment and travel accessories',
                'meta_title' => 'Genuine Sports & Travel',
                'meta_description' => 'Shop for genuine sports equipment and travel accessories',
                'position' => 10,
            ],
        ];

        // Create level 0 categories and store them for creating subcategories
        $createdRootCategories = [];
        foreach ($rootCategories as $category) {
            $slug = Str::slug($category['name']);
            $createdCategory = Catalogue::create([
                'name' => $category['name'],
                'slug' => $slug,
                'description' => $category['description'],
                'meta_title' => $category['meta_title'],
                'meta_description' => $category['meta_description'],
                'level' => 0, // Level 0
                'position' => $category['position'],
                'is_active' => true,
            ]);
            
            $createdRootCategories[$slug] = $createdCategory;
        }

        // Create subcategories for Phones & Tablets
        $this->createSubcategories($createdRootCategories['phones-tablets'], [
            [
                'name' => 'Mobile Phones',
                'description' => 'Various mobile phones from multiple brands',
                'children' => [
                    'iPhone',
                    'Samsung',
                    'Xiaomi',
                    'OPPO',
                    'Vivo',
                    'Realme',
                    'Nokia',
                    'Feature Phones',
                ]
            ],
            [
                'name' => 'Tablets',
                'description' => 'Various types of tablets',
                'children' => [
                    'iPad',
                    'Samsung Galaxy Tab',
                    'Xiaomi Pad',
                    'Lenovo Tab',
                    'Budget Tablets',
                ]
            ],
            [
                'name' => 'Phone Accessories',
                'description' => 'Accessories for mobile phones',
                'children' => [
                    'Cases & Covers',
                    'Screen Protectors',
                    'Cables & Chargers',
                    'Power Banks',
                    'Phone Holders',
                    'Waterproof Pouches',
                ]
            ],
            [
                'name' => 'Tablet Accessories',
                'description' => 'Accessories for tablets',
                'children' => [
                    'Cases & Covers',
                    'Keyboards',
                    'Stylus Pens',
                    'Stands & Holders',
                ]
            ],
        ]);

        // Create subcategories for Computers & Laptops
        $this->createSubcategories($createdRootCategories['computers-laptops'], [
            [
                'name' => 'Laptops',
                'description' => 'Various types of laptops',
                'children' => [
                    'Gaming Laptops',
                    'Office Laptops',
                    'Graphic Design Laptops',
                    'MacBooks',
                    'Ultrabooks',
                ]
            ],
            [
                'name' => 'Desktop Computers',
                'description' => 'Desktop computers and components',
                'children' => [
                    'Gaming PCs',
                    'Office PCs',
                    'Graphic Design PCs',
                    'All-in-one PCs',
                ]
            ],
            [
                'name' => 'Computer Components',
                'description' => 'Components and accessories for computers',
                'children' => [
                    'CPUs',
                    'Motherboards',
                    'RAM',
                    'Storage Drives',
                    'Graphics Cards',
                    'Power Supplies',
                    'Cooling Systems',
                    'Computer Cases',
                ]
            ],
            [
                'name' => 'Monitors',
                'description' => 'Various types of computer monitors',
                'children' => [
                    'Gaming Monitors',
                    'Graphic Design Monitors',
                    'Office Monitors',
                    'Curved Monitors',
                ]
            ],
            [
                'name' => 'Networking Equipment',
                'description' => 'Various networking devices',
                'children' => [
                    'Routers',
                    'Switches',
                    'Range Extenders',
                    'Wifi Transmitters',
                    'Network Cards',
                ]
            ],
        ]);

        // Create subcategories for Electronics
        $this->createSubcategories($createdRootCategories['electronics'], [
            [
                'name' => 'TVs & Displays',
                'description' => 'TVs and large displays',
                'children' => [
                    'Smart TVs',
                    'Android TVs',
                    '4K TVs',
                    '8K TVs',
                    'QLED TVs',
                    'OLED TVs',
                ]
            ],
            [
                'name' => 'Audio Equipment',
                'description' => 'Audio equipment and entertainment devices',
                'children' => [
                    'Bluetooth Speakers',
                    'Soundbars',
                    'Headphones',
                    'Microphones',
                    'Amplifiers',
                ]
            ],
            [
                'name' => 'Cameras & Camcorders',
                'description' => 'Photography and videography equipment',
                'children' => [
                    'DSLR Cameras',
                    'Mirrorless Cameras',
                    'Compact Cameras',
                    'Action Cameras',
                    'Security Cameras',
                    'Camera Accessories',
                ]
            ],
            [
                'name' => 'Smart Devices',
                'description' => 'Smart electronic devices',
                'children' => [
                    'Smartwatches',
                    'Smart Bands',
                    'Wearable Devices',
                    'Smart Home Devices',
                    'Remote Controllers',
                ]
            ],
        ]);

        // Create subcategories for Home Appliances
        $this->createSubcategories($createdRootCategories['home-appliances'], [
            [
                'name' => 'Kitchen Appliances',
                'description' => 'Electrical appliances for kitchen use',
                'children' => [
                    'Rice Cookers',
                    'Electric Stoves',
                    'Microwave Ovens',
                    'Ovens',
                    'Blenders',
                    'Juicers',
                    'Bread Makers',
                    'Electric Kettles',
                ]
            ],
            [
                'name' => 'Home Equipment',
                'description' => 'Electrical appliances for home use',
                'children' => [
                    'Washing Machines',
                    'Dryers',
                    'Refrigerators',
                    'Freezers',
                    'Dishwashers',
                    'Vacuum Cleaners',
                    'Electric Fans',
                ]
            ],
            [
                'name' => 'Climate Control',
                'description' => 'Temperature control devices',
                'children' => [
                    'Air Conditioners',
                    'Heaters',
                    'Mist Sprayers',
                    'Humidifiers',
                    'Dehumidifiers',
                ]
            ],
            [
                'name' => 'Personal Care Appliances',
                'description' => 'Personal care devices',
                'children' => [
                    'Hair Dryers',
                    'Electric Shavers',
                    'Hair Styling Tools',
                    'Facial Cleansers',
                    'Massage Devices',
                ]
            ],
        ]);

        // Create subcategories for Men's Fashion
        $this->createSubcategories($createdRootCategories['mens-fashion'], [
            [
                'name' => 'Men\'s Clothing',
                'description' => 'Clothing for men',
                'children' => [
                    'T-shirts',
                    'Shirts',
                    'Jackets',
                    'Jeans',
                    'Khakis',
                    'Shorts',
                    'Underwear',
                    'Sportswear',
                ]
            ],
            [
                'name' => 'Men\'s Footwear',
                'description' => 'Footwear for men',
                'children' => [
                    'Sneakers',
                    'Dress Shoes',
                    'Loafers',
                    'Sandals & Flip Flops',
                    'Soccer Shoes',
                ]
            ],
            [
                'name' => 'Men\'s Accessories',
                'description' => 'Fashion accessories for men',
                'children' => [
                    'Watches',
                    'Wallets',
                    'Belts',
                    'Hats & Caps',
                    'Sunglasses',
                    'Ties & Bow Ties',
                    'Men\'s Jewelry',
                ]
            ],
            [
                'name' => 'Men\'s Bags',
                'description' => 'Bags for men',
                'children' => [
                    'Crossbody Bags',
                    'Handbags',
                    'Backpacks',
                    'Laptop Bags',
                    'Luggage & Travel Bags',
                ]
            ],
        ]);

        // Create subcategories for Women's Fashion
        $this->createSubcategories($createdRootCategories['womens-fashion'], [
            [
                'name' => 'Women\'s Clothing',
                'description' => 'Clothing for women',
                'children' => [
                    'T-shirts & Tops',
                    'Blouses',
                    'Jackets',
                    'Dresses',
                    'Jeans',
                    'Pants',
                    'Shorts',
                    'Underwear',
                    'Sleepwear',
                    'Sportswear',
                ]
            ],
            [
                'name' => 'Women\'s Footwear',
                'description' => 'Footwear for women',
                'children' => [
                    'Heels',
                    'Flats',
                    'Sneakers',
                    'Ballet Flats',
                    'Sandals & Flip Flops',
                    'Boots',
                ]
            ],
            [
                'name' => 'Women\'s Accessories',
                'description' => 'Fashion accessories for women',
                'children' => [
                    'Watches',
                    'Jewelry',
                    'Sunglasses',
                    'Hats & Caps',
                    'Scarves',
                    'Gloves',
                    'Hair Accessories',
                ]
            ],
            [
                'name' => 'Women\'s Bags',
                'description' => 'Bags for women',
                'children' => [
                    'Handbags',
                    'Crossbody Bags',
                    'Tote Bags',
                    'Women\'s Backpacks',
                    'Clutches',
                    'Travel Bags',
                ]
            ],
        ]);

        // Create subcategories for Beauty
        $this->createSubcategories($createdRootCategories['beauty'], [
            [
                'name' => 'Skincare',
                'description' => 'Facial skincare products',
                'children' => [
                    'Cleansers',
                    'Toners',
                    'Serums',
                    'Moisturizers',
                    'Face Masks',
                    'Makeup Removers',
                    'Sunscreens',
                ]
            ],
            [
                'name' => 'Makeup',
                'description' => 'Makeup products',
                'children' => [
                    'Foundations & Cushions',
                    'Powders',
                    'Lipsticks',
                    'Mascaras',
                    'Eyeshadows',
                    'Eyeliners',
                    'Concealers',
                ]
            ],
            [
                'name' => 'Body Care',
                'description' => 'Body care products',
                'children' => [
                    'Shower Gels',
                    'Body Lotions',
                    'Body Scrubs',
                    'Body Sprays',
                    'Deodorants',
                ]
            ],
            [
                'name' => 'Hair Care',
                'description' => 'Hair care products',
                'children' => [
                    'Shampoos',
                    'Conditioners',
                    'Hair Masks',
                    'Hair Serums',
                    'Hair Dyes',
                ]
            ],
        ]);

        // Create subcategories for Health
        $this->createSubcategories($createdRootCategories['health'], [
            [
                'name' => 'Supplements',
                'description' => 'Dietary supplements',
                'children' => [
                    'Vitamins & Minerals',
                    'Heart Health',
                    'Bone & Joint',
                    'Immune Support',
                    'Digestive Health',
                ]
            ],
            [
                'name' => 'Medical Equipment',
                'description' => 'Medical devices and equipment',
                'children' => [
                    'Blood Pressure Monitors',
                    'Glucose Meters',
                    'Thermometers',
                    'Bandages & Tape',
                    'Medical Masks',
                ]
            ],
            [
                'name' => 'Personal Hygiene',
                'description' => 'Personal hygiene products',
                'children' => [
                    'Toothbrushes & Toothpaste',
                    'Feminine Hygiene',
                    'Sanitary Pads',
                    'Toilet Paper',
                    'Adult Diapers',
                ]
            ],
            [
                'name' => 'Sports & Fitness',
                'description' => 'Sports support products',
                'children' => [
                    'Protein & Muscle Gain',
                    'Support Belts & Braces',
                    'Clean Eating Foods',
                    'Keto Foods',
                ]
            ],
        ]);

        // Create subcategories for Home & Living
        $this->createSubcategories($createdRootCategories['home-living'], [
            [
                'name' => 'Furniture',
                'description' => 'Furniture and decorative items',
                'children' => [
                    'Tables & Chairs',
                    'Beds & Mattresses',
                    'Cabinets & Shelves',
                    'Sofas & Seating',
                    'Decorative Lights',
                    'Paintings & Frames',
                ]
            ],
            [
                'name' => 'Kitchenware',
                'description' => 'Kitchen utensils',
                'children' => [
                    'Pots & Pans',
                    'Knives, Cutting Boards & Tools',
                    'Tableware',
                    'Food Containers',
                    'Tea & Coffee Accessories',
                ]
            ],
            [
                'name' => 'Bathroom Supplies',
                'description' => 'Bathroom items',
                'children' => [
                    'Bath Towels & Face Towels',
                    'Shower Heads & Accessories',
                    'Storage Racks & Shelves',
                    'Shower Curtains',
                    'Bath Mats',
                ]
            ],
            [
                'name' => 'Bedroom Items',
                'description' => 'Bedroom items',
                'children' => [
                    'Bedding Sets',
                    'Curtains',
                    'Night Lights',
                    'Floor Mats',
                ]
            ],
        ]);

        // Create subcategories for Sports & Travel
        $this->createSubcategories($createdRootCategories['sports-travel'], [
            [
                'name' => 'Sports Equipment',
                'description' => 'Sports training equipment',
                'children' => [
                    'Gym Equipment',
                    'Yoga & Pilates',
                    'Soccer',
                    'Basketball',
                    'Tennis & Badminton',
                    'Swimming',
                ]
            ],
            [
                'name' => 'Sports Apparel',
                'description' => 'Sports clothing',
                'children' => [
                    'Sports Shirts',
                    'Sports Pants',
                    'Swimwear',
                    'Sports Shoes',
                    'Sports Socks',
                ]
            ],
            [
                'name' => 'Travel Accessories',
                'description' => 'Travel items',
                'children' => [
                    'Suitcases & Travel Bags',
                    'Backpacks & Crossbody Bags',
                    'Travel Accessories',
                    'Tents & Camping Equipment',
                    'Outdoor Gear',
                ]
            ],
            [
                'name' => 'Bicycles & Accessories',
                'description' => 'Bicycles and related accessories',
                'children' => [
                    'Bicycles',
                    'Helmets',
                    'Bicycle Accessories',
                    'Replacement Parts',
                    'Protective Gear',
                ]
            ],
        ]);
    }

    /**
     * Create subcategories (level 1) and child categories (level 2)
     */
    private function createSubcategories($parentCategory, $subcategories, $level = 1): void
    {
        $position = 1;
        foreach ($subcategories as $subcategory) {
            // Create unique slug by combining with parent category slug
            $slug = Str::slug($parentCategory->slug . '-' . $subcategory['name']);
            
            $newCategory = Catalogue::create([
                'name' => $subcategory['name'],
                'slug' => $slug,
                'description' => $subcategory['description'],
                'parent_id' => $parentCategory->id,
                'level' => $level,
                'position' => $position,
                'is_active' => true,
                'meta_title' => $subcategory['name'] . ' - Genuine Products',
                'meta_description' => 'Shop for genuine ' . $subcategory['name'] . ' at the best prices',
            ]);
            
            $position++;
            
            // Create level 2 categories if available
            if (isset($subcategory['children']) && is_array($subcategory['children'])) {
                $childPosition = 1;
                foreach ($subcategory['children'] as $childName) {
                    // Create unique slug for level 2 by combining with level 1 slug
                    $childSlug = Str::slug($newCategory->slug . '-' . $childName);
                    
                    Catalogue::create([
                        'name' => $childName,
                        'slug' => $childSlug,
                        'description' => $childName . ' category',
                        'parent_id' => $newCategory->id,
                        'level' => $level + 1,
                        'position' => $childPosition,
                        'is_active' => true,
                        'meta_title' => $childName . ' - Genuine Products',
                        'meta_description' => 'Shop for genuine ' . $childName . ' at the best prices',
                    ]);
                    
                    $childPosition++;
                }
            }
        }
    }
}
