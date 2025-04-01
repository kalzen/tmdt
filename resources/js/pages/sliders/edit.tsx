import AppLayout from '@/layouts/app-layout';
import { Head, Link, router } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { EllipsisVertical } from 'lucide-react';
import { ArrowLeftIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import HeadingSmall from '@/components/heading-small';

interface SliderItem {
  id: number;
  title: string | null;
  description: string | null;
  button_text: string | null;
  button_url: string | null;
  sort_order: number;
  is_active: boolean;
  image_url: string;
  image_thumb_url: string;
  newImage?: File;
}

interface Slider {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  is_active: boolean;
  items: SliderItem[];
}

interface Props {
  slider: Slider;
}

export default function Edit({ slider }: Props) {
  const [values, setValues] = useState({
    name: slider.name,
    slug: slider.slug,
    description: slider.description || '',
    is_active: slider.is_active,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [processing, setProcessing] = useState(false);
  const [items, setItems] = useState<SliderItem[]>(slider.items);
  const [newItem, setNewItem] = useState({
    title: '',
    description: '',
    button_text: '',
    button_url: '',
    is_active: true,
    image: null as File | null,
    imagePreview: '',
  });
  const [editingItem, setEditingItem] = useState<SliderItem | null>(null);
  const [itemDialogOpen, setItemDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [dragItem, setDragItem] = useState<number | null>(null);
  const [dragOverItem, setDragOverItem] = useState<number | null>(null);

  // Cập nhật state items khi props slider thay đổi để đảm bảo dữ liệu đồng bộ
  useEffect(() => {
    setItems(slider.items);
  }, [slider.items]);

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
    
    router.put(route('sliders.update', slider.id), values, {
      onSuccess: () => {
        setProcessing(false);
      },
      onError: (errors) => {
        setErrors(errors);
        setProcessing(false);
      },
    });
  };

  const handleNewItemChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setNewItem(prev => ({
        ...prev,
        image: file,
        imagePreview: URL.createObjectURL(file)
      }));
    }
  };

  const handleAddItem = () => {
    const formData = new FormData();
    formData.append('title', newItem.title);
    formData.append('description', newItem.description);
    formData.append('button_text', newItem.button_text);
    formData.append('button_url', newItem.button_url);
    formData.append('is_active', newItem.is_active ? '1' : '0');
    
    if (newItem.image) {
      formData.append('image', newItem.image);
    }
    
    router.post(route('slider-items.store', slider.id), formData, {
      onSuccess: (page) => {
        // Cập nhật state từ dữ liệu mới từ server
        const response = page as unknown as { props: { slider?: Slider } };
        if (response.props.slider?.items) {
          setItems(response.props.slider.items);
        }
        setNewItem({
          title: '',
          description: '',
          button_text: '',
          button_url: '',
          is_active: true,
          image: null,
          imagePreview: '',
        });
        setItemDialogOpen(false);
      },
    });
  };
  
  const handleEditItem = (item: SliderItem) => {
    setEditingItem(item);
    setEditDialogOpen(true);
  };
  
  const handleUpdateItem = () => {
    if (!editingItem) return;
    
    const formData = new FormData();
    formData.append('title', editingItem.title || '');
    formData.append('description', editingItem.description || '');
    formData.append('button_text', editingItem.button_text || '');
    formData.append('button_url', editingItem.button_url || '');
    formData.append('is_active', editingItem.is_active ? '1' : '0');
    formData.append('sort_order', editingItem.sort_order.toString());
    
    // Nếu có file mới, thêm vào formData
    if (editingItem.newImage) {
      formData.append('image', editingItem.newImage);
    }
    
    router.post(route('slider-items.update', editingItem.id), formData, {
      onSuccess: (response) => {
        const page = response as unknown as { props: { slider: Slider } };
        // Cập nhật danh sách items từ server
        if (page.props.slider?.items) {
          setItems(page.props.slider.items);
        }
        setEditDialogOpen(false);
        setEditingItem(null);
      },
    });
  };
  
  const handleDeleteItem = (itemId: number) => {
    if (confirm('Bạn có chắc chắn muốn xóa mục này?')) {
      router.delete(route('slider-items.destroy', itemId), {
        onSuccess: (page) => {
          // Cập nhật danh sách items từ state
          setItems(prev => prev.filter(item => item.id !== itemId));
        },
      });
    }
  };

  const handleDragStart = (position: number) => {
    setDragItem(position);
  };

  const handleDragEnter = (position: number) => {
    setDragOverItem(position);
  };

  const handleDragEnd = () => {
    if (dragItem !== null && dragOverItem !== null && dragItem !== dragOverItem) {
      // Tạo bản sao của mảng item
      const newItems = [...items];
      // Lấy phần tử đang được kéo
      const draggedItem = newItems[dragItem];
      // Xóa phần tử cũ
      newItems.splice(dragItem, 1);
      // Chèn vào vị trí mới
      newItems.splice(dragOverItem, 0, draggedItem);
      
      // Cập nhật vị trí mới
      const updatedItems = newItems.map((item, index) => ({
        ...item,
        sort_order: index + 1
      }));
      
      // Cập nhật UI
      setItems(updatedItems);
      
      // Gửi thông tin lên server
      router.post(route('slider-items.reorder'), {
        items: updatedItems.map(item => ({
          id: item.id,
          sort_order: item.sort_order,
        })),
      }, {
        preserveState: true,
        preserveScroll: true,
      });
    }
    
    // Reset trạng thái
    setDragItem(null);
    setDragOverItem(null);
  };

  // Thêm state để lưu ảnh mới cho item đang chỉnh sửa
  const handleEditItemImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file && editingItem) {
      setEditingItem({
        ...editingItem,
        newImage: file,
        image_url: URL.createObjectURL(file)
      });
    }
  };

  return (
    <AppLayout>
      <Head title={`Chỉnh sửa Slider: ${slider.name}`} />
      
      <div className="py-12">
        <div className="max-w-5xl mx-auto sm:px-6 lg:px-8">
          <div className="flex items-center mb-6">
            <Button variant="outline" size="sm" asChild className="mr-4">
              <Link href={route('sliders.index')}>
                <ArrowLeftIcon className="h-4 w-4 mr-2" />
                Quay lại
              </Link>
            </Button>
            <HeadingSmall
              title={`Chỉnh sửa: ${slider.name}`}
              description="Quản lý thông tin và các mục trong slider"
            />
          </div>

          <Tabs defaultValue="info" className="space-y-6">
            <div className="flex justify-between items-center">
              <TabsList>
                <TabsTrigger value="info">Thông tin</TabsTrigger>
                <TabsTrigger value="items">Danh sách mục ({items.length})</TabsTrigger>
              </TabsList>
              
              <Dialog open={itemDialogOpen} onOpenChange={setItemDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <PlusIcon className="h-4 w-4 mr-2" />
                    Thêm mục
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Thêm mục mới vào slider</DialogTitle>
                    <DialogDescription>
                      Điền thông tin để thêm mục mới vào slider
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="new-title">Tiêu đề</Label>
                      <Input 
                        id="new-title" 
                        name="title" 
                        value={newItem.title} 
                        onChange={handleNewItemChange} 
                        placeholder="Tiêu đề mục"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="new-description">Mô tả</Label>
                      <Textarea 
                        id="new-description" 
                        name="description" 
                        value={newItem.description} 
                        onChange={handleNewItemChange} 
                        placeholder="Mô tả ngắn (tùy chọn)"
                        rows={3}
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="new-button_text">Nút</Label>
                        <Input 
                          id="new-button_text" 
                          name="button_text" 
                          value={newItem.button_text} 
                          onChange={handleNewItemChange} 
                          placeholder="Văn bản nút (tùy chọn)"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="new-button_url">Liên kết</Label>
                        <Input 
                          id="new-button_url" 
                          name="button_url" 
                          value={newItem.button_url} 
                          onChange={handleNewItemChange} 
                          placeholder="URL (tùy chọn)"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="new-image">Hình ảnh</Label>
                      <Input 
                        id="new-image" 
                        type="file" 
                        accept="image/*" 
                        onChange={handleImageChange}
                      />
                      
                      {newItem.imagePreview && (
                        <div className="mt-2 relative h-40 bg-muted rounded-md overflow-hidden">
                          <img 
                            src={newItem.imagePreview} 
                            alt="Preview" 
                            className="w-full h-full object-contain"
                          />
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Label htmlFor="new-is_active" className="cursor-pointer">Kích hoạt</Label>
                      <Switch 
                        id="new-is_active" 
                        checked={newItem.is_active} 
                        onCheckedChange={handleNewItemSwitchChange}
                      />
                    </div>
                  </div>
                  
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setItemDialogOpen(false)}>
                      Hủy
                    </Button>
                    <Button onClick={handleAddItem}>Thêm mục</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              {editingItem && (
                <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Chỉnh sửa mục</DialogTitle>
                      <DialogDescription>
                        Cập nhật thông tin cho mục trong slider
                      </DialogDescription>
                    </DialogHeader>
                    
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="edit-title">Tiêu đề</Label>
                        <Input 
                          id="edit-title" 
                          value={editingItem.title || ''} 
                          onChange={(e) => setEditingItem({...editingItem, title: e.target.value})} 
                          placeholder="Tiêu đề mục"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="edit-description">Mô tả</Label>
                        <Textarea 
                          id="edit-description" 
                          value={editingItem.description || ''} 
                          onChange={(e) => setEditingItem({...editingItem, description: e.target.value})} 
                          placeholder="Mô tả ngắn (tùy chọn)"
                          rows={3}
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="edit-button_text">Nút</Label>
                          <Input 
                            id="edit-button_text" 
                            value={editingItem.button_text || ''} 
                            onChange={(e) => setEditingItem({...editingItem, button_text: e.target.value})} 
                            placeholder="Văn bản nút (tùy chọn)"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="edit-button_url">Liên kết</Label>
                          <Input 
                            id="edit-button_url" 
                            value={editingItem.button_url || ''} 
                            onChange={(e) => setEditingItem({...editingItem, button_url: e.target.value})} 
                            placeholder="URL (tùy chọn)"
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="edit-image">Hình ảnh</Label>
                        <Input 
                          id="edit-image" 
                          type="file" 
                          accept="image/*" 
                          onChange={handleEditItemImageChange}
                        />
                        
                        {editingItem.image_url && (
                          <div className="mt-2 relative h-40 bg-muted rounded-md overflow-hidden">
                            <img 
                              src={editingItem.image_url} 
                              alt={editingItem.title || 'Slider image'} 
                              className="w-full h-full object-contain"
                            />
                          </div>
                        )}
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <Label htmlFor="edit-is_active" className="cursor-pointer">Kích hoạt</Label>
                        <Switch 
                          id="edit-is_active" 
                          checked={editingItem.is_active} 
                          onCheckedChange={(checked) => setEditingItem({...editingItem, is_active: checked})}
                        />
                      </div>
                    </div>
                    
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
                        Hủy
                      </Button>
                      <Button onClick={handleUpdateItem}>Lưu thay đổi</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              )}
            </div>
            
            <TabsContent value="info" className="space-y-6">
              <Card>
                <form onSubmit={handleSubmit}>
                  <CardHeader>
                    <CardTitle>Thông tin slider</CardTitle>
                    <CardDescription>
                      Chỉnh sửa thông tin cơ bản của slider
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
                        className={errors.slug ? 'border-destructive' : ''}
                      />
                      {errors.slug && <p className="text-destructive text-sm">{errors.slug}</p>}
                      <p className="text-xs text-muted-foreground">
                        Để trống để tự động tạo từ tên
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="description">Mô tả</Label>
                      <Textarea 
                        id="description"
                        name="description"
                        value={values.description}
                        onChange={handleChange}
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
                          checked={values.is_active}
                          onCheckedChange={handleSwitchChange}
                        />
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Slider sẽ {values.is_active ? '' : 'không'} được hiển thị trên trang web
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
              <Card>
                <CardHeader>
                  <CardTitle>Danh sách mục trong slider</CardTitle>
                  <CardDescription>
                    Kéo và thả để thay đổi thứ tự hiển thị
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {items.length === 0 ? (
                    <div className="text-center py-12 text-muted-foreground">
                      <p className="mb-4">Slider này chưa có mục nào</p>
                      <Button onClick={() => setItemDialogOpen(true)}>
                        <PlusIcon className="h-4 w-4 mr-2" />
                        Thêm mục đầu tiên
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {items.map((item, index) => (
                        <div
                          key={item.id}
                          className={`flex items-center gap-4 border rounded-lg p-3 cursor-move ${
                            dragItem === index ? 'opacity-50 border-primary' : ''
                          }`}
                          draggable
                          onDragStart={() => handleDragStart(index)}
                          onDragEnter={() => handleDragEnter(index)}
                          onDragOver={(e) => e.preventDefault()}
                          onDragEnd={handleDragEnd}
                        >
                          <div className="h-16 w-16 bg-muted rounded-md overflow-hidden flex-shrink-0">
                            <img 
                              src={item.image_thumb_url} 
                              alt={item.title || 'Slider image'} 
                              className="w-full h-full object-cover" 
                            />
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between">
                              <div>
                                <h4 className="font-medium truncate">
                                  {item.title || 'Không có tiêu đề'}
                                </h4>
                                {item.button_text && (
                                  <div className="text-sm text-muted-foreground">
                                    Nút: {item.button_text} → {item.button_url || '#'}
                                  </div>
                                )}
                              </div>
                              <Badge variant={item.is_active ? 'default' : 'secondary'} className="ml-2">
                                {item.is_active ? 'Hiển thị' : 'Ẩn'}
                              </Badge>
                            </div>
                            
                            {item.description && (
                              <p className="text-sm text-muted-foreground truncate mt-1">
                                {item.description}
                              </p>
                            )}
                          </div>
                          
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <EllipsisVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleEditItem(item)}>
                                Chỉnh sửa
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                className="text-destructive" 
                                onClick={() => handleDeleteItem(item.id)}
                              >
                                Xóa
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
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
    </AppLayout>
  );
}
