import { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import HeadingSmall from '@/components/heading-small';

interface BlockItem {
  id: number;
  block_id: number;
  type: string;
  name: string | null;
  title: string | null;
  description: string | null;
  content: string | null;
  button_text: string | null;
  button_url: string | null;
  button_type: string;
  image_position: string;
  is_active: boolean;
  sort_order: number;
}

interface Block {
  id: number;
  name: string;
}

interface Props {
  block: Block;
  item: BlockItem;
  availableTypes: Record<string, string>;
  buttonTypes: Record<string, string>;
  imagePositions: Record<string, string>;
  imageUrl: string;
}

export default function EditItem({ block, item, availableTypes, buttonTypes, imagePositions, imageUrl }: Props) {
  const [values, setValues] = useState<BlockItem>({
    ...item,
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(imageUrl || null);
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

  const handleSelectChange = (name: string, value: string) => {
    setValues(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);
    
    // Tạo FormData để gửi cả file và các trường dữ liệu khác
    const formData = new FormData();
    
    // Thêm các trường dữ liệu vào FormData
    Object.entries(values).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        formData.append(key, typeof value === 'boolean' ? (value ? '1' : '0') : String(value));
      }
    });
    
    // Thêm file hình ảnh nếu có
    if (imageFile) {
      formData.append('image', imageFile);
    }
    
    // Gửi form
    router.post(route('block-items.update', item.id), formData, {
      onSuccess: () => {
        setProcessing(false);
      },
      onError: (errors) => {
        setErrors(errors);
        setProcessing(false);
      },
    });
  };

  // Xác định các trường cần hiển thị dựa vào loại item
  const showTitle = ['title', 'title_description', 'full'].includes(item.type);
  const showDescription = ['description', 'title_description', 'full'].includes(item.type);
  const showContent = ['content', 'image_content', 'full'].includes(item.type);
  const showButton = ['button', 'full'].includes(item.type);
  const showImage = ['image', 'image_content', 'full'].includes(item.type);
  const showImagePosition = ['image_content', 'full'].includes(item.type);

  return (
    <AppLayout>
      <Head title={`Chỉnh sửa mục: ${item.name || item.title || 'Không có tiêu đề'}`} />
      
      <div className="py-8">
        <div className="max-w-3xl mx-auto sm:px-6 lg:px-8">
          <div className="flex items-center mb-6">
            <Button variant="outline" size="sm" asChild className="mr-4">
              <Link href={route('blocks.edit', block.id)}>
                <ArrowLeftIcon className="h-4 w-4 mr-2" />
                Quay lại
              </Link>
            </Button>
            <HeadingSmall
              title={`Chỉnh sửa mục: ${item.name || item.title || 'Không có tiêu đề'}`}
              description={`Trong block: ${block.name}`}
            />
          </div>
          
          <Card>
            <form onSubmit={handleSubmit}>
              <CardHeader>
                <CardTitle>Thông tin mục</CardTitle>
                <CardDescription>
                  Chỉnh sửa thông tin mục trong block
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="type">Loại mục</Label>
                  <Input 
                    id="type"
                    value={availableTypes[item.type] || item.type}
                    disabled
                    className="bg-muted"
                  />
                  <p className="text-sm text-muted-foreground">
                    Không thể thay đổi loại mục sau khi đã tạo
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="name">Tên hiển thị (quản trị)</Label>
                  <Input
                    id="name"
                    name="name"
                    value={values.name || ''}
                    onChange={handleChange}
                    placeholder="Tên dành cho quản trị (không hiển thị frontend)"
                  />
                </div>
                
                {showTitle && (
                  <div className="space-y-2">
                    <Label htmlFor="title">Tiêu đề</Label>
                    <Input
                      id="title"
                      name="title"
                      value={values.title || ''}
                      onChange={handleChange}
                      placeholder="Tiêu đề hiển thị"
                      className={errors.title ? 'border-destructive' : ''}
                    />
                    {errors.title && <p className="text-destructive text-sm">{errors.title}</p>}
                  </div>
                )}
                
                {showDescription && (
                  <div className="space-y-2">
                    <Label htmlFor="description">Mô tả</Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={values.description || ''}
                      onChange={handleChange}
                      placeholder="Mô tả ngắn"
                      rows={3}
                      className={errors.description ? 'border-destructive' : ''}
                    />
                    {errors.description && <p className="text-destructive text-sm">{errors.description}</p>}
                  </div>
                )}
                
                {showContent && (
                  <div className="space-y-2">
                    <Label htmlFor="content">Nội dung</Label>
                    <Textarea
                      id="content"
                      name="content"
                      value={values.content || ''}
                      onChange={handleChange}
                      placeholder="Nội dung chi tiết"
                      rows={8}
                      className={errors.content ? 'border-destructive' : ''}
                    />
                    {errors.content && <p className="text-destructive text-sm">{errors.content}</p>}
                  </div>
                )}
                
                {showButton && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="button_text">Văn bản nút</Label>
                      <Input
                        id="button_text"
                        name="button_text"
                        value={values.button_text || ''}
                        onChange={handleChange}
                        placeholder="Ví dụ: Xem thêm"
                        className={errors.button_text ? 'border-destructive' : ''}
                      />
                      {errors.button_text && <p className="text-destructive text-sm">{errors.button_text}</p>}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="button_url">Liên kết</Label>
                      <Input
                        id="button_url"
                        name="button_url"
                        value={values.button_url || ''}
                        onChange={handleChange}
                        placeholder="URL (ví dụ: /contact)"
                        className={errors.button_url ? 'border-destructive' : ''}
                      />
                      {errors.button_url && <p className="text-destructive text-sm">{errors.button_url}</p>}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="button_type">Loại nút</Label>
                      <Select
                        value={values.button_type}
                        onValueChange={(value) => handleSelectChange('button_type', value)}
                      >
                        <SelectTrigger id="button_type" className={errors.button_type ? 'border-destructive' : ''}>
                          <SelectValue placeholder="Chọn loại nút" />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.entries(buttonTypes).map(([value, label]) => (
                            <SelectItem key={value} value={value}>{label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.button_type && <p className="text-destructive text-sm">{errors.button_type}</p>}
                    </div>
                  </div>
                )}
                
                {showImage && (
                  <div className="space-y-2">
                    <Label htmlFor="image">Hình ảnh</Label>
                    <Input
                      id="image"
                      name="image"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className={errors.image ? 'border-destructive' : ''}
                    />
                    {errors.image && <p className="text-destructive text-sm">{errors.image}</p>}
                    
                    {(imagePreview || imageUrl) && (
                      <div className="mt-2 relative bg-muted rounded-md overflow-hidden">
                        <p className="text-sm text-muted-foreground mb-2">Xem trước:</p>
                        <img
                          src={imagePreview || imageUrl}
                          alt="Preview"
                          className="w-full max-h-60 object-contain"
                        />
                      </div>
                    )}
                  </div>
                )}
                
                {showImagePosition && (
                  <div className="space-y-2">
                    <Label htmlFor="image_position">Vị trí hình ảnh</Label>
                    <Select
                      value={values.image_position}
                      onValueChange={(value) => handleSelectChange('image_position', value)}
                    >
                      <SelectTrigger id="image_position" className={errors.image_position ? 'border-destructive' : ''}>
                        <SelectValue placeholder="Chọn vị trí" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(imagePositions).map(([value, label]) => (
                          <SelectItem key={value} value={value}>{label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.image_position && <p className="text-destructive text-sm">{errors.image_position}</p>}
                  </div>
                )}
                
                <div className="pt-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="is_active" className="cursor-pointer">Kích hoạt</Label>
                    <Switch
                      id="is_active"
                      checked={values.is_active}
                      onCheckedChange={handleSwitchChange}
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Mục này sẽ {values.is_active ? '' : 'không'} được hiển thị trên trang web
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="sort_order">Thứ tự hiển thị</Label>
                  <Input
                    id="sort_order"
                    name="sort_order"
                    type="number"
                    value={values.sort_order}
                    onChange={handleChange}
                    min={0}
                    className={errors.sort_order ? 'border-destructive' : ''}
                  />
                  {errors.sort_order && <p className="text-destructive text-sm">{errors.sort_order}</p>}
                  <p className="text-sm text-muted-foreground">
                    Số nhỏ hơn sẽ được hiển thị trước
                  </p>
                </div>
              </CardContent>
              
              <CardFooter className="flex justify-between border-t pt-6">
                <Button variant="outline" type="button" asChild>
                  <Link href={route('blocks.edit', block.id)}>Hủy</Link>
                </Button>
                <Button type="submit" disabled={processing}>
                  {processing ? 'Đang lưu...' : 'Lưu thay đổi'}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
