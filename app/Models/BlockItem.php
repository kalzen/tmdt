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

class BlockItem extends Model implements HasMedia
{
    use HasFactory, SoftDeletes, InteractsWithMedia, LogsActivity;

    protected $fillable = [
        'block_id',
        'type',
        'name',
        'title',
        'description',
        'content',
        'button_text',
        'button_url',
        'button_type',
        'image_position',
        'is_active',
        'sort_order',
        'settings',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'settings' => 'array',
    ];

    /**
     * Các loại item có sẵn
     */
    public static function types(): array
    {
        return [
            'title' => 'Tiêu đề',
            'description' => 'Mô tả ngắn',
            'content' => 'Nội dung chi tiết',
            'image' => 'Hình ảnh',
            'button' => 'Nút bấm',
            'title_description' => 'Tiêu đề + Mô tả',
            'image_content' => 'Hình ảnh + Nội dung',
            'full' => 'Đầy đủ (tiêu đề, mô tả, nội dung, hình ảnh, nút)',
        ];
    }

    /**
     * Các loại nút có sẵn
     */
    public static function buttonTypes(): array
    {
        return [
            'primary' => 'Chính',
            'secondary' => 'Phụ',
            'outline' => 'Viền',
            'link' => 'Liên kết',
        ];
    }

    /**
     * Các vị trí hình ảnh có sẵn
     */
    public static function imagePositions(): array
    {
        return [
            'left' => 'Trái',
            'right' => 'Phải',
            'top' => 'Trên',
            'bottom' => 'Dưới',
            'background' => 'Nền',
        ];
    }

    /**
     * Mối quan hệ với block
     */
    public function block(): BelongsTo
    {
        return $this->belongsTo(Block::class);
    }

    /**
     * Register media collections
     */
    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('block_image')
            ->singleFile()
            ->registerMediaConversions(function (Media $media) {
                $this->addMediaConversion('thumb')
                    ->width(300)
                    ->height(200);
                    
                $this->addMediaConversion('medium')
                    ->width(800)
                    ->height(600);
                    
                $this->addMediaConversion('large')
                    ->width(1200)
                    ->height(800);
            });
    }
    
    /**
     * Get the image URL or a default image if not set
     */
    public function getImageUrlAttribute(): string
    {
        if ($this->hasMedia('block_image')) {
            return $this->getFirstMediaUrl('block_image');
        }
        
        return asset('images/default-block-image.jpg');
    }
    
    /**
     * Get the image thumbnail URL
     */
    public function getImageThumbUrlAttribute(): string
    {
        if ($this->hasMedia('block_image')) {
            return $this->getFirstMediaUrl('block_image', 'thumb');
        }
        
        return asset('images/default-block-thumb.jpg');
    }
    
    /**
     * Get the medium image URL
     */
    public function getImageMediumUrlAttribute(): string
    {
        if ($this->hasMedia('block_image')) {
            return $this->getFirstMediaUrl('block_image', 'medium');
        }
        
        return asset('images/default-block-medium.jpg');
    }
    
    /**
     * Get the large image URL
     */
    public function getImageLargeUrlAttribute(): string
    {
        if ($this->hasMedia('block_image')) {
            return $this->getFirstMediaUrl('block_image', 'large');
        }
        
        return asset('images/default-block-large.jpg');
    }
}
