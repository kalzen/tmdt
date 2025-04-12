import React from 'react';
import { cn } from '@/lib/utils';

interface CustomCheckboxProps extends React.HTMLAttributes<HTMLDivElement> {
  id: string;
  label: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  disabled?: boolean;
}

export function CustomCheckbox({ 
  id, 
  label, 
  checked, 
  onCheckedChange,
  disabled,
  className,
  ...props
}: CustomCheckboxProps) {
  return (
    <div 
      className={cn(
        "flex items-center space-x-2",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
      onClick={() => !disabled && onCheckedChange(!checked)}
      {...props}
    >
      <div
        className={cn(
          "h-4 w-4 shrink-0 rounded border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed",
          checked && "bg-primary text-primary-foreground"
        )}
      >
        {checked && (
          <svg
            className="h-4 w-4 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        )}
      </div>
      <label 
        htmlFor={id}
        className={cn(
          "text-sm text-muted-foreground cursor-pointer",
          disabled && "cursor-not-allowed"
        )}
      >
        {label}
      </label>
    </div>
  );
}
