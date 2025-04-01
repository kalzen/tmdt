import AppLayout from '@/layouts/app-layout';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import HeadingSmall from '@/components/heading-small';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { ChevronDown, Edit, Eye, Plus, Trash } from 'lucide-react';

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
}

interface Slider {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  is_active: boolean;
  items_count: number;
  items: SliderItem[];
  created_at: string;
  updated_at: string;
}

interface Props {
  sliders: {
    data: Slider[];
    meta: {
      current_page: number;
      from: number;
      last_page: number;
      per_page: number;
      to: number;
      total: number;
    };
  };
  filters: {
    search: string;
    status: string | null;
  };
}

export default function Index({ sliders, filters }: Props) {
  const [searchQuery, setSearchQuery] = useState(filters.search || '');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.get(route('sliders.index'), { search: searchQuery }, { preserveState: true });
  };

  const handleFilterStatus = (status: string | null) => {
    router.get(route('sliders.index'), { ...filters, status }, { preserveState: true });
  };

  const clearFilters = () => {
    router.get(route('sliders.index'), {}, { preserveState: true });
  };

  const handleDelete = (sliderId: number) => {
    if (confirm('Bạn có chắc chắn muốn xóa slider này?')) {
      router.delete(route('sliders.destroy', sliderId));
    }
  };

  return (
    <AppLayout>
      <Head title="Quản lý Slider" />
      
      <div className="px-4 py-6 space-y-6">
        <div className="flex items-center justify-between pb-4 border-b">
          <HeadingSmall 
            title="Quản lý Slider" 
            description="Quản lý các slider hiển thị trên trang web" 
          />
          
          <Button asChild>
            <Link href={route('sliders.create')}>
              <Plus className="mr-2 h-4 w-4" />
              Thêm mới
            </Link>
          </Button>
        </div>

        <div className="flex flex-wrap gap-4 items-center">
          <form onSubmit={handleSearch} className="flex-1 max-w-sm">
            <div className="relative flex items-center">
              <Input
                type="search"
                placeholder="Tìm kiếm..."
                className="pl-8 pr-12"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button type="submit" size="sm" variant="ghost" className="absolute right-0">
                Tìm
              </Button>
            </div>
          </form>
          
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-1">
                  Trạng thái <ChevronDown size={16} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => handleFilterStatus(null)}>
                  Tất cả
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleFilterStatus('active')}>
                  Đang hoạt động
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleFilterStatus('inactive')}>
                  Tạm khóa
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            {(filters.search || filters.status) && (
              <Button variant="ghost" onClick={clearFilters}>
                Xóa bộ lọc
              </Button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {sliders.data.length === 0 ? (
            <div className="col-span-full text-center py-8 text-muted-foreground">
              Không tìm thấy slider nào
            </div>
          ) : (
            sliders.data.map((slider) => (
              <Card key={slider.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="p-4 border-b">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">{slider.name}</h3>
                      <Badge variant={slider.is_active ? "default" : "secondary"}>
                        {slider.is_active ? 'Hoạt động' : 'Tạm khóa'}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                      {slider.description || 'Không có mô tả'}
                    </p>
                    <div className="text-xs text-muted-foreground">
                      Slug: {slider.slug} | Items: {slider.items_count}
                    </div>
                  </div>
                  
                  {slider.items.length > 0 && (
                    <div className="relative h-48 bg-muted">
                      <Carousel className="w-full">
                        <CarouselContent>
                          {slider.items.map((item) => (
                            <CarouselItem key={item.id}>
                              <div className="p-1">
                                <div className="relative h-44 w-full">
                                  <img 
                                    src={item.image_url} 
                                    alt={item.title || 'Slider image'} 
                                    className="w-full h-full object-cover rounded-md"
                                  />
                                  {item.title && (
                                    <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-2">
                                      <h4 className="font-medium truncate">{item.title}</h4>
                                      {item.description && (
                                        <p className="text-xs truncate">{item.description}</p>
                                      )}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </CarouselItem>
                          ))}
                        </CarouselContent>
                        <CarouselPrevious className="left-2" />
                        <CarouselNext className="right-2" />
                      </Carousel>
                    </div>
                  )}
                  
                  <div className="flex justify-end p-2 gap-2 bg-muted/30">
                    <Button asChild size="sm" variant="ghost">
                      <Link href={route('sliders.show', slider.id)}>
                        <Eye className="h-4 w-4 mr-1" />
                        Xem
                      </Link>
                    </Button>
                    <Button asChild size="sm" variant="ghost">
                      <Link href={route('sliders.edit', slider.id)}>
                        <Edit className="h-4 w-4 mr-1" />
                        Sửa
                      </Link>
                    </Button>
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="text-destructive hover:text-destructive"
                      onClick={() => handleDelete(slider.id)}
                    >
                      <Trash className="h-4 w-4 mr-1" />
                      Xóa
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
        
        {sliders.meta && sliders.meta.last_page > 1 && (
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Hiển thị {sliders.meta.from} đến {sliders.meta.to} trong tổng số {sliders.meta.total} kết quả
            </div>
            <div className="flex items-center gap-2">
              {sliders.meta.current_page > 1 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => router.get(route('sliders.index'), {
                    ...filters, 
                    page: sliders.meta.current_page - 1
                  }, { preserveState: true })}
                >
                  Trước
                </Button>
              )}
              
              {sliders.meta.current_page < sliders.meta.last_page && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => router.get(route('sliders.index'), {
                    ...filters, 
                    page: sliders.meta.current_page + 1
                  }, { preserveState: true })}
                >
                  Tiếp
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
