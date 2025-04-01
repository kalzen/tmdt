import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeftIcon, PencilIcon } from '@heroicons/react/24/outline';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
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
  image_medium_url: string;
}

interface Slider {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  is_active: boolean;
  items: SliderItem[];
  created_at: string;
  updated_at: string;
}

interface Props {
  slider: Slider;
}

export default function Show({ slider }: Props) {
  const activeItems = slider.items.filter(item => item.is_active);
  
  return (
    <AppLayout>
      <Head title={`Chi tiết slider: ${slider.name}`} />
      
      <div className="py-12">
        <div className="max-w-5xl mx-auto sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <Button variant="outline" size="sm" asChild className="mr-4">
                <Link href={route('sliders.index')}>
                  <ArrowLeftIcon className="h-4 w-4 mr-2" />
                  Quay lại
                </Link>
              </Button>
              <HeadingSmall
                title={slider.name}
                description="Chi tiết và xem trước slider"
              />
            </div>
            
            <Button asChild>
              <Link href={route('sliders.edit', slider.id)}>
                <PencilIcon className="h-4 w-4 mr-2" />
                Chỉnh sửa
              </Link>
            </Button>
          </div>
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Thông tin cơ bản</CardTitle>
                  <Badge variant={slider.is_active ? "default" : "secondary"}>
                    {slider.is_active ? 'Đang hoạt động' : 'Tạm khóa'}
                  </Badge>
                </div>
                <CardDescription>
                  Thông tin chi tiết của slider
                </CardDescription>
              </CardHeader>
              <CardContent>
                <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <dt className="text-sm font-medium text-muted-foreground">Tên</dt>
                    <dd className="mt-1">{slider.name}</dd>
                  </div>
                  
                  <div>
                    <dt className="text-sm font-medium text-muted-foreground">Slug</dt>
                    <dd className="mt-1">{slider.slug}</dd>
                  </div>
                  
                  <div className="md:col-span-2">
                    <dt className="text-sm font-medium text-muted-foreground">Mô tả</dt>
                    <dd className="mt-1">{slider.description || 'Không có mô tả'}</dd>
                  </div>
                  
                  <div>
                    <dt className="text-sm font-medium text-muted-foreground">Số mục</dt>
                    <dd className="mt-1">{slider.items.length} mục ({activeItems.length} đang hiển thị)</dd>
                  </div>
                  
                  <div>
                    <dt className="text-sm font-medium text-muted-foreground">Ngày tạo</dt>
                    <dd className="mt-1">{new Date(slider.created_at).toLocaleString()}</dd>
                  </div>
                </dl>
              </CardContent>
            </Card>
            
            {slider.items.length > 0 ? (
              <Card>
                <CardHeader>
                  <CardTitle>Xem trước Slider</CardTitle>
                  <CardDescription>
                    Bản xem trước của slider này
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="border rounded-md p-4 bg-muted/30">
                    <Carousel className="w-full max-w-3xl mx-auto">
                      <CarouselContent>
                        {slider.items.map((item) => (
                          <CarouselItem key={item.id}>
                            <div className="p-1">
                              <Card>
                                <CardContent className="relative overflow-hidden rounded-md aspect-[16/9] p-0">
                                  {!item.is_active && (
                                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10">
                                      <Badge variant="secondary" className="text-lg">Đã tắt</Badge>
                                    </div>
                                  )}
                                  <img 
                                    src={item.image_medium_url || item.image_url}
                                    alt={item.title || 'Slider image'}
                                    className="w-full h-full object-cover"
                                  />
                                  
                                  {(item.title || item.description) && (
                                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent text-white">
                                      {item.title && <h3 className="text-lg font-semibold mb-2">{item.title}</h3>}
                                      {item.description && <p className="text-sm mb-3">{item.description}</p>}
                                      {item.button_text && (
                                        <Button size="sm" variant="secondary" className="mt-2">
                                          {item.button_text}
                                        </Button>
                                      )}
                                    </div>
                                  )}
                                </CardContent>
                              </Card>
                            </div>
                          </CarouselItem>
                        ))}
                      </CarouselContent>
                      <CarouselPrevious />
                      <CarouselNext />
                    </Carousel>
                    
                    <div className="mt-8">
                      <h4 className="font-medium mb-3">Tất cả mục</h4>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                        {slider.items.map((item) => (
                          <div key={item.id} className="relative border rounded-md overflow-hidden">
                            {!item.is_active && (
                              <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10">
                                <Badge variant="secondary">Đã tắt</Badge>
                              </div>
                            )}
                            <div className="aspect-square">
                              <img 
                                src={item.image_thumb_url} 
                                alt={item.title || 'Thumbnail'} 
                                className="w-full h-full object-cover"
                              />
                            </div>
                            {item.title && (
                              <div className="p-2 text-xs font-medium truncate">
                                {item.title}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button asChild>
                    <Link href={route('sliders.edit', slider.id)}>
                      Chỉnh sửa các mục
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ) : (
              <Card className="border-dashed">
                <CardHeader>
                  <CardTitle>Chưa có mục nào</CardTitle>
                  <CardDescription>
                    Slider này chưa có bất kỳ mục nào
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center py-8">
                  <p className="text-muted-foreground mb-4">
                    Thêm mục vào slider này để hiển thị nội dung trên trang web của bạn
                  </p>
                  <Button asChild>
                    <Link href={route('sliders.edit', slider.id)}>
                      Thêm mục đầu tiên
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            )}
            
            <Card>
              <CardHeader>
                <CardTitle>Mã nhúng</CardTitle>
                <CardDescription>
                  Sử dụng mã sau để hiển thị slider này trong trang web của bạn
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-muted p-3 rounded-md">
                  <code className="text-sm">
                    {`@php\n$slider = \\App\\Models\\Slider::with(['activeItems' => function($query) {\n    $query->orderBy('sort_order');\n}])->where('slug', '${slider.slug}')->first();\n@endphp\n\n@if($slider)\n    <!-- Hiển thị slider tại đây -->\n@endif`}
                  </code>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
