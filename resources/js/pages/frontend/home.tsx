import { useState } from 'react';
import { Head } from '@inertiajs/react';
import FrontendLayout from '@/layouts/frontend-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Link } from '@inertiajs/react';
import { List, ChevronRight, Crown, ShieldCheck } from 'lucide-react';
import { formatCurrency } from '@/utils/helpers';

interface Product {
  id: number;
  name: string;
  slug: string;
  price: number;
  image: string;
  store: {
    id: number;
    name: string;
    slug: string;
  };
}

interface Store {
  id: number;
  name: string;
  logo: string;
  slug: string;
  productCount: number;
  is_gold: boolean;
  is_verified: boolean;
}

interface Category {
  id: number;
  name: string;
  slug: string; // Add the slug property to fix the error
  image: string;
  productCount: number;
  children?: Category[]; // Added children property for nested categories
}

interface HomeProps {
  featuredProducts: Product[];
  popularStores: Store[];
  categories: Category[];
  sliders: {
    id: number;
    image: string;
    title: string;
    description: string;
    link: string;
  }[];
}

export default function Home({ featuredProducts, popularStores, categories, sliders }: HomeProps) {
  const [activeCategory, setActiveCategory] = useState<number | null>(null);

  // Function to handle mouse enter on category
  const handleCategoryHover = (categoryId: number) => {
    setActiveCategory(categoryId);
  };

  // Function to handle mouse leave from category area
  const handleCategoryLeave = () => {
    setActiveCategory(null);
  };

  // Find active category data
  const activeCategoryData = categories?.find(cat => cat.id === activeCategory);

  return (
    <FrontendLayout>
      <Head title="Home" />
      
      {/* Hero Slider with Categories Sidebar */}
      <section className="py-6 w-full bg-slate-50">
        <div className="container px-4 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Categories Sidebar - Left Column - Takes 1/4 width on desktop */}
            <div className="hidden md:block md:col-span-1">
              <div className="bg-card rounded-lg shadow-sm h-full border relative"
                   onMouseLeave={handleCategoryLeave}>
                <div className="p-4 font-semibold text-lg border-b flex justify-between items-center">
                  <span>All Categories</span>
                  <List className="h-5 w-5" />
                </div>
                <div className="overflow-auto" style={{ height: "345px" }}> {/* Fixed height to match slider */}
                  <ul>
                    {categories?.map((category) => (
                      <li 
                        key={category.id}
                        onMouseEnter={() => handleCategoryHover(category.id)}
                        className={`${activeCategory === category.id ? 'bg-accent' : ''}`}
                      >
                        <Link 
                          href={route('frontend.categories.show', category.slug)}
                          className="flex items-center justify-between p-3 hover:bg-accent/50 transition-colors"
                        >
                          <span className="text-sm">{category.name}</span>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <ChevronRight className="h-4 w-4" />
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Mega Menu Flyout */}
                {activeCategory && activeCategoryData && (
                  <div 
                    className="absolute top-0 left-full bg-background border rounded-lg shadow-md z-10"
                    style={{ width: "500px", height: "100%" }}
                  >
                    <div className="grid grid-cols-2 h-full">
                      {/* Category image */}
                      <div className="p-4 flex flex-col">
                        <h3 className="font-medium text-lg mb-2">{activeCategoryData.name}</h3>
                        <div className="flex-1 flex items-center justify-center overflow-hidden">
                          <img 
                            src={activeCategoryData.image} 
                            alt={activeCategoryData.name} 
                            className="max-w-full max-h-full object-contain"
                          />
                        </div>
                        <Button variant="link" asChild className="mt-2 justify-center">
                          <Link href={route('frontend.categories.show', activeCategoryData.slug)}>View All Products</Link>
                        </Button>
                      </div>
                      
                      {/* Subcategories */}
                      <div className="p-4 border-l overflow-auto">
                        <h4 className="font-medium mb-3 text-sm text-muted-foreground">Subcategories</h4>
                        <ul className="space-y-1">
                          {activeCategoryData.children && activeCategoryData.children.length > 0 ? (
                            activeCategoryData.children.map(child => (
                              <li key={child.id}>
                                <Link 
                                  href={route('frontend.categories.show', child.slug)}
                                  className="text-sm hover:text-primary block py-1"
                                >
                                  {child.name}
                                </Link>
                                {child.children && child.children.length > 0 && (
                                  <ul className="pl-3 mt-1 space-y-1">
                                    {child.children.map(subChild => (
                                      <li key={subChild.id}>
                                        <Link 
                                          href={route('frontend.categories.show', subChild.slug)}
                                          className="text-xs text-muted-foreground hover:text-primary block py-1"
                                        >
                                          {subChild.name}
                                        </Link>
                                      </li>
                                    ))}
                                  </ul>
                                )}
                              </li>
                            ))
                          ) : (
                            <li className="text-sm text-muted-foreground">
                              No subcategories available
                            </li>
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Banner Slider - Right Column - Takes 3/4 width on desktop */}
            <div className="md:col-span-3">
              <Carousel className="w-full">
                <CarouselContent>
                  {sliders?.map((slide) => (
                    <CarouselItem key={slide.id}>
                      <div className="relative h-[250px] md:h-[400px] overflow-hidden rounded-xl">
                        <img 
                          src={slide.image} 
                          alt={slide.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex flex-col justify-center p-10">
                          <h2 
                            className="text-3xl md:text-4xl font-bold text-white mb-4"
                            dangerouslySetInnerHTML={{ __html: slide.title }}
                          ></h2>
                          <p 
                            className="text-white/90 mb-6 max-w-md"
                            dangerouslySetInnerHTML={{ __html: slide.description }}
                          ></p>
                          <div>
                            <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                              <Link href={slide.link}>Shop Now</Link>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-4" />
                <CarouselNext className="right-4" />
              </Carousel>
            </div>
          </div>
        </div>
      </section>
      
      {/* Categories */}
      <section className="py-12 bg-muted/30">
        <div className="container px-4 mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">Shop by Category</h2>
            <Button variant="link" asChild>
              <Link href={route('frontend.categories.index')}>View All Categories</Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories?.map((category) => (
              <Link 
                key={category.id} 
                href={route('frontend.categories.show', category.slug)}
                className="group block"
              >
                <div className="bg-background rounded-lg shadow-sm overflow-hidden transition-all group-hover:shadow-md">
                  <div className="aspect-square relative">
                    <img 
                      src={category.image} 
                      alt={category.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4 text-center">
                    <h3 className="font-medium text-sm group-hover:text-primary transition-colors">{category.name}</h3>
                    <p className="text-xs text-muted-foreground">{category.productCount} products</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* Featured Products */}
      <section className="py-12 w-full bg-slate-50">
        <div className="container px-4 mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">Featured Products</h2>
            <Button variant="link" asChild>
              <Link href={route('frontend.products.index')}>View All Products</Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {featuredProducts?.map((product) => (
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
                    href={route('frontend.products.show', product.slug)}
                    className="font-medium line-clamp-2 group-hover:text-primary transition-colors"
                  >
                    {product.name}
                  </Link>
                  <div className="flex items-center justify-between mt-2">
                    <span className="font-bold text-primary">{formatCurrency(product.price)}</span>
                    <Link 
                      href={route('frontend.stores.show', product.store.slug)}
                      className="text-xs text-muted-foreground hover:text-primary transition-colors"
                    >
                      {product.store.name}
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* Popular Stores */}
      <section className="py-12 bg-slate-100 w-full">
        <div className="container px-4 mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">Popular Stores</h2>
            <Button variant="link" asChild>
              <Link href={route('frontend.stores.index')}>View All Stores</Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {popularStores?.map((store) => (
              <Link 
                key={store.id} 
                href={route('frontend.stores.show', store.slug)}
                className="group block"
              >
                <div className="bg-background rounded-lg shadow-sm overflow-hidden transition-all group-hover:shadow-md p-6">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full overflow-hidden">
                    <img 
                      src={store.logo} 
                      alt={store.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="font-medium text-center group-hover:text-primary transition-colors mb-2">{store.name}</h3>
                  <div className={`flex items-center justify-center gap-1 px-2 py-1 rounded-full text-xs mx-auto w-fit mb-2 ${
                    store.is_gold 
                      ? "text-yellow-500 bg-yellow-50"
                      : "text-blue-500 bg-blue-50"
                  }`}>
                    {store.is_gold ? (
                      <>
                        <Crown className="h-3 w-3" />
                        <span>Gold Member</span>
                      </>
                    ) : (
                      <>
                        <ShieldCheck className="h-3 w-3" />
                        <span>Verified</span>
                      </>
                    )}
                  </div>
                  <p className="text-sm text-center text-muted-foreground">{store.productCount} products</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-16 bg-primary text-primary-foreground w-full">
        <div className="container px-4 mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Start Selling on 84Gate Marketplace</h2>
          <p className="max-w-2xl mx-auto mb-8">
            Join thousands of successful sellers on our platform. Reach millions of customers and grow your business.
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/register">Open Your Store</Link>
          </Button>
        </div>
      </section>
    </FrontendLayout>
  );
}
