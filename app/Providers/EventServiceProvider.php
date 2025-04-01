<?php

namespace App\Providers;

use Illuminate\Auth\Events\Login;
use Illuminate\Auth\Events\Logout;
use Illuminate\Auth\Events\Failed;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;
use App\Services\ActivityLogService;
use Illuminate\Support\Facades\Event;

class EventServiceProvider extends ServiceProvider
{
    /**
     * The event listener mappings for the application.
     *
     * @var array
     */
    protected $listen = [
        'App\Events\SomeEvent' => [
            'App\Listeners\EventListener',
        ],
    ];

    /**
     * Register any events for your application.
     */
    public function boot(): void
    {
        parent::boot();

        // Ghi log khi người dùng đăng nhập
        Event::listen(Login::class, function ($event) {
            $this->app->make(ActivityLogService::class)->log(
                'login',
                $event->user,
                null,
                null,
                'Đăng nhập thành công'
            );
        });
        
        // Ghi log khi người dùng đăng xuất
        Event::listen(Logout::class, function ($event) {
            $this->app->make(ActivityLogService::class)->log(
                'logout',
                $event->user,
                null,
                null,
                'Đăng xuất thành công'
            );
        });
        
        // Ghi log khi đăng nhập thất bại
        Event::listen(Failed::class, function ($event) {
            if ($event->user) {
                $this->app->make(ActivityLogService::class)->log(
                    'login_failed',
                    $event->user,
                    null,
                    null,
                    'Đăng nhập thất bại'
                );
            }
        });
    }
}