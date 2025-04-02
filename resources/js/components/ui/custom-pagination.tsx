import React from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, MoreHorizontal } from 'lucide-react';
import { __ } from '@/utils/translate';

// Use a completely different name for this component and its props
interface ProductPaginationProps {
  currentPage: number;
  lastPage: number;
  perPage: number;
  total: number;
  from: number;
  to: number;
  onPageChange: (page: number) => void;
  onPerPageChange: (perPage: number) => void;
}

export function ProductPagination({
  currentPage,
  lastPage,
  perPage,
  total,
  from,
  to,
  onPageChange,
  onPerPageChange
}: ProductPaginationProps) {
  // Handle page change
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= lastPage) {
      onPageChange(page);
    }
  };

  // Calculate page numbers to show
  const getPageNumbers = () => {
    const delta = 1; // Number of pages to show on each side of the current page
    let range = [];
    
    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(lastPage - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    // Add first page
    if (currentPage - delta > 2) {
      range.unshift('...');
    }
    if (lastPage > 1) {
      range.unshift(1);
    }

    // Add last page
    if (currentPage + delta < lastPage - 1) {
      range.push('...');
    }
    if (lastPage > 1 && !range.includes(lastPage)) {
      range.push(lastPage);
    }

    return range;
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="text-sm text-muted-foreground">
        {__('admin.showing', 'Showing')} {from} {__('admin.to', 'to')} {to} {__('admin.of', 'of')} {total} {__('admin.results', 'results')}
      </div>

      <div className="flex items-center gap-2">
        <Select
          value={perPage.toString()}
          onValueChange={(value) => onPerPageChange(parseInt(value))}
        >
          <SelectTrigger className="h-8 w-[70px]">
            <SelectValue placeholder={perPage.toString()} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="25">25</SelectItem>
            <SelectItem value="50">50</SelectItem>
            <SelectItem value="100">100</SelectItem>
          </SelectContent>
        </Select>

        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => handlePageChange(1)}
            disabled={currentPage === 1}
          >
            <ChevronsLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <div className="flex items-center">
            {getPageNumbers().map((page, index) => (
              typeof page === 'number' ? (
                <Button
                  key={index}
                  variant={page === currentPage ? "default" : "outline"}
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </Button>
              ) : (
                <span key={index} className="px-2">
                  <MoreHorizontal className="h-4 w-4" />
                </span>
              )
            ))}
          </div>

          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === lastPage}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => handlePageChange(lastPage)}
            disabled={currentPage === lastPage}
          >
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
