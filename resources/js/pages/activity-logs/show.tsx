import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ActivityLog {
  id: number;
  user_name: string;
  action: string;
  model_type: string;
  model_id: number;
  old_values: Record<string, any>;
  new_values: Record<string, any>;
  description: string;
  created_at: string;
  ip_address: string;
  user_agent: string;
}

interface Props {
  log: ActivityLog;
}

export default function Show({ log }: Props) {
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
  
  const getChanges = () => {
    if (log.action === 'updated' && log.old_values && log.new_values) {
      const changes = [];
      for (const key in log.new_values) {
        if (key in log.old_values && log.old_values[key] !== log.new_values[key]) {
          changes.push({ field: key, old: log.old_values[key], new: log.new_values[key] });
        }
      }
      return changes;
    }
    return [];
  };
  
  const changes = getChanges();

  return (
    <AppLayout>
      <Head title="Chi tiết hoạt động" />
      
      <div className="py-12">
        <div className="max-w-5xl mx-auto sm:px-6 lg:px-8">
          <div className="flex items-center mb-6">
            <Button variant="outline" size="sm" asChild className="mr-4">
              <Link href={route('activity-logs.index')}>
                <ArrowLeftIcon className="h-4 w-4 mr-2" />
                Quay lại
              </Link>
            </Button>
            <h1 className="text-2xl font-semibold">Chi tiết hoạt động</h1>
          </div>
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Thông tin cơ bản</CardTitle>
                  <Badge variant={getActionBadgeVariant(log.action)}>{log.action}</Badge>
                </div>
                <CardDescription>
                  {log.description || 'Không có mô tả'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-1">Thời gian</h4>
                      <p>{new Date(log.created_at).toLocaleString()}</p>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-1">Người thực hiện</h4>
                      <p>{log.user_name || 'Ẩn danh'}</p>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-1">Đối tượng</h4>
                      <p>{formatModelType(log.model_type)} (ID: {log.model_id || 'N/A'})</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-1">Địa chỉ IP</h4>
                      <p>{log.ip_address || 'Không xác định'}</p>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-1">Trình duyệt</h4>
                      <p className="text-sm break-words">{log.user_agent || 'Không xác định'}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {(log.action === 'created' || log.action === 'updated' || log.action === 'deleted') && (
              <Card>
                <CardHeader>
                  <CardTitle>Chi tiết thay đổi</CardTitle>
                  <CardDescription>
                    {log.action === 'created' && 'Dữ liệu được tạo mới'}
                    {log.action === 'updated' && 'Dữ liệu được cập nhật'}
                    {log.action === 'deleted' && 'Dữ liệu bị xóa'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {log.action === 'created' && log.new_values && (
                    <div className="space-y-4">
                      <h3 className="text-sm font-medium">Dữ liệu đã tạo:</h3>
                      <div className="h-72 rounded-md border p-4 overflow-auto">
                        <pre className="text-sm">{JSON.stringify(log.new_values, null, 2)}</pre>
                      </div>
                    </div>
                  )}
                  
                  {log.action === 'deleted' && log.old_values && (
                    <div className="space-y-4">
                      <h3 className="text-sm font-medium">Dữ liệu đã xóa:</h3>
                      <div className="h-72 rounded-md border p-4 overflow-auto">
                        <pre className="text-sm">{JSON.stringify(log.old_values, null, 2)}</pre>
                      </div>
                    </div>
                  )}
                  
                  {log.action === 'updated' && changes.length > 0 && (
                    <div className="space-y-4">
                      <h3 className="text-sm font-medium">Các thay đổi:</h3>
                      <div className="border rounded-md overflow-hidden">
                        <table className="min-w-full divide-y divide-border">
                          <thead className="bg-muted/50">
                            <tr>
                              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Trường</th>
                              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Giá trị cũ</th>
                              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Giá trị mới</th>
                            </tr>
                          </thead>
                          <tbody className="bg-card divide-y divide-border">
                            {changes.map((change, index) => (
                              <tr key={index}>
                                <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">{change.field}</td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm">
                                  <div className="max-w-xs overflow-hidden text-ellipsis">
                                    {String(change.old || '')}
                                  </div>
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm">
                                  <div className="max-w-xs overflow-hidden text-ellipsis">
                                    {String(change.new || '')}
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {log.action === 'updated' && changes.length === 0 && (
                    <div className="text-center py-4 text-muted-foreground">
                      Không có thay đổi được ghi lại
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
