<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AdminMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        // Check if user is authenticated and has admin privileges
        if (!Auth::check() || !Auth::user()->is_admin) {
            // If not admin, redirect to dashboard with error message
            return redirect()->route('dashboard')->with('error', 'You do not have permission to access this area.');
        }

        return $next($request);
    }
}
