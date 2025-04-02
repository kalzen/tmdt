import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import FrontendLayout from '@/layouts/frontend-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { formatCurrency } from '@/utils/helpers';
import { ChevronRight, SlidersHorizontal, Grid, Grid3X3 } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  slug: string;
  price: number;
  sale_price: number | null;
  image: string;
  store: {
    id: number;
    name: string;
  } | null;
}

interface CategoryChild {
  id: number;
  name: string;
  slug: string;
  product_count: number;
}

interface Category {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  image: string;
  product_count: number;
  children: CategoryChild[];
}

interface Breadcrumb {
  id: number | null;
  name: string;
  slug: string | null;
}

interface SortOption {
  value: string;
  label: string;
}

interface CategoryDetailProps {
  category: Category;
  products: {
    data: Product[];
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
  breadcrumbs: Breadcrumb[];
  filters: {
    sort: string;
    price_min: number | null;
    price_max: number | null;
    per_page: number;
  };
  sortOptions: SortOption[];
}

export default function CategoryDetail({ 
  category, 
  products, 
  breadcrumbs, 
  filters, 
  sortOptions 
}: CategoryDetailProps) {
  const [priceRange, setPriceRange] = useState<[number, number]>([
    filters.price_min || 0, 
    filters.price_max || 10000
  ]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Handle sort change
  const handleSortChange = (value: string) => {
    applyFilters({ sort: value });
  };

  // Handle per-page change
  const handlePerPageChange = (value: string) => {
    applyFilters({ per_page: value });
  };

  // Handle price filter apply
  const handlePriceFilterApply = () => {
    applyFilters({ 
      price_min: priceRange[0],
      price_max: priceRange[1]
    });
  };

  // Handle pagination
  const handlePageChange = (page: number) => {
    router.get(route('frontend.categories.show', category.slug), {
      ...filters,
      page
    }, {
      preserveScroll: true,
      preserveState: true,
    });
  };

  // Apply filters
  const applyFilters = (newFilters: Record<string, any>) => {
    router.get(route('frontend.categories.show', category.slug), {
      ...filters,
      ...newFilters,
      page: 1
    }, {
      preserveScroll: true,
      preserveState: true,
    });
  };

  // Reset all filters
  const resetFilters = () => {
    router.get(route('frontend.categories.show', category.slug), {
      sort: 'created_at|desc',
      per_page: 24
    });
  };

  return (
    <FrontendLayout
      title={`${category.name} - Products`}
      description={category.description || `Browse all products in ${category.name}`}
    >
      <Head title={`${category.name} - Products`} />
      
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
                        <Link href={item.slug ? route('frontend.categories.show', item.slug) : '/'}>
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
        
        {/* Category Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8">
          <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
            <img 
              src={category.image} 
              alt={category.name} 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-2">{category.name}</h1>
            {category.description && (
              <p className="text-muted-foreground mb-2">{category.description}</p>
            )}
            <p className="text-sm">
              <span className="font-medium">{category.product_count}</span> products found
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar Filters - Desktop */}
          <div className="hidden md:block space-y-6">
            {/* Category Filter */}
            {category.children.length > 0 && (
              <div className="bg-card rounded-lg p-4 border">
                <h3 className="font-medium mb-3">Subcategories</h3>
                <ul className="space-y-2">
                  {category.children.map(child => (
                    <li key={child.id}>
                      <Link 
                        href={route('frontend.categories.show', child.slug)}
                        className="text-sm hover:text-primary flex items-center justify-between"
                      >
                        <span>{child.name}</span>
                        <span className="text-xs text-muted-foreground">({child.product_count})</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {/* Price Filter */}
            <div className="bg-card rounded-lg p-4 border">
              <h3 className="font-medium mb-4">Price Range</h3>
              <div className="space-y-4">
                <Slider
                  min={0}
                  max={10000}
                  step={100}
                  value={priceRange}
                  onValueChange={(value) => setPriceRange(value as [number, number])}
                  className="mb-6"
                />
                <div className="flex items-center justify-between gap-4">
                  <div className="flex-1">
                    <Input
                      type="number"
                      placeholder="Min"
                      value={priceRange[0]}
                      onChange={(e) => 
                        setPriceRange([Number(e.target.value), priceRange[1]])
                      }
                      className="text-sm"
                    />
                  </div>
                  <div className="flex-1">
                    <Input
                      type="number"
                      placeholder="Max"
                      value={priceRange[1]}
                      onChange={(e) => 
                        setPriceRange([priceRange[0], Number(e.target.value)])
                      }
                      className="text-sm"
                    />
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={handlePriceFilterApply}
                >
                  Apply
                </Button>
              </div>
            </div>
            
            {/* Reset Filters */}
            <Button 
              variant="outline" 
              className="w-full"
              onClick={resetFilters}
            >
              Reset Filters
            </Button>
          </div>
          
          {/* Product Listing */}
          <div className="md:col-span-3">
            {/* Sorting and View Controls */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b">
              <div className="flex items-center gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="md:hidden"
                  onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
                >
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  Filters
                </Button>
                
                <Select 
                  value={filters.sort} 
                  onValueChange={handleSortChange}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    {sortOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="flex items-center border rounded-md p-1">
                  <Button 
                    variant={viewMode === 'grid' ? "default" : "ghost"}
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={() => setViewMode('grid')}
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant={viewMode === 'list' ? "default" : "ghost"}
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={() => setViewMode('list')}
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                </div>
                
                <Select 
                  value={filters.per_page.toString()} 
                  onValueChange={handlePerPageChange}
                >
                  <SelectTrigger className="w-[100px]">
                    <SelectValue placeholder="Show" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="12">12 per page</SelectItem>
                    <SelectItem value="24">24 per page</SelectItem>
                    <SelectItem value="48">48 per page</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {/* Mobile Filters - only visible on mobile when toggled */}
            {mobileFiltersOpen && (
              <div className="md:hidden mb-6 space-y-4 bg-muted/20 p-4 rounded-lg">
                {/* Category Filter */}
                {category.children.length > 0 && (
                  <div>
                    <h3 className="font-medium mb-2">Subcategories</h3>
                    <div className="flex flex-wrap gap-2">
                      {category.children.map(child => (
                        <Link 
                          key={child.id}
                          href={route('frontend.categories.show', child.slug)}
                          className="text-sm bg-background px-3 py-1 rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
                        >
                          {child.name} ({child.product_count})
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Price Filter */}
                <div>
                  <h3 className="font-medium mb-2">Price Range</h3>
                  <div className="space-y-4">
                    <Slider
                      min={0}
                      max={10000}
                      step={100}
                      value={priceRange}
                      onValueChange={(value) => setPriceRange(value as [number, number])}
                      className="mb-4"
                    />
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex-1">
                        <Input
                          type="number"
                          placeholder="Min"
                          value={priceRange[0]}
                          onChange={(e) => 
                            setPriceRange([Number(e.target.value), priceRange[1]])
                          }
                        />
                      </div>
                      <div className="flex-1">
                        <Input
                          type="number"
                          placeholder="Max"
                          value={priceRange[1]}
                          onChange={(e) => 
                            setPriceRange([priceRange[0], Number(e.target.value)])
                          }
                        />
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        className="flex-1"
                        onClick={handlePriceFilterApply}
                      >
                        Apply
                      </Button>
                      <Button 
                        variant="outline" 
                        className="flex-1"
                        onClick={resetFilters}
                      >
                        Reset
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Products Grid */}
            {!products || !products.data || products.data.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <p className="text-muted-foreground mb-4">No products found for this category.</p>
                <Button onClick={resetFilters} variant="outline">Reset Filters</Button>
              </div>
            ) : (
              <>
                <div className={viewMode === 'grid' 
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                  : "space-y-4"
                }>
                  {products.data.map((product) => (
                    viewMode === 'grid' ? (
                      // Grid View
                      <Link key={product.id} href={route('frontend.products.show', product.slug)} className="block">
                        <Card className="h-full overflow-hidden transition-shadow hover:shadow-md">
                          <div className="aspect-square overflow-hidden">
                            <img 
                              src={product.image} 
                              alt={product.name}
                              className="w-full h-full object-cover transition-transform hover:scale-105"
                            />
                          </div>
                          <CardContent className="p-4">
                            <h3 className="line-clamp-2 font-medium hover:text-primary transition-colors">
                              {product.name}
                            </h3>
                            <div className="mt-2 flex items-center justify-between">
                              <div>
                                {product.sale_price ? (
                                  <div className="flex flex-col">
                                    <span className="text-primary font-bold">{formatCurrency(product.sale_price)}</span>
                                    <span className="text-muted-foreground text-xs line-through">{formatCurrency(product.price)}</span>
                                  </div>
                                ) : (
                                  <span className="text-primary font-bold">{formatCurrency(product.price)}</span>
                                )}
                              </div>
                              {product.store && (
                                <span className="text-xs text-muted-foreground">{product.store.name}</span>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    ) : (
                      // List View
                      <Link key={product.id} href={route('frontend.products.show', product.slug)} className="block">
                        <Card className="overflow-hidden transition-shadow hover:shadow-md">
                          <div className="flex flex-row">
                            <div className="w-32 h-32 flex-shrink-0">
                              <img 
                                src={product.image} 
                                alt={product.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <CardContent className="p-4 flex-1">
                              <h3 className="font-medium hover:text-primary transition-colors">
                                {product.name}
                              </h3>
                              <div className="mt-2 flex items-center justify-between">
                                <div>
                                  {product.sale_price ? (
                                    <div className="flex items-center gap-2">
                                      <span className="text-primary font-bold">{formatCurrency(product.sale_price)}</span>
                                      <span className="text-muted-foreground text-xs line-through">{formatCurrency(product.price)}</span>
                                    </div>
                                  ) : (
                                    <span className="text-primary font-bold">{formatCurrency(product.price)}</span>
                                  )}
                                </div>
                                {product.store && (
                                  <span className="text-xs text-muted-foreground">{product.store.name}</span>
                                )}
                              </div>
                            </CardContent>
                          </div>
                        </Card>
                      </Link>
                    )
                  ))}
                </div>
                
                {/* Pagination */}
                {products && products.meta && products.meta.last_page > 1 && (
                  <div className="flex justify-center mt-8">
                    <div className="flex items-center gap-1">
                      {/* Previous Page */}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePageChange(products.meta.current_page - 1)}
                        disabled={products.meta.current_page === 1}
                      >
                        Previous
                      </Button>
                      
                      {/* Page Numbers */}
                      {Array.from({ length: products.meta.last_page }, (_, i) => i + 1).map((page) => (
                        <Button
                          key={page}
                          variant={page === products.meta.current_page ? "default" : "outline"}
                          size="sm"
                          onClick={() => handlePageChange(page)}
                          className="w-9"
                        >
                          {page}
                        </Button>
                      ))}
                      
                      {/* Next Page */}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePageChange(products.meta.current_page + 1)}
                        disabled={products.meta.current_page === products.meta.last_page}
                      >
                        Next
                      </Button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </FrontendLayout>
  );
}
