import { useState, FormEvent } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { __ } from '@/utils/translate';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectTrigger, SelectValue, SelectItem } from '@/components/ui/select';
import { ImageUploader } from '@/components/ui/image-uploader';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import HeadingSmall from '@/components/heading-small';
import InputError from '@/components/input-error';
import { type BreadcrumbItem } from '@/types';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

interface Catalogue {
    id: number;
    name: string;
    level: number;
}

interface Store {
    id: number;
    name: string;
}

interface AttributeValue {
    id: number;
    value: string;
    color_code?: string | null;
    image?: string | null;
}

interface Attribute {
    id: number;
    name: string;
    code: string;
    type: string;
    is_filterable: boolean;
    is_required: boolean;
    values: AttributeValue[];
}

interface Props {
    catalogues: Catalogue[];
    stores: Store[];
    attributes: Attribute[];
}

export default function CreateProduct({ catalogues, stores, attributes }: Props) {
    const { data, setData, post, processing, errors, reset } = useForm({
        title: '',
        sku: '',
        description: '',
        content: '',
        price: '',
        sale_price: '',
        stock_quantity: '0',
        catalogue_id: '',
        catalogue_ids: [] as string[],  // Add this line for multiple catalogues
        store_id: '',
        is_active: true,
        is_featured: false,
        meta_title: '',
        meta_description: '',
        thumbnail: null as File | null,
        gallery: [] as File[],
        attributes: {} as Record<number, string | string[]>,
    });

    const [galleryFiles, setGalleryFiles] = useState<File[]>([]);
    const [editorContent, setEditorContent] = useState('');

    // Breadcrumbs for navigation
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: __('admin.products', 'Products'),
            href: route('products.index'),
        },
        {
            title: __('admin.create_product', 'Create Product'),
            href: route('products.create'),
        },
    ];

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        // Update content from editor
        if (editorContent) {
            setData('content', editorContent);
        }

        post(route('products.store'), {
            forceFormData: true,
            onSuccess: () => {
                reset();
                setGalleryFiles([]);
                setEditorContent('');
            },
        });
    };

    const handleEditorChange = (content: string) => {
        setEditorContent(content);
    };

    const handleGalleryUpload = (files: File[]) => {
        setGalleryFiles(files);
        setData('gallery', files);
    };

    const handleAttributeChange = (attributeId: number, value: string | string[]) => {
        setData('attributes', {
            ...data.attributes,
            [attributeId]: value,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={__('admin.create_product', 'Create Product')} />
            
            <div className="space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <HeadingSmall 
                        title={__('admin.create_product', 'Create Product')} 
                        description={__('admin.create_product_description', 'Add a new product to your store')} 
                    />
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                    <Tabs defaultValue="general" className="w-full">
                        <TabsList className="mb-4">
                            <TabsTrigger value="general">{__('admin.general', 'General')}</TabsTrigger>
                            <TabsTrigger value="data">{__('admin.data', 'Data')}</TabsTrigger>
                            <TabsTrigger value="media">{__('admin.media', 'Media')}</TabsTrigger>
                            <TabsTrigger value="attributes">{__('admin.attributes', 'Attributes')}</TabsTrigger>
                            <TabsTrigger value="seo">{__('admin.seo', 'SEO')}</TabsTrigger>
                        </TabsList>

                        {/* General Tab */}
                        <TabsContent value="general">
                            <Card>
                                <CardHeader>
                                    <CardTitle>{__('admin.general_information', 'General Information')}</CardTitle>
                                    <CardDescription>{__('admin.general_information_description', 'Basic product information')}</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="title">{__('admin.product_title', 'Product Title')} <span className="text-destructive">*</span></Label>
                                        <Input
                                            id="title"
                                            value={data.title}
                                            onChange={(e) => setData('title', e.target.value)}
                                            placeholder={__('admin.product_title_placeholder', 'Enter product title')}
                                        />
                                        <InputError message={errors.title} />
                                    </div>
                                    
                                    <div className="grid gap-2">
                                        <Label htmlFor="sku">{__('admin.sku', 'SKU')}</Label>
                                        <Input
                                            id="sku"
                                            value={data.sku}
                                            onChange={(e) => setData('sku', e.target.value)}
                                            placeholder={__('admin.sku_placeholder', 'Product Stock Keeping Unit')}
                                        />
                                        <InputError message={errors.sku} />
                                    </div>
                                    
                                    <div className="grid gap-2">
                                        <Label htmlFor="description">{__('admin.short_description', 'Short Description')}</Label>
                                        <Textarea
                                            id="description"
                                            value={data.description}
                                            onChange={(e) => setData('description', e.target.value)}
                                            placeholder={__('admin.short_description_placeholder', 'Brief description for product listings')}
                                            rows={3}
                                        />
                                        <InputError message={errors.description} />
                                    </div>
                                    
                                    <div className="grid gap-2">
                                        <Label htmlFor="content">{__('admin.full_description', 'Full Description')}</Label>
                                        <Textarea
                                            id="content"
                                            value={data.content}
                                            onChange={(e) => setData('content', e.target.value)}
                                            placeholder={__('admin.full_description_placeholder', 'Detailed product description')}
                                            rows={6}
                                        />
                                        <InputError message={errors.content} />
                                    </div>
                                    
                                    <div className="grid gap-2">
                                        <Label htmlFor="catalogue_id">{__('admin.catalogue', 'Catalogue')} <span className="text-destructive">*</span></Label>
                                        {/* Replace DropdownMenu with multiple selection */}
                                        <div className="border rounded-md p-4 max-h-[300px] overflow-y-auto">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                                {catalogues.map((cat) => (
                                                    <div key={cat.id} className="flex items-center space-x-2">
                                                        <Checkbox
                                                            id={`catalogue-${cat.id}`}
                                                            checked={data.catalogue_ids.includes(cat.id.toString())}
                                                            onCheckedChange={(checked) => {
                                                                const isChecked = !!checked;
                                                                let newCatalogueIds = [...data.catalogue_ids];
                                                                
                                                                if (isChecked) {
                                                                    newCatalogueIds.push(cat.id.toString());
                                                                    // If this is the first selection, also set it as the primary catalogue
                                                                    if (data.catalogue_id === '') {
                                                                        setData('catalogue_id', cat.id.toString());
                                                                    }
                                                                } else {
                                                                    newCatalogueIds = newCatalogueIds.filter(id => id !== cat.id.toString());
                                                                    // If removing the primary catalogue, set the first available as primary
                                                                    if (data.catalogue_id === cat.id.toString() && newCatalogueIds.length > 0) {
                                                                        setData('catalogue_id', newCatalogueIds[0]);
                                                                    } else if (newCatalogueIds.length === 0) {
                                                                        setData('catalogue_id', '');
                                                                    }
                                                                }
                                                                
                                                                setData('catalogue_ids', newCatalogueIds);
                                                            }}
                                                        />
                                                        <Label htmlFor={`catalogue-${cat.id}`}>{cat.name}</Label>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="text-sm text-muted-foreground">
                                            {__('admin.select_multiple_catalogues', 'Select one or more catalogues for this product')}
                                        </div>
                                        <InputError message={errors.catalogue_ids || errors.catalogue_id} />
                                    </div>
                                    
                                    {stores.length > 0 && (
                                        <div className="grid gap-2">
                                            <Label htmlFor="store_id">{__('admin.store', 'Store')}</Label>
                                            {/* Replace Select with DropdownMenu */}
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="outline" className="w-full justify-between">
                                                        {data.store_id 
                                                            ? stores.find(s => s.id.toString() === data.store_id)?.name 
                                                            : __('admin.select_store', 'Select store')}
                                                        <svg className="h-4 w-4 opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                            <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                                                        </svg>
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="center" className="w-[300px]">
                                                    <DropdownMenuItem onClick={() => setData('store_id', '')}>
                                                        {__('admin.none', 'None')}
                                                    </DropdownMenuItem>
                                                    {stores.map((store) => (
                                                        <DropdownMenuItem 
                                                            key={store.id} 
                                                            onClick={() => setData('store_id', store.id.toString())}
                                                        >
                                                            {store.name}
                                                        </DropdownMenuItem>
                                                    ))}
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                            <InputError message={errors.store_id} />
                                        </div>
                                    )}
                                    
                                    <div className="flex items-center space-x-2">
                                        <Switch 
                                            id="is_active" 
                                            checked={data.is_active} 
                                            onCheckedChange={(checked: boolean) => setData('is_active', checked as true)}
                                        />
                                        <Label htmlFor="is_active">{__('admin.is_active', 'Active')}</Label>
                                    </div>
                                    
                                    <div className="flex items-center space-x-2">
                                        <Switch 
                                            id="is_featured" 
                                            checked={data.is_featured} 
                                            onCheckedChange={(checked) => setData('is_featured', checked as false)}
                                        />
                                        <Label htmlFor="is_featured">{__('admin.is_featured', 'Featured Product')}</Label>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        {/* Data Tab */}
                        <TabsContent value="data">
                            <Card>
                                <CardHeader>
                                    <CardTitle>{__('admin.product_data', 'Product Data')}</CardTitle>
                                    <CardDescription>{__('admin.product_data_description', 'Price and inventory information')}</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="price">{__('admin.price', 'Price')} <span className="text-destructive">*</span></Label>
                                        <Input
                                            id="price"
                                            type="number"
                                            min="0"
                                            step="0.01"
                                            value={data.price}
                                            onChange={(e) => setData('price', e.target.value)}
                                            placeholder="0.00"
                                        />
                                        <InputError message={errors.price} />
                                    </div>
                                    
                                    <div className="grid gap-2">
                                        <Label htmlFor="sale_price">{__('admin.sale_price', 'Sale Price')}</Label>
                                        <Input
                                            id="sale_price"
                                            type="number"
                                            min="0"
                                            step="0.01"
                                            value={data.sale_price}
                                            onChange={(e) => setData('sale_price', e.target.value)}
                                            placeholder="0.00"
                                        />
                                        <InputError message={errors.sale_price} />
                                    </div>
                                    
                                    <div className="grid gap-2">
                                        <Label htmlFor="stock_quantity">{__('admin.stock_quantity', 'Stock Quantity')} <span className="text-destructive">*</span></Label>
                                        <Input
                                            id="stock_quantity"
                                            type="number"
                                            min="0"
                                            step="1"
                                            value={data.stock_quantity}
                                            onChange={(e) => setData('stock_quantity', e.target.value)}
                                            placeholder="0"
                                        />
                                        <InputError message={errors.stock_quantity} />
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        {/* Media Tab */}
                        <TabsContent value="media">
                            <Card>
                                <CardHeader>
                                    <CardTitle>{__('admin.product_media', 'Product Media')}</CardTitle>
                                    <CardDescription>{__('admin.product_media_description', 'Product images and gallery')}</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="grid gap-4">
                                        <Label>{__('admin.thumbnail', 'Thumbnail Image')}</Label>
                                        <ImageUploader
                                            id="thumbnail"
                                            onChange={(file) => setData('thumbnail', file)}
                                            title={__('admin.thumbnail_image', 'Thumbnail Image')}
                                            description={__('admin.thumbnail_description', 'Main product image')}
                                            error={errors.thumbnail}
                                            helpText={__('admin.image_help_text', 'Recommended size: 800x800px, Max 2MB')}
                                            placeholder="/assets/placeholders/product.png"
                                            className="w-full h-60"
                                            previewClassName="w-full h-60 object-contain"
                                        />
                                    </div>
                                    
                                    <div className="grid gap-4">
                                        <Label>{__('admin.gallery', 'Product Gallery')}</Label>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            {/* Gallery uploader UI would go here */}
                                            <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center cursor-pointer hover:border-primary/50">
                                                <input
                                                    type="file"
                                                    id="gallery"
                                                    multiple
                                                    className="hidden"
                                                    accept="image/*"
                                                    onChange={(e) => {
                                                        if (e.target.files) {
                                                            handleGalleryUpload(Array.from(e.target.files));
                                                        }
                                                    }}
                                                />
                                                <Label htmlFor="gallery" className="cursor-pointer text-center">
                                                    <div className="flex flex-col items-center gap-2">
                                                        <div className="p-2 rounded-full bg-primary/10">
                                                            <svg className="w-6 h-6 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                                            </svg>
                                                        </div>
                                                        <span className="text-sm font-medium">{__('admin.add_images', 'Add Images')}</span>
                                                        <span className="text-xs text-muted-foreground">{__('admin.up_to_5_images', 'Up to 5 images, max 2MB each')}</span>
                                                    </div>
                                                </Label>
                                            </div>
                                            
                                            {galleryFiles.map((file, index) => (
                                                <div key={index} className="relative border rounded-md overflow-hidden">
                                                    <img
                                                        src={URL.createObjectURL(file)}
                                                        alt={`Gallery image ${index + 1}`}
                                                        className="w-full h-32 object-cover"
                                                    />
                                                    <button
                                                        type="button"
                                                        className="absolute top-2 right-2 bg-destructive text-white p-1 rounded-full"
                                                        onClick={() => {
                                                            const newFiles = [...galleryFiles];
                                                            newFiles.splice(index, 1);
                                                            setGalleryFiles(newFiles);
                                                            setData('gallery', newFiles);
                                                        }}
                                                    >
                                                        <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                        <InputError message={errors.gallery} />
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        {/* Attributes Tab */}
                        <TabsContent value="attributes">
                            <Card>
                                <CardHeader>
                                    <CardTitle>{__('admin.product_attributes', 'Product Attributes')}</CardTitle>
                                    <CardDescription>{__('admin.product_attributes_description', 'Define product specifications and features')}</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-6">
                                        {attributes.length === 0 ? (
                                            <p className="text-muted-foreground text-center py-4">
                                                {__('admin.no_attributes_defined', 'No attributes have been defined yet.')}
                                            </p>
                                        ) : (
                                            attributes.map((attribute) => (
                                                <div key={attribute.id} className="border rounded-md p-4">
                                                    <h3 className="font-medium mb-2">
                                                        {attribute.name}
                                                        {attribute.is_required && <span className="text-destructive ml-1">*</span>}
                                                    </h3>
                                                    
                                                    {attribute.type === 'text' && (
                                                        <Input
                                                            placeholder={`Enter ${attribute.name.toLowerCase()}`}
                                                            value={(data.attributes[attribute.id] as string) || ''}
                                                            onChange={(e) => handleAttributeChange(attribute.id, e.target.value)}
                                                        />
                                                    )}
                                                    
                                                    {attribute.type === 'textarea' && (
                                                        <Textarea
                                                            placeholder={`Enter ${attribute.name.toLowerCase()}`}
                                                            value={(data.attributes[attribute.id] as string) || ''}
                                                            onChange={(e) => handleAttributeChange(attribute.id, e.target.value)}
                                                            rows={3}
                                                        />
                                                    )}
                                                    
                                                    {attribute.type === 'select' && (
                                                        <Select
                                                            value={(data.attributes[attribute.id] as string) || ''}
                                                            onValueChange={(value) => handleAttributeChange(attribute.id, value)}
                                                        >
                                                            <SelectTrigger>
                                                                <SelectValue placeholder={`Select ${attribute.name.toLowerCase()}`} />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                {attribute.values.map((value) => (
                                                                    <SelectItem key={value.id} value={value.id.toString()}>
                                                                        {value.value}
                                                                    </SelectItem>
                                                                ))}
                                                            </SelectContent>
                                                        </Select>
                                                    )}
                                                    
                                                    {attribute.type === 'multiselect' && (
                                                        <div className="grid grid-cols-2 gap-2">
                                                            {attribute.values.map((value) => {
                                                                const attributeValues = (data.attributes[attribute.id] as string[]) || [];
                                                                const checked = attributeValues.includes(value.id.toString());
                                                                
                                                                return (
                                                                    <div key={value.id} className="flex items-center space-x-2">
                                                                        <Checkbox
                                                                            id={`attr-${attribute.id}-${value.id}`}
                                                                            checked={checked}
                                                                            onCheckedChange={(isChecked) => {
                                                                                let newValues = [...attributeValues];
                                                                                
                                                                                if (isChecked) {
                                                                                    if (!newValues.includes(value.id.toString())) {
                                                                                        newValues.push(value.id.toString());
                                                                                    }
                                                                                } else {
                                                                                    newValues = newValues.filter(v => v !== value.id.toString());
                                                                                }
                                                                                
                                                                                handleAttributeChange(attribute.id, newValues);
                                                                            }}
                                                                        />
                                                                        <Label htmlFor={`attr-${attribute.id}-${value.id}`}>
                                                                            {value.value}
                                                                        </Label>
                                                                    </div>
                                                                );
                                                            })}
                                                        </div>
                                                    )}
                                                    
                                                    {attribute.type === 'radio' && (
                                                        <RadioGroup
                                                            value={(data.attributes[attribute.id] as string) || ''}
                                                            onValueChange={(value) => handleAttributeChange(attribute.id, value)}
                                                        >
                                                            <div className="grid grid-cols-2 gap-2">
                                                                {attribute.values.map((value) => (
                                                                    <div key={value.id} className="flex items-center space-x-2">
                                                                        <RadioGroupItem
                                                                            value={value.id.toString()}
                                                                            id={`attr-${attribute.id}-${value.id}`}
                                                                        />
                                                                        <Label htmlFor={`attr-${attribute.id}-${value.id}`}>
                                                                            {value.value}
                                                                        </Label>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </RadioGroup>
                                                    )}
                                                </div>
                                            ))
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        {/* SEO Tab */}
                        <TabsContent value="seo">
                            <Card>
                                <CardHeader>
                                    <CardTitle>{__('admin.seo_information', 'SEO Information')}</CardTitle>
                                    <CardDescription>{__('admin.seo_information_description', 'Search engine optimization details')}</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="meta_title">{__('admin.meta_title', 'Meta Title')}</Label>
                                        <Input
                                            id="meta_title"
                                            value={data.meta_title}
                                            onChange={(e) => setData('meta_title', e.target.value)}
                                            placeholder={__('admin.meta_title_placeholder', 'SEO meta title')}
                                        />
                                        <InputError message={errors.meta_title} />
                                    </div>
                                    
                                    <div className="grid gap-2">
                                        <Label htmlFor="meta_description">{__('admin.meta_description', 'Meta Description')}</Label>
                                        <Textarea
                                            id="meta_description"
                                            value={data.meta_description}
                                            onChange={(e) => setData('meta_description', e.target.value)}
                                            placeholder={__('admin.meta_description_placeholder', 'SEO meta description')}
                                            rows={3}
                                        />
                                        <InputError message={errors.meta_description} />
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>

                    <div className="flex items-center gap-4">
                        <Button type="submit" disabled={processing}>
                            {processing ? __('admin.saving', 'Saving...') : __('admin.save_product', 'Save Product')}
                        </Button>
                        <Link href={route('products.index')}>
                            <Button variant="outline" type="button">{__('admin.cancel', 'Cancel')}</Button>
                        </Link>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
