import { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { ImageUploader } from '@/components/ui/image-uploader';

export default function Create() {
  const { data, setData, post, processing, errors } = useForm<{
    name: string;
    position: string;
    bio: string;
    email: string;
    phone: string;
    facebook: string;
    twitter: string;
    linkedin: string;
    instagram: string;
    is_active: boolean;
    sort_order: number;
    avatar: File | null;
  }>({
    name: '',
    position: '',
    bio: '',
    email: '',
    phone: '',
    facebook: '',
    twitter: '',
    linkedin: '',
    instagram: '',
    is_active: true,
    sort_order: 0,
    avatar: null,
  });

  const [preview, setPreview] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post(route('members.store'));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setData('avatar', file);
      
      // Tạo URL preview cho hình ảnh
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <AppLayout>
      <Head title="Thêm Thành Viên Mới" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="flex items-center mb-6">
            <Button variant="outline" size="sm" asChild className="mr-4">
              <Link href={route('members.index')}>
                <ArrowLeftIcon className="h-4 w-4 mr-2" />
                Quay lại
              </Link>
            </Button>
            <h1 className="text-2xl font-semibold">Thêm Thành Viên Mới</h1>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Thông Tin Cá Nhân</CardTitle>
                    <CardDescription>
                      Nhập thông tin cơ bản của thành viên
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Họ tên<span className="text-red-500">*</span></Label>
                        <Input
                          id="name"
                          value={data.name}
                          onChange={(e) => setData('name', e.target.value)}
                          placeholder="Nguyễn Văn A"
                          required
                        />
                        {errors.name && <p className="text-sm text-red-600">{errors.name}</p>}
                      </div>
                    </div>

                    <div className="grid gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="position">Chức vụ</Label>
                        <Input
                          id="position"
                          value={data.position}
                          onChange={(e) => setData('position', e.target.value)}
                          placeholder="CEO, Giám đốc, Nhân viên,..."
                        />
                        {errors.position && <p className="text-sm text-red-600">{errors.position}</p>}
                      </div>
                    </div>

                    <div className="grid gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="bio">Tiểu sử</Label>
                        <Textarea
                          id="bio"
                          value={data.bio}
                          onChange={(e) => setData('bio', e.target.value)}
                          placeholder="Thông tin giới thiệu về thành viên"
                          rows={5}
                        />
                        {errors.bio && <p className="text-sm text-red-600">{errors.bio}</p>}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Tabs defaultValue="contact" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="contact">Thông tin liên hệ</TabsTrigger>
                    <TabsTrigger value="social">Mạng xã hội</TabsTrigger>
                  </TabsList>
                  <TabsContent value="contact" className="mt-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Thông Tin Liên Hệ</CardTitle>
                        <CardDescription>
                          Thông tin để liên lạc với thành viên
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="email">Địa chỉ email</Label>
                            <Input
                              id="email"
                              type="email"
                              value={data.email}
                              onChange={(e) => setData('email', e.target.value)}
                              placeholder="email@example.com"
                            />
                            {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}
                          </div>
                        </div>

                        <div className="grid gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="phone">Số điện thoại</Label>
                            <Input
                              id="phone"
                              value={data.phone}
                              onChange={(e) => setData('phone', e.target.value)}
                              placeholder="0912345678"
                            />
                            {errors.phone && <p className="text-sm text-red-600">{errors.phone}</p>}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="social" className="mt-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Mạng xã hội</CardTitle>
                        <CardDescription>
                          Thông tin tài khoản mạng xã hội của thành viên
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="facebook">Facebook</Label>
                            <Input
                              id="facebook"
                              value={data.facebook}
                              onChange={(e) => setData('facebook', e.target.value)}
                              placeholder="https://facebook.com/username"
                            />
                          </div>
                        </div>

                        <div className="grid gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="twitter">Twitter</Label>
                            <Input
                              id="twitter"
                              value={data.twitter}
                              onChange={(e) => setData('twitter', e.target.value)}
                              placeholder="https://twitter.com/username"
                            />
                          </div>
                        </div>

                        <div className="grid gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="linkedin">LinkedIn</Label>
                            <Input
                              id="linkedin"
                              value={data.linkedin}
                              onChange={(e) => setData('linkedin', e.target.value)}
                              placeholder="https://linkedin.com/in/username"
                            />
                          </div>
                        </div>

                        <div className="grid gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="instagram">Instagram</Label>
                            <Input
                              id="instagram"
                              value={data.instagram}
                              onChange={(e) => setData('instagram', e.target.value)}
                              placeholder="https://instagram.com/username"
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>

              <div className="space-y-6">
                <ImageUploader
                  id="avatar"
                  value={preview}
                  onChange={(file) => setData('avatar', file)}
                  title="Hình ảnh đại diện"
                  description="Tải lên hình ảnh đại diện cho thành viên"
                  error={errors.avatar}
                  helpText="Hình ảnh đại diện nên có tỷ lệ 1:1 và kích thước tối thiểu 300x300px"
                  placeholder="/assets/avatar-placeholder.png"
                  className="w-24 h-24 rounded-full"
                  previewClassName="w-40 h-40"
                />

                <Card>
                  <CardHeader>
                    <CardTitle>Cài đặt</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Trạng thái hoạt động</p>
                          <p className="text-sm text-muted-foreground">
                            Hiển thị thành viên trên website
                          </p>
                        </div>
                        <Switch 
                          checked={data.is_active}
                          onCheckedChange={(checked) => setData('is_active', checked)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="sort_order">Thứ tự sắp xếp</Label>
                        <Input
                          id="sort_order"
                          type="number"
                          value={data.sort_order}
                          onChange={(e) => setData('sort_order', parseInt(e.target.value) || 0)}
                        />
                        <p className="text-xs text-muted-foreground">
                          Số nhỏ hơn sẽ hiển thị trước
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="flex justify-end">
                  <Button type="submit" className="w-full" disabled={processing}>
                    {processing ? 'Đang lưu...' : 'Thêm thành viên'}
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </AppLayout>
  );
}
