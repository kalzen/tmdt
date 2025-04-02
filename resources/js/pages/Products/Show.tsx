import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { __ } from '@/utils/translate';
import { formatCurrency } from '@/utils/helpers';
import { ArrowLeft, Store, Tag, User, Calendar, Box, ChevronLeft, ChevronRight } from 'lucide-react';

interface GalleryImage {
  id: number;
  url: string;
  name: string;
}

interface ProductAttribute {
  id: number;
  attribute_id: number;
  product_id: number;
  text_value: string;
  attribute: {
    id: number;
    name: string;
    code: string;
    type: string;
  };
}

interface Product {
  id: number;
  title: string;
  slug: string;
  sku: string | null;
  description: string | null;
  content: string | null;
  price: number;
  sale_price: number | null;
  stock_quantity: number;
  is_active: boolean;
  is_featured: boolean;
  views: number;
  catalogue: {
    id: number;
    name: string;
    level: number;
  };
  store: {
    id: number;
    name: string;
  } | null;
  user: {
    id: number;
    name: string;
  };
  created_at: string;
  updated_at: string;
  thumbnail: string;
  gallery: GalleryImage[];
  attributes: ProductAttribute[];
}

interface Props {
  product: Product;
}

export default function ShowProduct({ product }: Props) {
  const [activeImage, setActiveImage] = useState<string>(product.thumbnail || (product.gallery.length > 0 ? product.gallery[0].url : ''));
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(-1); // -1 for thumbnail, 0+ for gallery

  const allImages = [product.thumbnail, ...product.gallery.map(img => img.url)].filter(Boolean) as string[];

  // Generate breadcrumbs for navigation
  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: __('admin.products', 'Products'),
      href: route('products.index'),
    },
    {
      title: product.title,
      href: route('products.show', product.id),
    },
  ];

  const handlePrevImage = () => {
    const newIndex = currentImageIndex <= 0 ? allImages.length - 1 : currentImageIndex - 1;
    setCurrentImageIndex(newIndex);
    setActiveImage(allImages[newIndex]);
  };

  const handleNextImage = () => {
    const newIndex = currentImageIndex >= allImages.length - 1 ? 0 : currentImageIndex + 1;
    setCurrentImageIndex(newIndex);
    setActiveImage(allImages[newIndex]);
  };

  const handleThumbnailClick = (image: string, index: number) => {
    setActiveImage(image);
    setCurrentImageIndex(index);
  };

  // Group attributes by type for easier display
  const groupedAttributes = product.attributes.reduce((acc, attr) => {
    const group = attr.attribute.type;
    if (!acc[group]) {
      acc[group] = [];
    }
    acc[group].push(attr);
    return acc;
  }, {} as Record<string, ProductAttribute[]>);

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title={product.title} />
      
      <div className="container py-8">
        <div className="flex flex-wrap justify-between items-center mb-6">
          <div className="flex items-center">
            <Link href={route('products.index')} className="mr-2">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-1" />
                {__('admin.back', 'Back')}
              </Button>
            </Link>
            <h1 className="text-3xl font-bold">{product.title}</h1>
          </div>
          
          <div className="flex items-center gap-2 mt-2 sm:mt-0">
            <Badge variant={product.is_active ? "success" : "outline"}>
              {product.is_active ? __('admin.active', 'Active') : __('admin.inactive', 'Inactive')}
            </Badge>
            {product.is_featured && <Badge variant="secondary">{__('admin.featured', 'Featured')}</Badge>}
            <Link href={route('products.edit', product.id)}>
              <Button variant="outline" size="sm">
                {__('admin.edit', 'Edit')}
              </Button>
            </Link>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product gallery */}
          <div className="space-y-4">
            <div className="relative overflow-hidden rounded-lg border bg-background aspect-square">
              {allImages.length > 0 ? (
                <>
                  <img
                    src={activeImage}
                    alt={product.title}
                    className="h-full w-full object-contain"
                  />
                  
                  {allImages.length > 1 && (
                    <>
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="absolute left-2 top-1/2 transform -translate-y-1/2 rounded-full"
                        onClick={handlePrevImage}
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-full"
                        onClick={handleNextImage}
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </>
                  )}
                </>
              ) : (
                <div className="flex items-center justify-center h-full w-full bg-muted">
                  <p className="text-muted-foreground">No image available</p>
                </div>
              )}
            </div>
            
            {allImages.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto pb-2">
                {allImages.map((image, index) => (
                  <div 
                    key={index}
                    className={`cursor-pointer border rounded-md overflow-hidden w-20 h-20 flex-shrink-0 ${activeImage === image ? 'ring-2 ring-primary' : ''}`}
                    onClick={() => handleThumbnailClick(image, index)}
                  >
                    <img 
                      src={image} 
                      alt={`${product.title} - ${index}`} 
                      className="h-full w-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Product details */}
          <div className="space-y-6">
            <div>
              <div className="flex flex-wrap items-baseline justify-between">
                <div>
                  {product.sale_price ? (
                    <>
                      <span className="text-3xl font-bold text-primary">{formatCurrency(product.sale_price)}</span>
                      <span className="ml-2 text-lg text-muted-foreground line-through">{formatCurrency(product.price)}</span>
                    </>
                  ) : (
                    <span className="text-3xl font-bold">{formatCurrency(product.price)}</span>
                  )}
                </div>
                
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Box className="h-4 w-4" />
                  <span className={product.stock_quantity <= 0 ? 'text-destructive font-medium' : ''}>
                    {product.stock_quantity > 0 
                      ? __('admin.in_stock', 'In Stock') + `: ${product.stock_quantity}`
                      : __('admin.out_of_stock', 'Out of Stock')}
                  </span>
                </div>
              </div>
              
              {product.sku && (
                <p className="text-sm text-muted-foreground mt-1">
                  SKU: {product.sku}
                </p>
              )}
            </div>
            
            {product.description && (
              <div className="mt-4">
                <h3 className="text-lg font-semibold mb-2">{__('admin.short_description', 'Short Description')}</h3>
                <p className="text-muted-foreground">{product.description}</p>
              </div>
            )}
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t">
              <div className="flex items-center gap-2">
                <Tag className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{__('admin.category', 'Category')}:</span>
                <span className="font-medium">{product.catalogue.name}</span>
              </div>
              
              {product.store && (
                <div className="flex items-center gap-2">
                  <Store className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{__('admin.store', 'Store')}:</span>
                  <span className="font-medium">{product.store.name}</span>
                </div>
              )}
              
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{__('admin.created_by', 'Created By')}:</span>
                <span className="font-medium">{product.user.name}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{__('admin.created_at', 'Created At')}:</span>
                <span className="font-medium">{new Date(product.created_at).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>
        
        <Tabs defaultValue="details" className="mt-8">
          <TabsList>
            <TabsTrigger value="details">{__('admin.details', 'Details')}</TabsTrigger>
            <TabsTrigger value="attributes">{__('admin.attributes', 'Attributes')}</TabsTrigger>
          </TabsList>
          
          <TabsContent value="details" className="py-4">
            <Card>
              <CardHeader>
                <CardTitle>{__('admin.product_details', 'Product Details')}</CardTitle>
                <CardDescription>{__('admin.full_description', 'Full Description')}</CardDescription>
              </CardHeader>
              <CardContent>
                {product.content ? (
                  <div className="prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: product.content }} />
                ) : (
                  <p className="text-muted-foreground">{__('admin.no_content', 'No detailed description available.')}</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="attributes" className="py-4">
            <Card>
              <CardHeader>
                <CardTitle>{__('admin.product_attributes', 'Product Attributes')}</CardTitle>
                <CardDescription>{__('admin.product_specifications', 'Product specifications and features')}</CardDescription>
              </CardHeader>
              <CardContent>
                {product.attributes.length > 0 ? (
                  <div className="space-y-6">
                    {Object.entries(groupedAttributes).map(([type, attributes]) => (
                      <div key={type} className="space-y-2">
                        <h3 className="font-semibold capitalize">{type}</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
                          {attributes.map((attr) => (
                            <div key={attr.id} className="flex justify-between border-b pb-1">
                              <span className="text-muted-foreground">{attr.attribute.name}:</span>
                              <span className="font-medium">{attr.text_value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">{__('admin.no_attributes', 'No attributes defined for this product.')}</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}
