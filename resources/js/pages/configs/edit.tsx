import { useState, useEffect } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ImageUploader } from '@/components/ui/image-uploader';

interface Props {
  config: {
    id: number;
    name: string;
    title: string;
    value: string;
    type: string;
    description: string;
  };
  types: {
    [key: string]: string;
  };
  media: {
    logo: string;
    favicon: string;
    thumbnail: string;
  };
}

export default function Edit({ config, types, media }: Props) {
  const { data, setData, patch, processing, errors } = useForm({
    name: config.name || '',
    title: config.title || '',
    value: config.value || '',
    type: config.type || 'string',
    description: config.description || '',
    logo: null as File | null,
    favicon: null as File | null,
    thumbnail: null as File | null,
  });

  const [showMediaUpload, setShowMediaUpload] = useState(config.type === 'image');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    patch(route('configs.update', config.id));
  };

  const handleTypeChange = (value: string) => {
    setData('type', value);
    setShowMediaUpload(value === 'image');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'logo' | 'favicon' | 'thumbnail') => {
    if (e.target.files && e.target.files[0]) {
      setData(field, e.target.files[0]);
    }
  };

  return (
    <AppLayout>
      <Head title="Chỉnh Sửa Cấu Hình" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="flex items-center mb-6">
            <Button variant="outline" size="sm" asChild className="mr-4">
              <Link href={route('configs.index')}>
                <ArrowLeftIcon className="h-4 w-4 mr-2" />
                Quay lại
              </Link>
            </Button>
            <h1 className="text-2xl font-semibold">Chỉnh Sửa Cấu Hình</h1>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Thông Tin Cấu Hình</CardTitle>
              <CardDescription>
                Cập nhật thông tin chi tiết cho cấu hình.
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="title">Tên hiển thị</Label>
                    <Input
                      id="title"
                      value={data.title}
                      onChange={(e) => setData('title', e.target.value)}
                      placeholder="Nhập tên hiển thị cho cấu hình"
                    />
                    {errors.title && <p className="text-sm text-red-600">{errors.title}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="name">Mã cấu hình</Label>
                    <Input
                      id="name"
                      value={data.name}
                      onChange={(e) => setData('name', e.target.value)}
                      placeholder="Ví dụ: site_title"
                    />
                    <p className="text-xs text-muted-foreground">
                      Mã cấu hình phải là duy nhất và không chứa khoảng trắng hay ký tự đặc biệt.
                    </p>
                    {errors.name && <p className="text-sm text-red-600">{errors.name}</p>}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="type">Kiểu dữ liệu</Label>
                  <Select
                    value={data.type}
                    onValueChange={handleTypeChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn kiểu dữ liệu" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(types).map(([value, label]) => (
                        <SelectItem key={value} value={value}>{label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.type && <p className="text-sm text-red-600">{errors.type}</p>}
                </div>

                {!showMediaUpload && (
                  <div className="space-y-2">
                    <Label htmlFor="value">Giá trị</Label>
                    {data.type === 'text' ? (
                      <Textarea
                        id="value"
                        value={data.value}
                        onChange={(e) => setData('value', e.target.value)}
                        rows={5}
                      />
                    ) : (
                      <Input
                        id="value"
                        type={data.type === 'number' ? 'number' : 'text'}
                        value={data.value}
                        onChange={(e) => setData('value', e.target.value)}
                      />
                    )}
                    {errors.value && <p className="text-sm text-red-600">{errors.value}</p>}
                  </div>
                )}

                {showMediaUpload && (
                  <div className="space-y-4">
                    <ImageUploader
                      id="logo"
                      value={media.logo}
                      onChange={(file) => setData('logo', file)}
                      title="Logo"
                      description="Cập nhật logo cho website"
                      error={errors.logo}
                      placeholder="/assets/logo-placeholder.png"
                      className="w-24 h-24"
                      previewClassName="w-full h-32 object-contain"
                    />
                    
                    <ImageUploader
                      id="favicon"
                      value={media.favicon}
                      onChange={(file) => setData('favicon', file)}
                      title="Favicon" 
                      description="Cập nhật favicon cho website"
                      error={errors.favicon}
                      helpText="Nên sử dụng hình vuông, kích thước nhỏ"
                      placeholder="/assets/favicon-placeholder.png"
                      className="w-16 h-16"
                      previewClassName="w-16 h-16"
                    />
                    
                    <ImageUploader
                      id="thumbnail"
                      value={media.thumbnail}
                      onChange={(file) => setData('thumbnail', file)}
                      title="Hình thu nhỏ"
                      description="Cập nhật hình thu nhỏ mặc định"
                      error={errors.thumbnail}
                      placeholder="/assets/thumbnail-placeholder.png"
                      className="w-24 h-24"
                      previewClassName="w-full h-32"
                    />
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="description">Mô tả</Label>
                  <Textarea
                    id="description"
                    value={data.description}
                    onChange={(e) => setData('description', e.target.value)}
                    placeholder="Mô tả về cấu hình này"
                    rows={3}
                  />
                  {errors.description && <p className="text-sm text-red-600">{errors.description}</p>}
                </div>
              </CardContent>

              <CardFooter className="flex justify-end">
                <Button type="submit" disabled={processing}>
                  {processing ? 'Đang cập nhật...' : 'Cập nhật cấu hình'}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
