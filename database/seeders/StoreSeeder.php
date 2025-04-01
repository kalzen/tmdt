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
        // Tạo 10 gian hàng mẫu
        $users = User::factory(10)->create();
        
        foreach ($users as $user) {
            $store = Store::create([
                'name' => $user->name . ' Store',
                'slug' => Str::slug($user->name . ' Store'),
                'description' => 'Gian hàng chính thức của ' . $user->name,
                'address' => 'Số 123 Đường ABC, Quận XYZ, Thành phố HCM',
                'phone' => '0987654321',
                'email' => $user->email,
                'website' => 'https://www.' . Str::slug($user->name) . '.com',
                'primary_color' => '#3490dc',
                'secondary_color' => '#38c172',
                'about_us' => 'Chúng tôi là nhà cung cấp sản phẩm chất lượng cao với giá cả hợp lý. Với nhiều năm kinh nghiệm trong ngành, chúng tôi cam kết mang đến cho khách hàng những sản phẩm tốt nhất.',
                'founding_year' => rand(2000, 2022),
                'employee_count' => rand(5, 200),
                'is_active' => true,
                'is_verified' => rand(0, 1) == 1,
                'user_id' => $user->id,
                'meta_title' => $user->name . ' Store - Cửa hàng chính thức',
                'meta_description' => 'Mua sắm sản phẩm chất lượng tại ' . $user->name . ' Store với giá ưu đãi và dịch vụ tốt nhất.',
            ]);
            
            // Thêm một số danh mục ngẫu nhiên cho gian hàng
            $catalogues = Catalogue::inRandomOrder()->limit(rand(3, 5))->get();
            $store->mainCategories()->attach($catalogues->pluck('id')->toArray());
        }
    }
}
