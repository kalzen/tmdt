<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;
use App\Traits\LogsActivity;

class SliderItem extends Model implements HasMedia
{
    use HasFactory, SoftDeletes, InteractsWithMedia, LogsActivity;

    protected $fillable = [
        'slider_id',
        'title',
        'description',
        'button_text',
        'button_url',
        'sort_order',
        'is_active'
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    /**
     * Mối quan hệ với slider
     */
    public function slider(): BelongsTo
    {
        return $this->belongsTo(Slider::class);
    }

    /**
     * Register media collections
     */
    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('slider_image')
            ->singleFile()
            ->registerMediaConversions(function (Media $media) {
                $this->addMediaConversion('thumb')
                    ->width(300)
                    ->height(200);
                    
                $this->addMediaConversion('medium')
                    ->width(1200)
                    ->height(600);
            });
    }
    
    /**
     * Get the slider image URL or a default image if not set
     */
    public function getImageUrlAttribute(): string
    {
        if ($this->hasMedia('slider_image')) {
            return $this->getFirstMediaUrl('slider_image');
        }
        
        return asset('images/default-slider.jpg');
    }
    
    /**
     * Get the slider image thumbnail URL
     */
    public function getImageThumbUrlAttribute(): string
    {
        if ($this->hasMedia('slider_image')) {
            return $this->getFirstMediaUrl('slider_image', 'thumb');
        }
        
        return asset('images/default-slider-thumb.jpg');
    }
    
    /**
     * Get the slider image medium URL
     */
    public function getImageMediumUrlAttribute(): string
    {
        if ($this->hasMedia('slider_image')) {
            return $this->getFirstMediaUrl('slider_image', 'medium');
        }
        
        return asset('images/default-slider.jpg');
    }
}
