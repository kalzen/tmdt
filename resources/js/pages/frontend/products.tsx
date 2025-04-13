import { Head, Link, router, usePage } from '@inertiajs/react';
import FrontendLayout from '@/layouts/frontend-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Pagination } from '@/components/ui/pagination';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useState, useEffect } from 'react';
import { Search, X, Filter } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

interface Catalogue {
  id: number;
  name: string;
  slug: string;
}

interface Product {
  id: number;
  name: string;
  slug: string;
  price: number;
  sale_price: number | null;
  discount_percentage: number;
  image: string;
  store: {
    id: number;
    name: string;
    slug: string;
  };
  category: {
    id: number;
    name: string;
  } | null;
}

interface ProductsProps {
  products: {
    data: Product[];
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
    catalogue?: string;
    selectedCatalogueName?: string;
    store?: string;
    min_price?: number;
    max_price?: number;
    search?: string;
    sort_by?: string;
    sort_direction?: string;
    per_page?: number;
    in_stock?: string;
    out_of_stock?: string;
  };
  parentCatalogues: Catalogue[];
}

export default function Products({ products, filters, parentCatalogues }: ProductsProps) {
  const [isFilterOpenOnMobile, setIsFilterOpenOnMobile] = useState(false);
  const [searchTerm, setSearchTerm] = useState(filters.search || '');
  const [priceRange, setPriceRange] = useState<[number, number]>([
    filters.min_price || 0,
    filters.max_price || 1000,
  ]);
  const [sortBy, setSortBy] = useState(filters.sort_by || 'created_at');
  const [sortDirection, setSortDirection] = useState(filters.sort_direction || 'desc');
  const [perPage, setPerPage] = useState(filters.per_page?.toString() || '20');
  const [isLoading, setIsLoading] = useState(false);

  const [selectedCatalogue, setSelectedCatalogue] = useState<string>(
    filters.catalogue?.toString() || ''
  );

  const [availability, setAvailability] = useState({
    inStock: filters.in_stock === '1',
    outOfStock: filters.out_of_stock === '1',
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    applyFiltersViaInertia();
  };

  const applyFiltersViaInertia = () => {
    setIsLoading(true);

    const filterParams: Record<string, string> = {};

    if (searchTerm) {
      filterParams.search = searchTerm;
    }

    filterParams.min_price = priceRange[0].toString();
    filterParams.max_price = priceRange[1].toString();
    filterParams.sort_by = sortBy;
    filterParams.sort_direction = sortDirection;
    filterParams.per_page = perPage;

    if (selectedCatalogue) {
      filterParams.catalogue = selectedCatalogue;
    }

    if (availability.inStock && !availability.outOfStock) {
      filterParams.in_stock = '1';
    } else if (!availability.inStock && availability.outOfStock) {
      filterParams.out_of_stock = '1';
    }

    router.get('/product', filterParams, {
      preserveScroll: true,
      preserveState: true,
      only: ['products', 'filters'],
      onSuccess: () => {
        setIsLoading(false);
        setIsFilterOpenOnMobile(false);
      },
      onError: () => {
        setIsLoading(false);
      },
    });
  };

  const clearFilters = () => {
    setSearchTerm('');
    setPriceRange([0, 1000]);
    setSortBy('created_at');
    setSortDirection('desc');
    setPerPage('20');
    setSelectedCatalogue('');
    setAvailability({ inStock: false, outOfStock: false });

    router.get('/product', {}, {
      preserveScroll: true,
      preserveState: true,
      only: ['products', 'filters'],
      onSuccess: () => {
        setIsLoading(false);
        setIsFilterOpenOnMobile(false);
      },
    });
  };

  const handleCatalogueChange = (catalogueId: string) => {
    setSelectedCatalogue(catalogueId === selectedCatalogue ? '' : catalogueId);
  };

  return (
    <FrontendLayout>
      <Head title="Products - Marketplace" />

      <div className="container px-4 py-8 mx-auto">
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

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold">Products</h1>
            <p className="text-muted-foreground">
              {products.meta.total} products found
            </p>
          </div>

          <div className="flex gap-2 w-full md:w-auto">
            <form onSubmit={handleSearch} className="flex-1">
              <div className="relative">
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="pr-10 w-full md:w-[250px]"
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

            <Sheet open={isFilterOpenOnMobile} onOpenChange={setIsFilterOpenOnMobile}>
              <SheetTrigger asChild>
                <Button variant="outline" className="gap-2 md:hidden">
                  <Filter className="h-4 w-4" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[350px]">
                <div className="h-full flex flex-col">
                  <h3 className="text-lg font-semibold mb-4">Filters</h3>
                  <div className="space-y-6 flex-1 overflow-y-auto">
                    {renderFilters()}
                  </div>

                  <div className="pt-4 border-t mt-auto">
                    <Button
                      className="w-full mb-2"
                      onClick={applyFiltersViaInertia}
                      disabled={isLoading}
                    >
                      {isLoading ? 'Applying...' : 'Apply Filters'}
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={clearFilters}
                      disabled={isLoading}
                    >
                      Clear Filters
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>

            <Select
              value={sortBy}
              onValueChange={(value) => {
                setSortBy(value);
                setTimeout(() => applyFiltersViaInertia(), 0);
              }}
            >
              <SelectTrigger className="w-[120px] md:w-[150px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="created_at">Newest</SelectItem>
                <SelectItem value="price">Price</SelectItem>
                <SelectItem value="name">Name</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={sortDirection}
              onValueChange={(value) => {
                setSortDirection(value);
                setTimeout(() => applyFiltersViaInertia(), 0);
              }}
            >
              <SelectTrigger className="w-[100px]">
                <SelectValue placeholder="Order" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="asc">Ascending</SelectItem>
                <SelectItem value="desc">Descending</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="hidden md:block w-[280px] shrink-0">
            <div className="bg-muted/20 rounded-lg p-4 sticky top-24">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold">Filters</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs h-auto p-1"
                  onClick={clearFilters}
                >
                  Clear all
                </Button>
              </div>

              {renderFilters()}

              <Button
                onClick={applyFiltersViaInertia}
                className="w-full mt-4"
                disabled={isLoading}
              >
                {isLoading ? 'Applying...' : 'Apply Filters'}
              </Button>
            </div>
          </div>

          <div className="flex-1">
            {hasActiveFilters() && (
              <div className="flex flex-wrap gap-2 mb-6">
                {filters.search && (
                  <div className="bg-muted rounded-full px-3 py-1 text-sm flex items-center">
                    <span className="mr-1">Search: {filters.search}</span>
                    <button
                      onClick={() => {
                        setSearchTerm('');
                        const newFilters = { ...filters, search: undefined };
                        applyFiltersWithNewValues(newFilters);
                      }}
                      className="focus:outline-none"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                )}

                {(filters.min_price || filters.max_price) && (
                  <div className="bg-muted rounded-full px-3 py-1 text-sm flex items-center">
                    <span className="mr-1">Price: ${filters.min_price || 0} - ${filters.max_price || 1000}</span>
                    <button
                      onClick={() => {
                        setPriceRange([0, 1000]);
                        const newFilters = { ...filters, min_price: undefined, max_price: undefined };
                        applyFiltersWithNewValues(newFilters);
                      }}
                      className="focus:outline-none"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                )}

                {filters.catalogue && filters.selectedCatalogueName && (
                  <div className="bg-muted rounded-full px-3 py-1 text-sm flex items-center">
                    <span className="mr-1">Category: {filters.selectedCatalogueName}</span>
                    <button
                      onClick={() => {
                        setSelectedCatalogue('');
                        const newFilters = { ...filters, catalogue: undefined };
                        applyFiltersWithNewValues(newFilters);
                      }}
                      className="focus:outline-none"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                )}
              </div>
            )}

            {isLoading && (
              <div className="w-full py-12 text-center">
                <div
                  className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                  role="status"
                >
                  <span className="sr-only">Loading...</span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">Loading products...</p>
              </div>
            )}

            {!isLoading && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                {products.data.map((product) => (
                  <Card key={product.id} className="group overflow-hidden">
                    <div className="aspect-square relative overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform group-hover:scale-105"
                      />
                      {product.discount_percentage > 0 && (
                        <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-md">
                          -{product.discount_percentage}%
                        </div>
                      )}
                    </div>
                    <CardContent className="p-4">
                      <Link
                        href={`/product/${product.slug}`}
                        className="font-medium line-clamp-2 group-hover:text-primary transition-colors"
                      >
                        {product.name}
                      </Link>
                      <div className="flex items-center justify-between mt-2">
                        <div>
                          {product.sale_price ? (
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-primary">${product.sale_price.toFixed(2)}</span>
                              <span className="text-xs text-muted-foreground line-through">${product.price.toFixed(2)}</span>
                            </div>
                          ) : (
                            <span className="font-bold text-primary">${product.price.toFixed(2)}</span>
                          )}
                        </div>
                        <Link
                          href={`/store/${product.store.slug}`}
                          className="text-xs text-muted-foreground hover:text-primary transition-colors"
                        >
                          {product.store.name}
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {!isLoading && products.data.length === 0 && (
              <div className="text-center py-12 bg-muted/20 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">No products found</h3>
                <p className="text-muted-foreground mb-6">Try adjusting your search or filter criteria</p>
                <Button onClick={clearFilters}>Clear All Filters</Button>
              </div>
            )}

            {!isLoading && products.meta.last_page > 1 && (
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  Showing {products.meta.from}-{products.meta.to} of {products.meta.total} products
                </div>

                <Pagination>
                  <div className="flex items-center justify-center">
                    {products.meta.current_page > 1 && (
                      <button
                        onClick={() => changePage(products.meta.current_page - 1)}
                        className="px-4 py-2 text-sm border rounded-l-md hover:bg-muted"
                      >
                        Previous
                      </button>
                    )}

                    {Array.from({ length: products.meta.last_page }, (_, i) => i + 1)
                      .filter(
                        (page) =>
                          page === 1 ||
                          page === products.meta.last_page ||
                          (page >= products.meta.current_page - 1 &&
                            page <= products.meta.current_page + 1)
                      )
                      .map((page, i, array) => {
                        if (i > 0 && page > array[i - 1] + 1) {
                          return (
                            <span
                              key={`ellipsis-${page}`}
                              className="px-4 py-2 text-sm border bg-background"
                            >
                              ...
                            </span>
                          );
                        }

                        return (
                          <button
                            key={page}
                            onClick={() => changePage(page)}
                            className={`px-4 py-2 text-sm border ${
                              page === products.meta.current_page
                                ? 'bg-primary text-primary-foreground'
                                : 'bg-background hover:bg-muted'
                            }`}
                          >
                            {page}
                          </button>
                        );
                      })}
                    {products.meta.current_page < products.meta.last_page && (
                      <button
                        onClick={() => changePage(products.meta.current_page + 1)}
                        className="px-4 py-2 text-sm border rounded-r-md hover:bg-muted"
                      >
                        Next
                      </button>
                    )}
                  </div>
                </Pagination>

                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Show:</span>
                  <Select
                    value={perPage}
                    onValueChange={(value) => {
                      setPerPage(value);
                      const newFilters = { ...filters, per_page: value };
                      applyFiltersWithNewValues(newFilters);
                    }}
                  >
                    <SelectTrigger className="w-[70px]">
                      <SelectValue placeholder="20" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="12">12</SelectItem>
                      <SelectItem value="20">20</SelectItem>
                      <SelectItem value="36">36</SelectItem>
                      <SelectItem value="48">48</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Floating Apply Filter Button - only visible on mobile when filters are not in a sheet */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 p-4 bg-background border-t border-border shadow-lg z-50">
        <Button 
          onClick={() => setIsFilterOpenOnMobile(true)} 
          className="w-full"
          variant="default"
        >
          <Filter className="h-4 w-4 mr-2" />
          Apply Filters
        </Button>
      </div>
    </FrontendLayout>
  );

  function renderFilters() {
    return (
      <div className="space-y-5">
        <div>
          <h4 className="font-medium mb-2">Price Range</h4>
          <div className="px-2">
            <Slider
              value={priceRange}
              max={1000}
              step={10}
              onValueChange={(value) => setPriceRange(value as [number, number])}
            />
          </div>
          <div className="flex items-center justify-between mt-2">
            <span className="text-sm">${priceRange[0]}</span>
            <span className="text-sm">${priceRange[1]}</span>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <Input
              className="h-8"
              type="number"
              min={0}
              max={priceRange[1]}
              value={priceRange[0]}
              onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
            />
            <span>-</span>
            <Input
              className="h-8"
              type="number"
              min={priceRange[0]}
              max={1000}
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 0])}
            />
          </div>
        </div>

        <Separator />

        <Accordion type="multiple" className="w-full" defaultValue={["categories"]}>
          <AccordionItem value="categories" className="border-none">
            <AccordionTrigger className="py-1">
              <span className="text-sm font-medium">Categories</span>
            </AccordionTrigger>
            <AccordionContent>
              <div className="pl-2 space-y-2 max-h-screen overflow-y-auto pr-2">
                {parentCatalogues.map((catalogue) => (
                  <div key={catalogue.id} className="flex items-center gap-2">
                    <Checkbox
                      id={`category-${catalogue.id}`}
                      checked={selectedCatalogue === catalogue.id.toString()}
                      onCheckedChange={(checked) => handleCatalogueChange(catalogue.id.toString())}
                    />
                    <Label htmlFor={`category-${catalogue.id}`} className="text-sm">
                      {catalogue.name}
                    </Label>
                  </div>
                ))}
                {parentCatalogues.length === 0 && (
                  <div className="text-sm text-muted-foreground">No categories found</div>
                )}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <Separator />

        <div>
          <h4 className="font-medium mb-2">Availability</h4>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Checkbox
                id="in-stock"
                checked={availability.inStock}
                onCheckedChange={(checked) =>
                  setAvailability({ ...availability, inStock: !!checked })
                }
              />
              <Label htmlFor="in-stock" className="text-sm">
                In Stock
              </Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                id="out-of-stock"
                checked={availability.outOfStock}
                onCheckedChange={(checked) =>
                  setAvailability({ ...availability, outOfStock: !!checked })
                }
              />
              <Label htmlFor="out-of-stock" className="text-sm">
                Out of Stock
              </Label>
            </div>
          </div>
        </div>
      </div>
    );
  }

  function hasActiveFilters() {
    return !!(
      filters.search ||
      filters.min_price ||
      filters.max_price ||
      filters.catalogue ||
      filters.store ||
      filters.in_stock ||
      filters.out_of_stock
    );
  }

  function changePage(page: number) {
    setIsLoading(true);

    router.get(
      '/product',
      {
        ...filters,
        page: page.toString(),
      },
      {
        preserveScroll: true,
        preserveState: true,
        only: ['products'],
        onSuccess: () => setIsLoading(false),
        onError: () => setIsLoading(false),
      }
    );
  }

  function applyFiltersWithNewValues(newFilters: any) {
    setIsLoading(true);
    router.get('/product', newFilters, {
      preserveScroll: true,
      preserveState: true,
      only: ['products', 'filters'],
      onSuccess: () => setIsLoading(false),
      onError: () => setIsLoading(false),
    });
  }
}
