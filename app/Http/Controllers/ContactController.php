<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Contact;
use Illuminate\Support\Facades\Mail;
use App\Mail\ContactFormSubmitted;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\View;
use Illuminate\Support\Facades\Cache;

class ContactController extends Controller
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
    /**
     * Display the contact page
     *
     * @return \Illuminate\View\View
     */
    public function index()
    {
        return view('contact.index');
    }

    /**
     * Handle contact form submission
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function submit(Request $request)
    {
        // Validate form data
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'nullable|string|max:20',
            'subject' => 'required|string|max:255',
            'message' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            // Save contact to database
            $contact = Contact::create([
                'name' => $request->name,
                'email' => $request->email,
                'phone' => $request->phone,
                'subject' => $request->subject,
                'message' => $request->message,
                'ip_address' => $request->ip(),
                'status' => 'new'
            ]);

            // Optional: Send email notification
            // Mail::to(config('mail.admin_email'))->send(new ContactFormSubmitted($contact));

            return response()->json([
                'success' => true,
                'message' => 'Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất có thể.'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Có lỗi xảy ra. Vui lòng thử lại sau.'
            ], 500);
        }
    }
}
