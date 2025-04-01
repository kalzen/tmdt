<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Config;
use App\Models\Slider;
use App\Models\Post; // Added import for Post model
use Illuminate\Support\Facades\View;
use Illuminate\Support\Facades\Cache;

class FrontendController extends Controller
{
    protected $configs;
    
    public function __construct()
    {
        // Use caching to improve performance
        $this->configs = Cache::remember('site_configs', 60 * 24, function () {
            // Fetch all configs from database
            $configRecords = Config::all();
            
            // Convert to a more usable format (key => value)
            $configs = [];
            foreach ($configRecords as $config) {
                $configs[$config->name] = $config->getTypedValue();
                
                // If this config has media, add it to the configs array
                if ($config->hasMedia('logo')) {
                    $configs[$config->name . '_logo'] = $config->getFirstMediaUrl('logo');
                }
                if ($config->hasMedia('favicon')) {
                    $configs[$config->name . '_favicon'] = $config->getFirstMediaUrl('favicon');
                }
                if ($config->hasMedia('thumbnail')) {
                    $configs[$config->name . '_thumbnail'] = $config->getFirstMediaUrl('thumbnail');
                }
            }
            
            return $configs;
        });
        
        // Share configs with all views
        View::share('configs', $this->configs);
        
        // Create a helper function to get config values and share it with all views
        View::composer('*', function($view) {
            $view->with('getConfig', function($key, $default = null) {
                return isset($this->configs[$key]) ? $this->configs[$key] : $default;
            });
        });
    }

    public function index()
    {
        // Get the main homepage slider with slug 'trang-chu'
        $homeSlider = Slider::active()
                    ->bySlug('trang-chu')
                    ->with(['activeItems' => function($query) {
                        $query->orderBy('sort_order', 'asc');
                    }])
                    ->first();
        
        // Get the 3 latest posts - fixed to use is_published instead of is_active
        $latestPosts = Post::latest()
                    ->where('is_published', true)
                    ->take(3)
                    ->get();
        
        return view('home.index', compact('homeSlider', 'latestPosts'));
    }

    /**
     * Show the details of a specific post
     *
     * @param string $slug
     * @return \Illuminate\View\View
     */
    public function showPost($slug)
    {
        // Find the post by slug
        $post = Post::where('slug', $slug)
                    ->where('is_published', true)
                    ->firstOrFail();
        
        // Increment view count
        $post->incrementViews();
        
        // Get related posts (posts in the same categories)
        $relatedPosts = Post::where('id', '!=', $post->id)
                            ->where('is_published', true)
                            ->whereHas('categories', function ($query) use ($post) {
                                $query->whereIn('categories.id', $post->categories->pluck('id'));
                            })
                            ->take(3)
                            ->get();
        
        return view('post.detail', compact('post', 'relatedPosts'));
    }
}
