import { useState, useEffect } from 'react';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { PlusIcon, PencilIcon, TrashIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import HeadingSmall from '@/components/heading-small';
import { Input } from '@/components/ui/input';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, 
         AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Pagination } from '@/components/ui/pagination';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Config {
  id: number;
  name: string;
  title: string;
  value: string;
  type: string;
  description: string;
  group?: string;
}

interface Props {
  configs: {
    data: Config[];
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
    group: string;
    per_page: string;
  };
  groups: string[];
  flash: {
    message?: string;
  };
}

export default function Index({ configs, filters, groups = [], flash }: Props) {
  const [deleting, setDeleting] = useState(false);
  const [searchQuery, setSearchQuery] = useState(filters.search || '');
  
  const formatValue = (config: Config) => {
    if (config.type === 'boolean') {
      return config.value === '1' ? 'Có' : 'Không';
    }
    
    if (config.type === 'image') {
      return 'Tệp hình ảnh';
    }
    
    // Truncate long text values
    if (config.type === 'text' && config.value && config.value.length > 50) {
      return `${config.value.substring(0, 50)}...`;
    }
    
    return config.value;
  };
  
  const handleDelete = (id: number) => {
    setDeleting(true);
    router.delete(route('configs.destroy', id), {
      onFinish: () => setDeleting(false),
    });
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.get(route('configs.index'), { ...filters, search: searchQuery }, { preserveState: true });
  };

  const handleGroupChange = (value: string) => {
    router.get(route('configs.index'), { ...filters, group: value || null }, { preserveState: true });
  };

  const clearFilters = () => {
    setSearchQuery('');
    router.get(route('configs.index'), {}, { preserveState: true });
  };

  const handlePageChange = (page: number) => {
    router.get(route('configs.index'), { ...filters, page }, { preserveState: true });
  };

  const handlePerPageChange = (perPage: number) => {
    router.get(route('configs.index'), { ...filters, per_page: perPage }, { preserveState: true });
  };

  return (
    <AppLayout>
      <Head title="Cấu Hình Website" />
      
      <div className="space-y-6 px-4 py-6">
        <div className="flex items-center justify-between pb-4 border-b">
          <HeadingSmall 
            title="Cấu Hình Website" 
            description="Quản lý các cấu hình và thiết lập cho website của bạn" 
          />
          
          <Button asChild>
            <Link href={route('configs.create')}>
              <PlusIcon className="h-5 w-5 mr-2" />
              Thêm Cấu Hình
            </Link>
          </Button>
        </div>

        {configs.data.length > 0 && (
          <div className="flex flex-wrap gap-4 items-center">
            <form onSubmit={handleSearch} className="flex-1 max-w-sm">
              <div className="relative flex items-center">
                <MagnifyingGlassIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
                <Input
                  type="search"
                  placeholder="Tìm kiếm cấu hình..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button type="submit" size="sm" variant="ghost" className="absolute right-0">
                  Tìm
                </Button>
              </div>
            </form>
            
            {groups.length > 0 && (
              <Select 
                value={filters.group || ''} 
                onValueChange={handleGroupChange}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Chọn nhóm" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Tất cả nhóm</SelectItem>
                  {groups.map((group) => (
                    <SelectItem key={group} value={group}>{group}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
            
            {(filters.search || filters.group) && (
              <Button variant="ghost" onClick={clearFilters}>
                Xóa bộ lọc
              </Button>
            )}
          </div>
        )}

        <div className="rounded-md border">
          <div className="relative w-full overflow-auto">
            <table className="w-full caption-bottom text-sm">
              <thead className="[&_tr]:border-b">
                <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                    Tên hiển thị
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                    Mã
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                    Kiểu
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                    Giá trị
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                    Mô tả
                  </th>
                  <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">
                    Hành động
                  </th>
                </tr>
              </thead>
              <tbody className="[&_tr:last-child]:border-0">
                {configs.data.length === 0 ? (
                  <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                    <td colSpan={6} className="p-4 align-middle text-center text-muted-foreground">
                      Không tìm thấy cấu hình nào. Hãy tạo cấu hình đầu tiên của bạn.
                    </td>
                  </tr>
                ) : (
                  configs.data.map((config) => (
                    <tr key={config.id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                      <td className="p-4 align-middle font-medium">{config.title}</td>
                      <td className="p-4 align-middle">
                        <div className="text-sm text-muted-foreground">{config.name}</div>
                      </td>
                      <td className="p-4 align-middle">
                        <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-blue-100 text-blue-800">
                          {config.type}
                        </span>
                      </td>
                      <td className="p-4 align-middle">{formatValue(config)}</td>
                      <td className="p-4 align-middle">
                        <div className="text-sm text-muted-foreground line-clamp-2">
                          {config.description}
                        </div>
                      </td>
                      <td className="p-4 align-middle text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm" asChild>
                            <Link href={route('configs.edit', config.id)}>
                              Sửa
                            </Link>
                          </Button>
                          
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="destructive" size="sm">
                                Xóa
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Bạn có chắc chắn?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Hành động này không thể hoàn tác. Cấu hình sẽ bị xóa vĩnh viễn.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Hủy bỏ</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleDelete(config.id)} disabled={deleting}>
                                  {deleting ? 'Đang xóa...' : 'Xóa'}
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
        
        {configs.data.length === 0 && !searchQuery && (
          <div className="text-center py-10">
            <p className="text-gray-500 dark:text-gray-400">Không tìm thấy cấu hình nào. Hãy tạo cấu hình đầu tiên của bạn.</p>
            <Button asChild className="mt-4">
              <Link href={route('configs.create')}>
                <PlusIcon className="h-5 w-5 mr-2" />
                Thêm Cấu Hình
              </Link>
            </Button>
          </div>
        )}

        {/* Add a conditional check to ensure configs.meta exists before rendering pagination */}
        {configs.meta && (
          <div className="mt-6 border-t pt-6">
            <Pagination
              currentPage={configs.meta.current_page}
              lastPage={configs.meta.last_page}
              perPage={parseInt(filters.per_page || '10')}
              total={configs.meta.total}
              from={configs.meta.from || 0}
              to={configs.meta.to || 0}
              onPageChange={handlePageChange}
              onPerPageChange={handlePerPageChange}
            />
          </div>
        )}
      </div>
    </AppLayout>
  );
}
