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
        // Tạo slider trang chủ
        $homeSlider = Slider::create([
            'name' => 'Trang chủ',
            'slug' => 'trang-chu',
            'description' => 'Slider hiển thị trên trang chủ website',
            'is_active' => true
        ]);

        // Tạo các item cho slider trang chủ
        for ($i = 1; $i <= 3; $i++) {
            SliderItem::create([
                'slider_id' => $homeSlider->id,
                'title' => 'Slide ' . $i . ' - Tiêu đề mẫu',
                'description' => 'Mô tả ngắn về slide ' . $i,
                'button_text' => 'Khám phá ngay',
                'button_url' => '/products',
                'sort_order' => $i,
                'is_active' => true
            ]);
        }

        // Tạo thêm slider khác nếu cần
        $aboutSlider = Slider::create([
            'name' => 'Giới thiệu',
            'slug' => 'gioi-thieu',
            'description' => 'Slider hiển thị trên trang giới thiệu',
            'is_active' => true
        ]);

        // Tạo các item cho slider giới thiệu
        for ($i = 1; $i <= 2; $i++) {
            SliderItem::create([
                'slider_id' => $aboutSlider->id,
                'title' => 'Giới thiệu ' . $i,
                'description' => 'Thông tin giới thiệu ' . $i,
                'button_text' => 'Liên hệ',
                'button_url' => '/contact',
                'sort_order' => $i,
                'is_active' => true
            ]);
        }
    }
}
