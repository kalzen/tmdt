import HeadingSmall from '@/components/heading-small';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Pagination } from '@/components/ui/pagination';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { MoreHorizontal, Pencil, Trash2, Eye, XCircle, ArrowUpDown, Image as ImageIcon } from 'lucide-react';
import { __ } from '@/utils/translate';
import { formatCurrency } from '@/utils/helpers';

// Update the Product interface to include thumbnail from Spatie Media Library
interface Product {
    id: number;
    title: string;
    slug: string;
    sku: string | null;
    price: number;
    sale_price: number | null;
    stock_quantity: number;
    is_active: boolean;
    views: number;
    thumbnail_url: string | null; // Spatie Media Library URL
    catalogue: {
        id: number;
        name: string;
        level: number;
    };
    catalogue_count: number; // New field to show count of catalogues
    store: {
        id: number;
        name: string;
    } | null;
}

interface Catalogue {
    id: number;
    name: string;
    parent_id: number | null;
    level: number;
}

interface Props {
    products: {
        data: Product[];
        meta: {
            current_page: number;
            from: number;
            last_page: number;
            per_page: number;
            to: number;
            total: number;
        };
    };
    catalogues: Catalogue[];
    filters: {
        search: string;
        catalogue_id: string;
        status: string;
        sort: string;
        per_page: string;
    };
}

export default function ProductIndex({ products, catalogues, filters }: Props) {
    // Bảo vệ các giá trị đầu vào, đảm bảo chúng không phải null hoặc undefined
    const safeProducts = products || { data: [], meta: { current_page: 1, from: 0, last_page: 1, per_page: 10, to: 0, total: 0 } };
    const safeCatalogues = catalogues || [];
    const safeFilters = filters || {};
    
    // Đảm bảo catalogues là một mảng trước khi sử dụng
    const cataloguesArray = Array.isArray(safeCatalogues) ? safeCatalogues : [];
    
    // Khởi tạo states với kiểm tra null/undefined và giá trị mặc định an toàn
    const [searchQuery, setSearchQuery] = useState(safeFilters.search || '');
    const [catalogueId, setCatalogueId] = useState(safeFilters.catalogue_id || '');
    const [status, setStatus] = useState(safeFilters.status || '');
    
    // Loại bỏ hoàn toàn state sort
    // const [sort, setSort] = useState(safeFilters.sort || 'created_at|desc');

    // Breadcrumbs for navigation
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: __('admin.products', 'Products'),
            href: route('products.index'),
        },
    ];

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        applyFilters({ search: searchQuery });
    };

    const handleCatalogueChange = (value: string) => {
        setCatalogueId(value);
        applyFilters({ catalogue_id: value });
    };

    const handleStatusChange = (value: string) => {
        setStatus(value);
        applyFilters({ status: value });
    };

    // Loại bỏ hàm handleSortChange
    // const handleSortChange = (value: string) => {
    //     setSort(value);
    //     applyFilters({ sort: value });
    // };

    const applyFilters = (newFilters: Record<string, string>) => {
        router.get(route('products.index'), {
            ...safeFilters,
            ...newFilters,
            page: 1, // Reset to first page when changing filters
        }, {
            preserveState: true,
            replace: true,
        });
    };

    const handlePageChange = (page: number) => {
        router.get(route('products.index'), { ...safeFilters, page }, { preserveState: true });
    };

    const handlePerPageChange = (perPage: number) => {
        router.get(route('products.index'), { ...safeFilters, per_page: perPage }, { preserveState: true });
    };

    // Format catalogues for dropdown - Đảm bảo rằng chúng ta luôn làm việc với một mảng
    const formattedCatalogues = cataloguesArray.map(cat => {
        const level = cat.level || 0;
        const levelIndicator = level > 0 ? '—'.repeat(level) + ' ' : '';
        return {
            id: cat.id,
            name: levelIndicator + cat.name,
        };
    });

    // Function to handle deletion with confirmation
    const handleDelete = (id: number, name: string) => {
        if (confirm(`Are you sure you want to delete "${name}"?`)) {
            router.delete(route('products.destroy', id));
        }
    };

    // Loại bỏ sortOptions
    // const sortOptions = [
    //     { value: 'created_at|desc', label: 'Newest first' },
    //     { value: 'created_at|asc', label: 'Oldest first' },
    //     { value: 'title|asc', label: 'Title: A-Z' },
    //     { value: 'title|desc', label: 'Title: Z-A' },
    //     { value: 'price|asc', label: 'Price: Low to high' },
    //     { value: 'price|desc', label: 'Price: High to low' },
    //     { value: 'stock_quantity|asc', label: 'Stock: Low to high' },
    //     { value: 'stock_quantity|desc', label: 'Stock: High to low' },
    // ];

    // Đảm bảo products.data luôn có giá trị
    const productsData = Array.isArray(safeProducts.data) ? safeProducts.data : [];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={__('admin.products', 'Products')} />
            
            <div className="space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <HeadingSmall 
                        title={__('admin.products', 'Products')} 
                        description={__('admin.products_description', 'Manage your products inventory')} 
                    />
                    
                    <Link href={route('products.create')}>
                        <Button>{__('admin.create_product', 'Create Product')}</Button>
                    </Link>
                </div>
                
                {/* Search and filters */}
                <div className="flex flex-wrap gap-4 items-center pb-4 border-b">
                    <form onSubmit={handleSearch} className="flex-1 min-w-[240px]">
                        <div className="relative flex items-center">
                            <Input
                                type="search"
                                placeholder={__('admin.search_products', 'Search products...')}
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
                        {/* Catalogue filter - changed from Select to DropdownMenu */}
                        {formattedCatalogues.length > 0 && (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" className="min-w-[180px] justify-between">
                                        {catalogueId 
                                            ? formattedCatalogues.find(c => c.id.toString() === catalogueId)?.name 
                                            : __('admin.all_catalogues', 'All catalogues')}
                                        <svg className="h-4 w-4 opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                                        </svg>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="start" className="w-[180px] max-h-[400px] overflow-auto">
                                    <DropdownMenuItem onClick={() => handleCatalogueChange('')}>
                                        {__('admin.all_catalogues', 'All catalogues')}
                                    </DropdownMenuItem>
                                    {formattedCatalogues.map((cat) => (
                                        <DropdownMenuItem 
                                            key={cat.id} 
                                            onClick={() => handleCatalogueChange(cat.id.toString())}
                                        >
                                            {cat.name}
                                        </DropdownMenuItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        )}
                        
                        {/* Status filter - changed from Select to DropdownMenu */}
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
                        {(filters.search || filters.catalogue_id || filters.status) && (
                            <Button 
                                variant="outline" 
                                size="icon"
                                onClick={() => router.get(route('products.index'), {})}
                                title={__('admin.clear_filters', 'Clear filters')}
                            >
                                <XCircle className="h-4 w-4" />
                            </Button>
                        )}
                    </div>
                </div>

                {/* Products table */}
                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">{__('admin.image', 'Image')}</TableHead>
                                <TableHead>{__('admin.product', 'Product')}</TableHead>
                                <TableHead>{__('admin.catalogue', 'Catalogue')}</TableHead>
                                <TableHead className="text-right">{__('admin.price', 'Price')}</TableHead>
                                <TableHead className="text-center">{__('admin.stock', 'Stock')}</TableHead>
                                <TableHead className="text-center">{__('admin.status', 'Status')}</TableHead>
                                <TableHead className="text-right">{__('admin.actions', 'Actions')}</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {productsData.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={7} className="text-center text-muted-foreground py-8">
                                        {safeFilters.search || safeFilters.catalogue_id || safeFilters.status 
                                            ? __('admin.no_products_found_with_filters', 'No products match your filters.')
                                            : __('admin.no_products_found', 'No products found. Create your first product.')}
                                    </TableCell>
                                </TableRow>
                            ) : (
                                productsData.map((product) => (
                                    <TableRow key={product.id}>
                                        {/* Thumbnail Image Cell from Spatie Media */}
                                        <TableCell>
                                            <div className="w-[100px] h-[100px] flex items-center justify-center">
                                                {product.thumbnail_url ? (
                                                    <img 
                                                        src={product.thumbnail_url} 
                                                        alt={product.title}
                                                        className="max-w-[100px] max-h-[100px] object-contain"
                                                    />
                                                ) : (
                                                    <div className="w-[100px] h-[100px] flex items-center justify-center bg-muted rounded-md">
                                                        <ImageIcon className="h-8 w-8 text-muted-foreground" />
                                                    </div>
                                                )}
                                            </div>
                                        </TableCell>
                                        <TableCell className="font-medium">
                                            <div className="flex flex-col">
                                                <span className="font-medium">{product.title}</span>
                                                {product.sku && (
                                                    <span className="text-xs text-muted-foreground">SKU: {product.sku}</span>
                                                )}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            {product.catalogue.name}
                                            {product.catalogue_count > 1 && (
                                                <Badge variant="outline" className="ml-1">
                                                    +{product.catalogue_count - 1}
                                                </Badge>
                                            )}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex flex-col items-end">
                                                {product.sale_price ? (
                                                    <>
                                                        <span className="font-medium">{formatCurrency(product.sale_price)}</span>
                                                        <span className="text-xs text-muted-foreground line-through">
                                                            {formatCurrency(product.price)}
                                                        </span>
                                                    </>
                                                ) : (
                                                    <span className="font-medium">{formatCurrency(product.price)}</span>
                                                )}
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-center">
                                            <span className={product.stock_quantity <= 0 ? 'text-destructive' : ''}>
                                                {product.stock_quantity}
                                            </span>
                                        </TableCell>
                                        <TableCell className="text-center">
                                            <Badge variant={product.is_active ? "success" : "outline"}>
                                                {product.is_active 
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
                                                        <Link href={route('products.show', product.id)}>
                                                            <Eye className="h-4 w-4 mr-2" /> {__('admin.view', 'View')}
                                                        </Link>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem asChild>
                                                        <Link href={route('products.edit', product.id)}>
                                                            <Pencil className="h-4 w-4 mr-2" /> {__('admin.edit', 'Edit')}
                                                        </Link>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem 
                                                        onClick={() => handleDelete(product.id, product.title)}
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

            
            </div>
        </AppLayout>
    );
}
