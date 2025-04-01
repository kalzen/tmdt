import { useState, useEffect } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { PlusIcon } from '@heroicons/react/24/outline';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import HeadingSmall from '@/components/heading-small';
import { Input } from '@/components/ui/input';
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Switch } from '@/components/ui/switch';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, 
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, 
  AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { formatStorageUrl } from '@/utils/helpers';

interface Member {
  id: number;
  name: string;
  position: string;
  email: string | null;
  phone: string | null;
  is_active: boolean;
  avatar: string;
  avatar_thumb: string;
  sort_order: number;
}

interface Props {
  members: Member[];
}

export default function Index({ members }: Props) {
  const [deleting, setDeleting] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredMembers, setFilteredMembers] = useState<Member[]>(members);

  // Cập nhật bộ lọc khi tìm kiếm hoặc members thay đổi
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredMembers(members);
    } else {
      const query = searchQuery.toLowerCase();
      setFilteredMembers(members.filter(member => 
        member.name.toLowerCase().includes(query) || 
        member.position?.toLowerCase().includes(query) || 
        member.email?.toLowerCase().includes(query) ||
        member.phone?.toLowerCase().includes(query)
      ));
    }
  }, [searchQuery, members]);

  const handleDelete = (id: number) => {
    setDeleting(true);
    router.delete(route('members.destroy', id), {
      onFinish: () => setDeleting(false),
    });
  };

  const handleStatusChange = (member: Member) => {
    router.put(route('members.update', member.id), {
      ...member,
      is_active: !member.is_active,
    });
  };

  return (
    <AppLayout>
      <Head title="Quản lý Thành Viên" />
      
      <div className="px-4 py-6 space-y-6">
        <div className="flex items-center justify-between pb-4 border-b">
          <HeadingSmall 
            title="Quản lý Thành Viên" 
            description="Quản lý thông tin các thành viên trong tổ chức của bạn" 
          />
          
          <Button asChild>
            <Link href={route('members.create')}>
              <PlusIcon className="h-5 w-5 mr-2" />
              Thêm Thành Viên
            </Link>
          </Button>
        </div>

        {members.length > 0 && (
          <div className="flex items-center">
            <div className="relative flex-1 max-w-sm">
              <Input
                type="search"
                placeholder="Tìm kiếm thành viên..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        )}

        {filteredMembers.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">Ảnh</TableHead>
                <TableHead>Họ tên</TableHead>
                <TableHead>Chức vụ</TableHead>
                <TableHead>Liên hệ</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead className="text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMembers.map((member) => (
                <TableRow key={member.id}>
                  <TableCell>
                    <Avatar className="size-12">
                      <AvatarImage src={formatStorageUrl(member.avatar_thumb)} alt={member.name} />
                      <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </TableCell>
                  <TableCell className="font-medium">
                    {member.name}
                  </TableCell>
                  <TableCell>
                    {member.position || 'Chưa cập nhật'}
                  </TableCell>
                  <TableCell>
                    <div className="text-sm space-y-1">
                      {member.email && <div>{member.email}</div>}
                      {member.phone && <div>{member.phone}</div>}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Switch 
                        checked={member.is_active}
                        onCheckedChange={() => handleStatusChange(member)}
                      />
                      <Badge variant={member.is_active ? "default" : "secondary"}>
                        {member.is_active ? 'Đang hoạt động' : 'Không hoạt động'}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={route('members.edit', member.id)}>
                          Sửa
                        </Link>
                      </Button>
                      <Button variant="outline" size="sm" asChild>
                        <Link href={route('members.show', member.id)}>
                          Chi tiết
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
                              Hành động này sẽ xóa thành viên và không thể khôi phục.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Hủy bỏ</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDelete(member.id)} disabled={deleting}>
                              {deleting ? 'Đang xóa...' : 'Xác nhận xóa'}
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="text-center py-10">
            <p className="text-gray-500 dark:text-gray-400">
              {members.length === 0 
                ? 'Chưa có thành viên nào. Hãy thêm thành viên đầu tiên của bạn.' 
                : 'Không tìm thấy thành viên nào khớp với từ khóa tìm kiếm.'}
            </p>
            {members.length === 0 && (
              <Button asChild className="mt-4">
                <Link href={route('members.create')}>
                  <PlusIcon className="h-5 w-5 mr-2" />
                  Thêm Thành Viên
                </Link>
              </Button>
            )}
          </div>
        )}
      </div>
    </AppLayout>
  );
}
