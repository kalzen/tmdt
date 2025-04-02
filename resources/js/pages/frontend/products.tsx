import { Head } from '@inertiajs/react';
import FrontendLayout from '@/layouts/frontend-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from '@inertiajs/react';
import { Pagination } from '@/components/ui/pagination';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useState } from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  store: {
    id: number;
    name: string;
  };
  category: {
    id: number;
    name: string;
  };
}

interface ProductsProps {
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
  filters: {
    category?: string;
    store?: string;
    min_price?: number;
    max_price?: number;
    search?: string;
    sort_by?: string;
    sort_direction?: string;
  };
}

export default function Products({ products, filters }: ProductsProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(filters.search || '');
  const [priceRange, setPriceRange] = useState<[number, number]>([
    filters.min_price || 0,
    filters.max_price || 1000,
  ]);
  const [sortBy, setSortBy] = useState(filters.sort_by || 'created_at');
  const [sortDirection, setSortDirection] = useState(filters.sort_direction || 'desc');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = `/products?search=${searchTerm}`;
  };

  const applyFilters = () => {
    const queryParams = new URLSearchParams();
    
    if (searchTerm) {
      queryParams.append('search', searchTerm);
    }
    
    queryParams.append('min_price', priceRange[0].toString());
    queryParams.append('max_price', priceRange[1].toString());
    queryParams.append('sort_by', sortBy);
    queryParams.append('sort_direction', sortDirection);
    
    if (filters.category) {
      queryParams.append('category', filters.category);
    }
    
    if (filters.store) {
      queryParams.append('store', filters.store);
    }
    
    window.location.href = `/products?${queryParams.toString()}`;
  };

  const clearFilters = () => {
    window.location.href = '/products';
  };

  return (
    <FrontendLayout>
      <Head title="Products - TMDT Marketplace" />
      
      <div className="container px-4 py-8 mx-auto">
        {/* Breadcrumbs */}
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink>Products</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        
        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <form onSubmit={handleSearch} className="flex-1">
            <div className="relative">
              <Input
                type="search"
                placeholder="Search products..."
                className="pr-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button 
                type="submit" 
                variant="ghost" 
                size="icon" 
                className="absolute right-0 top-0 h-full"
              >
                <Search className="h-4 w-4" />
                <span className="sr-only">Search</span>
              </Button>
            </div>
          </form>
          
          <div className="flex gap-2">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="created_at">Newest</SelectItem>
                <SelectItem value="price">Price</SelectItem>
                <SelectItem value="name">Name</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={sortDirection} onValueChange={setSortDirection}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Order" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="asc">Ascending</SelectItem>
                <SelectItem value="desc">Descending</SelectItem>
              </SelectContent>
            </Select>
            
            <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <SlidersHorizontal className="h-4 w-4" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="h-full flex flex-col">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold">Filters</h3>
                    <Button variant="ghost" size="sm" onClick={clearFilters}>
                      <X className="h-4 w-4 mr-1" />
                      Clear All
                    </Button>
                  </div>
                  
                  <div className="space-y-6 flex-1 overflow-y-auto">
                    <div>
                      <Label className="mb-2 block">Price Range</Label>
                      <div className="px-2">
                        <Slider
                          defaultValue={priceRange}
                          max={1000}
                          step={10}
                          onValueChange={(value) => setPriceRange(value as [number, number])}
                        />
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-sm">${priceRange[0]}</span>
                        <span className="text-sm">${priceRange[1]}</span>
                      </div>
                    </div>
                    
                    {/* More filters can be added here */}
                  </div>
                  
                  <div className="pt-4 border-t mt-auto">
                    <Button className="w-full" onClick={() => { applyFilters(); setIsFilterOpen(false); }}>
                      Apply Filters
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
        
        {/* Active Filters */}
        {(filters.search || filters.min_price || filters.max_price || filters.category || filters.store) && (
          <div className="flex flex-wrap gap-2 mb-6">
            {filters.search && (
              <div className="bg-muted rounded-full px-3 py-1 text-sm flex items-center">
                <span className="mr-1">Search: {filters.search}</span>
                <Link href={`/products?${new URLSearchParams({ ...filters, search: undefined }).toString()}`}>
                  <X className="h-3 w-3" />
                </Link>
              </div>
            )}
            
            {(filters.min_price || filters.max_price) && (
              <div className="bg-muted rounded-full px-3 py-1 text-sm flex items-center">
                <span className="mr-1">Price: ${filters.min_price || 0} - ${filters.max_price || 1000}</span>
                <Link href={`/products?${new URLSearchParams({ ...filters, min_price: undefined, max_price: undefined }).toString()}`}>
                  <X className="h-3 w-3" />
                </Link>
              </div>
            )}
            
            {filters.category && (
              <div className="bg-muted rounded-full px-3 py-1 text-sm flex items-center">
                <span className="mr-1">Category: {filters.category}</span>
                <Link href={`/products?${new URLSearchParams({ ...filters, category: undefined }).toString()}`}>
                  <X className="h-3 w-3" />
                </Link>
              </div>
            )}
            
            {filters.store && (
              <div className="bg-muted rounded-full px-3 py-1 text-sm flex items-center">
                <span className="mr-1">Store: {filters.store}</span>
                <Link href={`/products?${new URLSearchParams({ ...filters, store: undefined }).toString()}`}>
                  <X className="h-3 w-3" />
                </Link>
              </div>
            )}
          </div>
        )}
        
        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-8">
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
                  href={`/products/${product.id}`}
                  className="font-medium line-clamp-2 group-hover:text-primary transition-colors"
                >
                  {product.name}
                </Link>
                <div className="flex items-center justify-between mt-2">
                  <span className="font-bold text-primary">${product.price.toFixed(2)}</span>
                  <Link 
                    href={`/stores/${product.store.id}`}
                    className="text-xs text-muted-foreground hover:text-primary transition-colors"
                  >
                    {product.store.name}
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Pagination */}
        {products.meta.last_page > 1 && (
          <Pagination>
            <div className="flex items-center justify-center">
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
          </Pagination>
        )}
        
        {/* No Products Found */}
        {products.data.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold mb-2">No products found</h3>
            <p className="text-muted-foreground mb-6">Try adjusting your search or filter criteria</p>
            <Button onClick={clearFilters}>Clear All Filters</Button>
          </div>
        )}
      </div>
    </FrontendLayout>
  );
}
