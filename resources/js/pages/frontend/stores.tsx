import { Head } from '@inertiajs/react';
import FrontendLayout from '@/layouts/frontend-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from '@inertiajs/react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useState } from 'react';
import { Search, Star, ShieldCheck, Crown } from 'lucide-react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb';

interface Store {
  id: number;
  name: string;
  logo: string;
  banner: string;
  description: string;
  productCount: number;
  rating: number;
  joinDate: string;
  is_gold: boolean;
  is_verified: boolean;
}

interface StoresProps {
  stores: {
    data: Store[];
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
    search?: string;
    sort_by?: string;
    sort_direction?: string;
  };
}

export default function Stores({ stores, filters }: StoresProps) {
  const [searchTerm, setSearchTerm] = useState(filters.search || '');
  const [sortBy, setSortBy] = useState(filters.sort_by || 'created_at');
  const [sortDirection, setSortDirection] = useState(filters.sort_direction || 'desc');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = `/stores?search=${searchTerm}`;
  };

  const handleSort = () => {
    const queryParams = new URLSearchParams();
    
    if (searchTerm) {
      queryParams.append('search', searchTerm);
    }
    
    queryParams.append('sort_by', sortBy);
    queryParams.append('sort_direction', sortDirection);
    
    window.location.href = `/stores?${queryParams.toString()}`;
  };

  return (
    <FrontendLayout>
      <Head title="Stores - 84Gate Marketplace" />
      
      <div className="container px-4 py-8 mx-auto">
        {/* Breadcrumbs */}
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink>Stores</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        
        {/* Hero Section */}
        <div className="relative mb-12 rounded-lg overflow-hidden">
          <div className="h-64 bg-gradient-to-r from-primary to-primary/70">
            <div className="absolute inset-0 flex flex-col justify-center p-8 text-white">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Explore Our Stores</h1>
              <p className="max-w-xl text-white/90 mb-6">
                Discover a wide range of stores offering quality products. From electronics to fashion, find everything you need from trusted sellers.
              </p>
            </div>
          </div>
        </div>
        
        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <form onSubmit={handleSearch} className="flex-1">
            <div className="relative">
              <Input
                type="search"
                placeholder="Search stores..."
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
            <Select value={sortBy} onValueChange={(value) => { setSortBy(value); setTimeout(handleSort, 100); }}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="created_at">Newest</SelectItem>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="products_count">Product Count</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={sortDirection} onValueChange={(value) => { setSortDirection(value); setTimeout(handleSort, 100); }}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Order" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="asc">Ascending</SelectItem>
                <SelectItem value="desc">Descending</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {/* Stores Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
          {stores.data.map((store) => (
            <Card key={store.id} className="group overflow-hidden">
              <div className="h-32 relative overflow-hidden">
                <img 
                  src={store.banner} 
                  alt={`${store.name} banner`}
                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute -bottom-8 left-4 w-16 h-16 rounded-full border-4 border-background overflow-hidden bg-background">
                  <img 
                    src={store.logo} 
                    alt={store.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <CardContent className="p-4 pt-10">
                <div className="flex items-center justify-between gap-2">
                  <Link 
                    href={`/stores/${store.id}`}
                    className="font-medium text-lg group-hover:text-primary transition-colors"
                  >
                    {store.name}
                  </Link>
                  <div className="flex gap-1">
                    {store.is_gold ? (
                      <div className="text-yellow-500 bg-yellow-50 px-2 py-1 rounded-full text-xs flex items-center gap-1">
                        <Crown className="h-3 w-3" />
                        <span>Gold</span>
                      </div>
                    ) : store.is_verified && (
                      <div className="text-blue-500 bg-blue-50 px-2 py-1 rounded-full text-xs flex items-center gap-1">
                        <ShieldCheck className="h-3 w-3" />
                        <span>Verified</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center mt-1 mb-2">
                  <div className="flex items-center">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star 
                        key={i}
                        className={`h-3 w-3 ${i < Math.floor(store.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                      />
                    ))}
                    <span className="ml-1 text-xs text-muted-foreground">
                      ({store.rating.toFixed(1)})
                    </span>
                  </div>
                  <span className="mx-2 text-xs">•</span>
                  <span className="text-xs text-muted-foreground">{store.productCount} products</span>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                  {store.description}
                </p>
                <div className="text-xs text-muted-foreground">
                  Joined {store.joinDate}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Pagination */}
        {stores.meta.last_page > 1 && (
          <div className="flex justify-center">
            {stores.links.map((link, i) => (
              <Link
                key={i}
                href={link.url || '#'}
                className={`px-4 py-2 text-sm border-t border-b ${
                  i === 0 ? 'rounded-l-md border-l' : ''
                } ${
                  i === stores.links.length - 1 ? 'rounded-r-md border-r' : ''
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
        
        {/* No Stores Found */}
        {stores.data.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold mb-2">No stores found</h3>
            <p className="text-muted-foreground mb-6">Try adjusting your search criteria</p>
            <Button onClick={() => window.location.href = '/stores'}>Clear Search</Button>
          </div>
        )}
      </div>
    </FrontendLayout>
  );
}
