import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import { type BreadcrumbItem } from '@/types';
import { type ReactNode, useEffect } from 'react';
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner"; 
import { usePage } from '@inertiajs/react';

interface AppLayoutProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}

// Định nghĩa cấu trúc thông báo flash
interface FlashMessages {
    toast?: boolean;
    'toast.type'?: 'success' | 'error' | 'warning' | 'info' | 'default';
    'toast.message'?: string;
    [key: string]: any;
}

export default function AppLayout({ children, breadcrumbs = [] }: AppLayoutProps) {
    // Sử dụng usePage với type assertion để tránh lỗi TypeScript
    const page = usePage();
    const flash = page.props.flash as FlashMessages | undefined;
    
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
    
    return (
        <AppLayoutTemplate breadcrumbs={breadcrumbs}>
            {children}
            <Toaster position="top-right" />
        </AppLayoutTemplate>
    );
}
