import { Head } from '@inertiajs/react';
import FrontendLayout from '@/layouts/frontend-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Link } from '@inertiajs/react';
import { Star, MapPin, Mail, Phone, Clock, ExternalLink } from 'lucide-react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  slug?: string;
  category?: {
    id: number;
    name: string;
    slug?: string;
  };
  categories?: {
    id: number;
    name: string;
    slug: string;
  }[];
}

interface Category {
  id: number;
  name: string;
  productCount: number;
}

interface Store {
  id: number;
  name: string;
  description: string;
  logo: string;
  banner: string;
  rating: number;
  reviewCount: number;
  productCount: number;
  joinDate: string;
  location: string;
  email: string;
  phone: string;
  website: string;
  openingHours: string;
  categories: Category[];
  featuredProducts: Product[];
  newProducts: Product[];
}

interface StoreDetailProps {
  store: Store;
  products: {
    data: Product[];
    links: {
      url: string | null;
      label: string;
      active: boolean;
    }[];
    meta: {
      current_page: number;
      from: number;
      last_page: number;
      links: {
        url: string | null;
        label: string;
        active: boolean;
      }[];
      path: string;
      per_page: number;
      to: number;
      total: number;
    };
  };
}

export default function StoreDetail({ store, products }: StoreDetailProps) {
  return (
    <FrontendLayout>
      <Head title={`${store.name} - TMDT Marketplace`} />
      
      <div className="container px-4 py-8 mx-auto">
        {/* Breadcrumbs */}
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/stores">Stores</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink>{store.name}</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        
        {/* Store Header */}
        <div className="relative mb-8">
          <div className="h-48 md:h-64 rounded-lg overflow-hidden">
            <img 
              src={store.banner} 
              alt={`${store.name} banner`}
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="absolute -bottom-12 left-6 w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-background overflow-hidden bg-background">
            <img 
              src={store.logo} 
              alt={store.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        
        {/* Store Info */}
        <div className="pt-12 md:pt-8 md:pl-40 mb-12">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">{store.name}</h1>
              <div className="flex items-center mt-1">
                <div className="flex items-center">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star 
                      key={i}
                      className={`h-4 w-4 ${i < Math.floor(store.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                    />
                  ))}
                  <span className="ml-1 text-sm text-muted-foreground">
                    {store.rating.toFixed(1)} ({store.reviewCount} reviews)
                  </span>
                </div>
                <span className="mx-2">•</span>
                <span className="text-sm text-muted-foreground">{store.productCount} products</span>
                <span className="mx-2">•</span>
                <span className="text-sm text-muted-foreground">Joined {store.joinDate}</span>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline">
                <Mail className="mr-2 h-4 w-4" />
                Contact
              </Button>
              <Button>
                <ExternalLink className="mr-2 h-4 w-4" />
                Visit Website
              </Button>
            </div>
          </div>
          
          <p className="text-muted-foreground mb-6">{store.description}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center">
              <MapPin className="h-5 w-5 text-muted-foreground mr-2" />
              <span>{store.location}</span>
            </div>
            <div className="flex items-center">
              <Phone className="h-5 w-5 text-muted-foreground mr-2" />
              <span>{store.phone}</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-5 w-5 text-muted-foreground mr-2" />
              <span>{store.openingHours}</span>
            </div>
          </div>
        </div>
        
        {/* Store Tabs */}
        <Tabs defaultValue="products" className="mb-12">
          <TabsList className="mb-6">
            <TabsTrigger value="products">All Products</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
          </TabsList>
          
          <TabsContent value="products">
            {/* Featured Products */}
            {store.featuredProducts.length > 0 && (
              <div className="mb-12">
                <h2 className="text-xl font-bold mb-6">Featured Products</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                  {store.featuredProducts.map((product) => (
                    <Card key={product.id} className="group overflow-hidden">
                      <div className="aspect-square relative overflow-hidden">
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-full h-full object-cover transition-transform group-hover:scale-105"
                        />
                      </div>
                      <CardContent className="p-4">
                        <Link 
                          href={route('frontend.products.show', product.slug || product.id)}
                          className="font-medium line-clamp-2 group-hover:text-primary transition-colors"
                        >
                          {product.name}
                        </Link>
                        <div className="flex items-center justify-between mt-2">
                          <span className="font-bold text-primary">${product.price.toFixed(2)}</span>
                          <div className="flex gap-1 flex-wrap justify-end">
                            {product.categories && product.categories.length > 0 ? (
                              <div className="flex flex-wrap gap-1 justify-end">
                                {product.categories.slice(0, 1).map(cat => (
                                  <span key={cat.id} className="text-xs text-muted-foreground">
                                    {cat.name}
                                  </span>
                                ))}
                                {product.categories.length > 1 && (
                                  <span className="text-xs text-muted-foreground">+{product.categories.length - 1}</span>
                                )}
                              </div>
                            ) : (
                              <span className="text-xs text-muted-foreground">
                                Uncategorized
                              </span>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
            
            {/* New Products */}
            {store.newProducts.length > 0 && (
              <div className="mb-12">
                <h2 className="text-xl font-bold mb-6">New Arrivals</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                  {store.newProducts.map((product) => (
                    <Card key={product.id} className="group overflow-hidden">
                      <div className="aspect-square relative overflow-hidden">
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-full h-full object-cover transition-transform group-hover:scale-105"
                        />
                      </div>
                      <CardContent className="p-4">
                        <Link 
                          href={route('frontend.products.show', product.slug || product.id)}
                          className="font-medium line-clamp-2 group-hover:text-primary transition-colors"
                        >
                          {product.name}
                        </Link>
                        <div className="flex items-center justify-between mt-2">
                          <span className="font-bold text-primary">${product.price.toFixed(2)}</span>
                          <div className="flex gap-1 flex-wrap justify-end">
                            {product.categories && product.categories.length > 0 ? (
                              <div className="flex flex-wrap gap-1 justify-end">
                                {product.categories.slice(0, 1).map(cat => (
                                  <span key={cat.id} className="text-xs text-muted-foreground">
                                    {cat.name}
                                  </span>
                                ))}
                                {product.categories.length > 1 && (
                                  <span className="text-xs text-muted-foreground">+{product.categories.length - 1}</span>
                                )}
                              </div>
                            ) : (
                              <span className="text-xs text-muted-foreground">
                                Uncategorized
                              </span>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
            
            {/* All Products */}
            <div>
              <h2 className="text-xl font-bold mb-6">All Products</h2>
              {products && products.data && products.data.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                  {products.data.map((product) => (
                    <Card key={product.id} className="group overflow-hidden">
                      <div className="aspect-square relative overflow-hidden">
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-full h-full object-cover transition-transform group-hover:scale-105"
                        />
                      </div>
                      <CardContent className="p-4">
                        <Link 
                          href={route('frontend.products.show', product.slug || product.id)}
                          className="font-medium line-clamp-2 group-hover:text-primary transition-colors"
                        >
                          {product.name}
                        </Link>
                        <div className="flex items-center justify-between mt-2">
                          <span className="font-bold text-primary">${product.price.toFixed(2)}</span>
                          <div className="flex gap-1 flex-wrap justify-end">
                            {product.categories && product.categories.length > 0 ? (
                              <div className="flex flex-wrap gap-1 justify-end">
                                {product.categories.slice(0, 1).map(cat => (
                                  <span key={cat.id} className="text-xs text-muted-foreground">
                                    {cat.name}
                                  </span>
                                ))}
                                {product.categories.length > 1 && (
                                  <span className="text-xs text-muted-foreground">+{product.categories.length - 1}</span>
                                )}
                              </div>
                            ) : (
                              <span className="text-xs text-muted-foreground">
                                Uncategorized
                              </span>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <p className="text-center text-muted-foreground">No products found for this store.</p>
              )}
              {/* Pagination */}
              {products && products.meta && products.meta.last_page > 1 && (
                <div className="flex justify-center mt-8">
                  {products.links.map((link, i) => (
                    <Link
                      key={i}
                      href={link.url || '#'}
                      className={`px-4 py-2 text-sm border-t border-b ${
                        i === 0 ? 'rounded-l-md border-l' : ''
                      } ${
                        i === products.links.length - 1 ? 'rounded-r-md border-r' : ''
                      } ${
                        link.active
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-background hover:bg-muted'
                      } ${!link.url ? 'opacity-50 cursor-not-allowed' : ''}`}
                      dangerouslySetInnerHTML={{ __html: link.label }}
                    />
                  ))}
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="categories">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {store.categories.map((category) => (
                <Link 
                  key={category.id}
                  href={`/products?store=${store.id}&category=${category.id}`}
                  className="block group"
                >
                  <div className="border rounded-lg p-6 transition-all hover:border-primary hover:shadow-sm">
                    <h3 className="font-medium mb-2 group-hover:text-primary">{category.name}</h3>
                    <p className="text-sm text-muted-foreground">{category.productCount} products</p>
                  </div>
                </Link>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="about">
            <div className="max-w-3xl">
              <h2 className="text-xl font-bold mb-4">About {store.name}</h2>
              <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: store.description }} />
              
              <div className="mt-8 space-y-4">
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-muted-foreground mr-3 mt-0.5" />
                  <div>
                    <h3 className="font-medium">Location</h3>
                    <p className="text-muted-foreground">{store.location}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Mail className="h-5 w-5 text-muted-foreground mr-3 mt-0.5" />
                  <div>
                    <h3 className="font-medium">Email</h3>
                    <p className="text-muted-foreground">{store.email}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Phone className="h-5 w-5 text-muted-foreground mr-3 mt-0.5" />
                  <div>
                    <h3 className="font-medium">Phone</h3>
                    <p className="text-muted-foreground">{store.phone}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <ExternalLink className="h-5 w-5 text-muted-foreground mr-3 mt-0.5" />
                  <div>
                    <h3 className="font-medium">Website</h3>
                    <a href={store.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                      {store.website}
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Clock className="h-5 w-5 text-muted-foreground mr-3 mt-0.5" />
                  <div>
                    <h3 className="font-medium">Opening Hours</h3>
                    <p className="text-muted-foreground">{store.openingHours}</p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </FrontendLayout>
  );
}
