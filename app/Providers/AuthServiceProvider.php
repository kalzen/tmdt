<?php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The model to policy mappings for the application.
     *
     * @var array
     */
    protected $policies = [
        // ...existing policies...
        \App\Models\ActivityLog::class => \App\Policies\ActivityLogPolicy::class,
    ];

    /**
     * Register any authentication / authorization services.
     */
    public function boot(): void
    {
        // ...existing code...
        
        // Define a gate for viewing activity logs
        Gate::define('view_activity_logs', fn ($user) => $user->is_admin);
    }
}