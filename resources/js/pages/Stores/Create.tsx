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
import { ImageUploader } from '@/components/ui/image-uploader';
import { Checkbox } from '@/components/ui/checkbox';
import HeadingSmall from '@/components/heading-small';
import InputError from '@/components/input-error';
import { type BreadcrumbItem } from '@/types';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

interface User {
    id: number;
    name: string;
    email: string;
}

interface Catalogue {
    id: number;
    name: string;
    level: number;
}

interface Props {
    users: User[];
    catalogues: Catalogue[];
}

export default function CreateStore({ users, catalogues }: Props) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        slug: '',
        description: '',
        user_id: '',
        is_active: true,
        is_featured: false,
        address: '',
        city: '',
        state: '',
        postal_code: '',
        country: '',
        phone: '',
        email: '',
        meta_title: '',
        meta_description: '',
        logo: null as File | null,
        banner: null as File | null,
        catalogue_ids: [] as number[],
    });

    const [selectedCatalogues, setSelectedCatalogues] = useState<number[]>([]);

    // Breadcrumbs for navigation
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: __('admin.stores', 'Stores'),
            href: route('stores.index'),
        },
        {
            title: __('admin.create_store', 'Create Store'),
            href: route('stores.create'),
        },
    ];

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        
        // Set catalogue_ids from selectedCatalogues
        setData('catalogue_ids', selectedCatalogues);
        
        post(route('stores.store'), {
            forceFormData: true,
            onSuccess: () => {
                reset();
                setSelectedCatalogues([]);
            },
        });
    };

    const toggleCatalogue = (catalogueId: number) => {
        setSelectedCatalogues(current => {
            if (current.includes(catalogueId)) {
                return current.filter(id => id !== catalogueId);
            } else {
                return [...current, catalogueId];
            }
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={__('admin.create_store', 'Create Store')} />
            
            <div className="space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <HeadingSmall 
                        title={__('admin.create_store', 'Create Store')} 
                        description={__('admin.create_store_description', 'Add a new store to your marketplace')} 
                    />
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                    <Tabs defaultValue="general" className="w-full">
                        <TabsList className="mb-4">
                            <TabsTrigger value="general">{__('admin.general', 'General')}</TabsTrigger>
                            <TabsTrigger value="contact">{__('admin.contact', 'Contact')}</TabsTrigger>
                            <TabsTrigger value="media">{__('admin.media', 'Media')}</TabsTrigger>
                            <TabsTrigger value="categories">{__('admin.categories', 'Categories')}</TabsTrigger>
                            <TabsTrigger value="seo">{__('admin.seo', 'SEO')}</TabsTrigger>
                        </TabsList>

                        {/* General Tab */}
                        <TabsContent value="general">
                            <Card>
                                <CardHeader>
                                    <CardTitle>{__('admin.general_information', 'General Information')}</CardTitle>
                                    <CardDescription>{__('admin.general_information_description', 'Basic store information')}</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="name">{__('admin.store_name', 'Store Name')} <span className="text-destructive">*</span></Label>
                                        <Input
                                            id="name"
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            placeholder={__('admin.store_name_placeholder', 'Enter store name')}
                                        />
                                        <InputError message={errors.name} />
                                    </div>
                                    
                                    <div className="grid gap-2">
                                        <Label htmlFor="slug">{__('admin.slug', 'Slug')}</Label>
                                        <Input
                                            id="slug"
                                            value={data.slug}
                                            onChange={(e) => setData('slug', e.target.value)}
                                            placeholder={__('admin.slug_placeholder', 'Enter store slug (auto-generated if empty)')}
                                        />
                                        <p className="text-sm text-muted-foreground">
                                            {__('admin.slug_help', 'Used in URLs. Will be auto-generated from name if empty.')}
                                        </p>
                                        <InputError message={errors.slug} />
                                    </div>
                                    
                                    <div className="grid gap-2">
                                        <Label htmlFor="description">{__('admin.description', 'Description')}</Label>
                                        <Textarea
                                            id="description"
                                            value={data.description}
                                            onChange={(e) => setData('description', e.target.value)}
                                            placeholder={__('admin.description_placeholder', 'Enter store description')}
                                            rows={4}
                                        />
                                        <InputError message={errors.description} />
                                    </div>
                                    
                                    <div className="grid gap-2">
                                        <Label htmlFor="user_id">{__('admin.store_owner', 'Store Owner')} <span className="text-destructive">*</span></Label>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="outline" className="w-full justify-between">
                                                    {data.user_id 
                                                        ? users.find(u => u.id.toString() === data.user_id)?.name 
                                                        : __('admin.select_user', 'Select user')}
                                                    <svg className="h-4 w-4 opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                                                    </svg>
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent className="w-full max-h-[300px] overflow-auto">
                                                {users.length === 0 ? (
                                                    <DropdownMenuItem disabled>
                                                        {__('admin.no_available_users', 'No available users')}
                                                    </DropdownMenuItem>
                                                ) : (
                                                    users.map((user) => (
                                                        <DropdownMenuItem 
                                                            key={user.id} 
                                                            onClick={() => setData('user_id', user.id.toString())}
                                                        >
                                                            <div className="flex flex-col">
                                                                <span>{user.name}</span>
                                                                <span className="text-xs text-muted-foreground">{user.email}</span>
                                                            </div>
                                                        </DropdownMenuItem>
                                                    ))
                                                )}
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                        <InputError message={errors.user_id} />
                                    </div>
                                    
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
                                        <Label htmlFor="is_featured">{__('admin.is_featured', 'Featured Store')}</Label>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        {/* Contact Tab */}
                        <TabsContent value="contact">
                            <Card>
                                <CardHeader>
                                    <CardTitle>{__('admin.contact_information', 'Contact Information')}</CardTitle>
                                    <CardDescription>{__('admin.contact_information_description', 'Store contact and address details')}</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="address">{__('admin.address', 'Address')}</Label>
                                        <Input
                                            id="address"
                                            value={data.address}
                                            onChange={(e) => setData('address', e.target.value)}
                                            placeholder={__('admin.address_placeholder', 'Street address')}
                                        />
                                        <InputError message={errors.address} />
                                    </div>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="grid gap-2">
                                            <Label htmlFor="city">{__('admin.city', 'City')}</Label>
                                            <Input
                                                id="city"
                                                value={data.city}
                                                onChange={(e) => setData('city', e.target.value)}
                                                placeholder={__('admin.city_placeholder', 'City')}
                                            />
                                            <InputError message={errors.city} />
                                        </div>
                                        
                                        <div className="grid gap-2">
                                            <Label htmlFor="state">{__('admin.state', 'State/Province')}</Label>
                                            <Input
                                                id="state"
                                                value={data.state}
                                                onChange={(e) => setData('state', e.target.value)}
                                                placeholder={__('admin.state_placeholder', 'State/Province')}
                                            />
                                            <InputError message={errors.state} />
                                        </div>
                                    </div>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="grid gap-2">
                                            <Label htmlFor="postal_code">{__('admin.postal_code', 'Postal Code')}</Label>
                                            <Input
                                                id="postal_code"
                                                value={data.postal_code}
                                                onChange={(e) => setData('postal_code', e.target.value)}
                                                placeholder={__('admin.postal_code_placeholder', 'Postal Code')}
                                            />
                                            <InputError message={errors.postal_code} />
                                        </div>
                                        
                                        <div className="grid gap-2">
                                            <Label htmlFor="country">{__('admin.country', 'Country')}</Label>
                                            <Input
                                                id="country"
                                                value={data.country}
                                                onChange={(e) => setData('country', e.target.value)}
                                                placeholder={__('admin.country_placeholder', 'Country')}
                                            />
                                            <InputError message={errors.country} />
                                        </div>
                                    </div>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="grid gap-2">
                                            <Label htmlFor="phone">{__('admin.phone', 'Phone')}</Label>
                                            <Input
                                                id="phone"
                                                value={data.phone}
                                                onChange={(e) => setData('phone', e.target.value)}
                                                placeholder={__('admin.phone_placeholder', 'Phone number')}
                                            />
                                            <InputError message={errors.phone} />
                                        </div>
                                        
                                        <div className="grid gap-2">
                                            <Label htmlFor="email">{__('admin.email', 'Email')}</Label>
                                            <Input
                                                id="email"
                                                type="email"
                                                value={data.email}
                                                onChange={(e) => setData('email', e.target.value)}
                                                placeholder={__('admin.email_placeholder', 'Email address')}
                                            />
                                            <InputError message={errors.email} />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        {/* Media Tab */}
                        <TabsContent value="media">
                            <Card>
                                <CardHeader>
                                    <CardTitle>{__('admin.store_media', 'Store Media')}</CardTitle>
                                    <CardDescription>{__('admin.store_media_description', 'Store logo and banner images')}</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="grid gap-4">
                                        <Label>{__('admin.logo', 'Store Logo')}</Label>
                                        <ImageUploader
                                            id="logo"
                                            onChange={(file) => setData('logo', file)}
                                            title={__('admin.logo_image', 'Logo Image')}
                                            description={__('admin.logo_description', 'Upload a logo for this store')}
                                            error={errors.logo}
                                            helpText={__('admin.logo_help_text', 'Recommended size: 400x400px, Max 2MB')}
                                            placeholder="/assets/placeholders/logo.png"
                                            className="w-full h-40"
                                            previewClassName="w-full h-40 object-contain"
                                        />
                                    </div>
                                    
                                    <div className="grid gap-4">
                                        <Label>{__('admin.banner', 'Store Banner')}</Label>
                                        <ImageUploader
                                            id="banner"
                                            onChange={(file) => setData('banner', file)}
                                            title={__('admin.banner_image', 'Banner Image')}
                                            description={__('admin.banner_description', 'Upload a banner for this store')}
                                            error={errors.banner}
                                            helpText={__('admin.banner_help_text', 'Recommended size: 1200x300px, Max 2MB')}
                                            placeholder="/assets/placeholders/banner.png"
                                            className="w-full h-40"
                                            previewClassName="w-full h-40 object-cover"
                                        />
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        {/* Categories Tab */}
                        <TabsContent value="categories">
                            <Card>
                                <CardHeader>
                                    <CardTitle>{__('admin.store_categories', 'Store Categories')}</CardTitle>
                                    <CardDescription>{__('admin.store_categories_description', 'Select categories this store can sell products in')}</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    {catalogues.length === 0 ? (
                                        <p className="text-muted-foreground text-center py-4">
                                            {__('admin.no_categories_available', 'No categories available.')}
                                        </p>
                                    ) : (
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                                            {catalogues.map((catalogue) => (
                                                <div key={catalogue.id} className="flex items-center space-x-2">
                                                    <Checkbox
                                                        id={`catalogue-${catalogue.id}`}
                                                        checked={selectedCatalogues.includes(catalogue.id)}
                                                        onCheckedChange={() => toggleCatalogue(catalogue.id)}
                                                    />
                                                    <Label htmlFor={`catalogue-${catalogue.id}`} className="cursor-pointer">
                                                        {catalogue.name}
                                                    </Label>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                    <InputError message={errors.catalogue_ids} className="mt-2" />
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
                            {processing ? __('admin.saving', 'Saving...') : __('admin.save_store', 'Save Store')}
                        </Button>
                        <Link href={route('stores.index')}>
                            <Button variant="outline" type="button">{__('admin.cancel', 'Cancel')}</Button>
                        </Link>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
