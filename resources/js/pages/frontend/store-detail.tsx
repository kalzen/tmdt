import { Head } from '@inertiajs/react';
import FrontendLayout from '@/layouts/frontend-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Link } from '@inertiajs/react';
import { Star, MapPin, Mail, Phone, Clock, ExternalLink, Crown, ShieldCheck, Building2 } from 'lucide-react';
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
  tax_number: string;
  bio: string;
  categories: Category[];
  featuredProducts: Product[];
  newProducts: Product[];
  is_gold: boolean;
  is_verified: boolean;
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
      <Head title={`${store.name} - 84Gate Marketplace`} />
      
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
              <div className="flex items-center gap-2">
                <h1 className="text-2xl md:text-3xl font-bold">{store.name}</h1>
                {store.is_gold ? (
                  <div className="text-yellow-500 bg-yellow-50 px-2 py-1 rounded-full text-xs flex items-center gap-1">
                    <Crown className="h-3 w-3" />
                    <span>Gold Member</span>
                  </div>
                ) : store.is_verified && (
                  <div className="text-blue-500 bg-blue-50 px-2 py-1 rounded-full text-xs flex items-center gap-1">
                    <ShieldCheck className="h-3 w-3" />
                    <span>Verified</span>
                  </div>
                )}
              </div>
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
          
          {/* Products Tab Content */}
          <TabsContent value="products">
            {/* Featured Products */}
            {store.featuredProducts.length > 0 && (
              <div className="mb-12">
                <h2 className="text-xl font-bold mb-6">Featured Products</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {store.featuredProducts.map((product) => (
                    <Card key={product.id} className="overflow-hidden">
                      <Link href={`/products/${product.slug}`}>
                        <div className="aspect-square overflow-hidden">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover transition-transform hover:scale-105"
                          />
                        </div>
                        <CardContent className="p-4">
                          {product.category && (
                            <Link
                              href={`/categories/${product.category.slug}`}
                              className="text-xs text-muted-foreground hover:text-primary"
                            >
                              {product.category.name}
                            </Link>
                          )}
                          <h3 className="font-medium mt-1 mb-2 line-clamp-2">{product.name}</h3>
                          <p className="font-bold text-primary">
                            ${product.price.toLocaleString()}
                          </p>
                        </CardContent>
                      </Link>
                    </Card>
                  ))}
                </div>
              </div>
            )}
            
            {/* New Products */}
            {store.newProducts.length > 0 && (
              <div className="mb-12">
                <h2 className="text-xl font-bold mb-6">New Products</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {store.newProducts.map((product) => (
                    <Card key={product.id} className="overflow-hidden">
                      <Link href={`/products/${product.slug}`}>
                        <div className="aspect-square overflow-hidden">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover transition-transform hover:scale-105"
                          />
                        </div>
                        <CardContent className="p-4">
                          {product.category && (
                            <Link
                              href={`/categories/${product.category.slug}`}
                              className="text-xs text-muted-foreground hover:text-primary"
                            >
                              {product.category.name}
                            </Link>
                          )}
                          <h3 className="font-medium mt-1 mb-2 line-clamp-2">{product.name}</h3>
                          <p className="font-bold text-primary">
                            ${product.price.toLocaleString()}
                          </p>
                        </CardContent>
                      </Link>
                    </Card>
                  ))}
                </div>
              </div>
            )}
            
            {/* All Products */}
            <div>
              <h2 className="text-xl font-bold mb-6">All Products</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {products.data.map((product) => (
                  <Card key={product.id} className="overflow-hidden">
                    <Link href={`/products/${product.slug}`}>
                      <div className="aspect-square overflow-hidden">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover transition-transform hover:scale-105"
                        />
                      </div>
                      <CardContent className="p-4">
                        {product.category && (
                          <Link
                            href={`/categories/${product.category.slug}`}
                            className="text-xs text-muted-foreground hover:text-primary"
                          >
                            {product.category.name}
                          </Link>
                        )}
                        <h3 className="font-medium mt-1 mb-2 line-clamp-2">{product.name}</h3>
                        <p className="font-bold text-primary">
                          ${product.price.toLocaleString()}
                        </p>
                      </CardContent>
                    </Link>
                  </Card>
                ))}
              </div>
              
              
            </div>
          </TabsContent>
          
          {/* Categories Tab Content */}
          <TabsContent value="categories">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {store.categories.map((category) => (
                <Card key={category.id}>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-2">{category.name}</h3>
                    <p className="text-muted-foreground">
                      {category.productCount} products
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          {/* About Tab Content - Updated with tax number and bio */}
          <TabsContent value="about">
            <div className="max-w-3xl">
              <h2 className="text-xl font-bold mb-4">About {store.name}</h2>
              
              {store.bio && (
                <div className="mb-8">
                  <h3 className="font-medium mb-2">Store Bio</h3>
                  <div className="prose max-w-none">
                    {store.description}
                  </div>
                </div>
              )}
              
              <div className="mt-8 space-y-4">
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-muted-foreground mr-3 mt-0.5" />
                  <div>
                    <h3 className="font-medium">Location</h3>
                    <p className="text-muted-foreground">{store.location}</p>
                  </div>
                </div>

                {store.tax_number && (
                  <div className="flex items-start">
                    <Building2 className="h-5 w-5 text-muted-foreground mr-3 mt-0.5" />
                    <div>
                      <h3 className="font-medium">Tax Number</h3>
                      <p className="text-muted-foreground">{store.tax_number}</p>
                    </div>
                  </div>
                )}
                
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
