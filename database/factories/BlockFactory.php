<?php

namespace Database\Factories;

use App\Models\Block;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class BlockFactory extends Factory
{
    protected $model = Block::class;

    public function definition(): array
    {
        $name = $this->faker->unique()->words(3, true);
        $locations = ['header', 'home-top', 'home-middle', 'home-bottom', 'sidebar', 'footer'];
        
        return [
            'name' => $name,
            'slug' => Str::slug($name),
            'location' => $this->faker->randomElement($locations),
            'description' => $this->faker->paragraph(),
            'is_active' => $this->faker->boolean(80), // 80% chance of being active
            'sort_order' => $this->faker->numberBetween(0, 100),
        ];
    }
}
