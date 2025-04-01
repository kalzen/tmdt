import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEvent, useState, useRef, useEffect } from 'react';
import HeadingSmall from '@/components/heading-small';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';
import { Checkbox } from '@/components/ui/checkbox';
import { Transition } from '@headlessui/react';
import { ImageUploader } from '@/components/ui/image-uploader';
import { Tag, ChevronDown } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuLabel, 
  DropdownMenuSeparator, DropdownMenuCheckboxItem } from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Editor } from '@/components/ui/editor';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Bài viết',
        href: route('posts.index'),
    },
    {
        title: 'Tạo bài viết mới',
        href: route('posts.create'),
    },
];

interface Category {
    id: number;
    name: string;
}

export default function CreatePost({ categories = [] }: { categories: Category[] }) {
    const { data, setData, post, processing, errors, recentlySuccessful } = useForm({
        title: '',
        content: '',
        description: '',
        slug: '',
        image: null as File | null,
        is_published: false as boolean,
        published_at: '',
        categories: [] as number[],
    });

    // Thêm state để quản lý hiển thị tên các danh mục đã chọn
    const [selectedCategoryNames, setSelectedCategoryNames] = useState<string[]>([]);

    // Hàm xử lý khi check/uncheck danh mục
    const handleCategoryChange = (categoryId: number, checked: boolean) => {
        let newCategories: number[];
        let newNames: string[];
        
        if (checked) {
            // Thêm danh mục vào danh sách đã chọn
            newCategories = [...data.categories, categoryId];
            
            // Thêm tên danh mục vào danh sách hiển thị
            const categoryName = categories.find(c => c.id === categoryId)?.name || '';
            newNames = [...selectedCategoryNames, categoryName];
        } else {
            // Loại bỏ danh mục khỏi danh sách đã chọn
            newCategories = data.categories.filter(id => id !== categoryId);
            
            // Loại bỏ tên danh mục khỏi danh sách hiển thị
            const categoryName = categories.find(c => c.id === categoryId)?.name || '';
            newNames = selectedCategoryNames.filter(name => name !== categoryName);
        }
        
        setData('categories', newCategories);
        setSelectedCategoryNames(newNames);
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        post(route('posts.store'), {
            forceFormData: true,
        });
    };

    // Prevent form submission when pressing Ctrl+Enter or Cmd+Enter
    const preventFormSubmission = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
            e.preventDefault();
            e.stopPropagation();
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tạo bài viết mới" />
            <div className="space-6 px-4 py-6">
                <div className="pb-4">
                <HeadingSmall 
                    title="Tạo bài viết mới" 
                    description="Thêm một bài viết mới vào blog của bạn" 
                />
                </div>
                <form 
                    onSubmit={handleSubmit} 
                    className="space-y-6 pt-4 border-t"
                    onKeyDown={preventFormSubmission}
                >
                    <div className="grid gap-2">
                        <Label htmlFor="title">Tiêu đề</Label>
                        <Input
                            id="title"
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            placeholder="Tiêu đề bài viết"
                        />
                        <InputError message={errors.title} />
                    </div>
                    
                    <div className="grid gap-2">
                        <Label htmlFor="slug">Đường dẫn</Label>
                        <Input
                            id="slug"
                            value={data.slug}
                            onChange={(e) => setData('slug', e.target.value)}
                            placeholder="duong-dan-bai-viet"
                        />
                        <InputError message={errors.slug} />
                    </div>
                    
                    <div className="grid gap-2">
                        <Label htmlFor="description">Mô tả</Label>
                        <textarea
                            id="description"
                            className="min-h-[120px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            placeholder="Mô tả ngắn gọn về bài viết của bạn"
                            rows={3}
                        />
                        <InputError message={errors.description} />
                    </div>
                    
                    <div className="grid gap-2">
                        <Label htmlFor="content">Nội dung</Label>
                        <Editor
                            value={data.content}
                            onChange={(content) => setData('content', content)}
                            placeholder="Viết nội dung bài viết của bạn tại đây..."
                        />
                        <InputError message={errors.content} />
                    </div>
                    
                    <div className="grid gap-2">
                        <ImageUploader
                            id="image"
                            onChange={(file) => setData('image', file)}
                            title="Hình ảnh đại diện"
                            description="Tải lên hình ảnh đại diện cho bài viết"
                            error={errors.image}
                            helpText="Hình ảnh sẽ được tự động tối ưu kích thước và chất lượng"
                            placeholder="/assets/image-placeholder.png"
                            className="w-24 h-24 rounded-md"
                            previewClassName="w-full h-48"
                        />
                    </div>

                    {categories.length > 0 && (
                        <div className="grid gap-2">
                            <Label htmlFor="categories">Danh mục</Label>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" className="w-full justify-between">
                                        <span className="flex flex-wrap gap-1">
                                            {selectedCategoryNames.length > 0 ? (
                                                selectedCategoryNames.map((name, index) => (
                                                    <Badge key={index} variant="secondary" className="mr-1">
                                                        {name}
                                                    </Badge>
                                                ))
                                            ) : (
                                                <span className="text-muted-foreground">Chọn danh mục cho bài viết</span>
                                            )}
                                        </span>
                                        <ChevronDown className="h-4 w-4 opacity-50" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="start" className="w-56 max-h-80 overflow-auto">
                                    <DropdownMenuLabel>Danh mục</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    {categories.map((category) => (
                                        <DropdownMenuCheckboxItem
                                            key={category.id}
                                            checked={data.categories.includes(category.id)}
                                            onCheckedChange={(checked) => handleCategoryChange(category.id, checked)}
                                        >
                                            <div className="flex items-center">
                                                <Tag className="w-4 h-4 mr-2 text-muted-foreground" />
                                                {category.name}
                                            </div>
                                        </DropdownMenuCheckboxItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>
                            <p className="text-xs text-muted-foreground mt-1">
                                Bạn có thể chọn nhiều danh mục cho bài viết
                            </p>
                            {errors.categories && <p className="text-sm text-red-600">{errors.categories}</p>}
                        </div>
                    )}
                    
                    <div className="flex items-center space-x-2">
                        <Checkbox 
                            id="is_published" 
                            checked={data.is_published}
                            onCheckedChange={(checked) => setData('is_published', checked as boolean)}
                        />
                        <Label htmlFor="is_published" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Xuất bản ngay
                        </Label>
                        <InputError message={errors.is_published} />
                    </div>
                    
                    {!data.is_published && (
                        <div className="grid gap-2">
                            <Label htmlFor="published_at">Ngày xuất bản</Label>
                            <Input
                                id="published_at"
                                type="datetime-local"
                                value={data.published_at}
                                onChange={(e) => setData('published_at', e.target.value)}
                            />
                            <InputError message={errors.published_at} />
                        </div>
                    )}

                    <div className="flex items-center gap-4">
                        <Button type="submit" disabled={processing}>
                            {processing ? 'Đang lưu...' : 'Lưu bài viết'}
                        </Button>
                        <Link href={route('posts.index')}>
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
