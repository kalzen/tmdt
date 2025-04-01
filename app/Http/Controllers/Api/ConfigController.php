<?php

namespace App\Http\Controllers\Api;

use App\Models\Config;
use App\Http\Resources\ConfigResource;
use Illuminate\Support\Collection;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Cache;

class ConfigController extends ApiController
{
    /**
     * Get all public configs or configs by group.
     * 
     * @param Request $request
     * @return JsonResponse
     */
    public function index(Request $request): JsonResponse
    {
        $group = $request->input('group');
        
        // Try to get from cache first
        $cacheKey = $group ? "configs_group_{$group}" : 'configs_public';
        
        $configs = Cache::remember($cacheKey, now()->addHours(24), function () use ($group) {
            $query = Config::query();
            
            // Filter by group if provided
            if ($group) {
                $query->where('group', $group);
            } 
            
            return $query->get()->mapWithKeys(function ($config) {
                $value = $config->type === 'image' 
                    ? $config->getFirstMediaUrl('thumbnail') 
                    : $config->getTypedValue();
                    
                return [$config->name => $value];
            });
        });
        
        return $this->sendResponse($configs);
    }
    
    /**
     * Get site settings for public display.
     * 
     * @return JsonResponse
     */
    public function siteSettings(): JsonResponse
    {
        $settings = Cache::remember('site_settings', now()->addHours(24), function () {
            $configs = Config::whereIn('name', [
                'site_title', 
                'site_description', 
                'site_logo', 
                'site_favicon',
                'contact_email',
                'contact_phone',
                'contact_address',
                'social_facebook',
                'social_twitter',
                'social_instagram',
                'footer_text',
            ])->get();
            
            return $configs->mapWithKeys(function ($config) {
                $value = $config->name === 'site_logo' || $config->name === 'site_favicon'
                    ? $config->getFirstMediaUrl($config->name === 'site_logo' ? 'logo' : 'favicon')
                    : $config->getTypedValue();
                    
                return [$config->name => $value];
            });
        });
        
        return $this->sendResponse($settings);
    }
}
