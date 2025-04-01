<?php

namespace App\Traits;

use App\Models\ActivityLog;
use App\Services\ActivityLogService;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\App;

trait LogsActivity
{
    /**
     * Boot the trait
     */
    protected static function bootLogsActivity()
    {
        static::created(function (Model $model) {
            $model->logActivity('created', null, $model->getAttributes());
        });
        
        static::updated(function (Model $model) {
            $original = $model->getOriginal();
            $changes = $model->getChanges();
            
            // Loại bỏ các trường không cần ghi log
            $excludeFields = $model->getActivityLogExcludeFields();
            $filteredChanges = array_diff_key($changes, array_flip($excludeFields));
            
            // Chỉ log khi có thay đổi thật sự (loại trừ updated_at)
            if (count($filteredChanges) > 0) {
                $model->logActivity('updated', $original, $changes);
            }
        });
        
        static::deleted(function (Model $model) {
            // Kiểm tra nếu model có soft delete
            if (method_exists($model, 'trashed') && !$model->trashed()) {
                $model->logActivity('deleted', $model->getAttributes(), null);
            } else {
                $model->logActivity('force_deleted', $model->getAttributes(), null);
            }
        });
        
        if (method_exists(static::class, 'restored')) {
            static::restored(function (Model $model) {
                $model->logActivity('restored', null, $model->getAttributes());
            });
        }
    }
    
    /**
     * Ghi lại hoạt động
     */
    public function logActivity(string $action, ?array $oldValues = null, ?array $newValues = null, ?string $description = null)
    {
        $service = App::make(ActivityLogService::class);
        return $service->log($action, $this, $oldValues, $newValues, $description);
    }
    
    /**
     * Lấy các trường không cần ghi log
     */
    public function getActivityLogExcludeFields(): array
    {
        return property_exists($this, 'activityLogExcludeFields') 
            ? $this->activityLogExcludeFields
            : ['updated_at', 'created_at', 'deleted_at'];
    }
    
    /**
     * Quan hệ với ActivityLog
     */
    public function activityLogs()
    {
        return $this->morphMany(ActivityLog::class, 'subject', 'model_type', 'model_id');
    }
}
