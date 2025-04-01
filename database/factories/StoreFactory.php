<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Store>
 */
class StoreFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $name = $this->faker->company();
        
        return [
            'name' => $name,
            'slug' => Str::slug($name),
            'description' => $this->faker->paragraph(),
            'address' => $this->faker->address(),
            'phone' => $this->faker->phoneNumber(),
            'email' => $this->faker->companyEmail(),
            'website' => $this->faker->url(),
            'primary_color' => $this->faker->hexColor(),
            'secondary_color' => $this->faker->hexColor(),
            'about_us' => $this->faker->paragraphs(3, true),
            'founding_year' => $this->faker->year(),
            'employee_count' => $this->faker->numberBetween(1, 1000),
            'is_active' => true,
            'is_verified' => $this->faker->boolean(70),
            'user_id' => User::factory(),
            'meta_title' => $name,
            'meta_description' => $this->faker->sentence(),
        ];
    }
}
