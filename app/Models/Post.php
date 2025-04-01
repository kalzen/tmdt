<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media; // Đảm bảo import đúng namespace
use App\Traits\LogsActivity;

class Post extends Model implements HasMedia
{
    use HasFactory, SoftDeletes, InteractsWithMedia, LogsActivity;
    
    // Cho biết những trường không cần ghi log
    protected $activityLogExcludeFields = ['updated_at', 'created_at', 'deleted_at', 'views'];
    
    protected $fillable = [
        'title',
        'content',
        'description',
        'slug',
        'user_id',
        'is_published',
        'published_at',
        'views'
    ];

    protected $casts = [
        'is_published' => 'boolean',
        'published_at' => 'datetime',
        'views' => 'integer',
    ];

    // Remove 'image' from fillable as it will be handled by media library

    public function categories()
    {
        return $this->belongsToMany(Category::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Register media collections
     */
    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('featured_image')
            ->singleFile()
            ->registerMediaConversions(function (Media $media) {
                $this->addMediaConversion('thumb')
                    ->width(200)
                    ->height(200);
                    
                $this->addMediaConversion('medium')
                    ->width(800)
                    ->height(600);
            });

        $this->addMediaCollection('gallery');

        $this->addMediaCollection('post_image')
            ->singleFile()
            ->registerMediaConversions(function (Media $media) {
                $this->addMediaConversion('thumb')
                    ->width(100)
                    ->height(100);
            });
    }
    
    /**
     * Get the featured image URL or a default image if not set
     */
    public function getFeaturedImageUrlAttribute(): string
    {
        if ($this->hasMedia('featured_image')) {
            return $this->getFirstMediaUrl('featured_image');
        }
        
        return asset('images/default-post.jpg');
    }
    
    /**
     * Get the featured image thumbnail URL
     */
    public function getFeaturedImageThumbUrlAttribute(): string
    {
        if ($this->hasMedia('featured_image')) {
            return $this->getFirstMediaUrl('featured_image', 'thumb');
        }
        
        return asset('images/default-post-thumb.jpg');
    }

    /**
     * Scope để lấy các bài viết được xem nhiều nhất
     */
    public function scopeMostViewed($query, $limit = 5)
    {
        return $query->where('is_published', true)
            ->orderBy('views', 'desc')
            ->limit($limit);
    }
    
    /**
     * Tăng số lượt xem của bài viết
     */
    public function incrementViews()
    {
        $this->increment('views');
    }
}
