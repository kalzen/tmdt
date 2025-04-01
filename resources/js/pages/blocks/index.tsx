import { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import HeadingSmall from '@/components/heading-small';
import { PlusIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Pagination } from '@/components/ui/pagination';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { EllipsisVertical, Eye, Pencil, Trash } from 'lucide-react';

interface BlockItem {
  id: number;
  type: string;
  name: string | null;
  title: string | null;
  is_active: boolean;
}

interface Block {
  id: number;
  name: string;
  slug: string;
  location: string | null;
  description: string | null;
  is_active: boolean;
  sort_order: number;
  items_count: number;
  items: BlockItem[];
  created_at: string;
  updated_at: string;
}

interface Props {
  blocks: {
    data: Block[];
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
    location: string | null;
    status: string | null;
    per_page: string;
  };
  locations: string[];
}

export default function Index({ blocks, filters, locations }: Props) {
  const [searchQuery, setSearchQuery] = useState(filters.search || '');
  const [isDeleting, setIsDeleting] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.get(route('blocks.index'), { ...filters, search: searchQuery }, { preserveState: true });
  };

  const handleLocationFilter = (location: string) => {
    router.get(route('blocks.index'), { ...filters, location: location === "all" ? "" : location }, { preserveState: true });
  };

  const handleStatusFilter = (status: string | null) => {
    router.get(route('blocks.index'), { ...filters, status }, { preserveState: true });
  };

  const clearFilters = () => {
    setSearchQuery('');
    router.get(route('blocks.index'), {}, { preserveState: true });
  };

  const handlePageChange = (page: number) => {
    router.get(route('blocks.index'), { ...filters, page }, { preserveState: true });
  };

  const handlePerPageChange = (perPage: number) => {
    router.get(route('blocks.index'), { ...filters, per_page: perPage }, { preserveState: true });
  };

  const handleDelete = (id: number) => {
    if (confirm('Bạn có chắc chắn muốn xóa block này và tất cả các mục trong đó?')) {
      setIsDeleting(true);
      router.delete(route('blocks.destroy', id), {
        onFinish: () => setIsDeleting(false)
      });
    }
  };

  return (
    <AppLayout>
      <Head title="Quản lý Block" />
      
      <div className="space-y-6 px-4 py-6">
        <div className="flex items-center justify-between pb-4 border-b">
          <HeadingSmall 
            title="Quản lý Block" 
            description="Tạo và quản lý các khối nội dung tùy chỉnh trên trang web" 
          />
          
          <Button asChild>
            <Link href={route('blocks.create')}>
              <PlusIcon className="h-4 w-4 mr-2" />
              Thêm Block Mới
            </Link>
          </Button>
        </div>

        <div className="flex flex-wrap gap-4 items-center">
          <form onSubmit={handleSearch} className="flex-1 max-w-sm">
            <div className="relative flex items-center">
              <MagnifyingGlassIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
              <Input
                type="search"
                placeholder="Tìm kiếm block..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button type="submit" size="sm" variant="ghost" className="absolute right-0">
                Tìm
              </Button>
            </div>
          </form>
          
          {locations.length > 0 && (
            <Select 
              value={filters.location || "all"} 
              onValueChange={(value) => handleLocationFilter(value)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Vị trí" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả vị trí</SelectItem>
                {locations.map((location) => (
                  <SelectItem key={location} value={location}>{location}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
          
          <Select 
            value={filters.status || "all"} 
            onValueChange={(value) => handleStatusFilter(value === "all" ? null : value)}
          >
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Trạng thái" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả</SelectItem>
              <SelectItem value="active">Hoạt động</SelectItem>
              <SelectItem value="inactive">Ẩn</SelectItem>
            </SelectContent>
          </Select>
          
          {(filters.search || filters.location || filters.status) && (
            <Button variant="ghost" onClick={clearFilters}>
              Xóa bộ lọc
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {blocks.data.length === 0 ? (
            <div className="col-span-full text-center py-12 text-muted-foreground">
              <p className="mb-4">Không tìm thấy block nào.</p>
              <Button asChild>
                <Link href={route('blocks.create')}>
                  <PlusIcon className="h-4 w-4 mr-2" />
                  Thêm Block Mới
                </Link>
              </Button>
            </div>
          ) : (
            blocks.data.map((block) => (
              <Card key={block.id} className="overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{block.name}</CardTitle>
                      {block.location && (
                        <div className="text-xs text-muted-foreground mt-1">
                          Vị trí: {block.location}
                        </div>
                      )}
                    </div>
                    <Badge variant={block.is_active ? "default" : "secondary"}>
                      {block.is_active ? 'Hoạt động' : 'Ẩn'}
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent className="pb-2">
                  {block.description && (
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                      {block.description}
                    </p>
                  )}
                  
                  <div className="flex items-center gap-1 mt-2">
                    <div className="text-xs px-2 py-1 bg-muted rounded-md">
                      {block.items_count} mục
                    </div>
                    <div className="text-xs px-2 py-1 bg-muted rounded-md">
                      Slug: {block.slug}
                    </div>
                  </div>
                </CardContent>
                
                <CardFooter className="flex justify-between pt-2">
                  <div className="text-xs text-muted-foreground">
                    Cập nhật: {new Date(block.updated_at).toLocaleDateString()}
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <span className="sr-only">Mở menu</span>
                        <EllipsisVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link href={route('blocks.show', block.id)} className="cursor-pointer">
                          <Eye className="mr-2 h-4 w-4" /> Xem chi tiết
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={route('blocks.edit', block.id)} className="cursor-pointer">
                          <Pencil className="mr-2 h-4 w-4" /> Chỉnh sửa
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        className="text-destructive focus:text-destructive cursor-pointer"
                        onClick={() => handleDelete(block.id)}
                        disabled={isDeleting}
                      >
                        <Trash className="mr-2 h-4 w-4" /> Xóa
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </CardFooter>
              </Card>
            ))
          )}
        </div>

        {blocks.meta && (
          <div className="mt-6 border-t pt-6">
            <Pagination
              currentPage={blocks.meta.current_page}
              lastPage={blocks.meta.last_page}
              perPage={parseInt(filters.per_page || '10')}
              total={blocks.meta.total}
              from={blocks.meta.from || 0}
              to={blocks.meta.to || 0}
              onPageChange={handlePageChange}
              onPerPageChange={handlePerPageChange}
            />
          </div>
        )}
      </div>
    </AppLayout>
  );
}
