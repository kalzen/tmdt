<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\ActivityLog;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Hiển thị trang dashboard với dữ liệu thống kê
     */
    public function index()
    {
        // Lấy 5 bài viết có lượt xem nhiều nhất
        $popularPosts = Post::mostViewed(5)
            ->with('user')
            ->get()
            ->map(function($post) {
                return [
                    'id' => $post->id,
                    'title' => $post->title,
                    'slug' => $post->slug,
                    'views' => $post->views,
                    'published_at' => $post->published_at,
                    'author' => $post->user ? $post->user->name : 'Không có tác giả',
                ];
            });
            
        // Lấy các hoạt động gần đây
        $recentLogs = ActivityLog::latest()
            ->limit(5)
            ->get()
            ->map(function($log) {
                return [
                    'id' => $log->id,
                    'description' => $log->description,
                    'user_name' => $log->user_name,
                    'created_at' => $log->created_at,
                ];
            });
            
        return Inertia::render('dashboard', [
            'popularPosts' => $popularPosts,
            'recentLogs' => $recentLogs,
        ]);
    }
}
