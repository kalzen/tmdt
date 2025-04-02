import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import { User, Search, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { __ } from '@/utils/translate';
import { Input } from '@/components/ui/input';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem";

interface HeaderProps {
  siteTitle?: string;
  logoPath?: string;
}

export function Header({ siteTitle = 'TMDT', logoPath }: HeaderProps) {
  const [searchType, setSearchType] = useState<'products' | 'stores'>('products');

  return (
    <header className="w-full border-b place-items-center bg-background">
      <div className="container px-4 md:px-6">
        {/* Main Navigation Bar */}
        <div className="flex h-16 items-center justify-between">
          {/* Left side: Logo and Navigation */}
          <div className="flex items-center gap-6">
            {/* Mobile menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <span className="sr-only">Toggle menu</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col gap-4 mt-8">
                  <Link href={route('home')} className="text-lg font-semibold">Home</Link>
                  <Link href={route('frontend.categories.index')} className="text-lg font-semibold">Categories</Link>
                  <Link href={route('frontend.stores.index')} className="text-lg font-semibold">Stores</Link>
                  <Link href={route('frontend.products.index')} className="text-lg font-semibold">Products</Link>
                  <Link href="/posts" className="text-lg font-semibold">Blog</Link>
                  <Link href={route('contact.index')} className="text-lg font-semibold">Help Center</Link>
                </nav>
              </SheetContent>
            </Sheet>

            {/* Logo */}
            <Link href={route('home')} className="flex items-center gap-2">
              {logoPath ? (
                <img src={logoPath} alt={siteTitle} className="h-8 w-auto" />
              ) : (
                <span className="text-xl font-bold text-primary">{siteTitle}</span>
              )}
            </Link>

            {/* Desktop Navigation */}
            <NavigationMenu className="hidden md:flex">
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href={route('home')} className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                      Home
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Categories</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      <li className="row-span-3">
                        <NavigationMenuLink asChild>
                          <Link
                            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-primary/50 to-primary p-6 no-underline outline-none focus:shadow-md"
                            href={route('frontend.categories.index')}
                          >
                            <div className="mt-4 mb-2 text-lg font-medium text-white">
                              All Categories
                            </div>
                            <p className="text-sm leading-tight text-white/90">
                              Explore all product categories
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <ListItem href={route('frontend.categories.show', 'electronics')} title="Electronics">
                        Phones, computers, electronic devices
                      </ListItem>
                      <ListItem href={route('frontend.categories.show', 'fashion')} title="Fashion">
                        Clothing, shoes, accessories
                      </ListItem>
                      <ListItem href={route('frontend.categories.show', 'home')} title="Home & Living">
                        Household items, furniture, decor
                      </ListItem>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Stores</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      <ListItem href={route('frontend.stores.index')} title="All Stores">
                        Explore all stores
                      </ListItem>
                      <ListItem href={`${route('frontend.stores.index')}?featured=1`} title="Featured Stores">
                        Highly rated stores
                      </ListItem>
                      <ListItem href={`${route('frontend.stores.index')}?sort=newest`} title="New Stores">
                        Recently joined stores
                      </ListItem>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href={route('frontend.products.index')} className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                      Products
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href="/posts" className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                      Blog
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href={route('contact.index')} className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                      Help Center
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Right side: Auth Buttons */}
          <div className="flex items-center gap-2">
            <Link href="/login">
              <Button variant="ghost" size="sm" className="hidden md:flex">
                Login
              </Button>
            </Link>
            <Link href="/register">
              <Button variant="default" size="sm" className="hidden md:flex rounded-full">
                Sign Up
              </Button>
            </Link>
            
            {/* Mobile auth icon */}
            <Button variant="ghost" size="icon" className="md:hidden">
              <User className="h-5 w-5" />
              <span className="sr-only">Account</span>
            </Button>
          </div>
        </div>
        
        {/* Search Bar - Below the navigation */}
        <div className="py-3">
          <div className="flex w-full max-w-3xl mx-auto rounded-full overflow-hidden border-orange-500 border-solid border-2">
            <div className="flex-shrink-0 w-28">
              <Select value={searchType} onValueChange={(value) => setSearchType(value as 'products' | 'stores')}>
                <SelectTrigger className="border-0 border-r-1 rounded-none">
                  <SelectValue placeholder="Search in" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="products">Products</SelectItem>
                  <SelectItem value="stores">Stores</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-1 relative">
              <Input 
                type="search" 
                placeholder={searchType === 'products' ? "Search for products..." : "Search for stores..."}
                className="flex-1 border-0 rounded-full h-full" 
              />
              <Button type="submit" className="rounded-full absolute  h-full right-0 px-3 pr-3 pl-3 flex items-center border-rounded bg-orange-500">
                <Search className="h-4 w-4 " /> Search
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
