<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Artisan;

class ClearAllCache extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'cache:clear-all';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Clear all cache including config, route, view, and application cache';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('Clearing all cache...');
        
        // Clear route cache
        $this->info('Clearing route cache...');
        Artisan::call('route:clear');
        $this->info('Route cache cleared!');
        
        // Clear configuration cache
        $this->info('Clearing config cache...');
        Artisan::call('config:clear');
        $this->info('Config cache cleared!');
        
        // Clear application cache
        $this->info('Clearing application cache...');
        Artisan::call('cache:clear');
        $this->info('Application cache cleared!');
        
        // Clear compiled views
        $this->info('Clearing view cache...');
        Artisan::call('view:clear');
        $this->info('Compiled views cleared!');
        
        // Optimize clear (Laravel 7+)
        $this->info('Clearing optimized files...');
        Artisan::call('optimize:clear');
        $this->info('Optimized files cleared!');
        
        $this->info('All cache cleared successfully!');
        
        return Command::SUCCESS;
    }
}
