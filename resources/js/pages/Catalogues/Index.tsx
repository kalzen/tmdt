import HeadingSmall from '@/components/heading-small';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { MoreHorizontal, Pencil, Trash2 } from 'lucide-react';
import { __ } from '@/utils/translate';
import { CustomPagination } from '@/components/custom-pagination';

interface Catalogue {
    id: number;
    name: string;
    slug: string;
    description: string;
    parent: {
        id: number;
        name: string;
    } | null;
    level: number;
    is_active: boolean;
    position: number;
    products_count: number;
}

interface Props {
    catalogues: {
        data: Catalogue[];
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

export default function CatalogueIndex({ catalogues, filters }: Props) {
    const [searchQuery, setSearchQuery] = useState(filters.search || '');

    // Debug output to console to check the structure
    console.log('Catalogues data:', catalogues);

    // Breadcrumbs for navigation
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: __('admin.catalogues', 'Catalogues'),
            href: route('catalogues.index'),
        },
    ];

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get(route('catalogues.index'), { search: searchQuery }, { preserveState: true });
    };

    const handlePageChange = (page: number) => {
        router.get(route('catalogues.index'), { ...filters, page }, { preserveState: true });
    };

    const handlePerPageChange = (perPage: number) => {
        router.get(route('catalogues.index'), { ...filters, per_page: perPage }, { preserveState: true });
    };

    // Function to handle deletion with confirmation
    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this catalogue?')) {
            router.delete(route('catalogues.destroy', id));
        }
    };
    
    // Function to get level indicator
    const getLevelIndicator = (level: number) => {
        if (level === 0) return '';
        return '—'.repeat(level) + ' ';
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={__('admin.catalogues', 'Catalogues')} />
            
            <div className="space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <HeadingSmall 
                        title={__('admin.catalogues', 'Catalogues')} 
                        description={__('admin.catalogues_description', 'Manage your store categories and subcategories')} 
                    />
                    
                    <Link href={route('catalogues.create')}>
                        <Button>{__('admin.create_catalogue', 'Create Catalogue')}</Button>
                    </Link>
                </div>
                
                {/* Search and filters */}
                <div className="flex flex-wrap gap-4 items-center">
                    <form onSubmit={handleSearch} className="flex-1 max-w-sm">
                        <div className="relative flex items-center">
                            <Input
                                type="search"
                                placeholder={__('admin.search_catalogues', 'Search catalogues...')}
                                className="pl-4 pr-12"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <Button type="submit" size="sm" variant="ghost" className="absolute right-0">
                                {__('admin.search', 'Search')}
                            </Button>
                        </div>
                    </form>
                    
                    {/* Clear filters button */}
                    {filters.search && (
                        <Button variant="ghost" onClick={() => router.get(route('catalogues.index'), {})}>
                            {__('admin.clear_filters', 'Clear filters')}
                        </Button>
                    )}
                </div>

                {/* Catalogues table */}
                <div className="border rounded-md">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[40%]">Name</TableHead>
                                <TableHead>Parent</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Products</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {catalogues.data.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                                        {filters.search 
                                            ? `No catalogues found matching "${filters.search}"`
                                            : "No catalogues found. Add your first catalogue."}
                                    </TableCell>
                                </TableRow>
                            ) : (
                                catalogues.data.map((catalogue) => (
                                    <TableRow key={catalogue.id}>
                                        <TableCell className="font-medium">
                                            {getLevelIndicator(catalogue.level)} {catalogue.name}
                                        </TableCell>
                                        <TableCell>
                                            {catalogue.parent ? catalogue.parent.name : '—'}
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant={catalogue.is_active ? "success" : "outline"}>
                                                {catalogue.is_active ? 'Active' : 'Inactive'}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>{catalogue.products_count}</TableCell>
                                        <TableCell className="text-right">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon">
                                                        <MoreHorizontal className="h-4 w-4" />
                                                        <span className="sr-only">Open menu</span>
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem asChild>
                                                        <Link href={route('catalogues.edit', catalogue.id)}>
                                                            <Pencil className="h-4 w-4 mr-2" /> Edit
                                                        </Link>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => handleDelete(catalogue.id)}>
                                                        <Trash2 className="h-4 w-4 mr-2" /> Delete
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>

                {/* Pagination */}
                {catalogues && catalogues.data && catalogues.data.length > 0 && (
                    <div className="mt-4 border-t pt-4">
                        <CustomPagination
                            currentPage={catalogues.meta.current_page}
                            lastPage={catalogues.meta.last_page}
                            perPage={parseInt(filters.per_page || '10')}
                            total={catalogues.meta.total}
                            from={catalogues.meta.from}
                            to={catalogues.meta.to}
                            onPageChange={(page: number) => {
                                router.get(
                                    route('catalogues.index'), 
                                    { ...filters, page }, 
                                    { preserveState: true, preserveScroll: true }
                                );
                            }}
                            onPerPageChange={(perPage: number) => {
                                router.get(
                                    route('catalogues.index'), 
                                    { ...filters, per_page: perPage, page: 1 }, 
                                    { preserveState: true }
                                );
                            }}
                        />
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
