<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PageController extends Controller
{
    /**
     * Display the deals and promotions page.
     *
     * @return \Inertia\Response
     */
    public function deals()
    {
        return Inertia::render('Frontend/Pages/Deals', [
            'title' => 'Deals & Promotions',
            'description' => 'Check out our latest deals and promotions.',
        ]);
    }

    /**
     * Display the FAQ page.
     *
     * @return \Inertia\Response
     */
    public function faq()
    {
        return Inertia::render('Frontend/Pages/Faq', [
            'title' => 'Frequently Asked Questions',
            'description' => 'Find answers to commonly asked questions about our marketplace.',
        ]);
    }

    /**
     * Display the shipping information page.
     *
     * @return \Inertia\Response
     */
    public function shipping()
    {
        return Inertia::render('Frontend/Pages/Shipping', [
            'title' => 'Shipping & Delivery',
            'description' => 'Learn about our shipping policies and delivery options.',
        ]);
    }

    /**
     * Display the returns and refunds page.
     *
     * @return \Inertia\Response
     */
    public function returns()
    {
        return Inertia::render('Frontend/Pages/Returns', [
            'title' => 'Returns & Refunds',
            'description' => 'Information about our return policy and refund process.',
        ]);
    }

    /**
     * Display the about us page.
     *
     * @return \Inertia\Response
     */
    public function about()
    {
        return Inertia::render('Frontend/Pages/About', [
            'title' => 'About Us',
            'description' => 'Learn more about TMDT Marketplace and our mission.',
        ]);
    }

    /**
     * Display the careers page.
     *
     * @return \Inertia\Response
     */
    public function careers()
    {
        return Inertia::render('Frontend/Pages/Careers', [
            'title' => 'Careers',
            'description' => 'Join our team and grow your career with TMDT Marketplace.',
        ]);
    }

    /**
     * Display the privacy policy page.
     *
     * @return \Inertia\Response
     */
    public function privacy()
    {
        return Inertia::render('Frontend/Pages/Privacy', [
            'title' => 'Privacy Policy',
            'description' => 'Our privacy policy and how we protect your data.',
        ]);
    }

    /**
     * Display the terms of service page.
     *
     * @return \Inertia\Response
     */
    public function terms()
    {
        return Inertia::render('Frontend/Pages/Terms', [
            'title' => 'Terms of Service',
            'description' => 'Terms and conditions for using TMDT Marketplace.',
        ]);
    }
}
