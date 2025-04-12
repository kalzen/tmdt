import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4 md:p-8">
      <Head title="Page Not Found" />
      
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <div className="relative mb-4">
          <div className="text-9xl font-bold text-muted-foreground/20">404</div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-4xl font-bold text-foreground">Oops!</div>
          </div>
        </div>
        
        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">Page not found</h1>
        
        <p className="max-w-md text-muted-foreground">
          The page you're looking for doesn't exist or you don't have permission to access it.
        </p>
        
        <div className="mt-6">
          <Link href={route('home')}>
            <Button className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              <span>Return to Homepage</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}