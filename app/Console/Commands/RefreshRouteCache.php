<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Artisan;

class RefreshRouteCache extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'route:refresh';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Clear route cache and then cache routes again';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('Clearing route cache...');
        Artisan::call('route:clear');
        $this->info('Route cache cleared!');

        $this->info('Optimizing routes...');
        Artisan::call('optimize');
        $this->info('Routes optimized!');

        $this->info('All done! Your routes have been refreshed.');
        
        return 0;
    }
}
