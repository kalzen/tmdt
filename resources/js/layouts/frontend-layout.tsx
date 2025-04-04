import { type ReactNode } from 'react';
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner"; 
import { usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import { Header } from '@/components/frontend/header';
import { Footer } from '@/components/frontend/footer';
import { ChatBot } from '@/components/frontend/chat-bot';
import '@/../css/frontend.css'; // Import the frontend theme styles using Laravel asset path

interface FrontendLayoutProps {
    children: ReactNode;
    title?: string;
    description?: string;
}

// Define flash message structure
interface FlashMessages {
    toast?: boolean;
    'toast.type'?: 'success' | 'error' | 'warning' | 'info' | 'default';
    'toast.message'?: string;
    [key: string]: any;
}

// Define site info structure
interface SiteInfo {
    site_title: string;
    site_description: string;
    site_keywords: string;
    logo_path: string;
    favicon_path: string;
    thumbnail_path: string;
}

export default function FrontendLayout({ children, title, description }: FrontendLayoutProps) {
    // Use usePage with type assertion to avoid TypeScript errors
    const page = usePage();
    const flash = page.props.flash as FlashMessages | undefined;
    const site = page.props.site as SiteInfo | undefined;
    
    useEffect(() => {
        if (flash && flash.toast) {
            const type = flash['toast.type'] || 'default';
            const message = flash['toast.message'] || '';
            
            if (message) {
                if (type === 'success') {
                    toast.success(message);
                } else if (type === 'error') {
                    toast.error(message);
                } else if (type === 'warning') {
                    toast.warning(message);
                } else if (type === 'info') {
                    toast.info(message);
                } else {
                    toast(message);
                }
            }
        }
    }, [flash]);
    
    // Format page title
    const pageTitle = title 
        ? `${title} - ${site?.site_title || '84Gate Marketplace'}`
        : site?.site_title || '84Gate Marketplace';
    
    // Use provided description or fall back to site description
    const metaDescription = description || site?.site_description;
    
    return (
        <div className="min-h-screen flex flex-col bg-background">
            {/* Add favicon link if available */}
            <link rel="shortcut icon" href="/favicon.png" type="image/png" />
            
            {/* Add meta description if available */}
            {metaDescription && (
                <meta name="description" content={metaDescription} />
            )}
            
            {/* Add meta keywords if available */}
            {site?.site_keywords && (
                <meta name="keywords" content={site.site_keywords} />
            )}
            
            {/* Add Open Graph tags for better social sharing */}
            <meta property="og:title" content={pageTitle} />
            {metaDescription && (
                <meta property="og:description" content={metaDescription} />
            )}
            {site?.thumbnail_path && (
                <meta property="og:image" content={site.thumbnail_path} />
            )}
            <meta property="og:type" content="website" />
            
            <Header siteTitle={site?.site_title} logoPath="/logo.png" />
            <main className="flex-1 place-items-center">
                {children}
            </main>
            <Footer />
            <ChatBot />
            <Toaster position="bottom-right" />
        </div>
    );
}
