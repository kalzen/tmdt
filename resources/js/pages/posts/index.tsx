import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import HeadingSmall from '@/components/heading-small';
import { type BreadcrumbItem } from '@/types';
import { Pagination } from '@/components/ui/pagination';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ChevronDown } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Bài viết',
        href: route('posts.index'),
    },
];

interface Post {
    id: number;
    title: string;
    slug: string;
    is_published: boolean;
    published_at: string | null;
    created_at: string;
    updated_at: string;
    categories: { id: number; name: string }[];
    featured_image: string;
    featured_image_thumb: string;
}

interface Category {
    id: number;
    title: string;
}

interface Props {
    posts: {
        data: Post[];
        meta: {
            current_page: number;
            from: number;
            last_page: number;
            per_page: number;
            to: number;
            total: number;
        };
    };
    filters: {
        search: string;
        status: string;
        category: string;
        per_page: string;
    };
    categories: Category[];
}

export default function Index({ posts, filters, categories }: Props) {
    const [searchQuery, setSearchQuery] = useState(filters.search || '');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get(route('posts.index'), { search: searchQuery }, { preserveState: true });
    };

    const handleStatusFilter = (status: string) => {
        router.get(route('posts.index'), { ...filters, status }, { preserveState: true });
    };

    const handleCategoryFilter = (categoryId: string) => {
        router.get(route('posts.index'), { 
            ...filters, 
            category: categoryId === "all" ? "" : categoryId 
        }, { preserveState: true });
    };

    const handlePageChange = (page: number) => {
        router.get(route('posts.index'), { ...filters, page }, { preserveState: true });
    };

    const handlePerPageChange = (perPage: number) => {
        router.get(route('posts.index'), { ...filters, per_page: perPage }, { preserveState: true });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Bài viết" />
            
            <div className="space-y-6 px-4 py-6">
                <div className="flex items-center justify-between pb-4 border-b">
                    <HeadingSmall 
                        title="Quản lý bài viết" 
                        description="Tạo, chỉnh sửa và quản lý tất cả bài viết của bạn" 
                    />
                    
                    <Link href={route('posts.create')}>
                        <Button>Thêm bài viết mới</Button>
                    </Link>
                </div>
                
                {/* Thêm thanh tìm kiếm và bộ lọc */}
                <div className="flex flex-wrap gap-4 items-center">
                    <form onSubmit={handleSearch} className="flex-1 max-w-sm">
                        <div className="relative flex items-center">
                            <Input
                                type="search"
                                placeholder="Tìm kiếm bài viết..."
                                className="pl-4 pr-12"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <Button type="submit" size="sm" variant="ghost" className="absolute right-0">
                                Tìm
                            </Button>
                        </div>
                    </form>
                    
                    <div className="flex items-center gap-2">
                        {/* Filter theo trạng thái */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" className="flex items-center gap-1">
                                    Trạng thái <ChevronDown size={16} />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => handleStatusFilter('')}>
                                    Tất cả
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleStatusFilter('published')}>
                                    Đã xuất bản
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleStatusFilter('draft')}>
                                    Bản nháp
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        
                        {/* Filter theo danh mục - Fix here by changing empty value to "all" */}
                        <Select 
                            value={filters.category || "all"} 
                            onValueChange={(value) => handleCategoryFilter(value)}
                        >
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Chọn danh mục" />
                            </SelectTrigger>
                            <SelectContent>
                                {/* Change empty string to "all" */}
                                <SelectItem value="all">Tất cả danh mục</SelectItem>
                                {categories.map((category) => (
                                    <SelectItem key={category.id} value={String(category.id)}>{category.title}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        
                        {/* Nút xóa bộ lọc */}
                        {(filters.search || filters.status || filters.category) && (
                            <Button variant="ghost" onClick={() => router.get(route('posts.index'), {})}>
                                Xóa bộ lọc
                            </Button>
                        )}
                    </div>
                </div>

                <div className="rounded-md border">
                    <div className="relative w-full overflow-auto">
                        <table className="w-full caption-bottom text-sm">
                            <thead className="[&_tr]:border-b">
                                <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                                        Hình ảnh
                                    </th>
                                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                                        Tiêu đề
                                    </th>
                                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                                        Trạng thái
                                    </th>
                                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                                        Ngày
                                    </th>
                                    <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">
                                        Hành động
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="[&_tr:last-child]:border-0">
                                {posts.data.length === 0 ? (
                                    <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                        <td colSpan={5} className="p-4 align-middle text-center text-muted-foreground">
                                            Không tìm thấy bài viết nào. Hãy tạo bài viết đầu tiên của bạn để bắt đầu.
                                        </td>
                                    </tr>
                                ) : (
                                    posts.data.map((post) => (
                                        <tr key={post.id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                            <td className="p-4 align-middle">
                                                {post.featured_image_thumb && (
                                                    <img 
                                                        src={post.featured_image_thumb} 
                                                        alt={post.title} 
                                                        className="w-16 h-16 object-cover rounded"
                                                    />
                                                )}
                                            </td>
                                            <td className="p-4 align-middle">
                                                <div>
                                                    <div className="font-medium">{post.title}</div>
                                                    <div className="text-sm text-muted-foreground">{post.slug}</div>
                                                </div>
                                            </td>
                                            <td className="p-4 align-middle">
                                                <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                                    post.is_published ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'
                                                }`}>
                                                    {post.is_published ? 'Đã xuất bản' : 'Bản nháp'}
                                                </span>
                                            </td>
                                            <td className="p-4 align-middle">
                                                {post.is_published && post.published_at 
                                                    ? new Date(post.published_at).toLocaleDateString() 
                                                    : new Date(post.created_at).toLocaleDateString()}
                                            </td>
                                            <td className="p-4 align-middle text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Link href={route('posts.edit', post.id)}>
                                                        <Button variant="outline" size="sm">Sửa</Button>
                                                    </Link>
                                                    <Link href={route('posts.destroy', post.id)} method="delete" as="span" className="inline-block">
                                                        <Button variant="destructive" size="sm">Xóa</Button>
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {posts.meta && (
                <div className="mt-6 border-t pt-6">
                    <Pagination
                        currentPage={posts.meta.current_page}
                        lastPage={posts.meta.last_page}
                        perPage={parseInt(filters.per_page || '10')}
                        total={posts.meta.total}
                        from={posts.meta.from || 0}
                        to={posts.meta.to || 0}
                        onPageChange={handlePageChange}
                        onPerPageChange={handlePerPageChange}
                    />
                </div>
            )}
        </AppLayout>
    );
}
