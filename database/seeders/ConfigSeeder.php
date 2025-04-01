<?php

namespace Database\Seeders;

use App\Models\Config;
use Illuminate\Database\Seeder;

class ConfigSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Thông tin website
        Config::create([
            'name' => 'site_title',
            'title' => 'Tiêu đề Website',
            'value' => 'Website Của Tôi',
            'type' => 'string',
            'description' => 'Tiêu đề website hiển thị trên tab trình duyệt và SEO'
        ]);

        Config::create([
            'name' => 'site_description',
            'title' => 'Mô tả Website',
            'value' => 'Đây là mô tả cho website của tôi',
            'type' => 'text',
            'description' => 'Mô tả ngắn về website'
        ]);

        Config::create([
            'name' => 'site_keywords',
            'title' => 'Từ khóa SEO',
            'value' => 'website, laravel, dịch vụ',
            'type' => 'text',
            'description' => 'Các từ khóa SEO cho website'
        ]);

        // Logo, Favicon và Thumbnail sẽ được xử lý bởi media collections
        Config::create([
            'name' => 'logo_path',
            'title' => 'Logo Website',
            'value' => '',
            'type' => 'string',
            'description' => 'Đường dẫn đến logo website'
        ]);

        Config::create([
            'name' => 'favicon_path',
            'title' => 'Favicon Website',
            'value' => '',
            'type' => 'string',
            'description' => 'Đường dẫn đến favicon website'
        ]);

        Config::create([
            'name' => 'thumbnail_path',
            'title' => 'Hình thu nhỏ Website',
            'value' => '',
            'type' => 'string',
            'description' => 'Đường dẫn đến hình thu nhỏ/ảnh og website'
        ]);

        // Thông tin liên hệ
        Config::create([
            'name' => 'contact_email',
            'title' => 'Email Liên hệ',
            'value' => 'info@example.com',
            'type' => 'string',
            'description' => 'Email liên hệ chính'
        ]);

        Config::create([
            'name' => 'contact_phone',
            'title' => 'Số Điện Thoại Liên Hệ',
            'value' => '0123456789',
            'type' => 'string',
            'description' => 'Số điện thoại liên hệ chính'
        ]);

        Config::create([
            'name' => 'contact_address',
            'title' => 'Địa Chỉ Doanh Nghiệp',
            'value' => '123 Đường ABC, Quận/Huyện, Tỉnh/Thành phố',
            'type' => 'text',
            'description' => 'Địa chỉ văn phòng'
        ]);

        // Mạng xã hội
        Config::create([
            'name' => 'facebook_url',
            'title' => 'Trang Facebook',
            'value' => 'https://facebook.com/mywebsite',
            'type' => 'string',
            'description' => 'Đường dẫn trang Facebook'
        ]);

        Config::create([
            'name' => 'instagram_url',
            'title' => 'Trang Instagram',
            'value' => 'https://instagram.com/mywebsite',
            'type' => 'string',
            'description' => 'Đường dẫn trang Instagram'
        ]);

        Config::create([
            'name' => 'twitter_url',
            'title' => 'Trang Twitter',
            'value' => 'https://twitter.com/mywebsite',
            'type' => 'string',
            'description' => 'Đường dẫn trang Twitter'
        ]);

        Config::create([
            'name' => 'linkedin_url',
            'title' => 'Trang LinkedIn',
            'value' => 'https://linkedin.com/company/mywebsite',
            'type' => 'string',
            'description' => 'Đường dẫn trang LinkedIn công ty'
        ]);

        // Thông tin pháp lý
        Config::create([
            'name' => 'privacy_policy',
            'title' => 'Chính Sách Bảo Mật',
            'value' => 'Nội dung chính sách bảo mật của chúng tôi.',
            'type' => 'text',
            'description' => 'Nội dung chính sách bảo mật'
        ]);

        Config::create([
            'name' => 'terms_of_service',
            'title' => 'Điều Khoản Dịch Vụ',
            'value' => 'Nội dung điều khoản dịch vụ của chúng tôi.',
            'type' => 'text',
            'description' => 'Nội dung điều khoản dịch vụ'
        ]);

        Config::create([
            'name' => 'copyright_text',
            'title' => 'Văn Bản Bản Quyền',
            'value' => '© ' . date('Y') . ' Website Của Tôi. Đã đăng ký bản quyền.',
            'type' => 'string',
            'description' => 'Văn bản bản quyền hiển thị ở footer'
        ]);

        // Cài đặt bổ sung
        Config::create([
            'name' => 'google_analytics_id',
            'title' => 'ID Google Analytics',
            'value' => 'UA-XXXXXXXXX-X',
            'type' => 'string',
            'description' => 'ID theo dõi Google Analytics'
        ]);

        Config::create([
            'name' => 'site_maintenance_mode',
            'title' => 'Chế Độ Bảo Trì',
            'value' => '0',
            'type' => 'boolean',
            'description' => 'Bật chế độ bảo trì (0 = tắt, 1 = bật)'
        ]);
    }
}
