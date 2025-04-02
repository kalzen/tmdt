import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import FrontendLayout from '@/layouts/frontend-layout';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/utils/helpers';
import { ChevronRight, Store as StoreIcon, Star, Phone, Mail } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, CarouselApi } from '@/components/ui/carousel';

interface ProductImage {
  id: number;
  url: string;
  name: string;
}

interface ProductCategory {
  id: number;
  name: string;
  slug: string;
}

interface ProductAttribute {
  name: string;
  value: string;
}

interface ProductStore {
  id: number;
  name: string;
  logo: string;
  slug: string;
}

interface Product {
  id: number;
  name: string;
  slug: string;
  sku: string | null;
  description: string | null;
  content: string | null;
  price: number;
  sale_price: number | null;
  discount_percentage: number;
  stock_quantity: number;
  is_active: boolean;
  is_featured: boolean;
  image: string;
  gallery: ProductImage[];
  categories: ProductCategory[];
  attributes: Record<string, ProductAttribute[]>;
  store: ProductStore | null;
  created_at: string;
}

interface RelatedProduct {
  id: number;
  name: string;
  slug: string;
  price: number;
  sale_price: number | null;
  image: string;
  store: {
    id: number;
    name: string;
  };
}

interface Breadcrumb {
  id: number | null;
  name: string;
  slug: string | null;
}

interface ProductDetailProps {
  product: Product;
  relatedProducts: RelatedProduct[];
  breadcrumbs: Breadcrumb[];
}

export default function ProductDetail({ product, relatedProducts, breadcrumbs }: ProductDetailProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  // Set up gallery navigation
  React.useEffect(() => {
    if (!api) return;

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  // Group product attributes for tabs
  const attributeGroups = Object.keys(product.attributes || {});

  return (
    <FrontendLayout
      title={product.name}
      description={product.description ?? undefined}
    >
      <Head title={product.name} />
      
      <div className="container px-4 py-8">
        {/* Breadcrumbs */}
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            {breadcrumbs.map((item, i) => (
              <React.Fragment key={i}>
                {i < breadcrumbs.length - 1 ? (
                  <>
                    <BreadcrumbItem>
                      <BreadcrumbLink asChild>
                        <Link href={item.slug ? route('frontend.categories.show', item.slug) : route('home')}>
                          {item.name}
                        </Link>
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator>
                      <ChevronRight className="h-4 w-4" />
                    </BreadcrumbSeparator>
                  </>
                ) : (
                  <BreadcrumbItem>
                    <BreadcrumbPage>{item.name}</BreadcrumbPage>
                  </BreadcrumbItem>
                )}
              </React.Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
        
        {/* Product Display */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          {/* Product Gallery with Thumbnails */}
          <div className="space-y-4">
            <Carousel setApi={setApi} className="w-full">
              <CarouselContent>
                {/* Use the main image first */}
                <CarouselItem>
                  <div className="aspect-square w-full relative overflow-hidden rounded-md">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </CarouselItem>

                {/* Add gallery images if available */}
                {product.gallery && product.gallery.map((image) => (
                  <CarouselItem key={image.id}>
                    <div className="aspect-square w-full relative overflow-hidden rounded-md">
                      <img 
                        src={image.url} 
                        alt={image.name || product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-2" />
              <CarouselNext className="right-2" />
            </Carousel>

            {/* Thumbnail Indicators */}
            <div className="flex items-center justify-center gap-2 mt-4">
              {/* Main image thumbnail */}
              <button 
                onClick={() => api?.scrollTo(0)}
                className={`w-16 h-16 rounded-md overflow-hidden border-2 ${current === 0 ? 'border-primary' : 'border-transparent'}`}
              >
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </button>

              {/* Gallery thumbnails */}
              {product.gallery && product.gallery.map((image, index) => (
                <button 
                  key={image.id}
                  onClick={() => api?.scrollTo(index + 1)} // +1 because the main image is first
                  className={`w-16 h-16 rounded-md overflow-hidden border-2 ${current === index + 1 ? 'border-primary' : 'border-transparent'}`}
                >
                  <img 
                    src={image.url} 
                    alt={image.name || product.name}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
          
          {/* Product Information */}
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">{product.name}</h1>
            
            {/* Price Info */}
            <div className="flex items-end gap-2 mb-4">
              {product.sale_price ? (
                <>
                  <span className="text-2xl font-bold text-primary">{formatCurrency(product.sale_price)}</span>
                  <span className="text-lg line-through text-muted-foreground">{formatCurrency(product.price)}</span>
                  <span className="text-sm px-2 py-1 bg-red-100 text-red-800 rounded-full">
                    {product.discount_percentage}% OFF
                  </span>
                </>
              ) : (
                <span className="text-2xl font-bold text-primary">{formatCurrency(product.price)}</span>
              )}
            </div>
            
            {/* Store Info if available */}
            {product.store && (
              <div className="flex items-center gap-2 mb-6 p-3 bg-muted/30 rounded-md">
                <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                  <img 
                    src={product.store.logo} 
                    alt={product.store.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <Link href={route('frontend.stores.show', product.store.slug)} className="font-medium hover:text-primary">
                    {product.store.name}
                  </Link>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
                    <span>4.8</span>
                    <span className="mx-2">•</span>
                    <span>Verified Seller</span>
                  </div>
                </div>
                <Button asChild variant="outline" size="sm" className="flex-shrink-0">
                  <Link href={route('frontend.stores.show', product.store.slug)}>
                    <StoreIcon className="h-4 w-4 mr-2" />
                    Visit Store
                  </Link>
                </Button>
              </div>
            )}
            
            {/* Basic product info */}
            <div className="space-y-4 mb-6">
              <div>
                <p className="text-sm text-muted-foreground font-medium">SKU</p>
                <p>{product.sku || 'N/A'}</p>
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground font-medium">Categories</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {product.categories && product.categories.map(category => 
                    category.slug ? (
                      <Link 
                        key={category.id}
                        href={route('frontend.categories.show', category.slug)}
                        className="text-sm px-2 py-1 bg-muted rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
                      >
                        {category.name}
                      </Link>
                    ) : (
                      <span 
                        key={category.id}
                        className="text-sm px-2 py-1 bg-muted rounded-full"
                      >
                        {category.name}
                      </span>
                    )
                  )}
                </div>
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground font-medium">Availability</p>
                {product.stock_quantity > 0 ? (
                  <p className="text-green-600">In Stock ({product.stock_quantity} available)</p>
                ) : (
                  <p className="text-red-600">Out of Stock</p>
                )}
              </div>
            </div>
            
            {/* Contact Buttons - Replacing Add to Cart */}
            <div className="mt-6 space-y-3">
              <Button className="w-full gap-2 bg-primary hover:bg-primary/90">
                <Phone className="h-4 w-4" />
                Contact Seller
              </Button>
              <Button variant="outline" className="w-full gap-2">
                <Mail className="h-4 w-4" />
                Email Inquiry
              </Button>
            </div>
          </div>
        </div>
        
        {/* Product Details Tabs */}
        <Tabs defaultValue="description" className="mt-10">
          <TabsList className="mb-6 w-full justify-start">
            <TabsTrigger value="description">Description</TabsTrigger>
            {attributeGroups.map(group => (
              <TabsTrigger key={group} value={group}>
                {group}
              </TabsTrigger>
            ))}
            <TabsTrigger value="specifications">Specifications</TabsTrigger>
          </TabsList>
          
          <TabsContent value="description" className="text-muted-foreground">
            {product.description ? (
              <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: product.description }} />
            ) : (
              <p>No description available for this product.</p>
            )}
            
            {product.content && (
              <div className="mt-8 prose max-w-none" dangerouslySetInnerHTML={{ __html: product.content }} />
            )}
          </TabsContent>
          
          {/* Dynamic tabs for attribute groups */}
          {attributeGroups.map(group => (
            <TabsContent key={group} value={group}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {product.attributes[group].map((attr, idx) => (
                  <div key={idx} className="flex border-b pb-2">
                    <p className="w-1/3 font-medium">{attr.name}</p>
                    <p className="w-2/3 text-muted-foreground">{attr.value}</p>
                  </div>
                ))}
              </div>
            </TabsContent>
          ))}
          
          <TabsContent value="specifications">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex border-b pb-2">
                <p className="w-1/3 font-medium">SKU</p>
                <p className="w-2/3 text-muted-foreground">{product.sku || 'N/A'}</p>
              </div>
              {product.store && (
                <div className="flex border-b pb-2">
                  <p className="w-1/3 font-medium">Seller</p>
                  <p className="w-2/3 text-muted-foreground">{product.store.name}</p>
                </div>
              )}
              <div className="flex border-b pb-2">
                <p className="w-1/3 font-medium">Listed Date</p>
                <p className="w-2/3 text-muted-foreground">{product.created_at}</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        {/* Related Products */}
        {relatedProducts && relatedProducts.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl font-bold mb-6">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Card key={relatedProduct.id} className="group overflow-hidden">
                  <div className="aspect-square relative overflow-hidden">
                    <img 
                      src={relatedProduct.image} 
                      alt={relatedProduct.name}
                      className="w-full h-full object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <CardContent className="p-4">
                    <Link 
                      href={route('frontend.products.show', relatedProduct.slug)}
                      className="font-medium line-clamp-2 group-hover:text-primary transition-colors"
                    >
                      {relatedProduct.name}
                    </Link>
                    <div className="flex items-center justify-between mt-2">
                      <div>
                        {relatedProduct.sale_price ? (
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-primary">{formatCurrency(relatedProduct.sale_price)}</span>
                            <span className="text-muted-foreground text-xs line-through">{formatCurrency(relatedProduct.price)}</span>
                          </div>
                        ) : (
                          <span className="font-bold text-primary">{formatCurrency(relatedProduct.price)}</span>
                        )}
                      </div>
                      <span className="text-xs text-muted-foreground">{relatedProduct.store.name}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}
      </div>
    </FrontendLayout>
  );
}
