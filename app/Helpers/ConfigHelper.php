<?php

namespace App\Helpers;

use App\Models\Config;
use Illuminate\Support\Facades\Cache;

class ConfigHelper
{
    public static function get(string $name, $default = null)
    {
        // Try to get from cache first
        $configs = Cache::rememberForever('site-configs', function () {
            return Config::all()->keyBy('name');
        });

        if (isset($configs[$name])) {
            return $configs[$name]->getTypedValue();
        }

        return $default;
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
