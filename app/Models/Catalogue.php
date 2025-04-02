<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class Catalogue extends Model implements HasMedia
{
    use HasFactory, SoftDeletes, InteractsWithMedia;

    protected $fillable = [
        'name',
        'slug',
        'description',
        'parent_id',
        'level',
        'is_active',
        'meta_title',
        'meta_description',
        'position'
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    /**
     * Lấy danh mục cha
     */
    public function parent(): BelongsTo
    {
        return $this->belongsTo(Catalogue::class, 'parent_id');
    }

    /**
     * Lấy danh sách danh mục con
     */
    public function children(): HasMany
    {
        return $this->hasMany(Catalogue::class, 'parent_id');
    }

    /**
     * Lấy tất cả danh mục con theo đệ quy
     */
    public function allChildren()
    {
        return $this->children()->with('allChildren');
    }

    /**
     * The stores that belong to the catalogue.
     */
    public function stores(): BelongsToMany
    {
        return $this->belongsToMany(Store::class, 'store_catalogues');
    }

    /**
     * Get the products for the catalogue.
     */
    public function products()
    {
        return $this->belongsToMany(Product::class, 'product_catalogues', 'catalogue_id', 'product_id')
                    ->select(['products.id', 'products.title', 'products.price']); // Specify the table name to avoid ambiguity
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
