import { type BreadcrumbItem, type SharedData } from '@/types';
import { Transition } from '@headlessui/react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler } from 'react';

import DeleteUser from '@/components/delete-user';
import HeadingSmall from '@/components/heading-small';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ImageUploader } from '@/components/ui/image-uploader';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Cài đặt',
        href: route('profile.edit'),
    },
    {
        title: 'Hồ sơ',
        href: route('profile.edit'),
    },
];

interface ProfileForm {
    name: string;
    email: string;
    avatar?: File | null;
    [key: string]: string | File | null | undefined;
}

export default function Profile({ mustVerifyEmail, status }: { mustVerifyEmail: boolean; status?: string }) {
    const { auth } = usePage<SharedData>().props;

    const { data, setData, post, errors, processing, recentlySuccessful } = useForm<ProfileForm>({
        name: auth.user.name,
        email: auth.user.email,
        avatar: null,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        
        // Log data để debug trước khi gửi
        console.log("Form data before submit:", data);

        post(route('profile.update'), {
            preserveScroll: true,
            // Bắt buộc dùng FormData cho upload file
            forceFormData: true,
            onError: (errors) => {
                console.error("Form errors:", errors);
            },
            onSuccess: () => {
                console.log("Form submission successful");
            }
        });
    };

    const handleAvatarChange = (file: File | null) => {
        setData('avatar', file);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Cài đặt hồ sơ" />

            <SettingsLayout>
                <div className="space-y-6">
                    <HeadingSmall title="Thông tin hồ sơ" description="Cập nhật thông tin cá nhân của bạn" />

                    <div className="grid md:grid-cols-3 gap-6">
                        <Card className="md:col-span-2">
                            <form onSubmit={submit}>
                                <CardHeader>
                                    <CardTitle>Thông tin cơ bản</CardTitle>
                                    <CardDescription>
                                        Cập nhật tên và địa chỉ email của bạn
                                    </CardDescription>
                                </CardHeader>
                                
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="name">Tên</Label>
                                        <Input
                                            id="name"
                                            name="name"
                                            className={`mt-1 block w-full ${errors.name ? 'border-destructive' : ''}`}
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            required
                                            autoComplete="name"
                                            placeholder="Họ và tên"
                                        />
                                        <InputError message={errors.name} />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="email">Địa chỉ email</Label>
                                        <Input
                                            id="email"
                                            name="email"
                                            type="email"
                                            className={`mt-1 block w-full ${errors.email ? 'border-destructive' : ''}`}
                                            value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
                                            required
                                            autoComplete="username"
                                            placeholder="Địa chỉ email"
                                        />
                                        <InputError message={errors.email} />
                                    </div>

                                    {mustVerifyEmail && auth.user.email_verified_at === null && (
                                        <div>
                                            <p className="text-muted-foreground -mt-4 text-sm">
                                                Địa chỉ email của bạn chưa được xác minh.{' '}
                                                <Link
                                                    href={route('verification.send')}
                                                    method="post"
                                                    as="button"
                                                    className="text-foreground underline decoration-neutral-300 underline-offset-4 transition-colors duration-300 ease-out hover:decoration-current! dark:decoration-neutral-500"
                                                >
                                                    Nhấn vào đây để gửi lại email xác minh.
                                                </Link>
                                            </p>

                                            {status === 'verification-link-sent' && (
                                                <div className="mt-2 text-sm font-medium text-green-600">
                                                    Một liên kết xác minh mới đã được gửi đến địa chỉ email của bạn.
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </CardContent>
                                
                                <CardFooter className="flex items-center justify-end gap-4 mt-6">
                                    <Button type="submit" disabled={processing}>
                                        {processing ? 'Đang lưu...' : 'Lưu thay đổi'}
                                    </Button>

                                    <Transition
                                        show={recentlySuccessful}
                                        enter="transition ease-in-out"
                                        enterFrom="opacity-0"
                                        leave="transition ease-in-out"
                                        leaveTo="opacity-0"
                                    >
                                        <p className="text-sm text-neutral-600">Đã lưu</p>
                                    </Transition>
                                </CardFooter>
                            </form>
                        </Card>

                        <ImageUploader
                            id="avatar"
                            value={auth.user.avatar_url as string}
                            onChange={handleAvatarChange}
                            title="Ảnh đại diện"
                            description="Cập nhật ảnh đại diện của bạn"
                            error={errors.avatar}
                            helpText="Cho phép các định dạng JPG, GIF hoặc PNG. Kích thước tối đa 2MB."
                            placeholder="Chọn ảnh để cập nhật avatar"
                            className="w-32 h-32 rounded-full"
                            previewClassName="w-32 h-32 rounded-full"
                        />
                    </div>

                    <DeleteUser />
                </div>
            </SettingsLayout>
        </AppLayout>
    );
}
