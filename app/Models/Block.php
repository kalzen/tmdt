<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\HasMany;
use App\Traits\LogsActivity;

class Block extends Model
{
    use HasFactory, SoftDeletes, LogsActivity;

    protected $fillable = [
        'name',
        'slug',
        'location',
        'description',
        'is_active',
        'sort_order',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    /**
     * Mối quan hệ với các block items
     */
    public function items(): HasMany
    {
        return $this->hasMany(BlockItem::class)->orderBy('sort_order');
    }

    /**
     * Lấy các block items đang hoạt động
     */
    public function activeItems(): HasMany
    {
        return $this->items()->where('is_active', true);
    }

    /**
     * Scope để lấy các block đang hoạt động
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Lấy block theo slug
     */
    public function scopeBySlug($query, $slug)
    {
        return $query->where('slug', $slug);
    }

    /**
     * Lấy block theo vị trí
     */
    public function scopeByLocation($query, $location)
    {
        return $query->where('location', $location);
    }
    
    /**
     * Tạo hoặc cập nhật một item cho block
     */
    public function createOrUpdateItem(array $data, ?int $itemId = null)
    {
        if ($itemId) {
            $item = $this->items()->findOrFail($itemId);
            $item->update($data);
        } else {
            $item = $this->items()->create($data);
        }
        
        return $item;
    }
}
