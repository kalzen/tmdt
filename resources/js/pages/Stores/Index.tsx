import { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import HeadingSmall from '@/components/heading-small';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { CustomPagination } from '@/components/custom-pagination';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { MoreHorizontal, Pencil, Trash2, Eye, XCircle, PlusCircle, Store as StoreIcon } from 'lucide-react';
import { __ } from '@/utils/translate';

interface Store {
    id: number;
    name: string;
    slug: string;
    is_active: boolean;
    is_featured: boolean;
    products_count: number;
    user: {
        id: number;
        name: string;
        email: string;
    };
}

interface Props {
    stores: {
        data: Store[];
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
        per_page: string;
    };
}

export default function StoreIndex({ stores, filters }: Props) {
    const [searchQuery, setSearchQuery] = useState(filters.search || '');
    const [status, setStatus] = useState(filters.status || '');

    // Breadcrumbs for navigation
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: __('admin.stores', 'Stores'),
            href: route('stores.index'),
        },
    ];

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        applyFilters({ search: searchQuery });
    };

    const handleStatusChange = (value: string) => {
        setStatus(value);
        applyFilters({ status: value });
    };

    const applyFilters = (newFilters: Record<string, string>) => {
        router.get(route('stores.index'), {
            ...filters,
            ...newFilters,
            page: 1, // Reset to first page when changing filters
        }, {
            preserveState: true,
            replace: true,
        });
    };

    const handlePageChange = (page: number) => {
        router.get(route('stores.index'), { ...filters, page }, { preserveState: true });
    };

    const handlePerPageChange = (perPage: number) => {
        router.get(route('stores.index'), { ...filters, per_page: perPage }, { preserveState: true });
    };

    // Function to handle deletion with confirmation
    const handleDelete = (id: number, name: string) => {
        if (confirm(`Are you sure you want to delete the store "${name}"?`)) {
            router.delete(route('stores.destroy', id));
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={__('admin.stores', 'Stores')} />
            
            <div className="space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <HeadingSmall 
                        title={__('admin.stores', 'Stores')} 
                        description={__('admin.stores_description', 'Manage stores and their owners')} 
                    />
                    
                    <Link href={route('stores.create')}>
                        <Button>
                            <PlusCircle className="h-4 w-4 mr-2" />
                            {__('admin.create_store', 'Create Store')}
                        </Button>
                    </Link>
                </div>
                
                {/* Search and filters */}
                <div className="flex flex-wrap gap-4 items-center pb-4 border-b">
                    <form onSubmit={handleSearch} className="flex-1 min-w-[240px]">
                        <div className="relative flex items-center">
                            <Input
                                type="search"
                                placeholder={__('admin.search_stores', 'Search stores...')}
                                className="pl-4 pr-12"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <Button type="submit" size="sm" variant="ghost" className="absolute right-0">
                                {__('admin.search', 'Search')}
                            </Button>
                        </div>
                    </form>
                    
                    <div className="flex flex-wrap gap-2">
                        {/* Status filter */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" className="min-w-[150px] justify-between">
                                    {status === 'active' 
                                        ? __('admin.active', 'Active')
                                        : status === 'inactive' 
                                            ? __('admin.inactive', 'Inactive') 
                                            : __('admin.all_statuses', 'All statuses')}
                                    <svg className="h-4 w-4 opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                                    </svg>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="start" className="w-[150px]">
                                <DropdownMenuItem onClick={() => handleStatusChange('')}>
                                    {__('admin.all_statuses', 'All statuses')}
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleStatusChange('active')}>
                                    {__('admin.active', 'Active')}
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleStatusChange('inactive')}>
                                    {__('admin.inactive', 'Inactive')}
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        
                        {/* Clear filters button - only show if filters are applied */}
                        {(filters.search || filters.status) && (
                            <Button 
                                variant="outline" 
                                size="icon"
                                onClick={() => router.get(route('stores.index'), {})}
                                title={__('admin.clear_filters', 'Clear filters')}
                            >
                                <XCircle className="h-4 w-4" />
                            </Button>
                        )}
                    </div>
                </div>

                {/* Stores table */}
                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>{__('admin.store', 'Store')}</TableHead>
                                <TableHead>{__('admin.owner', 'Owner')}</TableHead>
                                <TableHead className="text-center">{__('admin.products', 'Products')}</TableHead>
                                <TableHead className="text-center">{__('admin.status', 'Status')}</TableHead>
                                <TableHead className="text-right">{__('admin.actions', 'Actions')}</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {stores.data.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                                        {filters.search || filters.status
                                            ? __('admin.no_stores_found_with_filters', 'No stores match your filters.')
                                            : __('admin.no_stores_found', 'No stores found. Create your first store.')}
                                    </TableCell>
                                </TableRow>
                            ) : (
                                stores.data.map((store) => (
                                    <TableRow key={store.id}>
                                        <TableCell className="font-medium">
                                            <div className="flex flex-col">
                                                <span className="font-medium">{store.name}</span>
                                                {store.is_featured && (
                                                    <Badge variant="secondary" className="w-fit mt-1">
                                                        {__('admin.featured', 'Featured')}
                                                    </Badge>
                                                )}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex flex-col">
                                                <span>{store.user.name}</span>
                                                <span className="text-xs text-muted-foreground">{store.user.email}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-center">
                                            {store.products_count}
                                        </TableCell>
                                        <TableCell className="text-center">
                                            <Badge variant={store.is_active ? "success" : "outline"}>
                                                {store.is_active 
                                                    ? __('admin.active', 'Active') 
                                                    : __('admin.inactive', 'Inactive')}
                                            </Badge>
                                        </TableCell>
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
                                                        <Link href={route('stores.show', store.id)}>
                                                            <Eye className="h-4 w-4 mr-2" /> {__('admin.view', 'View')}
                                                        </Link>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem asChild>
                                                        <Link href={route('stores.edit', store.id)}>
                                                            <Pencil className="h-4 w-4 mr-2" /> {__('admin.edit', 'Edit')}
                                                        </Link>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem 
                                                        onClick={() => handleDelete(store.id, store.name)}
                                                        className="text-destructive focus:text-destructive"
                                                    >
                                                        <Trash2 className="h-4 w-4 mr-2" /> {__('admin.delete', 'Delete')}
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
                {stores.meta && stores.meta.total > 0 && (
                    <div className="mt-4 border-t pt-4">
                        <CustomPagination
                            currentPage={stores.meta.current_page}
                            lastPage={stores.meta.last_page}
                            perPage={parseInt(filters.per_page || '10')}
                            total={stores.meta.total}
                            from={stores.meta.from}
                            to={stores.meta.to}
                            onPageChange={(page: number) => {
                                router.get(
                                  route('stores.index'),
                                  { ...filters, page },
                                  { preserveState: true, preserveScroll: true }
                                );
                              }}
                              onPerPageChange={(perPage: number) => {
                                router.get(
                                  route('stores.index'),
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
