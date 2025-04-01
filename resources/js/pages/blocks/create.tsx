import { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import HeadingSmall from '@/components/heading-small';

interface Props {
  availableLocations: Record<string, string>;
}

export default function Create({ availableLocations }: Props) {
  const [values, setValues] = useState({
    name: '',
    slug: '',
    location: '',
    description: '',
    is_active: true,
    sort_order: 0,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [processing, setProcessing] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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

  const handleLocationChange = (value: string) => {
    setValues(prev => ({
      ...prev,
      location: value === "none" ? "" : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);
    
    router.post(route('blocks.store'), values, {
      onSuccess: () => {
        setProcessing(false);
      },
      onError: (errors) => {
        setErrors(errors);
        setProcessing(false);
      },
    });
  };

  return (
    <AppLayout>
      <Head title="Tạo Block Mới" />
      
      <div className="py-8">
        <div className="max-w-3xl mx-auto sm:px-6 lg:px-8">
          <div className="flex items-center mb-6">
            <Button variant="outline" size="sm" asChild className="mr-4">
              <Link href={route('blocks.index')}>
                <ArrowLeftIcon className="h-4 w-4 mr-2" />
                Quay lại
              </Link>
            </Button>
            <HeadingSmall
              title="Tạo Block mới" 
              description="Thêm khối nội dung mới vào trang web của bạn"
            />
          </div>
          
          <Card>
            <form onSubmit={handleSubmit}>
              <CardHeader>
                <CardTitle>Thông tin Block</CardTitle>
                <CardDescription>
                  Điền đầy đủ thông tin để tạo block mới. Sau khi tạo, bạn có thể thêm các mục nội dung vào block.
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Tên Block <span className="text-destructive">*</span></Label>
                  <Input 
                    id="name"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    placeholder="Nhập tên block"
                    className={errors.name ? 'border-destructive' : ''}
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
                  <p className="text-sm text-muted-foreground">
                    Định danh duy nhất của block, được sử dụng trong mã nguồn.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="location">Vị trí hiển thị</Label>
                  <Select
                    value={values.location || "none"}
                    onValueChange={handleLocationChange}
                  >
                    <SelectTrigger className={errors.location ? 'border-destructive' : ''}>
                      <SelectValue placeholder="Chọn vị trí hiển thị" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">Không xác định</SelectItem>
                      {Object.entries(availableLocations).map(([value, label]) => (
                        <SelectItem key={value} value={value}>{label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.location && <p className="text-destructive text-sm">{errors.location}</p>}
                  <p className="text-sm text-muted-foreground">
                    Vị trí mà block này sẽ hiển thị trên trang web.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Mô tả</Label>
                  <Textarea 
                    id="description"
                    name="description"
                    value={values.description}
                    onChange={handleChange}
                    placeholder="Mô tả về block này (không bắt buộc)"
                    className={errors.description ? 'border-destructive' : ''}
                    rows={4}
                  />
                  {errors.description && <p className="text-destructive text-sm">{errors.description}</p>}
                </div>
                
                <div className="space-y-2 pt-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="is_active" className="cursor-pointer">Kích hoạt Block</Label>
                    <Switch 
                      id="is_active"
                      checked={values.is_active}
                      onCheckedChange={handleSwitchChange}
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Block sẽ {values.is_active ? '' : 'không'} được hiển thị trên trang web.
                  </p>
                </div>
              </CardContent>
              
              <CardFooter className="flex justify-between border-t pt-6">
                <Button variant="outline" type="button" asChild>
                  <Link href={route('blocks.index')}>Hủy</Link>
                </Button>
                <Button type="submit" disabled={processing}>
                  {processing ? 'Đang lưu...' : 'Tạo Block'}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
