<?php

namespace App\Services;

use App\Models\ActivityLog;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class ActivityLogService
{
    /**
     * Ghi lại hoạt động
     */
    public function log(
        string $action,
        ?Model $model = null,
        ?array $oldValues = null,
        ?array $newValues = null,
        ?string $description = null
    ): ActivityLog {
        $user = Auth::user();
        
        return ActivityLog::create([
            'user_id' => $user?->id,
            'user_name' => $user?->name,
            'action' => $action,
            'model_type' => $model ? get_class($model) : null,
            'model_id' => $model?->id,
            'old_values' => $oldValues,
            'new_values' => $newValues,
            'ip_address' => request()->ip(),
            'user_agent' => request()->userAgent(),
            'description' => $description ?? $this->generateDescription($action, $model),
        ]);
    }
    
    /**
     * Tạo mô tả tự động dựa trên hành động và model
     */
    protected function generateDescription(string $action, ?Model $model = null): ?string
    {
        if (!$model) {
            return null;
        }
        
        $modelName = class_basename($model);
        $modelId = $model->id;
        
        $modelNameDisplay = Str::title(Str::snake(class_basename($model), ' '));
        
        $displayField = $this->getDisplayField($model);
        $displayValue = $model->$displayField ?? 'không xác định';
        
        return match($action) {
            'created' => "Tạo mới {$modelNameDisplay}: {$displayValue}",
            'updated' => "Cập nhật {$modelNameDisplay}: {$displayValue}",
            'deleted' => "Xóa {$modelNameDisplay}: {$displayValue}",
            'restored' => "Khôi phục {$modelNameDisplay}: {$displayValue}",
            'force_deleted' => "Xóa vĩnh viễn {$modelNameDisplay}: {$displayValue}",
            default => null
        };
    }
    
    /**
     * Lấy trường để hiển thị từ model
     */
    protected function getDisplayField(Model $model): string
    {
        $possibleFields = ['name', 'title', 'slug', 'email', 'username', 'id'];
        
        foreach ($possibleFields as $field) {
            if (isset($model->$field)) {
                return $field;
            }
        }
        
        return 'id';
    }
}
