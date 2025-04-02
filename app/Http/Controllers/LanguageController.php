<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;

class LanguageController extends Controller
{
    /**
     * Switch the application's locale.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  string  $locale
     * @return \Illuminate\Http\RedirectResponse
     */
    public function switch(Request $request, $locale)
    {
        // Validate locale
        if (!in_array($locale, ['en', 'vi'])) {
            $locale = config('app.locale', 'en');
        }
        
        // Store locale in session
        Session::put('locale', $locale);
        
        // Redirect back with a toast notification
        return redirect()->back()->with([
            'toast' => true,
            'toast.type' => 'success',
            'toast.message' => $locale == 'en' ? 'Language switched to English' : 'Đã chuyển ngôn ngữ sang Tiếng Việt',
        ]);
    }
}
