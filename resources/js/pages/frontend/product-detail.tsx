import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import FrontendLayout from '@/layouts/frontend-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from '@/utils/helpers';
import { 
  ChevronRight, 
  Minus, 
  Plus, 
  ShoppingCart, 
  Heart, 
  Share2, 
  Check,
  Store
} from 'lucide-react';

interface ProductGalleryImage {
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
  gallery: ProductGalleryImage[];
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

export default function ProductDetail({ 
  product,
  relatedProducts,
  breadcrumbs
}: ProductDetailProps) {
  const [activeImage, setActiveImage] = useState(product.image);
  const [quantity, setQuantity] = useState(1);
  
  // All images including main image and gallery
  const allImages = [product.image, ...product.gallery.map(img => img.url)];

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    if (quantity < product.stock_quantity) {
      setQuantity(quantity + 1);
    }
  };

  const handleAddToCart = () => {
    // Will implement cart functionality later
    console.log('Adding to cart:', product.id, 'Quantity:', quantity);
  };

  return (
    <FrontendLayout
      title={product.name}
      description={product.description || undefined}
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
                      <BreadcrumbLink 
                        as={Link} 
                        href={item.slug 
                          ? route('frontend.categories.show', item.slug) 
                          : '/'
                        }
                      >
                        {item.name}
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
        
        {/* Product Main Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square rounded-lg overflow-hidden border">
              <img 
                src={activeImage} 
                alt={product.name} 
                className="w-full h-full object-contain"
              />
            </div>
            
            {allImages.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {allImages.map((image, index) => (
                  <div 
                    key={index}
                    onClick={() => setActiveImage(image)}
                    className={`cursor-pointer border rounded w-20 h-20 flex-shrink-0 overflow-hidden ${
                      activeImage === image ? 'border-primary ring-2 ring-primary/20' : ''
                    }`}
                  >
                    <img 
                      src={image} 
                      alt={`${product.name} - ${index}`} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-2">{product.name}</h1>
              
              {product.store && (
                <Link 
                  href={route('frontend.stores.show', product.store.slug)}
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
                >
                  <Store className="h-4 w-4" />
                  <span>{product.store.name}</span>
                </Link>
              )}
            </div>
            
            {/* Price */}
            <div>
              {product.sale_price ? (
                <div className="flex items-center gap-3">
                  <span className="text-3xl font-bold text-primary">{formatCurrency(product.sale_price)}</span>
                  <span className="text-xl text-muted-foreground line-through">{formatCurrency(product.price)}</span>
                  <Badge className="bg-primary/10 text-primary border-primary/20">
                    Save {product.discount_percentage}%
                  </Badge>
                </div>
              ) : (
                <span className="text-3xl font-bold">{formatCurrency(product.price)}</span>
              )}
            </div>
            
            {/* Short Description */}
            {product.description && (
              <div className="text-muted-foreground">
                <p>{product.description}</p>
              </div>
            )}
            
            {/* Stock Status */}
            <div>
              {product.stock_quantity > 0 ? (
                <div className="flex items-center gap-2 text-emerald-600">
                  <Check className="h-5 w-5" />
                  <span>In Stock ({product.stock_quantity} available)</span>
                </div>
              ) : (
                <div className="text-destructive">Out of Stock</div>
              )}
            </div>
            
            {/* Basic attributes if available */}
            {product.attributes && Object.keys(product.attributes).length > 0 && (
              <div className="border-t border-b py-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {Object.entries(product.attributes).slice(0, 4).map(([type, attrs]) => 
                    attrs.slice(0, 3).map((attr, index) => (
                      <div key={`${type}-${index}`} className="flex gap-2">
                        <span className="text-sm text-muted-foreground">{attr.name}:</span>
                        <span className="text-sm font-medium">{attr.value}</span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
            
            {/* Quantity and Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium">Quantity:</span>
                <div className="flex border rounded-md">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={decreaseQuantity}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <div className="w-12 flex items-center justify-center">
                    {quantity}
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={increaseQuantity}
                    disabled={quantity >= product.stock_quantity}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-3">
                <Button 
                  size="lg" 
                  className="flex-1 min-w-[200px]"
                  onClick={handleAddToCart}
                  disabled={product.stock_quantity <= 0}
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Add to Cart
                </Button>
                
                <Button variant="outline" size="icon" className="h-12 w-12">
                  <Heart className="h-5 w-5" />
                </Button>
                
                <Button variant="outline" size="icon" className="h-12 w-12">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </div>
            
            {/* SKU info */}
            {product.sku && (
              <div className="text-xs text-muted-foreground">
                SKU: {product.sku}
              </div>
            )}
          </div>
        </div>
        
        {/* Product Tabs - Details, Specifications, etc. */}
        <Tabs defaultValue="details" className="mb-12">
          <TabsList className="w-full border-b rounded-none justify-start">
            <TabsTrigger value="details">Product Details</TabsTrigger>
            {product.attributes && Object.keys(product.attributes).length > 0 && (
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
            )}
          </TabsList>
          
          <TabsContent value="details" className="py-6">
            {product.content ? (
              <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: product.content }} />
            ) : (
              <p className="text-muted-foreground">No detailed description available for this product.</p>
            )}
          </TabsContent>
          
          {product.attributes && Object.keys(product.attributes).length > 0 && (
            <TabsContent value="specifications" className="py-6">
              <div className="space-y-6">
                {Object.entries(product.attributes).map(([type, attributes], index) => (
                  <div key={index}>
                    <h3 className="text-lg font-medium capitalize mb-3">{type}</h3>
                    <div className="bg-muted/30 rounded-lg overflow-hidden">
                      <table className="w-full">
                        <tbody>
                          {attributes.map((attr, attrIndex) => (
                            <tr key={attrIndex} className={attrIndex % 2 === 0 ? 'bg-transparent' : 'bg-muted/50'}>
                              <td className="py-2 px-4 border-b text-muted-foreground">{attr.name}</td>
                              <td className="py-2 px-4 border-b font-medium">{attr.value}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          )}
        </Tabs>
        
        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="border-t pt-12">
            <h2 className="text-2xl font-bold mb-6">Related Products</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {relatedProducts.map((relProduct) => (
                <Link key={relProduct.id} href={route('frontend.products.show', relProduct.id)} className="block">
                  <Card className="h-full overflow-hidden transition-shadow hover:shadow-md">
                    <div className="aspect-square overflow-hidden">
                      <img 
                        src={relProduct.image} 
                        alt={relProduct.name}
                        className="w-full h-full object-cover transition-transform hover:scale-105"
                      />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="line-clamp-2 font-medium hover:text-primary transition-colors">
                        {relProduct.name}
                      </h3>
                      <div className="mt-2 flex items-center justify-between">
                        <div>
                          {relProduct.sale_price ? (
                            <div className="flex flex-col">
                              <span className="text-primary font-bold">{formatCurrency(relProduct.sale_price)}</span>
                              <span className="text-muted-foreground text-xs line-through">{formatCurrency(relProduct.price)}</span>
                            </div>
                          ) : (
                            <span className="text-primary font-bold">{formatCurrency(relProduct.price)}</span>
                          )}
                        </div>
                        <span className="text-xs text-muted-foreground">{relProduct.store.name}</span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </FrontendLayout>
  );
}
