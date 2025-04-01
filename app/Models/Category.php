<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;
use App\Traits\LogsActivity;

class Category extends Model implements HasMedia
{
    use HasFactory, SoftDeletes, InteractsWithMedia, LogsActivity;
    
    protected $fillable = [
        'title',
        'description',
    ];

    // Remove 'image' from fillable as it will be handled by media library

    public function posts()
    {
        return $this->belongsToMany(Post::class);
    }

    /**
     * Register media collections
     */
    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('category_image')
            ->singleFile()
            ->registerMediaConversions(function (Media $media) {
                $this->addMediaConversion('thumb')
                    ->width(100)
                    ->height(100);
            });
    }
    
    /**
     * Get the category image URL or a default image if not set
     */
    public function getImageUrlAttribute(): string
    {
        if ($this->hasMedia('category_image')) {
            return $this->getFirstMediaUrl('category_image');
        }
        
        return asset('images/default-category.jpg');
    }
    
    /**
     * Get the category image thumbnail URL
     */
    public function getImageThumbUrlAttribute(): string
    {
        if ($this->hasMedia('category_image')) {
            return $this->getFirstMediaUrl('category_image', 'thumb');
        }
        
        return asset('images/default-category-thumb.jpg');
    }
}
