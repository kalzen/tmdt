import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CustomPagination } from '@/components/custom-pagination';
import HeadingSmall from '@/components/heading-small';
import { type BreadcrumbItem } from '@/types';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { MoreHorizontal, Eye, Filter } from 'lucide-react';

interface ActivityLog {
  id: number;
  user_id: number;
  user_name: string;
  action: string;
  model_type: string;
  model_id: number;
  description: string;
  properties: any;
  ip_address: string;
  created_at: string;
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
    user_id: string;
    per_page: string;
  };
  actions: string[];
}

export default function ActivityLogs({ logs, filters, actions }: Props) {
  const [searchQuery, setSearchQuery] = useState(filters.search || '');
  const [modelFilter, setModelFilter] = useState(filters.model || '');
  const [actionFilter, setActionFilter] = useState(filters.action || '');

  // Breadcrumbs for navigation
  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: 'Activity Logs',
      href: route('activity-logs.index'),
    },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    applyFilters({ search: searchQuery });
  };

  const handleModelChange = (value: string) => {
    setModelFilter(value);
    applyFilters({ model: value });
  };

  const handleActionChange = (value: string) => {
    setActionFilter(value);
    applyFilters({ action: value });
  };

  const applyFilters = (newFilters: Record<string, string>) => {
    router.get(route('activity-logs.index'), {
      ...filters,
      ...newFilters,
      page: 1, // Reset to first page when changing filters
    }, {
      preserveState: true,
    });
  };

  // Extract unique model types from logs
  const getUniqueModelTypes = () => {
    const modelTypes: string[] = [];
    logs.data.forEach(log => {
      if (log.model_type && !modelTypes.includes(log.model_type)) {
        modelTypes.push(log.model_type);
      }
    });
    return modelTypes;
  };

  const uniqueModelTypes = getUniqueModelTypes();

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Activity Logs" />

      <div className="space-y-6 p-6">
        <div className="flex items-center justify-between">
          <HeadingSmall 
            title="Activity Logs" 
            description="View system activity logs" 
          />
        </div>

        {/* Search and filters */}
        <div className="flex flex-wrap gap-4 items-center">
          <form onSubmit={handleSearch} className="flex-1 max-w-sm">
            <div className="relative flex items-center">
              <Input
                type="search"
                placeholder="Search logs..."
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
            value={modelFilter} 
            onValueChange={handleModelChange}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by model" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Models</SelectItem>
              {uniqueModelTypes.map(model => (
                <SelectItem key={model} value={model}>{model.replace('App\\Models\\', '')}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select 
            value={actionFilter} 
            onValueChange={handleActionChange}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by action" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Actions</SelectItem>
              {actions.map(action => (
                <SelectItem key={action} value={action}>{action}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Clear filters button */}
          {(filters.search || filters.model || filters.action) && (
            <Button variant="ghost" onClick={() => router.get(route('activity-logs.index'), {})}>
              Clear filters
            </Button>
          )}
        </div>

        {/* Logs table */}
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Model</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {logs.data.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                    No activity logs found.
                  </TableCell>
                </TableRow>
              ) : (
                logs.data.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell>{log.user_name}</TableCell>
                    <TableCell>
                      <Badge variant={
                        log.action === 'created' ? 'success' : 
                        log.action === 'updated' ? 'warning' : 
                        log.action === 'deleted' ? 'destructive' : 'outline'
                      }>
                        {log.action}
                      </Badge>
                    </TableCell>
                    <TableCell>{log.model_type.replace('App\\Models\\', '')}</TableCell>
                    <TableCell className="max-w-md truncate">{log.description}</TableCell>
                    <TableCell>{new Date(log.created_at).toLocaleString()}</TableCell>
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
                            <Link href={route('activity-logs.show', log.id)}>
                              <Eye className="h-4 w-4 mr-2" /> View Details
                            </Link>
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
        {logs && logs.data && logs.data.length > 0 && (
          <div className="mt-4 border-t pt-4">
            <CustomPagination
              currentPage={logs.meta.current_page}
              lastPage={logs.meta.last_page}
              perPage={parseInt(filters.per_page || '15')}
              total={logs.meta.total}
              from={logs.meta.from}
              to={logs.meta.to}
              onPageChange={(page: number) => {
                router.get(
                  route('activity-logs.index'),
                  { ...filters, page },
                  { preserveState: true, preserveScroll: true }
                );
              }}
              onPerPageChange={(perPage: number) => {
                router.get(
                  route('activity-logs.index'),
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
