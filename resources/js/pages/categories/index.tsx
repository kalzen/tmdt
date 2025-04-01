import HeadingSmall from '@/components/heading-small';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Pagination } from '@/components/ui/pagination';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Danh mục',
        href: route('categories.index'),
    },
];

interface Category {
    id: number;
    title: string;
    description: string;
    image: string;
    image_thumb: string;
    posts_count: number;
}

interface Props {
    categories: {
        data: Category[];
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
        per_page: string;
    };
}

export default function Categories({ categories, filters }: Props) {
    const [searchQuery, setSearchQuery] = useState(filters.search || '');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get(route('categories.index'), { search: searchQuery }, { preserveState: true });
    };

    const handlePageChange = (page: number) => {
        router.get(route('categories.index'), { ...filters, page }, { preserveState: true });
    };

    const handlePerPageChange = (perPage: number) => {
        router.get(route('categories.index'), { ...filters, per_page: perPage }, { preserveState: true });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Danh mục" />
            
            <div className="space-y-6 px-4 py-6">
                <div className="flex items-center justify-between pb-4 border-b">
                    <HeadingSmall 
                        title="Quản lý danh mục" 
                        description="Tạo, chỉnh sửa và quản lý danh mục cho bài viết" 
                    />
                    
                    <Link href={route('categories.create')}>
                        <Button>Thêm danh mục mới</Button>
                    </Link>
                </div>
                
                {/* Thêm thanh tìm kiếm */}
                <div className="flex flex-wrap gap-4 items-center">
                    <form onSubmit={handleSearch} className="flex-1 max-w-sm">
                        <div className="relative flex items-center">
                            <Input
                                type="search"
                                placeholder="Tìm kiếm danh mục..."
                                className="pl-4 pr-12"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <Button type="submit" size="sm" variant="ghost" className="absolute right-0">
                                Tìm
                            </Button>
                        </div>
                    </form>
                    
                    {/* Nút xóa bộ lọc */}
                    {filters.search && (
                        <Button variant="ghost" onClick={() => router.get(route('categories.index'), {})}>
                            Xóa bộ lọc
                        </Button>
                    )}
                </div>

                {categories.data.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                        {filters.search 
                            ? `Không tìm thấy danh mục nào phù hợp với "${filters.search}"`
                            : "Chưa có danh mục nào. Hãy thêm danh mục đầu tiên của bạn."}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {categories.data.map((category) => (
                            <div key={category.id} className="rounded-lg border bg-card text-card-foreground shadow">
                                <div className="flex flex-col">
                                    {category.image_thumb && (
                                        <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
                                            <img 
                                                src={category.image} 
                                                alt={category.title}
                                                className="h-full w-full object-cover"
                                            />
                                        </div>
                                    )}
                                    <div className="flex-1 p-6">
                                        <h3 className="text-lg font-semibold">{category.title}</h3>
                                        {category.description && (
                                            <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                                                {category.description}
                                            </p>
                                        )}
                                        <div className="mt-4">
                                            <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                                                {category.posts_count} bài viết
                                            </span>
                                        </div>
                                        <div className="mt-4 flex justify-end gap-2">
                                            <Link href={route('categories.edit', category.id)}>
                                                <Button variant="outline" size="sm">Sửa</Button>
                                            </Link>
                                            <Link 
                                                href={route('categories.destroy', category.id)} 
                                                method="delete" 
                                                as="button"
                                            >
                                                <Button variant="destructive" size="sm">Xóa</Button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {categories.meta && (
                <div className="mt-6 border-t pt-6">
                    <Pagination
                        currentPage={categories.meta.current_page}
                        lastPage={categories.meta.last_page}
                        perPage={parseInt(filters.per_page || '10')}
                        total={categories.meta.total}
                        from={categories.meta.from || 0}
                        to={categories.meta.to || 0}
                        onPageChange={handlePageChange}
                        onPerPageChange={handlePerPageChange}
                    />
                </div>
            )}
        </AppLayout>
    );
}
