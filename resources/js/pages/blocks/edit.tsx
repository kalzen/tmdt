import { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeftIcon, PlusIcon } from '@heroicons/react/24/outline';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import HeadingSmall from '@/components/heading-small';
import { EllipsisVertical, GripVertical, Pencil, Trash } from 'lucide-react';
import { formatStorageUrl } from '@/utils/helpers';

interface BlockItem {
  id: number;
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
  settings: Record<string, any> | null;
  image_url?: string;
  image_thumb_url?: string;
}

interface Block {
  id: number;
  name: string;
  slug: string;
  location: string | null;
  description: string | null;
  is_active: boolean;
  sort_order: number;
  items: BlockItem[];
}

interface Props {
  block: Block;
  itemsByType: Record<string, BlockItem[]>;
  availableTypes: Record<string, string>;
  buttonTypes: Record<string, string>;
  imagePositions: Record<string, string>;
  availableLocations: Record<string, string>;
}

export default function Edit({
  block,
  itemsByType,
  availableTypes,
  buttonTypes,
  imagePositions,
  availableLocations
}: Props) {
  // State cho thông tin block
  const [values, setValues] = useState({
    name: block.name,
    slug: block.slug,
    location: block.location || '',
    description: block.description || '',
    is_active: block.is_active,
    sort_order: block.sort_order || 0,
  });

  // State cho errors và processing
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [processing, setProcessing] = useState(false);
  
  // State cho phần quản lý items
  const [items, setItems] = useState<BlockItem[]>(block.items);
  const [itemDialog, setItemDialog] = useState({
    open: false,
    type: '',
    title: ''
  });
  
  // State cho form tạo item mới
  const [newItem, setNewItem] = useState<Partial<BlockItem>>({
    type: '',
    name: '',
    title: '',
    description: '',
    content: '',
    button_text: '',
    button_url: '',
    button_type: 'primary',
    image_position: 'left',
    is_active: true,
  });
  
  // State cho upload hình ảnh
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  // State cho việc kéo và thả
  const [dragItem, setDragItem] = useState<number | null>(null);
  const [dragOverItem, setDragOverItem] = useState<number | null>(null);
  
  // Handlers cho form chỉnh sửa block
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
    
    router.put(route('blocks.update', block.id), values, {
      onSuccess: () => {
        setProcessing(false);
      },
      onError: (errors) => {
        setErrors(errors);
        setProcessing(false);
      },
    });
  };
  
  // Handlers cho quản lý items
  const openItemDialog = (type: string) => {
    setNewItem({
      ...newItem,
      type,
    });
    setItemDialog({
      open: true,
      type,
      title: `Thêm mục ${availableTypes[type]}`
    });
  };
  
  const handleNewItemChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewItem(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleNewItemSwitchChange = (checked: boolean) => {
    setNewItem(prev => ({
      ...prev,
      is_active: checked
    }));
  };
  
  const handleNewItemSelectChange = (name: string, value: string) => {
    setNewItem(prev => ({
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
  
  const handleAddItem = () => {
    setProcessing(true);
    
    // Tạo FormData để gửi cả dữ liệu file và các trường khác
    const formData = new FormData();
    Object.entries(newItem).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        formData.append(key, typeof value === 'boolean' ? (value ? '1' : '0') : String(value));
      }
    });
    
    // Thêm file nếu có
    if (imageFile) {
      formData.append('image', imageFile);
    }
    
    // Gửi request tạo item mới
    router.post(route('block-items.store', block.id), formData, {
      onSuccess: () => {
        // Reset form
        setNewItem({
          type: '',
          name: '',
          title: '',
          description: '',
          content: '',
          button_text: '',
          button_url: '',
          button_type: 'primary',
          image_position: 'left',
          is_active: true,
        });
        setImageFile(null);
        setImagePreview(null);
        setItemDialog({ open: false, type: '', title: '' });
        setProcessing(false);
      },
      onError: (errors) => {
        setErrors(errors);
        setProcessing(false);
      },
      preserveScroll: true,
    });
  };
  
  const handleDeleteItem = (id: number) => {
    if (confirm('Bạn có chắc chắn muốn xóa mục này?')) {
      router.delete(route('block-items.destroy', id), {
        preserveScroll: true,
      });
    }
  };

  const handleDragStart = (index: number) => {
    setDragItem(index);
  };

  const handleDragEnter = (index: number) => {
    setDragOverItem(index);
  };

  const handleDragEnd = () => {
    if (dragItem !== null && dragOverItem !== null && dragItem !== dragOverItem) {
      // Tạo bản sao của mảng items
      const itemsCopy = [...items];
      
      // Lấy phần tử đang được kéo
      const itemDragged = itemsCopy[dragItem];
      
      // Xóa phần tử khỏi vị trí cũ
      itemsCopy.splice(dragItem, 1);
      
      // Chèn phần tử vào vị trí mới
      itemsCopy.splice(dragOverItem, 0, itemDragged);
      
      // Cập nhật sort_order cho các phần tử
      const updatedItems = itemsCopy.map((item, index) => ({
        ...item,
        sort_order: index + 1
      }));
      
      // Cập nhật UI trước
      setItems(updatedItems);
      
      // Gửi cập nhật lên server
      router.post(route('block-items.reorder'), {
        items: updatedItems.map(item => ({
          id: item.id,
          sort_order: item.sort_order
        }))
      }, {
        preserveScroll: true,
        preserveState: true,
      });
    }
    
    // Reset drag state
    setDragItem(null);
    setDragOverItem(null);
  };
  
  // Render các trường form dựa vào type
  const renderItemFields = () => {
    const type = newItem.type;
    
    // Xác định các trường cần hiển thị dựa vào loại item
    const showTitle = type ? ['title', 'title_description', 'full'].includes(type) : false;
    const showDescription = type ? ['description', 'title_description', 'full'].includes(type) : false;
    const showContent = type ? ['content', 'image_content', 'full'].includes(type) : false;
    const showButton = type ? ['button', 'full'].includes(type) : false;
    const showImage = type ? ['image', 'image_content', 'full'].includes(type) : false;
    const showImagePosition = type ? ['image_content', 'full'].includes(type) : false;
    
    return (
      <div className="space-y-4">
        {/* Trường Name luôn hiển thị */}
        <div className="space-y-2">
          <Label htmlFor="name">Tên hiển thị (quản trị)</Label>
          <Input
            id="name"
            name="name"
            value={newItem.name || ''}
            onChange={handleNewItemChange}
            placeholder="Tên dành cho quản trị (không hiển thị frontend)"
          />
        </div>
        
        {/* Title */}
        {showTitle && (
          <div className="space-y-2">
            <Label htmlFor="title">Tiêu đề</Label>
            <Input
              id="title"
              name="title"
              value={newItem.title || ''}
              onChange={handleNewItemChange}
              placeholder="Tiêu đề hiển thị"
            />
          </div>
        )}
        
        {/* Description */}
        {showDescription && (
          <div className="space-y-2">
            <Label htmlFor="description">Mô tả</Label>
            <Textarea
              id="description"
              name="description"
              value={newItem.description || ''}
              onChange={handleNewItemChange}
              placeholder="Mô tả ngắn"
              rows={3}
            />
          </div>
        )}
        
        {/* Content */}
        {showContent && (
          <div className="space-y-2">
            <Label htmlFor="content">Nội dung</Label>
            <Textarea
              id="content"
              name="content"
              value={newItem.content || ''}
              onChange={handleNewItemChange}
              placeholder="Nội dung chi tiết"
              rows={5}
            />
          </div>
        )}
        
        {/* Button fields */}
        {showButton && (
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="button_text">Văn bản nút</Label>
              <Input
                id="button_text"
                name="button_text"
                value={newItem.button_text || ''}
                onChange={handleNewItemChange}
                placeholder="Ví dụ: Xem thêm"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="button_url">Liên kết</Label>
              <Input
                id="button_url"
                name="button_url"
                value={newItem.button_url || ''}
                onChange={handleNewItemChange}
                placeholder="URL (ví dụ: /contact)"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="button_type">Loại nút</Label>
              <Select
                value={newItem.button_type || 'primary'}
                onValueChange={(value) => handleNewItemSelectChange('button_type', value)}
              >
                <SelectTrigger id="button_type">
                  <SelectValue placeholder="Chọn loại nút" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(buttonTypes).map(([value, label]) => (
                    <SelectItem key={value} value={value}>{label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        )}
        
        {/* Image upload */}
        {showImage && (
          <div className="space-y-2">
            <Label htmlFor="image">Hình ảnh</Label>
            <Input
              id="image"
              name="image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
            
            {imagePreview && (
              <div className="mt-2 relative h-40 bg-muted rounded-md overflow-hidden">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="h-full w-full object-contain"
                />
              </div>
            )}
          </div>
        )}
        
        {/* Image position */}
        {showImagePosition && (
          <div className="space-y-2">
            <Label htmlFor="image_position">Vị trí hình ảnh</Label>
            <Select
              value={newItem.image_position || 'left'}
              onValueChange={(value) => handleNewItemSelectChange('image_position', value)}
            >
              <SelectTrigger id="image_position">
                <SelectValue placeholder="Chọn vị trí" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(imagePositions).map(([value, label]) => (
                  <SelectItem key={value} value={value}>{label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
        
        {/* Is active switch */}
        <div className="flex items-center justify-between">
          <Label htmlFor="is_active" className="cursor-pointer">Kích hoạt</Label>
          <Switch
            id="is_active"
            checked={newItem.is_active === undefined ? true : newItem.is_active}
            onCheckedChange={handleNewItemSwitchChange}
          />
        </div>
      </div>
    );
  };

  return (
    <AppLayout>
      <Head title={`Chỉnh sửa Block: ${block.name}`} />
      
      <div className="py-8">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="flex items-center mb-6">
            <Button variant="outline" size="sm" asChild className="mr-4">
              <Link href={route('blocks.index')}>
                <ArrowLeftIcon className="h-4 w-4 mr-2" />
                Quay lại
              </Link>
            </Button>
            <HeadingSmall
              title={`Chỉnh sửa block: ${block.name}`}
              description="Quản lý thông tin và các mục trong block"
            />
          </div>
          
          <Tabs defaultValue="info" className="space-y-6">
            <div className="flex justify-between items-center">
              <TabsList>
                <TabsTrigger value="info">Thông tin</TabsTrigger>
                <TabsTrigger value="items">Danh sách mục ({items.length})</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="info" className="space-y-6">
              <Card>
                <form onSubmit={handleSubmit}>
                  <CardHeader>
                    <CardTitle>Thông tin block</CardTitle>
                    <CardDescription>
                      Chỉnh sửa thông tin cơ bản của block
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
                  
                  <CardFooter className="flex justify-end border-t pt-6">
                    <Button type="submit" disabled={processing}>
                      {processing ? 'Đang lưu...' : 'Lưu thay đổi'}
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>
            
            <TabsContent value="items" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.entries(availableTypes).map(([type, label]) => (
                  <Card key={type} className="overflow-hidden">
                    <CardHeader>
                      <CardTitle>{label}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        {getTypeDescription(type)}
                      </p>
                    </CardContent>
                    <CardFooter className="border-t pt-4">
                      <Button onClick={() => openItemDialog(type)} className="w-full">
                        <PlusIcon className="h-4 w-4 mr-2" />
                        Thêm {label}
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle>Danh sách mục (Kéo để sắp xếp)</CardTitle>
                  <CardDescription>
                    Các mục bên trong block - sắp xếp theo thứ tự hiển thị
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {items.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      Chưa có mục nào trong block này. Hãy thêm mục đầu tiên bên trên.
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {items.map((item, index) => (
                        <div
                          key={item.id}
                          className={`flex items-center gap-2 border rounded-lg p-3 ${
                            dragItem === index ? 'opacity-50 border-primary' : ''
                          }`}
                          draggable
                          onDragStart={() => handleDragStart(index)}
                          onDragEnter={() => handleDragEnter(index)}
                          onDragOver={(e) => e.preventDefault()}
                          onDragEnd={handleDragEnd}
                        >
                          <div className="cursor-move p-1">
                            <GripVertical className="h-5 w-5 text-muted-foreground" />
                          </div>
                          
                          {item.image_thumb_url && (
                            <div className="h-12 w-12 bg-muted rounded-md overflow-hidden flex-shrink-0">
                              <img 
                                src={formatStorageUrl(item.image_thumb_url)}
                                alt={item.title || 'Item image'}
                                className="h-full w-full object-cover"
                              />
                            </div>
                          )}
                          
                          <div className="flex-1">
                            <div className="flex items-start justify-between">
                              <div>
                                <div className="font-medium">
                                  {item.name || item.title || `Mục ${index + 1}`}
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  Loại: {availableTypes[item.type]}
                                </div>
                              </div>
                              <Badge variant={item.is_active ? "default" : "secondary"}>
                                {item.is_active ? 'Hiển thị' : 'Ẩn'}
                              </Badge>
                            </div>
                            
                            {item.title && <div className="text-sm mt-1">{item.title}</div>}
                          </div>
                          
                          <div className="flex items-center">
                            <Link href={route('block-items.edit', item.id)}>
                              <Button variant="outline" size="sm" className="mr-2">
                                <Pencil className="h-4 w-4" />
                                <span className="sr-only">Sửa</span>
                              </Button>
                            </Link>
                            
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleDeleteItem(item.id)}
                            >
                              <Trash className="h-4 w-4 text-destructive" />
                              <span className="sr-only">Xóa</span>
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      {/* Dialog thêm item mới */}
      <Dialog open={itemDialog.open} onOpenChange={(open) => setItemDialog({ ...itemDialog, open })}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{itemDialog.title}</DialogTitle>
            <DialogDescription>
              Thêm mục mới vào block
            </DialogDescription>
          </DialogHeader>
          
          {renderItemFields()}
          
          <DialogFooter className="mt-4 pt-4 border-t">
            <Button variant="outline" onClick={() => setItemDialog({ open: false, type: '', title: '' })}>
              Hủy
            </Button>
            <Button onClick={handleAddItem} disabled={processing}>
              {processing ? 'Đang lưu...' : 'Thêm mục'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AppLayout>
  );
}

// Helper function to get description for each item type
function getTypeDescription(type: string): string {
  const descriptions = {
    title: 'Tiêu đề lớn, thường là H1, H2 hoặc H3.',
    description: 'Đoạn văn bản ngắn mô tả.',
    content: 'Nội dung chi tiết, có thể dài và đa dạng.',
    image: 'Hình ảnh độc lập.',
    button: 'Nút kêu gọi hành động (CTA).',
    title_description: 'Kết hợp tiêu đề và mô tả ngắn.',
    image_content: 'Kết hợp hình ảnh và nội dung, có thể tùy chỉnh vị trí.',
    full: 'Đầy đủ các thành phần: tiêu đề, mô tả, nội dung, hình ảnh và nút.',
  };
  
  return descriptions[type as keyof typeof descriptions] || 'Mục tùy chỉnh';
}
