<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Attribute;
use App\Models\AttributeValue;

class AttributeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Common attributes found in major e-commerce platforms
        $attributes = [
            // Basic attributes
            [
                'name' => 'Color',
                'code' => 'color',
                'type' => 'select',
                'is_filterable' => true,
                'is_required' => false,
                'display_order' => 1,
                'is_active' => true,
                'values' => [
                    ['value' => 'Black', 'color_code' => '#000000'],
                    ['value' => 'White', 'color_code' => '#FFFFFF'],
                    ['value' => 'Red', 'color_code' => '#FF0000'],
                    ['value' => 'Blue', 'color_code' => '#0000FF'],
                    ['value' => 'Green', 'color_code' => '#008000'],
                    ['value' => 'Yellow', 'color_code' => '#FFFF00'],
                    ['value' => 'Pink', 'color_code' => '#FFC0CB'],
                    ['value' => 'Purple', 'color_code' => '#800080'],
                    ['value' => 'Orange', 'color_code' => '#FFA500'],
                    ['value' => 'Brown', 'color_code' => '#A52A2A'],
                    ['value' => 'Grey', 'color_code' => '#808080'],
                    ['value' => 'Silver', 'color_code' => '#C0C0C0'],
                    ['value' => 'Gold', 'color_code' => '#FFD700'],
                ]
            ],
            [
                'name' => 'Size',
                'code' => 'size',
                'type' => 'select',
                'is_filterable' => true,
                'is_required' => false,
                'display_order' => 2,
                'is_active' => true,
                'values' => [
                    ['value' => 'XS'],
                    ['value' => 'S'],
                    ['value' => 'M'],
                    ['value' => 'L'],
                    ['value' => 'XL'],
                    ['value' => 'XXL'],
                    ['value' => '3XL'],
                ]
            ],
            [
                'name' => 'Material',
                'code' => 'material',
                'type' => 'select',
                'is_filterable' => true,
                'is_required' => false,
                'display_order' => 3,
                'is_active' => true,
                'values' => [
                    ['value' => 'Cotton'],
                    ['value' => 'Polyester'],
                    ['value' => 'Wool'],
                    ['value' => 'Nylon'],
                    ['value' => 'Leather'],
                    ['value' => 'Silk'],
                    ['value' => 'Denim'],
                    ['value' => 'Canvas'],
                    ['value' => 'Linen'],
                    ['value' => 'Plastic'],
                    ['value' => 'Metal'],
                    ['value' => 'Wood'],
                    ['value' => 'Glass'],
                ]
            ],
            [
                'name' => 'Brand',
                'code' => 'brand',
                'type' => 'select',
                'is_filterable' => true,
                'is_required' => false,
                'display_order' => 4,
                'is_active' => true,
                'values' => [
                    ['value' => 'Apple'],
                    ['value' => 'Samsung'],
                    ['value' => 'Sony'],
                    ['value' => 'LG'],
                    ['value' => 'Nike'],
                    ['value' => 'Adidas'],
                    ['value' => 'Puma'],
                    ['value' => 'H&M'],
                    ['value' => 'Zara'],
                    ['value' => 'Dell'],
                    ['value' => 'HP'],
                    ['value' => 'Lenovo'],
                ]
            ],
            [
                'name' => 'Warranty',
                'code' => 'warranty',
                'type' => 'select',
                'is_filterable' => true,
                'is_required' => false,
                'display_order' => 5,
                'is_active' => true,
                'values' => [
                    ['value' => '6 Months'],
                    ['value' => '1 Year'],
                    ['value' => '2 Years'],
                    ['value' => '3 Years'],
                    ['value' => '5 Years'],
                    ['value' => 'Lifetime'],
                ]
            ],
            
            // Electronics specific
            [
                'name' => 'Storage Capacity',
                'code' => 'storage_capacity',
                'type' => 'select',
                'is_filterable' => true,
                'is_required' => false,
                'display_order' => 6,
                'is_active' => true,
                'values' => [
                    ['value' => '16GB'],
                    ['value' => '32GB'],
                    ['value' => '64GB'],
                    ['value' => '128GB'],
                    ['value' => '256GB'],
                    ['value' => '512GB'],
                    ['value' => '1TB'],
                    ['value' => '2TB'],
                ]
            ],
            [
                'name' => 'Screen Size',
                'code' => 'screen_size',
                'type' => 'select',
                'is_filterable' => true,
                'is_required' => false,
                'display_order' => 7,
                'is_active' => true,
                'values' => [
                    ['value' => '5 inches'],
                    ['value' => '6 inches'],
                    ['value' => '6.5 inches'],
                    ['value' => '7 inches'],
                    ['value' => '10 inches'],
                    ['value' => '13 inches'],
                    ['value' => '15 inches'],
                    ['value' => '17 inches'],
                    ['value' => '24 inches'],
                    ['value' => '27 inches'],
                    ['value' => '32 inches'],
                    ['value' => '43 inches'],
                    ['value' => '50 inches'],
                    ['value' => '55 inches'],
                    ['value' => '65 inches'],
                    ['value' => '75 inches'],
                ]
            ],
            [
                'name' => 'RAM',
                'code' => 'ram',
                'type' => 'select',
                'is_filterable' => true,
                'is_required' => false,
                'display_order' => 8,
                'is_active' => true,
                'values' => [
                    ['value' => '2GB'],
                    ['value' => '4GB'],
                    ['value' => '8GB'],
                    ['value' => '16GB'],
                    ['value' => '32GB'],
                    ['value' => '64GB'],
                ]
            ],
            [
                'name' => 'Processor',
                'code' => 'processor',
                'type' => 'select',
                'is_filterable' => true,
                'is_required' => false,
                'display_order' => 9,
                'is_active' => true,
                'values' => [
                    ['value' => 'Intel Core i3'],
                    ['value' => 'Intel Core i5'],
                    ['value' => 'Intel Core i7'],
                    ['value' => 'Intel Core i9'],
                    ['value' => 'AMD Ryzen 3'],
                    ['value' => 'AMD Ryzen 5'],
                    ['value' => 'AMD Ryzen 7'],
                    ['value' => 'AMD Ryzen 9'],
                    ['value' => 'Apple M1'],
                    ['value' => 'Apple M2'],
                    ['value' => 'Apple M2 Pro'],
                    ['value' => 'Apple M2 Max'],
                ]
            ],
            
            // Clothing specific
            [
                'name' => 'Gender',
                'code' => 'gender',
                'type' => 'select',
                'is_filterable' => true,
                'is_required' => false,
                'display_order' => 10,
                'is_active' => true,
                'values' => [
                    ['value' => 'Men'],
                    ['value' => 'Women'],
                    ['value' => 'Unisex'],
                    ['value' => 'Boys'],
                    ['value' => 'Girls'],
                ]
            ],
            [
                'name' => 'Season',
                'code' => 'season',
                'type' => 'multiselect',
                'is_filterable' => true,
                'is_required' => false,
                'display_order' => 11,
                'is_active' => true,
                'values' => [
                    ['value' => 'Spring'],
                    ['value' => 'Summer'],
                    ['value' => 'Fall'],
                    ['value' => 'Winter'],
                    ['value' => 'All Season'],
                ]
            ],
            
            // Text-based attributes
            [
                'name' => 'Dimensions',
                'code' => 'dimensions',
                'type' => 'text',
                'is_filterable' => false,
                'is_required' => false,
                'display_order' => 12,
                'is_active' => true
            ],
            [
                'name' => 'Weight',
                'code' => 'weight',
                'type' => 'text',
                'is_filterable' => false,
                'is_required' => false,
                'display_order' => 13,
                'is_active' => true
            ],
            [
                'name' => 'Technical Specifications',
                'code' => 'technical_specs',
                'type' => 'textarea',
                'is_filterable' => false,
                'is_required' => false,
                'display_order' => 14,
                'is_active' => true
            ],
        ];
        
        foreach ($attributes as $attributeData) {
            $values = $attributeData['values'] ?? [];
            unset($attributeData['values']);
            
            // Create attribute
            $attribute = Attribute::create($attributeData);
            
            // Create attribute values if any
            if (!empty($values)) {
                foreach ($values as $valueData) {
                    $attribute->values()->create($valueData);
                }
            }
        }
    }
}
