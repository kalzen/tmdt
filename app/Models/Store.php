<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class Store extends Model implements HasMedia
{
    use HasFactory, SoftDeletes, InteractsWithMedia;

    protected $fillable = [
        'name',
        'slug',
        'description',
        'address',
        'phone',
        'email',
        'website',
        'primary_color',
        'secondary_color',
        'about_us',
        'founding_year',
        'employee_count',
        'is_active',
        'is_verified',
        'user_id',
        'meta_title',
        'meta_description',
    ];

    protected $casts = [
        'founding_year' => 'integer',
        'employee_count' => 'integer',
        'is_active' => 'boolean',
        'is_verified' => 'boolean',
    ];

    /**
     * Lấy thông tin chủ gian hàng
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Lấy danh sách sản phẩm của gian hàng
     */
    public function products(): HasMany
    {
        return $this->hasMany(Product::class);
    }

    /**
     * Các danh mục chính của gian hàng
     */
    public function mainCategories(): BelongsToMany
    {
        return $this->belongsToMany(Catalogue::class, 'store_catalogues');
    }

    /**
     * The catalogues that belong to the store.
     */
    public function catalogues(): BelongsToMany
    {
        return $this->belongsToMany(Catalogue::class, 'store_catalogues');
    }

    /**
     * Đăng ký các collection media
     */
    public function registerMediaCollections(): void
    {
        // Logo của gian hàng
        $this->addMediaCollection('logo')
            ->singleFile();
        
        // Banner của gian hàng
        $this->addMediaCollection('banner')
            ->singleFile();
            
        // Giấy chứng nhận sản phẩm
        $this->addMediaCollection('certificates');
        
        // Hình ảnh về gian hàng
        $this->addMediaCollection('gallery');
    }
}
