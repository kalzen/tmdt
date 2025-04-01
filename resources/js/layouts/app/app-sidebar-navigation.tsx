import { useState, useEffect } from 'react';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { PlusIcon, PencilIcon, TrashIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import HeadingSmall from '@/components/heading-small';
import { Input } from '@/components/ui/input';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, 
         AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';

interface Config {
  id: number;
  name: string;
  title: string;
  value: string;
  type: string;
  description: string;
}

interface Props {
  configs: Config[];
  flash: {
    message?: string;
  };
}

export default function Index({ configs, flash }: Props) {
  const [deleting, setDeleting] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredConfigs, setFilteredConfigs] = useState<Config[]>(configs);
  
  // Cập nhật bộ lọc khi tìm kiếm hoặc configs thay đổi
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredConfigs(configs);
    } else {
      const query = searchQuery.toLowerCase();
      setFilteredConfigs(configs.filter(config => 
        config.title.toLowerCase().includes(query) || 
        config.name.toLowerCase().includes(query) || 
        config.description?.toLowerCase().includes(query)
      ));
    }
  }, [searchQuery, configs]);

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

        {configs.length > 0 && (
          <div className="flex items-center">
            <div className="relative flex-1 max-w-sm">
              <MagnifyingGlassIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
              <Input
                type="search"
                placeholder="Tìm kiếm cấu hình..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
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
                {filteredConfigs.length === 0 ? (
                  <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                    <td colSpan={6} className="p-4 align-middle text-center text-muted-foreground">
                      {configs.length === 0 
                        ? 'Không tìm thấy cấu hình nào. Hãy tạo cấu hình đầu tiên của bạn.' 
                        : 'Không tìm thấy cấu hình khớp với tìm kiếm.'}
                    </td>
                  </tr>
                ) : (
                  filteredConfigs.map((config) => (
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
        
        {configs.length === 0 && (
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
      </div>
    </AppLayout>
  );
}