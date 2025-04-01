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

// Cách tiếp cận đơn giản hơn để xử lý kiểu dữ liệu
export default ({ children, breadcrumbs, ...props }: AppLayoutProps) => {
    // Sử dụng usePage với any để tránh lỗi TypeScript
    const page = usePage();
    const flash = page.props.flash as FlashMessages | undefined;
    
    // Thêm console.log để kiểm tra
    console.log('Flash message data:', flash);
    
    useEffect(() => {
        if (flash && flash.toast) {
            const type = flash['toast.type'] || 'default';
            const message = flash['toast.message'] || '';
            
            console.log('Attempting to show toast:', { type, message });
            
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
        <AppLayoutTemplate breadcrumbs={breadcrumbs} {...props}>
            {children}
            <Toaster position="top-right" />
        </AppLayoutTemplate>
    );
};
