import React from 'react';
import { cn } from '@/lib/utils';

interface RememberCheckboxProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  id: string;
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}

export function RememberCheckbox({ 
  id, 
  label, 
  checked, 
  onChange,
  disabled,
  className,
  ...props
}: RememberCheckboxProps) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!disabled) {
      onChange(!checked);
    }
  };

  return (
    <div 
      className={cn(
        "flex items-center space-x-2 select-none",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
      onClick={handleClick}
      {...props}
    >
      <div
        role="checkbox"
        aria-checked={checked}
        aria-labelledby={`${id}-label`}
        tabIndex={disabled ? -1 : 0}
        className={cn(
          "flex items-center justify-center h-4 w-4 shrink-0 rounded border border-primary ring-offset-background transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed",
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
        id={`${id}-label`}
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
