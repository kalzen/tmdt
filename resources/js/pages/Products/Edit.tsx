import { useState, FormEvent, useEffect } from 'react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
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
import { Trash2, XCircle, ChevronRight, ChevronDown } from 'lucide-react';
import { Combobox, ComboboxOption } from '@/components/ui/combobox';

interface Catalogue {
    id: number;
    name: string;
    level: number;
    parent_id?: number | null;
}

interface CatalogueTreeItem {
    id: number;
    name: string;
    level: number;
    children: CatalogueTreeItem[];
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

interface GalleryImage {
    id: number;
    url: string;
    name: string;
}

interface ProductData {
    id: number;
    title: string;
    slug: string;
    sku: string | null;
    description: string | null;
    content: string | null;
    price: number;
    sale_price: number | null;
    stock_quantity: number;
    catalogue_id: number;
    catalogues: { id: number; name: string; level: number; }[];
    store_id: number | null;
    is_active: boolean;
    is_featured: boolean;
    meta_title: string | null;
    meta_description: string | null;
    thumbnail: string | null;
    gallery: GalleryImage[];
}

interface Props {
    product: ProductData;
    catalogues: Catalogue[];
    catalogueTree: CatalogueTreeItem[]; // Add the hierarchical structure
    stores: Store[];
    attributes: Attribute[];
    productAttributes: Record<number, string>;
}

// Define an interface for the auth props
interface PageProps {
    auth: {
        user: {
            id: number;
            name: string;
            email: string;
            is_admin: boolean;
        } | null;
    };
    // Add index signature to satisfy Inertia's PageProps constraint
    [key: string]: any;
}

// CatalogueTreeView component to render the hierarchical view
const CatalogueTreeView: React.FC<{
    items: CatalogueTreeItem[],
    selectedIds: string[],
    onSelect: (id: string, checked: boolean) => void,
    primaryCatalogueId: string,
    setPrimaryCatalogue: (id: string) => void
}> = ({ items, selectedIds, onSelect, primaryCatalogueId, setPrimaryCatalogue }) => {
    const [expanded, setExpanded] = useState<Record<number, boolean>>({});

    const toggleExpand = (id: number) => {
        setExpanded(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    const renderCatalogueItem = (item: CatalogueTreeItem, depth: number = 0) => {
        const hasChildren = item.children && item.children.length > 0;
        const isExpanded = expanded[item.id] || false;
        const isSelected = selectedIds.includes(item.id.toString());
        const isPrimary = primaryCatalogueId === item.id.toString();
        
        // Calculate padding based on depth
        const paddingClass = depth === 0 ? '' : `pl-${depth * 6}`;

        return (
            <div key={item.id} className="catalogue-item">
                <div className={`flex items-center py-1 ${paddingClass}`}>
                    <div className="flex-shrink-0 w-6">
                        {hasChildren ? (
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="p-0 h-5 w-5"
                                onClick={() => toggleExpand(item.id)}
                            >
                                {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                            </Button>
                        ) : null}
                    </div>
                    
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id={`cat-${item.id}`}
                            checked={isSelected}
                            onCheckedChange={(checked) => onSelect(item.id.toString(), !!checked)}
                        />
                        <Label htmlFor={`cat-${item.id}`} className="cursor-pointer">
                            {item.name}
                        </Label>
                        
                        {isSelected && (
                            <div className="ml-2">
                                <input
                                    type="radio"
                                    id={`primary-${item.id}`}
                                    name="primary_catalogue"
                                    className="mr-1"
                                    checked={isPrimary}
                                    onChange={() => setPrimaryCatalogue(item.id.toString())}
                                />
                                <label htmlFor={`primary-${item.id}`} className="text-xs text-muted-foreground cursor-pointer">
                                    Primary
                                </label>
                            </div>
                        )}
                    </div>
                </div>
                
                {hasChildren && isExpanded && (
                    <div className="catalogue-children ml-2">
                        {item.children.map(child => renderCatalogueItem(child, depth + 1))}
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="catalogue-tree">
            {items.map(item => renderCatalogueItem(item))}
        </div>
    );
};

export default function EditProduct({ product, catalogues, catalogueTree, stores, attributes, productAttributes }: Props) {
    // Get auth information to check if user is admin
    const { auth } = usePage<PageProps>().props;
    const isAdmin = auth.user && auth.user.is_admin;

    const { data, setData, post, processing, errors } = useForm({
        title: product.title || '',
        sku: product.sku || '',
        description: product.description || '',
        content: product.content || '',
        price: product.price.toString() || '',
        sale_price: product.sale_price ? product.sale_price.toString() : '',
        stock_quantity: product.stock_quantity.toString() || '0',
        catalogue_id: product.catalogue_id ? product.catalogue_id.toString() : '',
        catalogue_ids: product.catalogues ? product.catalogues.map(c => c.id.toString()) : [],
        store_id: product.store_id ? product.store_id.toString() : '',
        is_active: product.is_active,
        is_featured: product.is_featured,
        meta_title: product.meta_title || '',
        meta_description: product.meta_description || '',
        thumbnail: null as File | null,
        gallery: [] as File[],
        attributes: {} as Record<number, string | string[]>,
        _method: 'PUT',
    });

    const [galleryFiles, setGalleryFiles] = useState<File[]>([]);
    const [existingGallery, setExistingGallery] = useState<GalleryImage[]>(product.gallery || []);
    const [editorContent, setEditorContent] = useState(product.content || '');
    const [viewMode, setViewMode] = useState<'tree' | 'flat'>('tree'); // Add view mode state
    const [expanded, setExpanded] = useState<Record<number, boolean>>({});

    useEffect(() => {
        if (productAttributes) {
            let initialAttributes = {} as Record<number, string | string[]>;

            Object.entries(productAttributes).forEach(([attrId, value]) => {
                const attribute = attributes.find(attr => attr.id === parseInt(attrId));

                if (attribute) {
                    if (attribute.type === 'multiselect') {
                        initialAttributes[parseInt(attrId)] = value.split(',');
                    } else {
                        initialAttributes[parseInt(attrId)] = value;
                    }
                }
            });

            setData('attributes', initialAttributes);
        }
    }, [productAttributes]);

    // Expand categories that contain selected items by default
    useEffect(() => {
        if (catalogueTree && data.catalogue_ids.length > 0) {
            const expandedCategories: Record<number, boolean> = {};
            
            // Helper function to find selected items in the tree
            const findSelectedInTree = (items: CatalogueTreeItem[]) => {
                items.forEach(item => {
                    // If this item is selected, expand its parent
                    if (data.catalogue_ids.includes(item.id.toString())) {
                        expandedCategories[item.id] = true;
                    }
                    
                    // Check children recursively
                    if (item.children && item.children.length > 0) {
                        const hasSelectedChild = item.children.some(
                            child => data.catalogue_ids.includes(child.id.toString()) ||
                            (child.children && child.children.some(grandchild => 
                                data.catalogue_ids.includes(grandchild.id.toString())
                            ))
                        );
                        
                        if (hasSelectedChild) {
                            expandedCategories[item.id] = true;
                        }
                        
                        findSelectedInTree(item.children);
                    }
                });
            };
            
            findSelectedInTree(catalogueTree);
            // Set expanded state
            setExpanded(expandedCategories);
        }
    }, []);

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: __('admin.products', 'Products'),
            href: route('products.index'),
        },
        {
            title: product.title,
            href: route('products.edit', product.id),
        },
    ];

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        if (editorContent) {
            setData('content', editorContent);
        }

        post(route('products.update', product.id), {
            forceFormData: true,
        });
    };

    const handleEditorChange = (content: string) => {
        setEditorContent(content);
    };

    const handleGalleryUpload = (files: File[]) => {
        setGalleryFiles([...galleryFiles, ...files]);
        setData('gallery', [...galleryFiles, ...files]);
    };

    const handleAttributeChange = (attributeId: number, value: string | string[]) => {
        setData('attributes', {
            ...data.attributes,
            [attributeId]: value,
        });
    };

    const handleDeleteGalleryImage = async (mediaId: number) => {
        if (confirm('Are you sure you want to delete this image?')) {
            try {
                const response = await fetch(route('products.delete-media', product.id), {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                    },
                    body: JSON.stringify({ media_id: mediaId }),
                });

                const result = await response.json();

                if (result.success) {
                    setExistingGallery(existingGallery.filter(img => img.id !== mediaId));
                } else {
                    alert('Failed to delete image: ' + (result.message || 'Unknown error'));
                }
            } catch (error) {
                console.error('Error deleting image:', error);
                alert('Failed to delete image');
            }
        }
    };

    const handleRemoveNewGalleryImage = (index: number) => {
        const newFiles = [...galleryFiles];
        newFiles.splice(index, 1);
        setGalleryFiles(newFiles);
        setData('gallery', newFiles);
    };

    // Handle catalogue selection in tree view
    const handleCatalogueSelect = (id: string, checked: boolean) => {
        let newCatalogueIds = [...data.catalogue_ids];
        
        if (checked) {
            newCatalogueIds.push(id);
            if (data.catalogue_id === '') {
                setData('catalogue_id', id);
            }
        } else {
            newCatalogueIds = newCatalogueIds.filter(catId => catId !== id);
            if (data.catalogue_id === id && newCatalogueIds.length > 0) {
                setData('catalogue_id', newCatalogueIds[0]);
            } else if (newCatalogueIds.length === 0) {
                setData('catalogue_id', '');
            }
        }
        
        setData('catalogue_ids', newCatalogueIds);
    };

    // Set primary catalogue
    const setPrimaryCatalogue = (id: string) => {
        setData('catalogue_id', id);
    };

    // Convert stores to combobox options format
    const storeOptions: ComboboxOption[] = stores.map(store => ({
        value: store.id.toString(),
        label: store.name
    }));

    // Add "None" option if there's more than one store and user is admin
    if (isAdmin && stores.length > 1) {
        storeOptions.unshift({
            value: "",
            label: __('admin.none', 'None')
        });
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`${__('admin.edit_product', 'Edit Product')}: ${product.title}`} />

            <div className="space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <HeadingSmall
                        title={`${__('admin.edit_product', 'Edit Product')}: ${product.title}`}
                        description={__('admin.edit_product_description', 'Update product information')}
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
                                        <Label htmlFor="slug">{__('admin.slug', 'Slug')}</Label>
                                        <Input
                                            id="slug"
                                            value={product.slug}
                                            disabled
                                            className="bg-muted"
                                        />
                                        <p className="text-sm text-muted-foreground">
                                            {__('admin.slug_auto_generated', 'Slug is auto-generated and cannot be changed')}
                                        </p>
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
                                            onChange={(e) => {
                                                setData('content', e.target.value);
                                                setEditorContent(e.target.value);
                                            }}
                                            placeholder={__('admin.full_description_placeholder', 'Detailed product description')}
                                            rows={6}
                                        />
                                        <InputError message={errors.content} />
                                    </div>

                                    <div className="grid gap-2">
                                        <div className="flex items-center justify-between">
                                            <Label htmlFor="catalogue_id">{__('admin.catalogue', 'Catalogue')} <span className="text-destructive">*</span></Label>
                                            <div className="flex items-center gap-2 text-sm">
                                                <button 
                                                    type="button"
                                                    className={`px-2 py-1 rounded ${viewMode === 'tree' ? 'bg-primary text-white' : 'bg-muted'}`}
                                                    onClick={() => setViewMode('tree')}
                                                >
                                                    Tree View
                                                </button>
                                                <button 
                                                    type="button"
                                                    className={`px-2 py-1 rounded ${viewMode === 'flat' ? 'bg-primary text-white' : 'bg-muted'}`}
                                                    onClick={() => setViewMode('flat')}
                                                >
                                                    Flat View
                                                </button>
                                            </div>
                                        </div>
                                        
                                        <div className="border rounded-md p-4 max-h-[300px] overflow-y-auto">
                                            {viewMode === 'tree' ? (
                                                <CatalogueTreeView
                                                    items={catalogueTree}
                                                    selectedIds={data.catalogue_ids}
                                                    onSelect={handleCatalogueSelect}
                                                    primaryCatalogueId={data.catalogue_id}
                                                    setPrimaryCatalogue={setPrimaryCatalogue}
                                                />
                                            ) : (
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                                    {catalogues.map((cat) => (
                                                        <div key={cat.id} className="flex items-center space-x-2">
                                                            <Checkbox
                                                                id={`catalogue-${cat.id}`}
                                                                checked={data.catalogue_ids.includes(cat.id.toString())}
                                                                onCheckedChange={(checked) => {
                                                                    handleCatalogueSelect(cat.id.toString(), !!checked);
                                                                }}
                                                            />
                                                            <Label htmlFor={`catalogue-${cat.id}`}>{cat.name}</Label>
                                                            
                                                            {data.catalogue_ids.includes(cat.id.toString()) && (
                                                                <div className="ml-2">
                                                                    <input
                                                                        type="radio"
                                                                        id={`primary-${cat.id}`}
                                                                        name="primary_catalogue"
                                                                        className="mr-1"
                                                                        checked={data.catalogue_id === cat.id.toString()}
                                                                        onChange={() => setPrimaryCatalogue(cat.id.toString())}
                                                                    />
                                                                    <label htmlFor={`primary-${cat.id}`} className="text-xs text-muted-foreground">
                                                                        Primary
                                                                    </label>
                                                                </div>
                                                            )}
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                        <div className="text-sm text-muted-foreground">
                                            {__('admin.select_multiple_catalogues', 'Select one or more catalogues for this product')}
                                        </div>
                                        <InputError message={errors.catalogue_ids || errors.catalogue_id} />
                                    </div>

                                    {stores.length > 0 && (
                                        <div className="grid gap-2">
                                            <Label htmlFor="store_id">{__('admin.store', 'Store')}</Label>
                                            <Combobox
                                                options={storeOptions}
                                                value={data.store_id}
                                                onChange={(value) => setData('store_id', value)}
                                                placeholder={__('admin.select_store', 'Select store')}
                                                emptyMessage={__('admin.no_stores_found', 'No stores found')}
                                                className="w-full"
                                                disabled={!isAdmin || stores.length === 1}
                                            />
                                            {!isAdmin && stores.length === 1 && (
                                                <p className="text-sm text-muted-foreground">
                                                    {__('admin.store_fixed', 'Products can only be assigned to your store')}
                                                </p>
                                            )}
                                            <InputError message={errors.store_id} />
                                        </div>
                                    )}

                                    <div className="flex items-center space-x-2">
                                        <Switch
                                            id="is_active"
                                            checked={data.is_active}
                                            onCheckedChange={(checked) => setData('is_active', checked)}
                                        />
                                        <Label htmlFor="is_active">{__('admin.is_active', 'Active')}</Label>
                                    </div>

                                    <div className="flex items-center space-x-2">
                                        <Switch
                                            id="is_featured"
                                            checked={data.is_featured}
                                            onCheckedChange={(checked) => setData('is_featured', checked)}
                                        />
                                        <Label htmlFor="is_featured">{__('admin.is_featured', 'Featured Product')}</Label>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

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
                                            value={product.thumbnail}
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
                                        <div className="flex flex-wrap items-center justify-between">
                                            <Label>{__('admin.gallery', 'Product Gallery')}</Label>
                                            <div className="text-sm text-muted-foreground">
                                                {existingGallery.length + galleryFiles.length} / 8 {__('admin.images', 'images')}
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                            {existingGallery.map((image) => (
                                                <div key={image.id} className="relative border rounded-md overflow-hidden">
                                                    <img
                                                        src={image.url}
                                                        alt={image.name}
                                                        className="w-full h-32 object-cover"
                                                    />
                                                    <button
                                                        type="button"
                                                        className="absolute top-2 right-2 bg-destructive text-white p-1 rounded-full"
                                                        onClick={() => handleDeleteGalleryImage(image.id)}
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </button>
                                                </div>
                                            ))}

                                            {galleryFiles.map((file, index) => (
                                                <div key={`new-${index}`} className="relative border rounded-md overflow-hidden">
                                                    <img
                                                        src={URL.createObjectURL(file)}
                                                        alt={`New gallery image ${index + 1}`}
                                                        className="w-full h-32 object-cover"
                                                    />
                                                    <button
                                                        type="button"
                                                        className="absolute top-2 right-2 bg-destructive text-white p-1 rounded-full"
                                                        onClick={() => handleRemoveNewGalleryImage(index)}
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </button>
                                                </div>
                                            ))}

                                            {(existingGallery.length + galleryFiles.length) < 8 && (
                                                <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center cursor-pointer hover:border-primary/50">
                                                    <input
                                                        type="file"
                                                        id="gallery"
                                                        multiple
                                                        className="hidden"
                                                        accept="image/*"
                                                        onChange={(e) => {
                                                            if (e.target.files) {
                                                                const files = Array.from(e.target.files);
                                                                const remaining = 8 - (existingGallery.length + galleryFiles.length);
                                                                const filesToAdd = files.slice(0, remaining);
                                                                handleGalleryUpload(filesToAdd);
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
                                                            <span className="text-xs text-muted-foreground">
                                                                {__('admin.up_to_n_images', 'Up to {count} images, max 2MB each').replace('{count}', (8 - (existingGallery.length + galleryFiles.length)).toString())}
                                                            </span>
                                                        </div>
                                                    </Label>
                                                </div>
                                            )}
                                        </div>
                                        <InputError message={errors.gallery} />
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

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
                                                            onValueChange={(value: string | string[]) => handleAttributeChange(attribute.id, value)}
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
