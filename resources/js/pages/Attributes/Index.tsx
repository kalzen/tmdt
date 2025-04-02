import HeadingSmall from '@/components/heading-small';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Pagination } from '@/components/ui/pagination';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { MoreHorizontal, Pencil, Trash2, Eye, XCircle, PlusCircle } from 'lucide-react';
import { __ } from '@/utils/translate';

interface AttributeValue {
    id: number;
    attribute_id: number;
    value: string;
    color_code: string | null;
    image: string | null;
}

interface Attribute {
    id: number;
    name: string;
    code: string;
    type: string;
    is_filterable: boolean;
    is_required: boolean;
    display_order: number;
    is_active: boolean;
    values_count: number;
    created_at: string;
    updated_at: string;
}

interface Props {
    attributes: {
        data: Attribute[];
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
        type: string;
        is_filterable: string;
        per_page: string;
    };
    types: { value: string; label: string }[];
}

export default function AttributeIndex({ attributes, filters, types }: Props) {
    const [searchQuery, setSearchQuery] = useState(filters.search || '');
    const [typeFilter, setTypeFilter] = useState(filters.type || '');
    const [filterableFilter, setFilterableFilter] = useState(filters.is_filterable || '');

    // Breadcrumbs for navigation
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: __('admin.attributes', 'Attributes'),
            href: route('attributes.index'),
        },
    ];

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        applyFilters({ search: searchQuery });
    };

    const handleTypeChange = (value: string) => {
        setTypeFilter(value);
        applyFilters({ type: value });
    };

    const handleFilterableChange = (value: string) => {
        setFilterableFilter(value);
        applyFilters({ is_filterable: value });
    };

    const applyFilters = (newFilters: Record<string, string>) => {
        router.get(route('attributes.index'), {
            ...filters,
            ...newFilters,
            page: 1, // Reset to first page when changing filters
        }, {
            preserveState: true,
            replace: true,
        });
    };

    const handlePageChange = (page: number) => {
        router.get(route('attributes.index'), { ...filters, page }, { preserveState: true });
    };

    const handlePerPageChange = (perPage: number) => {
        router.get(route('attributes.index'), { ...filters, per_page: perPage }, { preserveState: true });
    };

    // Function to handle deletion with confirmation
    const handleDelete = (id: number, name: string) => {
        if (confirm(`Are you sure you want to delete the attribute "${name}"?`)) {
            router.delete(route('attributes.destroy', id));
        }
    };

    // Function to format attribute type for display
    const getAttributeTypeLabel = (type: string): string => {
        const typeObj = types.find(t => t.value === type);
        return typeObj ? typeObj.label : type;
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={__('admin.attributes', 'Attributes')} />
            
            <div className="space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <HeadingSmall 
                        title={__('admin.attributes', 'Attributes')} 
                        description={__('admin.attributes_description', 'Manage product attributes and specifications')} 
                    />
                    
                    <Link href={route('attributes.create')}>
                        <Button>
                            <PlusCircle className="h-4 w-4 mr-2" />
                            {__('admin.create_attribute', 'Create Attribute')}
                        </Button>
                    </Link>
                </div>
                
                {/* Search and filters */}
                <div className="flex flex-wrap gap-4 items-center pb-4 border-b">
                    <form onSubmit={handleSearch} className="flex-1 min-w-[240px]">
                        <div className="relative flex items-center">
                            <Input
                                type="search"
                                placeholder={__('admin.search_attributes', 'Search attributes...')}
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
                        {/* Type filter */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" className="min-w-[150px] justify-between">
                                    {typeFilter 
                                        ? getAttributeTypeLabel(typeFilter)
                                        : __('admin.all_types', 'All Types')}
                                    <svg className="h-4 w-4 opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                                    </svg>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="start" className="w-[150px]">
                                <DropdownMenuItem onClick={() => handleTypeChange('')}>
                                    {__('admin.all_types', 'All Types')}
                                </DropdownMenuItem>
                                {types.map((type) => (
                                    <DropdownMenuItem 
                                        key={type.value} 
                                        onClick={() => handleTypeChange(type.value)}
                                    >
                                        {type.label}
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                        
                        {/* Filterable filter */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" className="min-w-[180px] justify-between">
                                    {filterableFilter === 'true' 
                                        ? __('admin.filterable', 'Filterable')
                                        : filterableFilter === 'false'
                                            ? __('admin.not_filterable', 'Not Filterable')
                                            : __('admin.any_filterable', 'Any Filterable Status')}
                                    <svg className="h-4 w-4 opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                                    </svg>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="start" className="w-[180px]">
                                <DropdownMenuItem onClick={() => handleFilterableChange('')}>
                                    {__('admin.any_filterable', 'Any Filterable Status')}
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleFilterableChange('true')}>
                                    {__('admin.filterable', 'Filterable')}
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleFilterableChange('false')}>
                                    {__('admin.not_filterable', 'Not Filterable')}
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        
                        {/* Clear filters button */}
                        {(filters.search || filters.type || filters.is_filterable) && (
                            <Button 
                                variant="outline" 
                                size="icon"
                                onClick={() => router.get(route('attributes.index'), {})}
                                title={__('admin.clear_filters', 'Clear filters')}
                            >
                                <XCircle className="h-4 w-4" />
                            </Button>
                        )}
                    </div>
                </div>

                {/* Attributes table */}
                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[30%]">{__('admin.name', 'Name')}</TableHead>
                                <TableHead className="w-[15%]">{__('admin.code', 'Code')}</TableHead>
                                <TableHead className="w-[15%]">{__('admin.type', 'Type')}</TableHead>
                                <TableHead className="text-center">{__('admin.filterable', 'Filterable')}</TableHead>
                                <TableHead className="text-center">{__('admin.required', 'Required')}</TableHead>
                                <TableHead className="text-center">{__('admin.values', 'Values')}</TableHead>
                                <TableHead className="text-center">{__('admin.status', 'Status')}</TableHead>
                                <TableHead className="text-right">{__('admin.actions', 'Actions')}</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {attributes.data.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={8} className="text-center text-muted-foreground py-8">
                                        {filters.search || filters.type || filters.is_filterable 
                                            ? __('admin.no_attributes_found_with_filters', 'No attributes match your filters.')
                                            : __('admin.no_attributes_found', 'No attributes found. Create your first attribute.')}
                                    </TableCell>
                                </TableRow>
                            ) : (
                                attributes.data.map((attribute) => (
                                    <TableRow key={attribute.id}>
                                        <TableCell className="font-medium">
                                            {attribute.name}
                                        </TableCell>
                                        <TableCell className="font-mono text-sm">
                                            {attribute.code}
                                        </TableCell>
                                        <TableCell>
                                            {getAttributeTypeLabel(attribute.type)}
                                        </TableCell>
                                        <TableCell className="text-center">
                                            <Badge variant={attribute.is_filterable ? "success" : "outline"}>
                                                {attribute.is_filterable ? __('admin.yes', 'Yes') : __('admin.no', 'No')}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-center">
                                            <Badge variant={attribute.is_required ? "warning" : "outline"}>
                                                {attribute.is_required ? __('admin.yes', 'Yes') : __('admin.no', 'No')}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-center">
                                            {attribute.values_count}
                                        </TableCell>
                                        <TableCell className="text-center">
                                            <Badge variant={attribute.is_active ? "success" : "outline"}>
                                                {attribute.is_active 
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
                                                        <Link href={route('attributes.show', attribute.id)}>
                                                            <Eye className="h-4 w-4 mr-2" /> {__('admin.view', 'View')}
                                                        </Link>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem asChild>
                                                        <Link href={route('attributes.edit', attribute.id)}>
                                                            <Pencil className="h-4 w-4 mr-2" /> {__('admin.edit', 'Edit')}
                                                        </Link>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem 
                                                        onClick={() => handleDelete(attribute.id, attribute.name)}
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
                {attributes.meta && attributes.meta.total > 0 && (
                    <div className="mt-4 border-t pt-4">
                        <Pagination
                            currentPage={attributes.meta.current_page}
                            lastPage={attributes.meta.last_page}
                            perPage={parseInt(filters.per_page || '10')}
                            total={attributes.meta.total}
                            from={attributes.meta.from || 0}
                            to={attributes.meta.to || 0}
                            onPageChange={handlePageChange}
                            onPerPageChange={handlePerPageChange}
                        />
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
