import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChartBarIcon, DocumentTextIcon } from '@heroicons/react/24/outline';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

interface PopularPost {
    id: number;
    title: string;
    slug: string;
    views: number;
    published_at: string;
    author: string;
}

interface ActivityLog {
    id: number;
    description: string;
    user_name: string;
    created_at: string;
}

interface Props {
    popularPosts: PopularPost[];
    recentLogs: ActivityLog[];
}

export default function Dashboard({ popularPosts = [], recentLogs = [] }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                </div>
                
                <div className="grid gap-4 md:grid-cols-2">
                    {/* Bài viết phổ biến */}
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle>Bài viết phổ biến</CardTitle>
                                <CardDescription>Bài viết có lượt xem cao nhất</CardDescription>
                            </div>
                            <DocumentTextIcon className="h-5 w-5 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {popularPosts.length === 0 ? (
                                    <div className="text-center py-4 text-muted-foreground">
                                        Không có dữ liệu
                                    </div>
                                ) : (
                                    popularPosts.map((post) => (
                                        <div key={post.id} className="flex items-start justify-between gap-4">
                                            <div className="flex-1 min-w-0">
                                                <Link 
                                                    href={route('posts.show', post.id)} 
                                                    className="font-medium hover:underline truncate block"
                                                >
                                                    {post.title}
                                                </Link>
                                                <div className="flex gap-2 text-xs text-muted-foreground mt-1">
                                                    <span>{post.author}</span>
                                                    <span>•</span>
                                                    <span>{new Date(post.published_at).toLocaleDateString()}</span>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-1 px-2 py-1 bg-muted rounded-md">
                                                <ChartBarIcon className="h-4 w-4" />
                                                <span className="text-sm font-medium">{post.views}</span>
                                            </div>
                                        </div>
                                    ))
                                )}
                                <Button variant="outline" size="sm" className="w-full" asChild>
                                    <Link href={route('posts.index')}>
                                        Xem tất cả bài viết
                                    </Link>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                
                    {/* Hoạt động gần đây */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Hoạt động gần đây</CardTitle>
                            <CardDescription>Hoạt động gần nhất trên hệ thống</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {recentLogs.map((log) => (
                                    <div key={log.id} className="flex items-start gap-2">
                                        <div className="h-2 w-2 mt-2 rounded-full bg-primary"></div>
                                        <div>
                                            <p className="text-sm font-medium">{log.description}</p>
                                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                                <span>{log.user_name}</span>
                                                <span>•</span>
                                                <span>{new Date(log.created_at).toLocaleString()}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <Button variant="outline" size="sm" className="w-full" asChild>
                                    <Link href={route('activity-logs.index')}>
                                        Xem tất cả
                                    </Link>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
                
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[60vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
                    <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                </div>
            </div>
        </AppLayout>
    );
}
