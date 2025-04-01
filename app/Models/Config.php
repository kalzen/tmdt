<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use App\Traits\LogsActivity;

class Config extends Model implements HasMedia
{
    use HasFactory, InteractsWithMedia, LogsActivity;

    protected $fillable = [
        'name',
        'title',
        'value',
        'type',
        'group',
        'description',
    ];
    
    protected $table = 'configs';

    // Cho biết những trường không cần ghi log
    protected $activityLogExcludeFields = ['updated_at', 'created_at'];

    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('logo')
            ->singleFile();
            
        $this->addMediaCollection('favicon')
            ->singleFile();
            
        $this->addMediaCollection('thumbnail')
            ->singleFile();
    }

    // Helper method to get the value with the right type
    public function getTypedValue()
    {
        switch ($this->type) {
            case 'number':
                return (float) $this->value;
            case 'boolean':
                return (bool) $this->value;
            default:
                return $this->value;
        }
    }
}
