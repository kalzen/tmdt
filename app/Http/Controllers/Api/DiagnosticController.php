<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

class DiagnosticController extends Controller
{
    /**
     * Get a list of all registered API routes
     *
     * @return \Illuminate\Http\Response
     */
    public function routes()
    {
        $routes = collect(Route::getRoutes())->map(function ($route) {
            return [
                'domain' => $route->getDomain(),
                'method' => implode('|', $route->methods()),
                'uri' => $route->uri(),
                'name' => $route->getName(),
                'action' => $route->getActionName(),
                'middleware' => implode(', ', $route->middleware()),
            ];
        })->filter(function ($route) {
            return strpos($route['uri'], 'api') === 0;
        });

        return response()->json([
            'count' => $routes->count(),
            'routes' => $routes->values()->all()
        ]);
    }

    /**
     * Simple API test endpoint
     *
     * @return \Illuminate\Http\Response
     */
    public function ping()
    {
        return response()->json([
            'status' => 'success',
            'message' => 'API is working!',
            'timestamp' => now()->toIso8601String()
        ]);
    }
}
