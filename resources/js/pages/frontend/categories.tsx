import { Head } from '@inertiajs/react';
import FrontendLayout from '@/layouts/frontend-layout';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from '@inertiajs/react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb';

interface Subcategory {
  id: number;
  name: string;
  productCount: number;
}

interface Category {
  id: number;
  name: string;
  description: string;
  image: string;
  productCount: number;
  subcategories: Subcategory[];
}

interface CategoriesProps {
  categories: Category[];
}

export default function Categories({ categories }: CategoriesProps) {
  return (
    <FrontendLayout>
      <Head title="Categories - TMDT Marketplace" />
      
      <div className="container px-4 py-8 mx-auto">
        {/* Breadcrumbs */}
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink>Categories</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        
        {/* Hero Section */}
        <div className="relative mb-12 rounded-lg overflow-hidden">
          <div className="h-64 bg-gradient-to-r from-primary to-primary/70">
            <div className="absolute inset-0 flex flex-col justify-center p-8 text-white">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Product Categories</h1>
              <p className="max-w-xl text-white/90 mb-6">
                Browse our wide range of product categories. Find exactly what you're looking for from our extensive collection.
              </p>
            </div>
          </div>
        </div>
        
        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {categories.map((category) => (
            <Card key={category.id} className="overflow-hidden">
              <div className="h-48 relative overflow-hidden">
                <img 
                  src={category.image} 
                  alt={category.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4">
                  <h2 className="text-xl font-bold text-white">{category.name}</h2>
                  <p className="text-sm text-white/90">{category.productCount} products</p>
                </div>
              </div>
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {category.description || `Browse our selection of ${category.name.toLowerCase()} products from trusted sellers.`}
                </p>
                
                {category.subcategories.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium mb-2">Subcategories:</h3>
                    <div className="flex flex-wrap gap-2">
                      {category.subcategories.slice(0, 5).map((subcategory) => (
                        <Link 
                          key={subcategory.id}
                          href={`/categories/${category.id}?subcategory=${subcategory.id}`}
                          className="text-xs bg-muted px-2 py-1 rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
                        >
                          {subcategory.name}
                        </Link>
                      ))}
                      {category.subcategories.length > 5 && (
                        <span className="text-xs bg-muted px-2 py-1 rounded-full">
                          +{category.subcategories.length - 5} more
                        </span>
                      )}
                    </div>
                  </div>
                )}
                
                <div className="mt-4">
                  <Link 
                    href={`/categories/${category.id}`}
                    className="text-sm font-medium text-primary hover:underline"
                  >
                    View all {category.name} products
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Featured Categories Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Popular Categories</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {categories
              .sort((a, b) => b.productCount - a.productCount)
              .slice(0, 6)
              .map((category) => (
                <Link 
                  key={category.id}
                  href={`/categories/${category.id}`}
                  className="group block"
                >
                  <div className="aspect-square relative rounded-lg overflow-hidden">
                    <img 
                      src={category.image} 
                      alt={category.name}
                      className="w-full h-full object-cover transition-transform group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4">
                      <h3 className="text-sm font-medium text-white group-hover:text-primary-foreground transition-colors">
                        {category.name}
                      </h3>
                      <p className="text-xs text-white/90">{category.productCount} products</p>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
        
        {/* Browse by Subcategory */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Browse by Subcategory</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {categories
              .flatMap(category => category.subcategories)
              .sort((a, b) => b.productCount - a.productCount)
              .slice(0, 12)
              .map((subcategory, index) => {
                // Find parent category
                const parentCategory = categories.find(category => 
                  category.subcategories.some(sub => sub.id === subcategory.id)
                );
                
                return (
                  <Link 
                    key={`${subcategory.id}-${index}`}
                    href={`/categories/${parentCategory?.id}?subcategory=${subcategory.id}`}
                    className="block group"
                  >
                    <div className="border rounded-lg p-4 text-center transition-all hover:border-primary hover:shadow-sm">
                      <h3 className="font-medium text-sm group-hover:text-primary transition-colors">
                        {subcategory.name}
                      </h3>
                      <p className="text-xs text-muted-foreground">{subcategory.productCount} products</p>
                    </div>
                  </Link>
                );
              })}
          </div>
        </div>
      </div>
    </FrontendLayout>
  );
}
