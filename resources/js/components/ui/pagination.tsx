import React from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ChevronFirst, ChevronLast, ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  lastPage: number;
  perPage: number;
  total: number;
  from: number;
  to: number;
  onPageChange: (page: number) => void;
  onPerPageChange?: (perPage: number) => void;
  className?: string;
  perPageOptions?: number[];
  showPerPageSelector?: boolean;
  showInfo?: boolean;
}

export function Pagination({
  currentPage,
  lastPage,
  perPage,
  total,
  from,
  to,
  onPageChange,
  onPerPageChange,
  className = '',
  perPageOptions = [10, 25, 50, 100],
  showPerPageSelector = true,
  showInfo = true,
}: PaginationProps) {
  const handlePerPageChange = (value: string) => {
    if (onPerPageChange) {
      onPerPageChange(Number(value));
    }
  };

  // Generate page numbers to display (with ellipsis if needed)
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5; // Total visible page numbers (excluding ellipsis)
    
    if (lastPage <= maxVisiblePages) {
      // Show all pages if there are fewer than maxVisiblePages
      for (let i = 1; i <= lastPage; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);
      
      if (currentPage <= 3) {
        // If close to start, show 2, 3, 4, then ellipsis
        for (let i = 2; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('ellipsis');
        pages.push(lastPage);
      } else if (currentPage >= lastPage - 2) {
        // If close to end, show ellipsis then last 4 pages
        pages.push('ellipsis');
        for (let i = lastPage - 3; i <= lastPage; i++) {
          pages.push(i);
        }
      } else {
        // If somewhere in the middle, show ellipsis on both sides
        pages.push('ellipsis');
        pages.push(currentPage - 1);
        pages.push(currentPage);
        pages.push(currentPage + 1);
        pages.push('ellipsis');
        pages.push(lastPage);
      }
    }
    
    return pages;
  };

  return (
    <div className={`flex flex-wrap items-center justify-between gap-4 py-4 ${className}`}>
      {showInfo && (
        <div className="text-sm text-muted-foreground">
          Hiển thị từ <span className="font-medium">{from}</span> đến <span className="font-medium">{to}</span> trong tổng số <span className="font-medium">{total}</span> kết quả
        </div>
      )}
      
      <div className="flex flex-wrap items-center gap-2">
        {showPerPageSelector && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Hiển thị</span>
            <Select
              value={String(perPage)}
              onValueChange={handlePerPageChange}
            >
              <SelectTrigger className="h-8 w-[70px]">
                <SelectValue placeholder={perPage} />
              </SelectTrigger>
              <SelectContent side="top">
                {perPageOptions.map((option) => (
                  <SelectItem key={option} value={String(option)}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
        
        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => onPageChange(1)}
            disabled={currentPage === 1}
          >
            <ChevronFirst className="h-4 w-4" />
            <span className="sr-only">Trang đầu</span>
          </Button>
          
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Trang trước</span>
          </Button>
          
          {getPageNumbers().map((page, index) => (
            page === 'ellipsis' ? (
              <span 
                key={`ellipsis-${index}`} 
                className="flex h-8 w-8 items-center justify-center text-sm"
              >
                ...
              </span>
            ) : (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                size="icon"
                className="h-8 w-8"
                onClick={() => onPageChange(Number(page))}
              >
                {page}
              </Button>
            )
          ))}
          
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === lastPage}
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Trang sau</span>
          </Button>
          
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => onPageChange(lastPage)}
            disabled={currentPage === lastPage}
          >
            <ChevronLast className="h-4 w-4" />
            <span className="sr-only">Trang cuối</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
