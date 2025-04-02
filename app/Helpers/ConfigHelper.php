<?php

namespace App\Helpers;

use App\Models\Config;
use Illuminate\Support\Facades\Cache;

class ConfigHelper
{
    /**
     * Get config value by key
     *
     * @param string $key
     * @param mixed $default
     * @return mixed
     */
    public static function get($key, $default = null)
    {
        // Cache config values for 60 minutes to avoid hitting database on every request
        $cacheKey = 'config_' . $key;
        
        return Cache::remember($cacheKey, 60 * 60, function () use ($key, $default) {
            $config = Config::where('name', $key)->first();
            return $config ? $config->value : $default;
        });
    }

    /**
     * Get multiple config values
     *
     * @param array $keys
     * @return array
     */
    public static function getMany(array $keys)
    {
        $values = [];
        foreach ($keys as $key) {
            $values[$key] = self::get($key);
        }
        return $values;
    }

    /**
     * Get site info for meta tags
     *
     * @return array
     */
    public static function getSiteInfo()
    {
        return self::getMany([
            'site_title',
            'site_description',
            'site_keywords',
            'logo_path',
            'favicon_path',
            'thumbnail_path'
        ]);
    }

    public static function getMedia(string $name, string $collection, $default = null)
    {
        $configs = Cache::rememberForever('site-configs', function () {
            return Config::all()->keyBy('name');
        });

        if (isset($configs[$name])) {
            return $configs[$name]->getFirstMediaUrl($collection) ?: $default;
        }

        return $default;
    }

    public static function all()
    {
        return Cache::rememberForever('site-configs', function () {
            return Config::all()->keyBy('name');
        });
    }

    public static function clearCache()
    {
        Cache::forget('site-configs');
    }
}
