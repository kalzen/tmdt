import { Head } from '@inertiajs/react';

import AppearanceTabs from '@/components/appearance-tabs';
import HeadingSmall from '@/components/heading-small';
import { type BreadcrumbItem } from '@/types';

import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Cài đặt',
        href: route('profile.edit'), // Updated to point to default settings route
    },
    {
        title: 'Giao diện',
        href: route('appearance'),
    },
];

export default function Appearance() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Cài đặt giao diện" />

            <SettingsLayout>
                <div className="space-y-6">
                    <HeadingSmall title="Cài đặt giao diện" description="Cập nhật cài đặt giao diện tài khoản của bạn" />
                    <AppearanceTabs />
                </div>
            </SettingsLayout>
        </AppLayout>
    );
}
