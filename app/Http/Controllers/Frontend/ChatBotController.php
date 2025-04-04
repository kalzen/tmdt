<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use OpenAI;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class ChatBotController extends Controller
{
    /**
     * Predefined responses for common questions
     */
    protected $predefinedResponses = [
        // Product related questions
        'products' => [
            'pattern' => '/products|items|goods|merchandise|sell|selling|buy|buying|purchase|shop/i',
            'response' => 'We offer a wide variety of products across multiple categories. You can browse all products at <a href="/product" class="text-primary hover:underline">our products page</a> or check specific categories at <a href="/category/all" class="text-primary hover:underline">our categories page</a>.',
        ],
        'categories' => [
            'pattern' => '/categor|department|section|type/i',
            'response' => 'We have many product categories to explore. Visit our <a href="/category/all" class="text-primary hover:underline">categories page</a> to see all available options.',
        ],
        
        // Pricing related questions
        'pricing' => [
            'pattern' => '/price|cost|how much|pricing|expensive|cheap|affordable/i',
            'response' => 'Product prices are displayed on each product page. We strive to offer competitive prices and occasionally have special deals and promotions.',
        ],
        'deals' => [
            'pattern' => '/deal|promotion|discount|sale|offer|coupon|promo/i',
            'response' => 'Check out our current deals and promotions at <a href="/deals" class="text-primary hover:underline">our deals page</a>. We regularly update our offers!',
        ],
        
        // Payment related questions
        'payment' => [
            'pattern' => '/payment|pay|credit card|debit card|paypal|method|transaction/i',
            'response' => 'We accept various payment methods including credit/debit cards, bank transfers, and cash on delivery (COD). All transactions are secure and encrypted.',
        ],
        
        // Shipping related questions
        'shipping' => [
            'pattern' => '/shipping|delivery|ship|deliver|send|arrival|tracking/i',
            'response' => 'We offer nationwide shipping with delivery times typically between 2-5 business days. For more details, please visit our <a href="/shipping" class="text-primary hover:underline">shipping information page</a>.',
        ],
        'returns' => [
            'pattern' => '/return|refund|exchange|money back|cancel|cancellation/i',
            'response' => 'We have a customer-friendly return policy. Most items can be returned within 30 days of delivery. For more details, please check our <a href="/returns" class="text-primary hover:underline">returns and refunds page</a>.',
        ],
        
        // Contact related questions
        'contact' => [
            'pattern' => '/contact|reach|call|phone|email|support|help|service|talk|chat/i',
            'response' => 'You can contact our customer service team via email at support@84Gate.com or by phone at 1900-1234. You can also visit our <a href="/contact" class="text-primary hover:underline">contact page</a> for more options.',
        ],
        
        // Account related questions
        'account' => [
            'pattern' => '/account|profile|sign up|register|login|password|forgot/i',
            'response' => 'You can create an account or sign in from the top right corner of our website. If you\'ve forgotten your password, you can reset it from the login page.',
        ],
        
        // About related questions
        'about' => [
            'pattern' => '/about|company|who are you|history|mission|vision/i',
            'response' => '84Gate Marketplace is a trusted e-commerce platform connecting buyers with verified sellers. Learn more about us at our <a href="/about" class="text-primary hover:underline">about page</a>.',
        ],
        
        // FAQ related questions
        'faq' => [
            'pattern' => '/faq|frequently asked|question/i',
            'response' => 'You can find answers to commonly asked questions on our <a href="/faq" class="text-primary hover:underline">FAQ page</a>.',
        ],
        
        // Privacy and terms related questions
        'privacy' => [
            'pattern' => '/privacy|data|information|collect|cookie|gdpr/i',
            'response' => 'We take your privacy seriously. You can read our detailed privacy policy at <a href="/privacy" class="text-primary hover:underline">our privacy policy page</a>.',
        ],
        'terms' => [
            'pattern' => '/terms|conditions|legal|agreement|policy/i',
            'response' => 'Our terms of service outline the rules for using our platform. You can read them at <a href="/terms" class="text-primary hover:underline">our terms of service page</a>.',
        ],
        
        // Greetings
        'greeting' => [
            'pattern' => '/^(hi|hello|hey|greetings|good morning|good afternoon|good evening|howdy)/i',
            'response' => 'Hello! Welcome to 84Gate Marketplace. How can I help you today?',
        ],
        'thanks' => [
            'pattern' => '/thank|thanks|appreciate|grateful/i',
            'response' => 'You\'re welcome! Is there anything else I can help you with?',
        ],
    ];

    /**
     * Suggested questions for the chat bot with their predefined answers
     */
    protected $suggestedQuestions = [
        [
            'question' => 'How do I place an order?',
            'answer' => 'To place an order, browse our products, add items to your cart, and proceed to checkout. You\'ll need to provide shipping information and payment details. Once your order is confirmed, you\'ll receive an order confirmation email with tracking information.'
        ],
        [
            'question' => 'What payment methods do you accept?',
            'answer' => 'We accept various payment methods including credit/debit cards (Visa, Mastercard, American Express), bank transfers, and cash on delivery (COD). All online transactions are secure and encrypted for your protection.'
        ],
        [
            'question' => 'How long does shipping take?',
            'answer' => 'Standard shipping typically takes 2-5 business days within the country. International shipping may take 7-14 business days depending on the destination. Express shipping options are available at checkout for faster delivery.'
        ],
        [
            'question' => 'What is your return policy?',
            'answer' => 'We offer a 30-day return policy for most items. Products must be in original condition with tags attached and original packaging. For detailed information, please visit our <a href="/returns" class="text-primary hover:underline">returns and refunds page</a>.'
        ],
        [
            'question' => 'How can I track my order?',
            'answer' => 'You can track your order by logging into your account and viewing your order history. Alternatively, you can use the tracking number provided in your shipping confirmation email on our website or the carrier\'s website.'
        ],
        [
            'question' => 'Do you ship internationally?',
            'answer' => 'Yes, we ship to many countries worldwide. International shipping rates and delivery times vary by location. You can see available shipping options during checkout after entering your address.'
        ],
    ];

    /**
     * Handle the chat bot request
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function chat(Request $request)
    {
        // Validate the request
        $request->validate([
            'message' => 'required|string|max:1000',
            'session_id' => 'nullable|string',
        ]);

        // Generate a session ID if not provided
        $sessionId = $request->session_id ?? (string) Str::uuid();
        
        // Check for predefined responses
        $userMessage = $request->message;
        $botResponse = $this->getPredefinedResponse($userMessage);
        
        // If no predefined response, use OpenAI
        if (!$botResponse) {
            try {
                // Initialize the OpenAI client
                $client = OpenAI::client(config('services.openai.api_key'));

                // Create a chat completion
                $response = $client->chat()->create([
                    'model' => 'gpt-3.5-turbo',
                    'messages' => [
                        ['role' => 'system', 'content' => 'You are a helpful assistant for the 84Gate Marketplace e-commerce website. Provide concise, accurate information about products, shipping, payment methods, and other e-commerce related questions. Keep responses brief and focused on helping customers.'],
                        ['role' => 'user', 'content' => $userMessage],
                    ],
                    'temperature' => 0.7,
                    'max_tokens' => 500,
                ]);

                // Extract the response content
                $botResponse = $response->choices[0]->message->content;
            } catch (\Exception $e) {
                Log::error('OpenAI API Error: ' . $e->getMessage());
                
                return response()->json([
                    'success' => false,
                    'message' => 'Sorry, I\'m having trouble connecting to my brain right now. Please try again later.',
                    'error' => $e->getMessage(),
                    'session_id' => $sessionId,
                ], 500);
            }
        }

        // Return the response
        return response()->json([
            'success' => true,
            'message' => $botResponse,
            'session_id' => $sessionId,
            'suggested_questions' => array_column($this->suggestedQuestions, 'question'),
        ]);
    }

    /**
     * Get a predefined response if available
     *
     * @param  string  $message
     * @return string|null
     */
    protected function getPredefinedResponse($message)
    {
        // First check if the message exactly matches one of our suggested questions
        foreach ($this->suggestedQuestions as $item) {
            if (strcasecmp(trim($message), trim($item['question'])) === 0) {
                return $item['answer'];
            }
        }
        
        // Then check for pattern matches in our predefined responses
        foreach ($this->predefinedResponses as $key => $data) {
            if (preg_match($data['pattern'], $message)) {
                return $data['response'];
            }
        }
        
        return null;
    }
}
