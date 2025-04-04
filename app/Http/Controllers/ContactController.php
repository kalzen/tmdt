<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use App\Models\Config;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Inertia\Inertia;

class ContactController extends Controller
{
    protected $configs;
    
    public function __construct()
    {
        $this->configs = Cache::remember('site_configs', 60 * 24, function () {
            $configRecords = Config::all();
            $configs = [];
            foreach ($configRecords as $config) {
                $configs[$config->name] = $config->getTypedValue();
            }
            return $configs;
        });
    }

    /**
     * Display the contact page
     */
    public function index()
    {
        $contactInfo = [
            'address' => $this->configs['contact_address'] ?? '123 Example Street',
            'phone' => $this->configs['contact_phone'] ?? '+1 234 567 890',
            'email' => $this->configs['contact_email'] ?? 'contact@example.com',
            'hours' => $this->configs['contact_hours'] ?? 'Mon - Fri, 9:00 AM - 5:00 PM',
            'map' => [
                'lat' => (float)($this->configs['contact_map_lat'] ?? '40.7128'),
                'lng' => (float)($this->configs['contact_map_lng'] ?? '-74.0060'),
                'zoom' => (int)($this->configs['contact_map_zoom'] ?? 13),
            ],
            'googleMapsApiKey' => config('services.google.maps_api_key', '')
        ];

        return Inertia::render('Frontend/Pages/Contact', [
            'title' => 'Contact Us',
            'description' => 'Get in touch with our team',
            'contactInfo' => $contactInfo
        ]);
    }

    /**
     * Handle contact form submission
     */
    public function submit(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'nullable|string|max:20',
            'subject' => 'required|string|max:255',
            'message' => 'required|string',
        ]);

        try {
            Contact::create([
                ...$validated,
                'ip_address' => $request->ip(),
                'status' => 'new'
            ]);

            return back()->with('success', 'Thank you for your message. We will get back to you soon!');
        } catch (\Exception $e) {
            return back()->with('error', 'Sorry, there was an error sending your message. Please try again later.');
        }
    }
}
