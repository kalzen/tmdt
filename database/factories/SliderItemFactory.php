<?php

namespace Database\Factories;

use App\Models\SliderItem;
use App\Models\Slider;
use Illuminate\Database\Eloquent\Factories\Factory;

class SliderItemFactory extends Factory
{
    protected $model = SliderItem::class;

    public function definition(): array
    {
        return [
            'slider_id' => Slider::factory(),
            'title' => $this->faker->sentence(),
            'description' => $this->faker->paragraph(),
            'button_text' => $this->faker->randomElement([null, 'Xem thêm', 'Chi tiết', 'Mua ngay']),
            'button_url' => $this->faker->randomElement([null, '/', '/products', '/contact']),
            'sort_order' => $this->faker->numberBetween(0, 100),
            'is_active' => true,
        ];
    }
}
