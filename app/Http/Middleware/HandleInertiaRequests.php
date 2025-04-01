<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Inspiring;
use Illuminate\Http\Request;
use Inertia\Middleware;
use Tighten\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        [$message, $author] = str(Inspiring::quotes()->random())->explode('-');

        return [
            ...parent::share($request),
            'name' => config('app.name'),
            'quote' => ['message' => trim($message), 'author' => trim($author)],
            'auth' => [
                'user' => $request->user() ? [
                    'id' => $request->user()->id,
                    'name' => $request->user()->name,
                    'email' => $request->user()->email,
                    'email_verified_at' => $request->user()->email_verified_at,
                    'avatar_url' => $request->user()->avatar_url,
                    'avatar_thumb_url' => $request->user()->avatar_thumb_url,
                ] : null,
            ],
            'ziggy' => fn (): array => [
                ...(new Ziggy)->toArray(),
                'location' => $request->url(),
            ],
            // Đảm bảo flash message được chia sẻ đến Inertia
            'flash' => function () use ($request) {
                return [
                    'toast' => $request->session()->get('toast'),
                    'toast.type' => $request->session()->get('toast.type'),
                    'toast.message' => $request->session()->get('toast.message'),
                ];
            },
            'mainMenu' => [
                [
                    'title' => 'Nhật ký hoạt động',
                    'url' => route('activity-logs.index'),
                    'icon' => 'ClipboardListIcon',
                    'permission' => 'view_activity_logs',
                ],
            ],
        ];
    }
}
