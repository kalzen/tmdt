import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEvent } from 'react';
import HeadingSmall from '@/components/heading-small';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';
import { Transition } from '@headlessui/react';
import { ImageUploader } from '@/components/ui/image-uploader';

interface Category {
    id: number;
    title: string;
    description: string;
    image: string;
}

interface Props {
    category: Category;
}

export default function EditCategory({ category }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Danh mục',
            href: route('categories.index'),
        },
        {
            title: category.title,
            href: route('categories.edit', category.id),
        },
    ];

    const { data, setData, post, processing, errors, recentlySuccessful } = useForm({
        title: category.title,
        description: category.description || '',
        image: null as File | null,
        _method: 'PUT',
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        post(route('categories.update', category.id), {
            forceFormData: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Chỉnh sửa: ${category.title}`} />
            <div className="space-6 px-4 py-6">
                <div className="pb-4">
                    <HeadingSmall 
                        title={`Chỉnh sửa: ${category.title}`}
                        description="Cập nhật thông tin danh mục" 
                    />
                </div>
                <form onSubmit={handleSubmit} className="space-y-6 pt-4 border-t">
                    <div className="grid gap-2">
                        <Label htmlFor="title">Tiêu đề</Label>
                        <Input
                            id="title"
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            placeholder="Tiêu đề danh mục"
                        />
                        <InputError message={errors.title} />
                    </div>
                    
                    <div className="grid gap-2">
                        <Label htmlFor="description">Mô tả</Label>
                        <textarea
                            id="description"
                            className="min-h-[120px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            placeholder="Mô tả ngắn gọn về danh mục"
                            rows={3}
                        />
                        <InputError message={errors.description} />
                    </div>
                    
                    <div className="grid gap-2">
                        <ImageUploader
                            id="image"
                            value={category.image}
                            onChange={(file) => setData('image', file)}
                            title="Hình ảnh đại diện"
                            description="Cập nhật hình ảnh đại diện cho danh mục"
                            error={errors.image}
                            helpText="Để trống nếu bạn không muốn thay đổi hình ảnh"
                            placeholder="/assets/category-placeholder.png"
                            className="w-24 h-24 rounded-md"
                            previewClassName="w-full h-40"
                        />
                    </div>

                    <div className="flex items-center gap-4">
                        <Button type="submit" disabled={processing}>
                            {processing ? 'Đang cập nhật...' : 'Cập nhật danh mục'}
                        </Button>
                        <Link href={route('categories.index')}>
                            <Button variant="outline" type="button">Hủy</Button>
                        </Link>

                        <Transition
                            show={recentlySuccessful}
                            enter="transition ease-in-out"
                            enterFrom="opacity-0"
                            leave="transition ease-in-out"
                            leaveTo="opacity-0"
                        >
                            <p className="text-sm text-neutral-600">Đã lưu</p>
                        </Transition>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
