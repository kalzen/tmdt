export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string | null;
    avatar_url?: string;
    avatar_thumb_url?: string;
}

import { PageProps } from '@inertiajs/core';
import { ComponentType } from 'react';
import { LucideIcon } from 'lucide-react';

export interface SharedData extends PageProps {
    auth: {
        user: User;
    };
    [key: string]: any;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavItem {
    title: string;
    href: string;
    icon?: ComponentType<any> | LucideIcon;
    permission?: string | null;
    items?: NavItem[];
}