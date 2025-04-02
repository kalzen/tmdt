<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class Product extends Model implements HasMedia
{
    use HasFactory, SoftDeletes, InteractsWithMedia;

    protected $fillable = [
        'title',
        'slug',
        'sku',
        'description',
        'content',
        'price',
        'sale_price',
        'stock_quantity',
        'catalogue_id',
        'user_id',
        'store_id',
        'is_active',
        'is_featured',
        'meta_title',
        'meta_description',
    ];

    protected $casts = [
        'price' => 'float',
        'sale_price' => 'float',
        'stock_quantity' => 'integer',
        'is_active' => 'boolean',
        'is_featured' => 'boolean',
    ];

    /**
     * Lấy danh mục của sản phẩm
     */
    public function catalogue(): BelongsTo
    {
        return $this->belongsTo(Catalogue::class);
    }

    /**
     * Get the catalogues for the product.
     */
    public function catalogues()
    {
        return $this->belongsToMany(Catalogue::class, 'product_catalogues', 'product_id', 'catalogue_id');
    }

    /**
     * Lấy người tạo sản phẩm
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Lấy thông tin gian hàng của sản phẩm
     */
    public function store(): BelongsTo
    {
        return $this->belongsTo(Store::class);
    }

    /**
     * Lấy các thuộc tính của sản phẩm
     */
    public function attributes(): HasMany
    {
        return $this->hasMany(ProductAttribute::class);
    }

    /**
     * Lấy các hình ảnh của sản phẩm
     */
    public function images(): HasMany
    {
        return $this->hasMany(ProductImage::class);
    }
    
    /**
     * Lấy các biến thể của sản phẩm
     */
    public function variations(): HasMany
    {
        return $this->hasMany(ProductVariation::class);
    }

    /**
     * Đăng ký các collection media
     */
    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('thumbnail')
            ->singleFile();
        
        $this->addMediaCollection('gallery');
    }
}
