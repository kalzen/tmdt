import AppLayout from '@/layouts/app-layout';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import HeadingSmall from '@/components/heading-small';

export default function Create() {
  const [values, setValues] = useState({
    name: '',
    slug: '',
    description: '',
    is_active: true,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [processing, setProcessing] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setValues(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSwitchChange = (checked: boolean) => {
    setValues(prev => ({
      ...prev,
      is_active: checked
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);
    
    router.post(route('sliders.store'), values, {
      onSuccess: () => {
        setProcessing(false);
        // Sẽ được chuyển hướng tự động đến trang chỉnh sửa
      },
      onError: (errors) => {
        setErrors(errors);
        setProcessing(false);
      },
    });
  };

  return (
    <AppLayout>
      <Head title="Tạo Slider mới" />
      
      <div className="py-12">
        <div className="max-w-3xl mx-auto sm:px-6 lg:px-8">
          <div className="flex items-center mb-6">
            <Button variant="outline" size="sm" asChild className="mr-4">
              <Link href={route('sliders.index')}>
                <ArrowLeftIcon className="h-4 w-4 mr-2" />
                Quay lại
              </Link>
            </Button>
            <HeadingSmall
              title="Tạo slider mới" 
              description="Thêm slider mới vào hệ thống"
            />
          </div>
          
          <Card>
            <form onSubmit={handleSubmit}>
              <CardHeader>
                <CardTitle>Thông tin slider</CardTitle>
                <CardDescription>
                  Điền đầy đủ thông tin để tạo slider mới.
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Tên slider <span className="text-destructive">*</span></Label>
                  <Input 
                    id="name"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    placeholder="Nhập tên slider"
                    className={errors.name ? 'border-destructive' : ''}
                    required
                  />
                  {errors.name && <p className="text-destructive text-sm">{errors.name}</p>}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="slug">Slug</Label>
                  <Input 
                    id="slug"
                    name="slug"
                    value={values.slug}
                    onChange={handleChange}
                    placeholder="Để trống để tự động tạo từ tên"
                    className={errors.slug ? 'border-destructive' : ''}
                  />
                  {errors.slug && <p className="text-destructive text-sm">{errors.slug}</p>}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Mô tả</Label>
                  <Textarea 
                    id="description"
                    name="description"
                    value={values.description}
                    onChange={handleChange}
                    placeholder="Mô tả về slider này (tùy chọn)"
                    className={errors.description ? 'border-destructive' : ''}
                    rows={4}
                  />
                  {errors.description && <p className="text-destructive text-sm">{errors.description}</p>}
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="is_active" className="cursor-pointer">Kích hoạt</Label>
                    <Switch 
                      id="is_active"
                      name="is_active"
                      checked={values.is_active}
                      onCheckedChange={handleSwitchChange}
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Slider sẽ {values.is_active ? '' : 'không'} được hiển thị trên trang web
                  </p>
                </div>
              </CardContent>
              
              <CardFooter className="flex justify-between border-t pt-6">
                <Button variant="outline" type="button" asChild>
                  <Link href={route('sliders.index')}>Hủy</Link>
                </Button>
                <Button type="submit" disabled={processing}>
                  {processing ? 'Đang lưu...' : 'Lưu'}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
