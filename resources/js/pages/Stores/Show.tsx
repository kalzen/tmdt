import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { __ } from '@/utils/translate';
import { formatStorageUrl } from '@/utils/helpers';
import { ArrowLeft, MapPin, Mail, Phone, Globe, Tag, ShoppingBag, Calendar, User, Store as StoreIcon } from 'lucide-react';

interface Catalogue {
    id: number;
    name: string;
}

interface User {
    id: number;
    name: string;
    email: string;
}

interface Store {
    id: number;
    name: string;
    slug: string;
    description: string | null;
    address: string | null;
    city: string | null;
    state: string | null;
    postal_code: string | null;
    country: string | null;
    phone: string | null;
    email: string | null;
    meta_title: string | null;
    meta_description: string | null;
    is_active: boolean;
    is_featured: boolean;
    created_at: string;
    updated_at: string;
    user: User;
    logo: string | null;
    banner: string | null;
    catalogues: Catalogue[];
}

interface Props {
    store: Store;
    productsCount: number;
}

export default function ShowStore({ store, productsCount }: Props) {
    // Format address
    const formatAddress = () => {
        const parts = [
            store.address,
            store.city,
            store.state,
            store.postal_code,
            store.country
        ].filter(Boolean);
        
        return parts.join(', ');
    };

    // Breadcrumbs for navigation
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: __('admin.stores', 'Stores'),
            href: route('stores.index'),
        },
        {
            title: store.name,
            href: route('stores.show', store.id),
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`${__('admin.store_details', 'Store Details')}: ${store.name}`} />
            
            <div className="container py-8 space-y-8">
                {/* Header with store title and actions */}
                <div className="flex flex-wrap justify-between items-center mb-6">
                    <div className="flex items-center">
                        <Link href={route('stores.index')} className="mr-2">
                            <Button variant="outline" size="sm">
                                <ArrowLeft className="h-4 w-4 mr-1" />
                                {__('admin.back', 'Back')}
                            </Button>
                        </Link>
                        <h1 className="text-3xl font-bold">{store.name}</h1>
                    </div>
                    
                    <div className="flex items-center gap-2 mt-2 sm:mt-0">
                        <Badge variant={store.is_active ? "success" : "outline"}>
                            {store.is_active ? __('admin.active', 'Active') : __('admin.inactive', 'Inactive')}
                        </Badge>
                        {store.is_featured && <Badge variant="secondary">{__('admin.featured', 'Featured')}</Badge>}
                        <Link href={route('stores.edit', store.id)}>
                            <Button>{__('admin.edit', 'Edit')}</Button>
                        </Link>
                    </div>
                </div>
                
                {/* Banner image */}
                {store.banner && (
                    <div className="w-full h-[200px] md:h-[300px] rounded-lg overflow-hidden bg-muted">
                        <img 
                            src={store.banner} 
                            alt={`${store.name} banner`} 
                            className="w-full h-full object-cover"
                        />
                    </div>
                )}
                
                {/* Store info sections */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Sidebar with logo and basic info */}
                    <div className="col-span-1">
                        <div className="space-y-6">
                            {/* Logo */}
                            {store.logo && (
                                <div className="flex justify-center">
                                    <div className="w-40 h-40 rounded-lg border overflow-hidden bg-background">
                                        <img 
                                            src={store.logo} 
                                            alt={`${store.name} logo`} 
                                            className="w-full h-full object-contain"
                                        />
                                    </div>
                                </div>
                            )}
                            
                            {/* Store Stats */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>{__('admin.store_stats', 'Store Stats')}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-center justify-between border-b pb-2 mb-2">
                                        <div className="flex items-center">
                                            <ShoppingBag className="mr-2 h-4 w-4 text-muted-foreground" />
                                            <span>{__('admin.products', 'Products')}</span>
                                        </div>
                                        <span className="font-medium">{productsCount}</span>
                                    </div>
                                    
                                    <div className="flex items-center justify-between border-b pb-2 mb-2">
                                        <div className="flex items-center">
                                            <User className="mr-2 h-4 w-4 text-muted-foreground" />
                                            <span>{__('admin.owner', 'Owner')}</span>
                                        </div>
                                        <span className="font-medium">{store.user.name}</span>
                                    </div>
                                    
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                                            <span>{__('admin.created', 'Created')}</span>
                                        </div>
                                        <span className="font-medium">
                                            {new Date(store.created_at).toLocaleDateString()}
                                        </span>
                                    </div>
                                </CardContent>
                            </Card>
                            
                            {/* Contact Information */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>{__('admin.contact_information', 'Contact Information')}</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {(store.address || store.city || store.state || store.postal_code || store.country) && (
                                        <div className="flex items-start">
                                            <MapPin className="h-5 w-5 mr-2 text-muted-foreground flex-shrink-0 mt-0.5" />
                                            <div>
                                                <p className="text-sm">{formatAddress()}</p>
                                            </div>
                                        </div>
                                    )}
                                    
                                    {store.email && (
                                        <div className="flex items-center">
                                            <Mail className="h-5 w-5 mr-2 text-muted-foreground" />
                                            <a href={`mailto:${store.email}`} className="text-sm hover:underline">
                                                {store.email}
                                            </a>
                                        </div>
                                    )}
                                    
                                    {store.phone && (
                                        <div className="flex items-center">
                                            <Phone className="h-5 w-5 mr-2 text-muted-foreground" />
                                            <a href={`tel:${store.phone}`} className="text-sm hover:underline">
                                                {store.phone}
                                            </a>
                                        </div>
                                    )}
                                    
                                    {store.slug && (
                                        <div className="flex items-center">
                                            <Globe className="h-5 w-5 mr-2 text-muted-foreground" />
                                            <span className="text-sm font-mono">{store.slug}</span>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                    
                    {/* Main content */}
                    <div className="col-span-1 md:col-span-2 space-y-6">
                        {/* Description */}
                        <Card>
                            <CardHeader>
                                <CardTitle>{__('admin.store_description', 'Store Description')}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                {store.description ? (
                                    <div className="prose prose-sm max-w-none">
                                        <p>{store.description}</p>
                                    </div>
                                ) : (
                                    <p className="text-muted-foreground italic">
                                        {__('admin.no_description', 'No description available.')}
                                    </p>
                                )}
                            </CardContent>
                        </Card>
                        
                        {/* Categories */}
                        <Card>
                            <CardHeader>
                                <CardTitle>{__('admin.store_categories', 'Store Categories')}</CardTitle>
                                <CardDescription>
                                    {__('admin.categories_this_store_sells_in', 'Categories this store can sell products in')}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                {store.catalogues && store.catalogues.length > 0 ? (
                                    <div className="flex flex-wrap gap-2">
                                        {store.catalogues.map(catalogue => (
                                            <div key={catalogue.id} className="flex items-center border rounded-md px-3 py-1">
                                                <Tag className="h-4 w-4 mr-2 text-muted-foreground" />
                                                <span>{catalogue.name}</span>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-muted-foreground italic">
                                        {__('admin.no_categories_assigned', 'No categories have been assigned to this store.')}
                                    </p>
                                )}
                            </CardContent>
                        </Card>
                        
                        {/* SEO Information */}
                        <Card>
                            <CardHeader>
                                <CardTitle>{__('admin.seo_information', 'SEO Information')}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div>
                                        <h3 className="text-sm font-semibold mb-1">
                                            {__('admin.meta_title', 'Meta Title')}
                                        </h3>
                                        {store.meta_title ? (
                                            <p>{store.meta_title}</p>
                                        ) : (
                                            <p className="text-muted-foreground italic">
                                                {__('admin.no_meta_title', 'No meta title specified.')}
                                            </p>
                                        )}
                                    </div>
                                    
                                    <div>
                                        <h3 className="text-sm font-semibold mb-1">
                                            {__('admin.meta_description', 'Meta Description')}
                                        </h3>
                                        {store.meta_description ? (
                                            <p>{store.meta_description}</p>
                                        ) : (
                                            <p className="text-muted-foreground italic">
                                                {__('admin.no_meta_description', 'No meta description specified.')}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
