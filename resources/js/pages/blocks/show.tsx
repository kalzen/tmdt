import { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { ArrowLeftIcon, PencilIcon } from '@heroicons/react/24/outline';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import HeadingSmall from '@/components/heading-small';
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
  created_at: string;
  updated_at: string;
}

interface Props {
  block: Block;
}

export default function Show({ block }: Props) {
  const activeItems = block.items.filter(item => item.is_active);
  
  // Helper để hiển thị nội dung theo từng loại
  const renderContent = (item: BlockItem) => {
    switch (item.type) {
      case 'title':
        return (
          <div className="prose dark:prose-invert max-w-none">
            <h2>{item.title}</h2>
          </div>
        );
        
      case 'description':
        return (
          <div className="prose dark:prose-invert max-w-none">
            <p>{item.description}</p>
          </div>
        );
        
      case 'content':
        return (
          <div className="prose dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: item.content || '' }} />
        );
        
      case 'image':
        return item.image_url && (
          <div className="rounded-md overflow-hidden">
            <img src={formatStorageUrl(item.image_url)} alt={item.title || 'Block image'} className="w-full h-auto" />
          </div>
        );
        
      case 'button':
        return (
          <Button 
            variant={item.button_type as any} 
            className="mt-4"
            asChild
          >
            <Link href={item.button_url || '#'}>{item.button_text}</Link>
          </Button>
        );
        
      case 'title_description':
        return (
          <div className="prose dark:prose-invert max-w-none">
            <h2>{item.title}</h2>
            <p>{item.description}</p>
          </div>
        );
        
      case 'image_content':
        return (
          <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 items-center ${
            item.image_position === 'right' ? 'md:flex-row-reverse' : ''
          }`}>
            {item.image_url && (
              <div className="rounded-md overflow-hidden">
                <img 
                  src={formatStorageUrl(item.image_url)} 
                  alt={item.title || 'Block image'} 
                  className="w-full h-auto object-cover" 
                />
              </div>
            )}
            <div className="prose dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: item.content || '' }} />
          </div>
        );
        
      case 'full':
        return (
          <div className={`grid grid-cols-1 ${
            item.image_position === 'left' || item.image_position === 'right' 
              ? 'md:grid-cols-2' : 'md:grid-cols-1'
          } gap-6 items-center`}>
            {item.image_position === 'left' && item.image_url && (
              <div className="rounded-md overflow-hidden">
                <img 
                  src={formatStorageUrl(item.image_url)} 
                  alt={item.title || 'Block image'} 
                  className="w-full h-auto object-cover" 
                />
              </div>
            )}
            
            {item.image_position === 'top' && item.image_url && (
              <div className="col-span-full rounded-md overflow-hidden">
                <img 
                  src={formatStorageUrl(item.image_url)} 
                  alt={item.title || 'Block image'} 
                  className="w-full h-auto object-cover" 
                />
              </div>
            )}
            
            <div className="space-y-4">
              {item.title && <h2 className="text-2xl font-bold">{item.title}</h2>}
              {item.description && <p className="text-muted-foreground">{item.description}</p>}
              {item.content && (
                <div className="prose dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: item.content }} />
              )}
              {item.button_text && (
                <Button 
                  variant={item.button_type as any} 
                  className="mt-4"
                  asChild
                >
                  <Link href={item.button_url || '#'}>{item.button_text}</Link>
                </Button>
              )}
            </div>
            
            {item.image_position === 'right' && item.image_url && (
              <div className="rounded-md overflow-hidden">
                <img 
                  src={formatStorageUrl(item.image_url)} 
                  alt={item.title || 'Block image'} 
                  className="w-full h-auto object-cover" 
                />
              </div>
            )}
            
            {item.image_position === 'bottom' && item.image_url && (
              <div className="col-span-full rounded-md overflow-hidden">
                <img 
                  src={formatStorageUrl(item.image_url)} 
                  alt={item.title || 'Block image'} 
                  className="w-full h-auto object-cover" 
                />
              </div>
            )}
          </div>
        );
        
      default:
        return <p className="text-muted-foreground">Loại mục không được hỗ trợ.</p>;
    }
  };

  return (
    <AppLayout>
      <Head title={`Chi tiết Block: ${block.name}`} />
      
      <div className="py-8">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <Button variant="outline" size="sm" asChild className="mr-4">
                <Link href={route('blocks.index')}>
                  <ArrowLeftIcon className="h-4 w-4 mr-2" />
                  Quay lại
                </Link>
              </Button>
              <HeadingSmall
                title={block.name}
                description="Chi tiết và xem trước block"
              />
            </div>
            
            <Button asChild>
              <Link href={route('blocks.edit', block.id)}>
                <PencilIcon className="h-4 w-4 mr-2" />
                Chỉnh sửa
              </Link>
            </Button>
          </div>
          
          <Tabs defaultValue="preview" className="space-y-6">
            <TabsList>
              <TabsTrigger value="preview">Xem trước</TabsTrigger>
              <TabsTrigger value="details">Thông tin chi tiết</TabsTrigger>
              <TabsTrigger value="code">Mã nhúng</TabsTrigger>
            </TabsList>
            
            <TabsContent value="preview" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Xem trước Block</CardTitle>
                  <CardDescription>
                    Xem trước cách hiển thị của block trên trang web
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {activeItems.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <p>Block này không có mục nào đang được kích hoạt.</p>
                      <Button asChild className="mt-4">
                        <Link href={route('blocks.edit', block.id)}>Thêm mục ngay</Link>
                      </Button>
                    </div>
                  ) : (
                    <div className="border border-dashed rounded-lg p-6 space-y-8">
                      {activeItems.map(item => (
                        <div key={item.id} className="relative">
                          <div className="absolute top-0 right-0 z-10">
                            <Badge variant="outline" className="mb-2">
                              {item.name || `ID: ${item.id}`}
                            </Badge>
                          </div>
                          {renderContent(item)}
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Tất cả các mục</CardTitle>
                  <CardDescription>
                    Danh sách tất cả các mục trong block (bao gồm cả mục không được kích hoạt)
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {block.items.length === 0 ? (
                      <div className="col-span-full text-center py-8 text-muted-foreground">
                        <p>Block này không có mục nào.</p>
                        <Button asChild className="mt-4">
                          <Link href={route('blocks.edit', block.id)}>Thêm mục ngay</Link>
                        </Button>
                      </div>
                    ) : (
                      block.items.map(item => (
                        <Card key={item.id} className={!item.is_active ? 'opacity-60' : ''}>
                          <CardHeader className="p-4">
                            <CardTitle className="text-base flex items-center justify-between">
                              {item.name || item.title || `Mục ${item.id}`}
                              <Badge variant={item.is_active ? 'default' : 'secondary'} className="ml-2">
                                {item.is_active ? 'Hiển thị' : 'Ẩn'}
                              </Badge>
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="p-4 pt-0">
                            <p className="text-xs text-muted-foreground mb-2">
                              Loại: {item.type} | Vị trí: {item.sort_order}
                            </p>
                            {item.title && <p className="font-medium truncate">{item.title}</p>}
                            {item.description && <p className="text-sm truncate">{item.description}</p>}
                            {item.image_thumb_url && (
                              <div className="mt-2 h-20 bg-muted rounded overflow-hidden">
                                <img 
                                  src={formatStorageUrl(item.image_thumb_url)} 
                                  alt={item.title || 'Thumbnail'}
                                  className="w-full h-full object-cover" 
                                />
                              </div>
                            )}
                          </CardContent>
                          <CardFooter className="p-4 pt-0 flex justify-end">
                            <Button size="sm" variant="outline" asChild>
                              <Link href={route('block-items.edit', item.id)}>Sửa</Link>
                            </Button>
                          </CardFooter>
                        </Card>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="details" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Thông tin cơ bản</CardTitle>
                    <Badge variant={block.is_active ? 'default' : 'secondary'}>
                      {block.is_active ? 'Đang hoạt động' : 'Đã bị ẩn'}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                    <div>
                      <dt className="text-sm font-medium text-muted-foreground">Tên block</dt>
                      <dd className="mt-1">{block.name}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-muted-foreground">Slug</dt>
                      <dd className="mt-1">{block.slug}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-muted-foreground">Vị trí hiển thị</dt>
                      <dd className="mt-1">{block.location || 'Không xác định'}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-muted-foreground">Thứ tự hiển thị</dt>
                      <dd className="mt-1">{block.sort_order}</dd>
                    </div>
                    <div className="md:col-span-2">
                      <dt className="text-sm font-medium text-muted-foreground">Mô tả</dt>
                      <dd className="mt-1">{block.description || 'Không có mô tả'}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-muted-foreground">Ngày tạo</dt>
                      <dd className="mt-1">{new Date(block.created_at).toLocaleString()}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-muted-foreground">Cập nhật lần cuối</dt>
                      <dd className="mt-1">{new Date(block.updated_at).toLocaleString()}</dd>
                    </div>
                  </dl>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="code" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Mã nhúng</CardTitle>
                  <CardDescription>
                    Sử dụng mã sau để hiển thị block này trong trang web của bạn
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-sm font-medium mb-2">Hiển thị theo slug</h3>
                      <div className="bg-muted p-3 rounded-md">
                        <code className="text-sm">
                          {`@php\n$block = \\App\\Models\\Block::with(['activeItems' => function($query) {\n    $query->orderBy('sort_order');\n}])->bySlug('${block.slug}')->active()->first();\n@endphp\n\n@if($block)\n    {{-- Hiển thị block tại đây --}}\n@endif`}
                        </code>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium mb-2">Hiển thị theo vị trí</h3>
                      <div className="bg-muted p-3 rounded-md">
                        <code className="text-sm">
                          {`@php\n$blocks = \\App\\Models\\Block::with(['activeItems' => function($query) {\n    $query->orderBy('sort_order');\n}])->byLocation('${block.location || 'location-name'}')->active()->orderBy('sort_order')->get();\n@endphp\n\n@foreach($blocks as $block)\n    {{-- Hiển thị các blocks tại đây --}}\n@endforeach`}
                        </code>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium mb-2">Component hiển thị block</h3>
                      <div className="bg-muted p-3 rounded-md">
                        <code className="text-sm">
                          {`@php\n// resources/views/components/block.blade.php\n@endphp\n\n@props(['block'])\n\n<div class="block block-{{ $block->slug }}">\n    @foreach($block->activeItems as $item)\n        @include('components.block-items.' . $item->type, ['item' => $item])\n    @endforeach\n</div>`}
                        </code>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </AppLayout>
  );
}
