import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

interface ControlledCheckboxProps {
  id: string;
  label: string;
  checked: boolean;
  onCheckedChange: (checked: boolean | 'indeterminate') => void;
  disabled?: boolean;
}

export function ControlledCheckbox({ 
  id, 
  label, 
  checked, 
  onCheckedChange, 
  disabled 
}: ControlledCheckboxProps) {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox
        id={id}
        checked={checked}
        onCheckedChange={(checked) => {
          if (typeof checked === 'boolean') {
            onCheckedChange(checked);
          }
        }}
        disabled={disabled}
      />
      <Label 
        htmlFor={id} 
        className="text-sm text-muted-foreground cursor-pointer"
      >
        {label}
      </Label>
    </div>
  );
}
