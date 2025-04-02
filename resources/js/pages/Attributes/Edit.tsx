import { useState, useEffect } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { __ } from '@/utils/translate';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import HeadingSmall from '@/components/heading-small';
import InputError from '@/components/input-error';
import { type BreadcrumbItem } from '@/types';
import { Plus, Trash2 } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

interface AttributeValue {
    id: number;
    attribute_id: number;
    value: string;
    color_code: string | null;
    _action?: 'create' | 'update' | 'delete';
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
}

interface Props {
    attribute: Attribute;
    types: { value: string; label: string }[];
}

export default function EditAttribute({ attribute, types }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        name: attribute.name || '',
        code: attribute.code || '',
        type: attribute.type || '',
        is_filterable: attribute.is_filterable || false,
        is_required: attribute.is_required || false,
        display_order: attribute.display_order.toString() || '0',
        is_active: attribute.is_active || true,
        values: attribute.values || [],
        _method: 'PUT',
    });

    // State for color picker visibility
    const [showColorPicker, setShowColorPicker] = useState<Record<number, boolean>>({});
    
    // State to track if attribute type has changed
    const [originalType, setOriginalType] = useState(attribute.type);

    // Breadcrumbs for navigation
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: __('admin.attributes', 'Attributes'),
            href: route('attributes.index'),
        },
        {
            title: attribute.name,
            href: route('attributes.edit', attribute.id),
        },
    ];

    useEffect(() => {
        // If changing from a type with values to one without, mark all values for deletion
        if (!['select', 'multiselect', 'radio'].includes(data.type) && 
            ['select', 'multiselect', 'radio'].includes(originalType)) {
            setData('values', data.values.map(value => ({
                ...value,
                _action: 'delete'
            })));
        }
    }, [data.type]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('attributes.update', attribute.id));
    };

    const handleTypeChange = (value: string) => {
        setData('type', value);
    };

    const addValue = () => {
        const newValue = { value: '', _action: 'create' } as AttributeValue;
        setData('values', [...data.values, newValue]);
    };

    const removeValue = (index: number) => {
        const newValues = [...data.values];
        const valueToRemove = newValues[index];
        
        if (valueToRemove.id) {
            // If existing value, mark for deletion
            newValues[index] = { ...valueToRemove, _action: 'delete' };
            setData('values', newValues);
        } else {
            // If new value, remove from array
            newValues.splice(index, 1);
            setData('values', newValues);
        }
    };

    const updateValue = (index: number, field: string, value: string) => {
        const newValues = [...data.values];
        newValues[index] = { 
            ...newValues[index], 
            [field]: value,
            _action: newValues[index].id ? 'update' : 'create'
        };
        setData('values', newValues);
    };

    const toggleColorPicker = (index: number) => {
        setShowColorPicker({
            ...showColorPicker,
            [index]: !showColorPicker[index]
        });
    };

    // Function to check if the attribute type supports values
    const hasValues = ['select', 'multiselect', 'radio'].includes(data.type);
    
    // Filter out values marked for deletion for display purposes
    const visibleValues = data.values.filter(value => value._action !== 'delete');

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`${__('admin.edit_attribute', 'Edit Attribute')}: ${attribute.name}`} />
            
            <div className="space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <HeadingSmall 
                        title={`${__('admin.edit_attribute', 'Edit Attribute')}: ${attribute.name}`} 
                        description={__('admin.edit_attribute_description', 'Modify attribute properties')} 
                    />
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>{__('admin.attribute_information', 'Attribute Information')}</CardTitle>
                            <CardDescription>{__('admin.attribute_information_description', 'Basic attribute details')}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">{__('admin.name', 'Name')} <span className="text-destructive">*</span></Label>
                                    <Input
                                        id="name"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        placeholder={__('admin.name_placeholder', 'Attribute name')}
                                    />
                                    <InputError message={errors.name} />
                                </div>
                                
                                <div className="space-y-2">
                                    <Label htmlFor="code">{__('admin.code', 'Code')}</Label>
                                    <Input
                                        id="code"
                                        value={data.code}
                                        onChange={(e) => setData('code', e.target.value)}
                                        placeholder={__('admin.code_placeholder', 'Attribute code')}
                                    />
                                    <p className="text-sm text-muted-foreground">
                                        {__('admin.code_help', 'Used in code. Will be auto-generated from name if empty.')}
                                    </p>
                                    <InputError message={errors.code} />
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="type">{__('admin.type', 'Type')} <span className="text-destructive">*</span></Label>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="outline" className="w-full justify-between">
                                                {data.type 
                                                    ? types.find(t => t.value === data.type)?.label 
                                                    : __('admin.select_type', 'Select type')}
                                                <svg className="h-4 w-4 opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                                                </svg>
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent className="w-full">
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
                                    <InputError message={errors.type} />
                                </div>
                                
                                <div className="space-y-2">
                                    <Label htmlFor="display_order">{__('admin.display_order', 'Display Order')}</Label>
                                    <Input
                                        id="display_order"
                                        type="number"
                                        min="0"
                                        value={data.display_order}
                                        onChange={(e) => setData('display_order', e.target.value)}
                                        placeholder="0"
                                    />
                                    <InputError message={errors.display_order} />
                                </div>
                            </div>
                            
                            <div className="flex items-center gap-8">
                                <div className="flex items-center space-x-2">
                                    <Switch 
                                        id="is_filterable" 
                                        checked={data.is_filterable} 
                                        onCheckedChange={(checked) => setData('is_filterable', checked)}
                                    />
                                    <Label htmlFor="is_filterable">{__('admin.is_filterable', 'Filterable')}</Label>
                                </div>
                                
                                <div className="flex items-center space-x-2">
                                    <Switch 
                                        id="is_required" 
                                        checked={data.is_required} 
                                        onCheckedChange={(checked) => setData('is_required', checked)}
                                    />
                                    <Label htmlFor="is_required">{__('admin.is_required', 'Required')}</Label>
                                </div>
                                
                                <div className="flex items-center space-x-2">
                                    <Switch 
                                        id="is_active" 
                                        checked={data.is_active} 
                                        onCheckedChange={(checked) => setData('is_active', checked)}
                                    />
                                    <Label htmlFor="is_active">{__('admin.is_active', 'Active')}</Label>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    
                    {hasValues && (
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <div>
                                    <CardTitle>{__('admin.attribute_values', 'Attribute Values')}</CardTitle>
                                    <CardDescription>{__('admin.attribute_values_description', 'Available options for this attribute')}</CardDescription>
                                </div>
                                <Button 
                                    type="button" 
                                    onClick={addValue}
                                    variant="outline"
                                    size="sm"
                                >
                                    <Plus className="h-4 w-4 mr-2" />
                                    {__('admin.add_value', 'Add Value')}
                                </Button>
                            </CardHeader>
                            <CardContent>
                                {visibleValues.length === 0 ? (
                                    <div className="text-center py-4 text-muted-foreground">
                                        {__('admin.no_values', 'No values yet. Click "Add Value" to create options for this attribute.')}
                                    </div>
                                ) : (
                                    <div className="space-y-3">
                                        {visibleValues.map((value, index) => (
                                            <div key={value.id || `new-${index}`} className="flex items-center gap-3">
                                                <div className="flex-1">
                                                    <Input
                                                        value={value.value}
                                                        onChange={(e) => updateValue(index, 'value', e.target.value)}
                                                        placeholder={__('admin.value', 'Value')}
                                                    />
                                                </div>
                                                
                                                {data.type === 'select' && (
                                                    <div className="w-32 flex items-center gap-2">
                                                        <div 
                                                            className="w-6 h-6 rounded-full border cursor-pointer"
                                                            style={value.color_code ? { backgroundColor: value.color_code } : {}}
                                                            onClick={() => toggleColorPicker(index)}
                                                        />
                                                        {showColorPicker[index] && (
                                                            <Input
                                                                type="color"
                                                                value={value.color_code || '#000000'}
                                                                onChange={(e) => updateValue(index, 'color_code', e.target.value)}
                                                                className="w-20 h-8"
                                                            />
                                                        )}
                                                    </div>
                                                )}
                                                
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => removeValue(data.values.findIndex(v => 
                                                        (v.id && v.id === value.id) || 
                                                        (!v.id && v === value)
                                                    ))}
                                                    className="text-destructive"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    )}
                    
                    <div className="flex items-center gap-4">
                        <Button type="submit" disabled={processing}>
                            {processing ? __('admin.saving', 'Saving...') : __('admin.save_attribute', 'Save Attribute')}
                        </Button>
                        <Link href={route('attributes.index')}>
                            <Button variant="outline" type="button">{__('admin.cancel', 'Cancel')}</Button>
                        </Link>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
