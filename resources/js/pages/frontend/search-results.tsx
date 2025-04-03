import React from 'react';
import { Head, Link } from '@inertiajs/react';
import FrontendLayout from '@/layouts/frontend-layout';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Pagination } from '@/components/ui/pagination';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CustomPagination } from '@/components/custom-pagination';

interface Product {
  id: number;
  name: string;
  slug: string;
  price: number;
  sale_price?: number;
  image: string;
  store?: {
    id: number;
    name: string;
    slug: string;
  };
  categories?: {
    id: number;
    name: string;
    slug: string;
  }[];
}

interface Store {
  id: number;
  name: string;
  slug: string;
  logo: string;
  description: string;
  productCount: number;
  rating: number;
  joinDate: string;
}

interface SearchResultsProps {
  results: {
    data: (Product | Store)[];
    links: any[];
    meta: {
      current_page: number;
      from: number;
      last_page: number;
      links: any[];
      path: string;
      per_page: number;
      to: number;
      total: number;
    };
  };
  meta: {
    keyword: string;
    type: string;
    count: number;
  };
  type: 'products' | 'stores';
}

export default function SearchResults({ results, meta, type }: SearchResultsProps) {
  return (
    <FrontendLayout>
      <Head title={`Search Results for "${meta.keyword}"`} />
      
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-6">
          Search Results for "{meta.keyword}"
        </h1>
        
        <Tabs defaultValue={type} className="mb-6">
          <TabsList>
            <TabsTrigger 
              value="products"
              asChild
            >
              <Link href={route('frontend.search', { keyword: meta.keyword, type: 'products' })}>
                Products
              </Link>
            </TabsTrigger>
            <TabsTrigger 
              value="stores"
              asChild
            >
              <Link href={route('frontend.search', { keyword: meta.keyword, type: 'stores' })}>
                Stores
              </Link>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="products" className="mt-6">
            {type === 'products' && (
              <>
                <p className="text-muted-foreground mb-4">
                  Found {meta.count} products matching your search.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {results.data.map((item) => {
                    // Type guard to ensure we're working with a Product
                    const product = item as Product;
                    return (
                    <Card key={product.id} className="overflow-hidden">
                      <Link href={route('frontend.products.show', product.slug)}>
                        <div className="aspect-square overflow-hidden">
                          <img 
                            src={product.image} 
                            alt={product.name} 
                            className="w-full h-full object-cover transition-transform hover:scale-105"
                          />
                        </div>
                      </Link>
                      <CardHeader className="p-4 pb-0">
                        <Link href={route('frontend.products.show', product.slug)}>
                          <CardTitle className="text-lg line-clamp-2 hover:text-primary transition-colors">
                            {product.name}
                          </CardTitle>
                        </Link>
                      </CardHeader>
                      <CardContent className="p-4 pt-2">
                        <div className="flex items-baseline gap-2">
                          <span className="text-lg font-bold">
                            ${product.sale_price || product.price}
                          </span>
                          {product.sale_price && (
                            <span className="text-sm text-muted-foreground line-through">
                              ${product.price}
                            </span>
                          )}
                        </div>
                        
                        {product.store && (
                          <Link 
                            href={route('frontend.stores.show', product.store.slug)}
                            className="text-sm text-muted-foreground hover:text-primary transition-colors mt-1 block"
                          >
                            {product.store.name}
                          </Link>
                        )}
                      </CardContent>
                      <CardFooter className="p-4 pt-0 flex flex-wrap gap-1">
                        {product.categories && product.categories.slice(0, 2).map(category => (
                          <Badge key={category.id} variant="outline" className="text-xs">
                            {category.name}
                          </Badge>
                        ))}
                      </CardFooter>
                    </Card>
                    );
                  })}
                </div>
              </>
            )}
          </TabsContent>
          
          <TabsContent value="stores" className="mt-6">
            {type === 'stores' && (
              <>
                <p className="text-muted-foreground mb-4">
                  Found {meta.count} stores matching your search.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {results.data.map((item) => {
                    // Type guard to ensure we're working with a Store
                    const store = item as Store;
                    return (
                    <Card key={store.id} className="overflow-hidden">
                      <Link href={route('frontend.stores.show', store.slug)}>
                        <div className="h-40 bg-muted flex items-center justify-center p-4">
                          <img 
                            src={store.logo} 
                            alt={store.name} 
                            className="max-h-full max-w-full object-contain"
                          />
                        </div>
                      </Link>
                      <CardHeader className="p-4 pb-2">
                        <Link href={route('frontend.stores.show', store.slug)}>
                          <CardTitle className="text-xl hover:text-primary transition-colors">
                            {store.name}
                          </CardTitle>
                        </Link>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <p className="text-muted-foreground line-clamp-2 mb-2">
                          {store.description}
                        </p>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span>{store.productCount} products</span>
                          <span>•</span>
                          <span>Rating: {store.rating}/5</span>
                          <span>•</span>
                          <span>Since {store.joinDate}</span>
                        </div>
                      </CardContent>
                      <CardFooter className="p-4 pt-0">
                        <Button asChild variant="outline" className="w-full">
                          <Link href={route('frontend.stores.show', store.slug)}>
                            Visit Store
                          </Link>
                        </Button>
                      </CardFooter>
                    </Card>
                    );
                  })}
                </div>
              </>
            )}
          </TabsContent>
        </Tabs>
        
        {/* Pagination using CustomPagination component */}
        {results && results.data && results.data.length > 0 && (
          <div className="mt-8 border-t pt-4">
            <CustomPagination 
              currentPage={results.meta?.current_page || 1}
              lastPage={results.meta?.last_page || 1}
              perPage={results.meta?.per_page || 10}
              total={results.meta?.total || results.data.length}
              from={results.meta?.from || 1}
              to={results.meta?.to || results.data.length}
              onPageChange={(page: number) => {
                const url = new URL(window.location.href);
                url.searchParams.set('page', page.toString());
                
                // Keep the existing type parameter
                url.searchParams.set('type', type);
                url.searchParams.set('keyword', meta.keyword);
                
                window.location.href = url.toString();
              }}
              onPerPageChange={(perPage: number) => {
                const url = new URL(window.location.href);
                url.searchParams.set('per_page', perPage.toString());
                url.searchParams.set('page', '1');
                
                // Keep the existing type parameter
                url.searchParams.set('type', type);
                url.searchParams.set('keyword', meta.keyword);
                
                window.location.href = url.toString();
              }}
            />
          </div>
        )}
      </div>
    </FrontendLayout>
  );
}
