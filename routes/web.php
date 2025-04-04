<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\PostController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ConfigController;
use App\Http\Controllers\MemberController;
use App\Http\Controllers\ActivityLogController;
use App\Http\Controllers\SliderController;
use App\Http\Controllers\SliderItemController;
use App\Http\Controllers\BlockController;
use App\Http\Controllers\BlockItemController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\FrontendController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\LanguageController;
use App\Http\Controllers\CatalogueController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\AttributeController;
use App\Http\Controllers\StoreController;

// Frontend Routes
Route::namespace('Frontend')->group(function () {
    Route::get('/', [App\Http\Controllers\Frontend\HomeController::class, 'index'])->name('home');
    
    // Chat Bot API
    Route::post('/api/chatbot', [App\Http\Controllers\Frontend\ChatBotController::class, 'chat'])->name('frontend.chatbot.chat');
    
    // Product routes
    Route::get('/product', [App\Http\Controllers\Frontend\ProductController::class, 'index'])->name('frontend.products.index');
    Route::get('/product/{slug}', [App\Http\Controllers\Frontend\ProductController::class, 'show'])->name('frontend.products.show');
    
    // Store routes
    Route::get('/store', [App\Http\Controllers\Frontend\StoreController::class, 'index'])->name('frontend.stores.index');
    Route::get('/store/{slug}', [App\Http\Controllers\Frontend\StoreController::class, 'show'])->name('frontend.stores.show');
    
    // Category routes
    Route::get('/category/all', [App\Http\Controllers\Frontend\CategoryController::class, 'index'])->name('frontend.categories.index');
    Route::get('/category/{slug}', [App\Http\Controllers\Frontend\CategoryController::class, 'show'])->name('frontend.categories.show');
    
    // Search route
    Route::get('/search', [App\Http\Controllers\Frontend\SearchController::class, 'search'])->name('frontend.search');
    
    // Footer page routes
    Route::get('/deals', [App\Http\Controllers\Frontend\PageController::class, 'deals'])->name('frontend.deals');
    Route::get('/faq', [App\Http\Controllers\Frontend\PageController::class, 'faq'])->name('frontend.faq');
    Route::get('/shipping', [App\Http\Controllers\Frontend\PageController::class, 'shipping'])->name('frontend.shipping');
    Route::get('/returns', [App\Http\Controllers\Frontend\PageController::class, 'returns'])->name('frontend.returns');
    Route::get('/about', [App\Http\Controllers\Frontend\PageController::class, 'about'])->name('frontend.about');
    Route::get('/careers', [App\Http\Controllers\Frontend\PageController::class, 'careers'])->name('frontend.careers');
    Route::get('/privacy', [App\Http\Controllers\Frontend\PageController::class, 'privacy'])->name('frontend.privacy');
    Route::get('/terms', [App\Http\Controllers\Frontend\PageController::class, 'terms'])->name('frontend.terms');
    
    // Contact routes
    Route::get('/contact', [App\Http\Controllers\Frontend\ContactController::class, 'index'])->name('frontend.contact');
    Route::post('/contact/submit', [App\Http\Controllers\Frontend\ContactController::class, 'submit'])->name('frontend.contact.submit');
});
Route::get('/posts/{slug}', [FrontendController::class, 'showPost'])->name('post.show');


// Language switch route
Route::get('/language/{locale}', [LanguageController::class, 'switch'])
    ->name('language.switch')
    ->where('locale', 'en|vi');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::resource('posts', PostController::class);
    Route::resource('catalogues', CatalogueController::class);
    Route::resource('products', ProductController::class);
    
    // Thêm route xóa media của sản phẩm
    Route::post('products/{product}/delete-media', [ProductController::class, 'deleteMedia'])
        ->name('products.delete-media');
    
    // Thêm routes cho Config
    Route::resource('configs', ConfigController::class)->except(['show']);
    
    // Thêm routes cho Member với middleware admin
    
        Route::resource('members', MemberController::class);
        Route::post('members/update-order', [MemberController::class, 'updateOrder'])
            ->name('members.update-order');
            
        // Add User management routes - also protected by admin middleware
        Route::resource('users', \App\Http\Controllers\UserController::class);

    
    // Thêm routes cho Activity Log
    Route::resource('activity-logs', ActivityLogController::class)
    ->middleware('can:viewAny,App\Models\ActivityLog');
    Route::get('/activity-logs/{activity_log}', [ActivityLogController::class, 'show'])->name('activity-logs.show');
    
    // Quản lý Block
    Route::resource('blocks', BlockController::class);
    
    // Quản lý Block Items
    Route::post('blocks/{block}/items', [BlockItemController::class, 'store'])->name('block-items.store');
    Route::get('block-items/{item}/edit', [BlockItemController::class, 'edit'])->name('block-items.edit');
    Route::post('block-items/{item}', [BlockItemController::class, 'update'])->name('block-items.update');
    Route::delete('block-items/{item}', [BlockItemController::class, 'destroy'])->name('block-items.destroy');
    Route::post('block-items/reorder', [BlockItemController::class, 'reorder'])->name('block-items.reorder');
    
    // Attribute routes
    Route::resource('attributes', AttributeController::class);
    
    // Store routes
    Route::resource('stores', StoreController::class);
});

// Thêm route nhóm cho sliders
Route::middleware(['auth'])->group(function () {
    // Quản lý Sliders
    Route::resource('sliders', SliderController::class);
    
    // Quản lý Slider Items
    Route::post('sliders/{slider}/items', [SliderItemController::class, 'store'])->name('slider-items.store');
    
    // Hỗ trợ cả PUT và POST cho update
    Route::match(['put', 'post'], 'slider-items/{item}', [SliderItemController::class, 'update'])->name('slider-items.update');
    
    Route::delete('slider-items/{item}', [SliderItemController::class, 'destroy'])->name('slider-items.destroy');
    Route::post('slider-items/reorder', [SliderItemController::class, 'reorder'])->name('slider-items.reorder');
});

Route::resource('posts', PostController::class)->middleware(['auth', 'verified']);
Route::resource('categories', CategoryController::class)->middleware(['auth', 'verified']);
require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
