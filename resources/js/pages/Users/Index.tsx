import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { MoreHorizontal, Pencil, Trash2, Shield, Trophy, User } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CustomPagination } from '@/components/custom-pagination';
import HeadingSmall from '@/components/heading-small';
import { type BreadcrumbItem } from '@/types';

interface UserType {
  id: number;
  name: string;
  email: string;
  is_admin: boolean;
  is_gold: boolean;
  created_at: string;
  email_verified_at: string | null;
  avatar: string;
}

interface Props {
  users: {
    data: UserType[];
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
    role: string;
    per_page: string;
  };
}

export default function UsersIndex({ users, filters }: Props) {
  const [searchQuery, setSearchQuery] = useState(filters.search || '');
  const [roleFilter, setRoleFilter] = useState(filters.role || '');

  // Breadcrumbs for navigation
  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: 'Users',
      href: route('users.index'),
    },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.get(route('users.index'), { 
      search: searchQuery,
      role: roleFilter,
      per_page: filters.per_page || '10'
    }, { preserveState: true });
  };

  const handleRoleChange = (value: string) => {
    setRoleFilter(value);
    
    // If "all" is selected, don't include the role parameter in the URL
    const params: { search: string; per_page: string; role?: string } = { 
      search: searchQuery,
      per_page: filters.per_page || '10'
    };
    
    // Only add role parameter if it's not "all"
    if (value !== 'all') {
      params.role = value;
    }
    
    router.get(route('users.index'), params, { preserveState: true });
  };

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this user?')) {
      router.delete(route('users.destroy', id));
    }
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Users Management" />

      <div className="space-y-6 p-6">
        <div className="flex items-center justify-between">
          <HeadingSmall 
            title="Users Management" 
            description="Manage user accounts in your system" 
          />

          <Link href={route('users.create')}>
            <Button>Create User</Button>
          </Link>
        </div>

        {/* Search and filters */}
        <div className="flex flex-wrap gap-4 items-center">
          <form onSubmit={handleSearch} className="flex-1 max-w-sm">
            <div className="relative flex items-center">
              <Input
                type="search"
                placeholder="Search users..."
                className="pl-4 pr-12"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button type="submit" size="sm" variant="ghost" className="absolute right-0">
                Search
              </Button>
            </div>
          </form>

          <Select 
            value={roleFilter} 
            onValueChange={handleRoleChange}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Users</SelectItem>
              <SelectItem value="admin">Administrators</SelectItem>
              <SelectItem value="gold">Gold Users</SelectItem>
              <SelectItem value="regular">Regular Users</SelectItem>
            </SelectContent>
          </Select>

          {/* Clear filters button */}
          {(filters.search || filters.role) && (
            <Button variant="ghost" onClick={() => router.get(route('users.index'), {})}>
              Clear filters
            </Button>
          )}
        </div>

        {/* Users table */}
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">Avatar</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.data.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                    {filters.search || filters.role
                      ? `No users found matching the current filters`
                      : "No users found."}
                  </TableCell>
                </TableRow>
              ) : (
                users.data.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="w-10 h-10 rounded-full overflow-hidden">
                        <img 
                          src={user.avatar || '/assets/images/default-avatar.png'} 
                          alt={user.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        {user.is_admin && (
                          <Badge variant="success" className="flex items-center gap-1">
                            <Shield className="h-3 w-3" /> Admin
                          </Badge>
                        )}
                        {user.is_gold && (
                          <Badge variant="warning" className="flex items-center gap-1">
                            <Trophy className="h-3 w-3" /> Gold
                          </Badge>
                        )}
                        {!user.is_admin && !user.is_gold && (
                          <Badge variant="outline" className="flex items-center gap-1">
                            <User className="h-3 w-3" /> Regular
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{new Date(user.created_at).toLocaleDateString()}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link href={route('users.edit', user.id)}>
                              <Pencil className="h-4 w-4 mr-2" /> Edit
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDelete(user.id)}>
                            <Trash2 className="h-4 w-4 mr-2" /> Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        {users && users.data && users.data.length > 0 && (
          <div className="mt-4 border-t pt-4">
            <CustomPagination
              currentPage={users.meta.current_page}
              lastPage={users.meta.last_page}
              perPage={parseInt(filters.per_page || '10')}
              total={users.meta.total}
              from={users.meta.from}
              to={users.meta.to}
              onPageChange={(page: number) => {
                router.get(
                  route('users.index'),
                  { ...filters, page },
                  { preserveState: true, preserveScroll: true }
                );
              }}
              onPerPageChange={(perPage: number) => {
                router.get(
                  route('users.index'),
                  { ...filters, per_page: perPage, page: 1 },
                  { preserveState: true }
                );
              }}
            />
          </div>
        )}
      </div>
    </AppLayout>
  );
}
