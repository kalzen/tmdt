<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Attribute extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'code',
        'type',
        'is_filterable',
        'is_required',
        'display_order',
        'is_active',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'is_filterable' => 'boolean',
        'is_required' => 'boolean',
        'is_active' => 'boolean',
    ];

    /**
     * Get the attribute values for the attribute.
     */
    public function values(): HasMany
    {
        return $this->hasMany(AttributeValue::class);
    }

    /**
     * Get the product attributes that use this attribute.
     */
    public function productAttributes(): HasMany
    {
        return $this->hasMany(ProductAttribute::class);
    }
}
