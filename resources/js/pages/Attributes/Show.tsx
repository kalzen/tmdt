import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { __ } from '@/utils/translate';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { type BreadcrumbItem } from '@/types';
import { ArrowLeft, Pencil } from 'lucide-react';

interface AttributeValue {
    id: number;
    attribute_id: number;
    value: string;
    color_code: string | null;
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
    values: AttributeValue[];
    created_at: string;
    updated_at: string;
}

interface Props {
    attribute: Attribute;
}

export default function ShowAttribute({ attribute }: Props) {
    // Format attribute type for display
    const getAttributeTypeLabel = (type: string): string => {
        const types = {
            text: 'Text',
            textarea: 'Textarea',
            select: 'Select',
            multiselect: 'Multi-select',
            radio: 'Radio Buttons'
        };
        return types[type as keyof typeof types] || type;
    };

    // Breadcrumbs for navigation
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: __('admin.attributes', 'Attributes'),
            href: route('attributes.index'),
        },
        {
            title: attribute.name,
            href: route('attributes.show', attribute.id),
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`${__('admin.attribute_details', 'Attribute Details')}: ${attribute.name}`} />
            
            <div className="space-y-6 p-6">
                <div className="flex flex-wrap justify-between items-center">
                    <div className="flex items-center gap-4">
                        <Link href={route('attributes.index')}>
                            <Button variant="outline" size="sm">
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                {__('admin.back', 'Back')}
                            </Button>
                        </Link>
                        <h1 className="text-2xl font-bold">{attribute.name}</h1>
                        <Badge variant={attribute.is_active ? "success" : "outline"}>
                            {attribute.is_active 
                                ? __('admin.active', 'Active') 
                                : __('admin.inactive', 'Inactive')}
                        </Badge>
                    </div>
                    
                    <Link href={route('attributes.edit', attribute.id)}>
                        <Button>
                            <Pencil className="h-4 w-4 mr-2" />
                            {__('admin.edit', 'Edit')}
                        </Button>
                    </Link>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="md:col-span-1">
                        <CardHeader>
                            <CardTitle>{__('admin.attribute_details', 'Attribute Details')}</CardTitle>
                            <CardDescription>{__('admin.attribute_properties', 'Attribute properties and settings')}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <dl className="space-y-4">
                                <div>
                                    <dt className="text-sm font-medium text-muted-foreground">{__('admin.code', 'Code')}</dt>
                                    <dd className="font-mono text-sm mt-1">{attribute.code}</dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-muted-foreground">{__('admin.type', 'Type')}</dt>
                                    <dd className="mt-1">{getAttributeTypeLabel(attribute.type)}</dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-muted-foreground">{__('admin.display_order', 'Display Order')}</dt>
                                    <dd className="mt-1">{attribute.display_order}</dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-muted-foreground">{__('admin.filterable', 'Filterable')}</dt>
                                    <dd className="mt-1">
                                        <Badge variant={attribute.is_filterable ? "success" : "outline"}>
                                            {attribute.is_filterable ? __('admin.yes', 'Yes') : __('admin.no', 'No')}
                                        </Badge>
                                    </dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-muted-foreground">{__('admin.required', 'Required')}</dt>
                                    <dd className="mt-1">
                                        <Badge variant={attribute.is_required ? "warning" : "outline"}>
                                            {attribute.is_required ? __('admin.yes', 'Yes') : __('admin.no', 'No')}
                                        </Badge>
                                    </dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-muted-foreground">{__('admin.created_at', 'Created At')}</dt>
                                    <dd className="mt-1">{new Date(attribute.created_at).toLocaleString()}</dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-muted-foreground">{__('admin.updated_at', 'Updated At')}</dt>
                                    <dd className="mt-1">{new Date(attribute.updated_at).toLocaleString()}</dd>
                                </div>
                            </dl>
                        </CardContent>
                    </Card>
                    
                    <Card className="md:col-span-2">
                        <CardHeader>
                            <CardTitle>{__('admin.attribute_values', 'Attribute Values')}</CardTitle>
                            <CardDescription>{__('admin.available_options', 'Available options for this attribute')}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {['select', 'multiselect', 'radio'].includes(attribute.type) ? (
                                attribute.values.length > 0 ? (
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead className="w-16">#</TableHead>
                                                <TableHead>{__('admin.value', 'Value')}</TableHead>
                                                {attribute.type === 'select' && (
                                                    <TableHead>{__('admin.color', 'Color')}</TableHead>
                                                )}
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {attribute.values.map((value, index) => (
                                                <TableRow key={value.id}>
                                                    <TableCell className="font-medium">{index + 1}</TableCell>
                                                    <TableCell>{value.value}</TableCell>
                                                    {attribute.type === 'select' && (
                                                        <TableCell>
                                                            {value.color_code && (
                                                                <div className="flex items-center gap-2">
                                                                    <div 
                                                                        className="w-6 h-6 rounded-full border"
                                                                        style={{ backgroundColor: value.color_code }}
                                                                    />
                                                                    <span className="text-sm font-mono">{value.color_code}</span>
                                                                </div>
                                                            )}
                                                        </TableCell>
                                                    )}
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                ) : (
                                    <p className="text-muted-foreground text-center py-4">
                                        {__('admin.no_values_defined', 'No values have been defined for this attribute.')}
                                    </p>
                                )
                            ) : (
                                <p className="text-muted-foreground">
                                    {__('admin.text_attribute_note', 'This attribute type does not use predefined values. Values are entered when creating or editing products.')}
                                </p>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
