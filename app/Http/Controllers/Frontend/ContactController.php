<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Models\Contact;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ContactController extends Controller
{
    public function index()
    {
        return Inertia::render('frontend/pages/contact', [
            'title' => 'Contact Us',
            'description' => 'Get in touch with our team',
            'contactInfo' => [
                'address' => '123 Business Street, Suite 100, City, Country',
                'email' => 'contact@example.com',
                'phone' => '+1 (555) 123-4567',
                'hours' => [
                    'Monday - Friday' => '9:00 AM - 6:00 PM',
                    'Saturday' => '10:00 AM - 4:00 PM',
                    'Sunday' => 'Closed'
                ]
            ],
            'socialMedia' => [
                'facebook' => 'https://facebook.com/example',
                'twitter' => 'https://twitter.com/example',
                'instagram' => 'https://instagram.com/example',
                'linkedin' => 'https://linkedin.com/company/example'
            ],
            'mapLocation' => [
                'lat' => 40.7128,
                'lng' => -74.0060,
                'zoom' => 13
            ]
        ]);
    }

    public function submit(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'subject' => 'required|string|max:255',
            'message' => 'required|string',
        ]);

        Contact::create($validated);

        return redirect()->back()->with('success', 'Thank you for your message. We will get back to you soon!');
    }
}
