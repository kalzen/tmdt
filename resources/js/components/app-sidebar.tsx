import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { BookOpen, Folder, LayoutGrid, Settings, UserRound, Cuboid, Tags, Package, List, Store, Users } from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
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

const footerNavItems: NavItem[] = [
   
];

export function AppSidebar() {
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
