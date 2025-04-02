<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\App;
use Inertia\Inertia;
use Illuminate\Support\Facades\File;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Đảm bảo thư mục lang tồn tại
        $langPath = lang_path();
        if (!File::exists($langPath)) {
            File::makeDirectory($langPath, 0755, true);
        }
        
        // Đảm bảo thư mục lang cho từng ngôn ngữ tồn tại
        foreach (['en', 'vi'] as $locale) {
            $localePath = lang_path($locale);
            if (!File::exists($localePath)) {
                File::makeDirectory($localePath, 0755, true);
            }
        }

        // Add locale and translations to Inertia shared data
        Inertia::share([
            'locale' => function () {
                return App::getLocale();
            },
            'translations' => function () {
                $locale = App::getLocale();
                
                // Khởi tạo mảng rỗng để lưu trữ bản dịch
                $translations = [];
                
                // Đường dẫn đến file bản dịch
                $translationFile = lang_path("{$locale}/admin.php");
                
                if (file_exists($translationFile)) {
                    $adminTranslations = require $translationFile;
                    
                    // Thêm tiền tố 'admin.' cho tất cả các khóa
                    foreach ($adminTranslations as $key => $value) {
                        $translations["admin.{$key}"] = $value;
                    }
                }
                
                // Trả về object rỗng nếu không có bản dịch để tránh lỗi
                return $translations ?: (object) [];
            },
        ]);
    }
}
