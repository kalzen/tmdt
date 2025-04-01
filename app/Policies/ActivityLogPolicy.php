<?php

namespace App\Policies;

use App\Models\User;
use App\Models\ActivityLog;
use Illuminate\Auth\Access\HandlesAuthorization;

class ActivityLogPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view activity logs.
     *
     * @param  \App\Models\User  $user
     * @return bool
     */
    public function viewAny(User $user)
    {
        // Chỉ admin mới có thể xem nhật ký
        return $user->is_admin;
    }

    /**
     * Determine whether the user can view the activity log.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\ActivityLog  $activityLog
     * @return bool
     */
    public function view(User $user, ActivityLog $activityLog)
    {
        return $user->is_admin;
    }
}
