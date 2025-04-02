<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create admin user
        User::factory()->create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
            'is_admin' => true,
        ]);

        // Call seeders in the correct order
        $this->call([
            CatalogueSeeder::class,
            SliderSeeder::class,
            StoreSeeder::class,
            AttributeSeeder::class, // Add the attribute seeder
        ]);
    }   
}

