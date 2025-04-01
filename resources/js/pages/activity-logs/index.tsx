import AppLayout from '@/layouts/app-layout';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import HeadingSmall from '@/components/heading-small';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { ChevronDown, SlashIcon } from 'lucide-react';
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Pagination } from '@/components/ui/pagination';

interface ActivityLog {
  id: number;
  user_name: string;
  action: string;
  model_type: string;
  description: string;
  created_at: string;
  ip_address: string;
}

interface Props {
  logs: {
    data: ActivityLog[];
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
    model: string;
    action: string;
    user_id: number;
  };
  actions: Record<string, string>;
}

export default function Index({ logs, filters, actions }: Props) {
  const [searchQuery, setSearchQuery] = useState(filters.search || '');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.get(route('activity-logs.index'), { search: searchQuery }, { preserveState: true });
  };

  const handleFilterAction = (action: string) => {
    router.get(route('activity-logs.index'), { ...filters, action }, { preserveState: true });
  };

  const clearFilters = () => {
    router.get(route('activity-logs.index'), {}, { preserveState: true });
  };

  const getActionBadgeVariant = (action: string): "destructive" | "default" | "secondary" | "outline" => {
    const variants = {
      created: 'default',
      updated: 'default',
      deleted: 'destructive',
      force_deleted: 'destructive',
      restored: 'default',
      login: 'default',
      logout: 'secondary',
      login_failed: 'destructive'
    } as const;
    return variants[action as keyof typeof variants] || 'default';
  };

  const formatModelType = (modelType: string) => {
    if (!modelType) return 'N/A';
    const parts = modelType.split('\\');
    return parts[parts.length - 1];
  };

  const handlePageChange = (page: number) => {
    router.get(route('activity-logs.index'), { ...filters, page }, { preserveState: true });
  };

  const handlePerPageChange = (perPage: number) => {
    router.get(route('activity-logs.index'), { ...filters, per_page: perPage }, { preserveState: true });
  };

  return (
    <AppLayout>
      <Head title="Nhật ký hoạt động" />
      
      <div className="px-4 py-6 space-y-6">
        <div className="flex items-center justify-between pb-4 border-b">
          <HeadingSmall 
            title="Nhật ký hoạt động" 
            description="Theo dõi tất cả các hoạt động trên hệ thống" 
          />
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
                  Loại <ChevronDown size={16} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {Object.entries(actions).map(([key, label]) => (
                  <DropdownMenuItem key={key} onClick={() => handleFilterAction(key)}>
                    {label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            
            {(filters.action || filters.model || filters.search) && (
              <Button variant="ghost" onClick={clearFilters}>
                Xóa bộ lọc
              </Button>
            )}
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Thời gian</TableHead>
              <TableHead>Người dùng</TableHead>
              <TableHead>Hành động</TableHead>
              <TableHead>Đối tượng</TableHead>
              <TableHead>Mô tả</TableHead>
              <TableHead>IP</TableHead>
              <TableHead className="text-right">Chi tiết</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {logs.data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-4 text-muted-foreground">
                  Không có dữ liệu
                </TableCell>
              </TableRow>
            ) : (
              logs.data.map((log) => (
                <TableRow key={log.id}>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="text-xs font-medium">
                        {new Date(log.created_at).toLocaleDateString()}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {new Date(log.created_at).toLocaleTimeString()}
                      </span>
                      <span className="text-xs italic text-muted-foreground">
                        {new Date(log.created_at).toLocaleString()}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {log.user_name || 'Ẩn danh'}
                  </TableCell>
                  <TableCell>
                    <Badge variant={getActionBadgeVariant(log.action)}>
                      {actions[log.action] || log.action}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {formatModelType(log.model_type)}
                  </TableCell>
                  <TableCell className="max-w-md">
                    <div className="truncate">
                      {log.description || 'Không có mô tả'}
                    </div>
                  </TableCell>
                  <TableCell>
                    {log.ip_address}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button asChild size="sm" variant="outline">
                      <Link href={route('activity-logs.show', log.id)}>
                        Chi tiết
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
        
        {logs?.meta && logs.meta.last_page > 1 && (
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Hiển thị {logs.meta.from} đến {logs.meta.to} trong tổng số {logs.meta.total} kết quả
            </div>
            <div className="flex items-center gap-2">
              {logs.meta.current_page > 1 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => router.get(route('activity-logs.index'), {
                    ...filters, 
                    page: logs.meta.current_page - 1
                  }, { preserveState: true })}
                >
                  Trước
                </Button>
              )}
              
              {logs.meta.current_page < logs.meta.last_page && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => router.get(route('activity-logs.index'), {
                    ...filters, 
                    page: logs.meta.current_page + 1
                  }, { preserveState: true })}
                >
                  Tiếp
                </Button>
              )}
            </div>
          </div>
        )}
      </div>

      {logs.meta && (
        <Pagination
          currentPage={logs.meta.current_page}
          lastPage={logs.meta.last_page}
          perPage={logs.meta.per_page}
          total={logs.meta.total}
          from={logs.meta.from}
          to={logs.meta.to}
          onPageChange={handlePageChange}
          onPerPageChange={handlePerPageChange}
        />
      )}
    </AppLayout>
  );
}
