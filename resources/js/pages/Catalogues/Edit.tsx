import HeadingSmall from '@/components/heading-small';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ImageUploader } from '@/components/ui/image-uploader';
import { __ } from '@/utils/translate';

interface ParentCatalogue {
    id: number;
    name: string;
    level: number;
}

interface CatalogueData {
    id: number;
    name: string;
    slug: string;
    description: string | null;
    parent_id: number | null;
    level: number;
    position: number;
    is_active: boolean;
    meta_title: string | null;
    meta_description: string | null;
    thumbnail: string | null;
    created_at: string;
    updated_at: string;
}

interface Props {
    catalogue: CatalogueData;
    parentCatalogues: ParentCatalogue[];
}

export default function EditCatalogue({ catalogue, parentCatalogues }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        name: catalogue.name || '',
        description: catalogue.description || '',
        parent_id: catalogue.parent_id ? catalogue.parent_id.toString() : '0',
        is_active: catalogue.is_active,
        meta_title: catalogue.meta_title || '',
        meta_description: catalogue.meta_description || '',
        image: null as File | null,
        _method: 'PUT',
    });

    // Breadcrumbs for navigation
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: __('admin.catalogues', 'Catalogues'),
            href: route('catalogues.index'),
        },
        {
            title: catalogue.name,
            href: route('catalogues.edit', catalogue.id),
        },
    ];

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        post(route('catalogues.update', catalogue.id), {
            forceFormData: true,
        });
    };

    // Function to get level indicator for select options
    const getLevelIndicator = (level: number) => {
        return level === 0 ? '' : '—'.repeat(level) + ' ';
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`${__('admin.edit_catalogue', 'Edit Catalogue')}: ${catalogue.name}`} />
            
            <div className="space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <HeadingSmall 
                        title={`${__('admin.edit_catalogue', 'Edit Catalogue')}: ${catalogue.name}`} 
                        description={__('admin.edit_catalogue_description', 'Update catalogue information')} 
                    />
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                    <Tabs defaultValue="general" className="w-full">
                        <TabsList className="mb-4">
                            <TabsTrigger value="general">{__('admin.general', 'General')}</TabsTrigger>
                            <TabsTrigger value="seo">{__('admin.seo', 'SEO')}</TabsTrigger>
                            <TabsTrigger value="media">{__('admin.media', 'Media')}</TabsTrigger>
                        </TabsList>

                        {/* General Tab */}
                        <TabsContent value="general">
                            <Card>
                                <CardHeader>
                                    <CardTitle>{__('admin.general_information', 'General Information')}</CardTitle>
                                    <CardDescription>{__('admin.general_information_description', 'Basic catalogue information')}</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="name">{__('admin.name', 'Name')} <span className="text-destructive">*</span></Label>
                                        <Input
                                            id="name"
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            placeholder={__('admin.catalogue_name', 'Catalogue name')}
                                        />
                                        <InputError message={errors.name} />
                                    </div>
                                    
                                    <div className="grid gap-2">
                                        <Label htmlFor="slug">{__('admin.slug', 'Slug')}</Label>
                                        <Input
                                            id="slug"
                                            value={catalogue.slug}
                                            disabled
                                            className="bg-muted"
                                        />
                                        <p className="text-sm text-muted-foreground">
                                            {__('admin.slug_auto_generated', 'Slug is auto-generated and cannot be changed')}
                                        </p>
                                    </div>
                                    
                                    <div className="grid gap-2">
                                        <Label htmlFor="description">{__('admin.description', 'Description')}</Label>
                                        <Textarea
                                            id="description"
                                            value={data.description}
                                            onChange={(e) => setData('description', e.target.value)}
                                            placeholder={__('admin.description_placeholder', 'Enter catalogue description')}
                                            rows={3}
                                        />
                                        <InputError message={errors.description} />
                                    </div>
                                    
                                    <div className="grid gap-2">
                                        <Label htmlFor="parent_id">{__('admin.parent_catalogue', 'Parent Catalogue')}</Label>
                                        <Select 
                                            value={data.parent_id} 
                                            onValueChange={(value) => setData('parent_id', value)}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder={__('admin.select_parent', 'Select parent catalogue')} />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="0">{__('admin.none', 'None (Top level)')}</SelectItem>
                                                {parentCatalogues.map((cat) => (
                                                    <SelectItem key={cat.id} value={cat.id.toString()}>
                                                        {getLevelIndicator(cat.level)}{cat.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <InputError message={errors.parent_id} />
                                    </div>
                                    
                                    <div className="flex items-center space-x-2">
                                        <Switch 
                                            id="is_active" 
                                            checked={data.is_active} 
                                            onCheckedChange={(checked) => setData('is_active', checked)}
                                        />
                                        <Label htmlFor="is_active">{__('admin.is_active', 'Active')}</Label>
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

                        {/* Media Tab */}
                        <TabsContent value="media">
                            <Card>
                                <CardHeader>
                                    <CardTitle>{__('admin.media', 'Media')}</CardTitle>
                                    <CardDescription>{__('admin.media_description', 'Upload images for this catalogue')}</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid gap-4">
                                        <Label>{__('admin.thumbnail', 'Thumbnail Image')}</Label>
                                        <ImageUploader
                                            id="image"
                                            onChange={(file) => setData('image', file)}
                                            value={catalogue.thumbnail}
                                            title={__('admin.thumbnail_image', 'Thumbnail Image')}
                                            description={__('admin.thumbnail_description', 'Upload a thumbnail image for this catalogue')}
                                            error={errors.image}
                                            helpText={__('admin.image_help_text', 'Recommended size: 800x600px, Max 1MB')}
                                            placeholder="/assets/placeholders/thumbnail.png"
                                            className="w-full h-40"
                                            previewClassName="w-full h-40"
                                        />
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>

                    <div className="flex items-center gap-4">
                        <Button type="submit" disabled={processing}>
                            {processing ? __('admin.saving', 'Saving...') : __('admin.save_catalogue', 'Save Catalogue')}
                        </Button>
                        <Link href={route('catalogues.index')}>
                            <Button variant="outline" type="button">{__('admin.cancel', 'Cancel')}</Button>
                        </Link>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
