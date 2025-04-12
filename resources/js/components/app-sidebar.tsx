import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { BookOpen, Folder, LayoutGrid, Settings, UserRound, Cuboid, Tags, Package, List, Store, Users } from 'lucide-react';
import AppLogo from './app-logo';

// Define an interface for the auth props
interface PageProps {
    auth: {
        user: {
            id: number;
            name: string;
            email: string;
            is_admin: boolean;
        } | null;
    };
    // Add index signature to satisfy Inertia's PageProps constraint
    [key: string]: any;
}

export function AppSidebar() {
    const { auth } = usePage<PageProps>().props;
    const user = auth.user;
    const isAdmin = user && user.is_admin;

    // Menu items for admin users
    const adminNavItems: NavItem[] = [
        {
            title: 'Dashboard',
            href: route('dashboard'),
            icon: LayoutGrid,
        },
        {
            title: 'Bài Viết',
            href: route('posts.index'),
            icon: BookOpen,
        },
        {
            title: 'Danh Mục',
            href: route('categories.index'),
            icon: Folder,
        },
        {
            title: 'Catalogues',
            href: route('catalogues.index'),
            icon: Tags,
        },
        {
            title: 'Sản Phẩm',
            href: route('products.index'),
            icon: Package,
        },
        {
            title: 'Thuộc Tính',
            href: route('attributes.index'),
            icon: List,
        },
        {
            title: 'Gian Hàng',
            href: route('stores.index'),
            icon: Store,
        },
        {
            title: 'Cài Đặt',
            href: route('configs.index'),
            icon: Settings,
        },
        {
            title: 'Thành Viên',
            href: route('members.index'),
            icon: UserRound,
        },
        {
            title: 'Quản lý User',
            href: route('users.index'),
            icon: Users,
        },
        {
            title: 'Slider',
            href: route('sliders.index'),
            icon: LayoutGrid,
        },
        {
            title: 'Quản lý Block',
            href: route('blocks.index'),
            icon: Cuboid,
        }
    ];

    // Menu items for regular users
    const userNavItems: NavItem[] = [
        {
            title: 'Dashboard',
            href: route('dashboard'),
            icon: LayoutGrid,
        },
        {
            title: 'Sản Phẩm',
            href: route('products.index'),
            icon: Package,
        },
        {
            title: 'Gian Hàng',
            href: route('stores.index'),
            icon: Store,
        },
    ];

    const footerNavItems: NavItem[] = [];
    
    // Choose the correct menu items based on user role
    const mainNavItems = isAdmin ? adminNavItems : userNavItems;

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={route('dashboard')} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
