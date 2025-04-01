import { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Props {
  types: {
    [key: string]: string;
  };
}

export default function Create({ types }: Props) {
  const { data, setData, post, processing, errors } = useForm({
    name: '',
    title: '',
    value: '',
    type: 'string',
    description: '',
    logo: null as File | null,
    favicon: null as File | null,
    thumbnail: null as File | null,
  });

  const [showMediaUpload, setShowMediaUpload] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post(route('configs.store'));
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
      <Head title="Thêm Cấu Hình Mới" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="flex items-center mb-6">
            <Button variant="outline" size="sm" asChild className="mr-4">
              <Link href={route('configs.index')}>
                <ArrowLeftIcon className="h-4 w-4 mr-2" />
                Quay lại
              </Link>
            </Button>
            <h1 className="text-2xl font-semibold">Thêm Cấu Hình Mới</h1>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Thông Tin Cấu Hình</CardTitle>
              <CardDescription>
                Nhập thông tin chi tiết cho cấu hình mới.
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
                    <div className="space-y-2">
                      <Label htmlFor="logo">Logo</Label>
                      <Input
                        id="logo"
                        type="file"
                        onChange={(e) => handleFileChange(e, 'logo')}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="favicon">Favicon</Label>
                      <Input
                        id="favicon"
                        type="file"
                        onChange={(e) => handleFileChange(e, 'favicon')}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="thumbnail">Hình thu nhỏ</Label>
                      <Input
                        id="thumbnail"
                        type="file"
                        onChange={(e) => handleFileChange(e, 'thumbnail')}
                      />
                    </div>
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
                  {processing ? 'Đang xử lý...' : 'Lưu cấu hình'}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
