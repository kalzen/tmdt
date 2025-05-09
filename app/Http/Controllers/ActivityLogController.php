<?php

namespace App\Http\Controllers;

use App\Models\ActivityLog;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class ActivityLogController extends Controller
{
    // Thêm trait nếu Controller base class chưa bao gồm nó
    use AuthorizesRequests;

    public function __construct()
    {
        // Cách 1: Kiểm tra quyền với Gate trong controller
        // $this->middleware(function ($request, $next) {
        //     if (!\Gate::allows('view_activity_logs')) {
        //         abort(403);
        //     }
        //     return $next($request);
        // });
    }

    // Thêm middleware quyền vào route thay vì trong controller
    // Trong route/web.php: Route::resource('activity-logs', ActivityLogController::class)->middleware('can:view_activity_logs');

    public function index(Request $request)
    {
        $this->authorize('viewAny', ActivityLog::class);
        
        $query = ActivityLog::with('user')
            ->latest();
            
        // Filter theo model
        if ($request->has('model') && $request->model) {
            $query->where('model_type', 'like', '%' . $request->model);
        }
        
        // Filter theo action
        if ($request->has('action') && $request->action) {
            $query->where('action', $request->action);
        }
        
        // Filter theo user
        if ($request->has('user_id') && $request->user_id) {
            $query->where('user_id', $request->user_id);
        }
        
        // Filter theo từ khóa tìm kiếm
        if ($request->has('search') && $request->search) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('description', 'like', "%{$search}%")
                  ->orWhere('user_name', 'like', "%{$search}%");
            });
        }
        
        $perPage = $request->input('per_page', 15);
        $logs = $query->paginate($perPage)
            ->withQueryString();
        
        // Format the data for consistent structure
        $formattedData = [
            'data' => collect($logs->items())->map(function ($log) {
                return [
                    'id' => $log->id,
                    'user_id' => $log->user_id,
                    'user_name' => $log->user_name,
                    'action' => $log->action,
                    'model_type' => $log->model_type,
                    'model_id' => $log->model_id,
                    'description' => $log->description,
                    'properties' => $log->properties,
                    'ip_address' => $log->ip_address,
                    'created_at' => $log->created_at->format('Y-m-d H:i:s'),
                ];
            })->toArray(),
            'meta' => [
                'current_page' => $logs->currentPage(),
                'from' => $logs->firstItem() ?? 0,
                'last_page' => $logs->lastPage(),
                'per_page' => $logs->perPage(),
                'to' => $logs->lastItem() ?? 0,
                'total' => $logs->total(),
            ],
        ];
        
        return Inertia::render('activity-logs/index', [
            'logs' => $formattedData,
            'filters' => $request->only(['search', 'model', 'action', 'user_id']),
            'actions' => ActivityLog::actions(),
        ]);
    }
    
    public function show($id)
    {
        $log = ActivityLog::with('user')->findOrFail($id);
        $this->authorize('view', $log);
        
        return Inertia::render('activity-logs/show', [
            'log' => $log,
        ]);
    }
}
