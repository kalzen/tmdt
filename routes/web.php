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

Route::get('/', [FrontendController::class, 'index'])->name('home');
Route::get('/posts/{slug}', [FrontendController::class, 'showPost'])->name('post.show');

// Contact routes
Route::get('/lien-he', [ContactController::class, 'index'])->name('contact.index');
Route::post('/lien-he/submit', [ContactController::class, 'submit'])->name('contact.submit');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::resource('posts', PostController::class);
    
    // Thêm routes cho Config
    Route::resource('configs', ConfigController::class)->except(['show']);
    
    // Thêm routes cho Member
    Route::resource('members', MemberController::class);
    Route::post('members/update-order', [MemberController::class, 'updateOrder'])->name('members.update-order');
    
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

