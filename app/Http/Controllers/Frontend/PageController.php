<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class PageController extends Controller
{
    public function about()
    {
        return Inertia::render('frontend/pages/about', [
            'title' => 'About Us',
            'description' => 'Learn more about our company and our mission',
            'content' => [
                'mission' => 'Our mission is to provide the best e-commerce platform for businesses and customers.',
                'vision' => 'We envision a future where online shopping is seamless, secure, and enjoyable for everyone.',
                'values' => [
                    'Quality' => 'We maintain high standards in everything we do.',
                    'Integrity' => 'We operate with honesty and transparency.',
                    'Innovation' => 'We continuously improve our platform.',
                    'Customer Focus' => 'We put our customers first.',
                ],
                'statistics' => [
                    ['label' => 'Active Users', 'value' => '10K+'],
                    ['label' => 'Products', 'value' => '50K+'],
                    ['label' => 'Vendors', 'value' => '1K+'],
                    ['label' => 'Countries', 'value' => '10+'],
                ],
            ],
        ]);
    }

    public function privacy()
    {
        return Inertia::render('frontend/pages/privacy', [
            'title' => 'Privacy Policy',
            'description' => 'Our commitment to protecting your privacy',
            'lastUpdated' => '2025-04-01',
            'sections' => [
                [
                    'title' => 'Information We Collect',
                    'content' => 'We collect information that you provide directly to us, including...',
                ],
                [
                    'title' => 'How We Use Your Information',
                    'content' => 'We use the information we collect to provide and improve our services...',
                ],
                [
                    'title' => 'Information Sharing',
                    'content' => 'We do not sell or rent your personal information to third parties...',
                ],
            ],
        ]);
    }

    public function shipping()
    {
        return Inertia::render('frontend/pages/shipping', [
            'title' => 'Shipping Information',
            'description' => 'Learn about our shipping policies and delivery options',
            'methods' => [
                [
                    'name' => 'Standard Shipping',
                    'duration' => '3-5 business days',
                    'cost' => '$5.99',
                ],
                [
                    'name' => 'Express Shipping',
                    'duration' => '1-2 business days',
                    'cost' => '$12.99',
                ],
                [
                    'name' => 'International Shipping',
                    'duration' => '7-14 business days',
                    'cost' => '$24.99',
                ],
            ],
            'policies' => [
                'Free shipping on orders over $50',
                'Tracking number provided for all shipments',
                'Insurance included for orders over $100',
            ],
        ]);
    }

    public function returns()
    {
        return Inertia::render('frontend/pages/returns', [
            'title' => 'Returns & Refunds',
            'description' => 'Our returns and refunds policy',
            'policy' => [
                'window' => '30 days',
                'condition' => 'Items must be unused and in original packaging',
                'process' => [
                    'Initiate return through your account',
                    'Print return shipping label',
                    'Drop off package at shipping location',
                    'Refund processed within 5 business days of receipt',
                ],
                'exceptions' => [
                    'Personal hygiene items',
                    'Digital downloads',
                    'Gift cards',
                ],
            ],
        ]);
    }

    public function terms()
    {
        return Inertia::render('frontend/pages/terms', [
            'title' => 'Terms of Service',
            'description' => 'Please read these terms carefully before using our services',
            'lastUpdated' => '2025-04-01',
            'sections' => [
                [
                    'title' => 'Acceptance of Terms',
                    'content' => 'By accessing and using this website, you accept and agree to be bound by the terms...',
                ],
                [
                    'title' => 'User Accounts',
                    'content' => 'You are responsible for maintaining the confidentiality of your account...',
                ],
                [
                    'title' => 'Intellectual Property',
                    'content' => 'All content on this website is the property of our company...',
                ],
            ],
        ]);
    }

    public function faq()
    {
        return Inertia::render('frontend/pages/faq', [
            'title' => 'Frequently Asked Questions',
            'description' => 'Find answers to common questions about our services',
            'categories' => [
                [
                    'name' => 'General',
                    'questions' => [
                        [
                            'question' => 'How do I create an account?',
                            'answer' => 'You can create an account by clicking the "Sign Up" button...',
                        ],
                        [
                            'question' => 'What payment methods do you accept?',
                            'answer' => 'We accept credit cards, PayPal, and bank transfers...',
                        ],
                    ],
                ],
                [
                    'name' => 'Orders',
                    'questions' => [
                        [
                            'question' => 'How can I track my order?',
                            'answer' => 'You can track your order in your account dashboard...',
                        ],
                        [
                            'question' => 'Can I modify my order?',
                            'answer' => 'Orders can be modified within 1 hour of placement...',
                        ],
                    ],
                ],
            ],
        ]);
    }
}
