import React, { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { cn } from '@/lib/utils';
import { formatStorageUrl } from '@/utils/helpers';

interface ImageUploaderProps {
  id?: string;
  value?: string | null;
  onChange: (file: File | null) => void;
  onRemove?: () => void;
  title?: string;
  description?: string;
  error?: string;
  helpText?: string;
  placeholder?: string;
  className?: string;
  previewClassName?: string;
  required?: boolean;
  disabled?: boolean;
  hideLabel?: boolean;
}

export function ImageUploader({
  id = 'image-upload',
  value,
  onChange,
  onRemove,
  title = 'Upload Image',
  description,
  error,
  helpText,
  placeholder = 'Click to upload',
  className = 'w-full h-32',
  previewClassName = 'w-full h-32 object-cover',
  required = false,
  disabled = false,
  hideLabel = false,
}: ImageUploaderProps) {
  const [preview, setPreview] = useState<string | null>(value || null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      onChange(file);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      onChange(file);
    }
  };

  const handleClear = () => {
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    onChange(null);
    onRemove?.();
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader>
        {!hideLabel && (
          <>
            <CardTitle>{title}{required && <span className="text-destructive">*</span>}</CardTitle>
            {description && <CardDescription>{description}</CardDescription>}
          </>
        )}
      </CardHeader>

      <CardContent>
        <input
          id={id}
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
          disabled={disabled}
        />

        {preview ? (
            <div className="relative">
            <img 
              src={preview || value || ''} 
              alt={title} 
              className={previewClassName || 'w-full h-auto object-contain'} 
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-black/50">
              <div className="flex gap-2">
              <Button 
                size="sm" 
                onClick={handleClick}
                disabled={disabled}
                variant="secondary"
              >
                <PencilIcon className="w-4 h-4 mr-1" />
                Change
              </Button>
              <Button 
                size="sm" 
                onClick={handleClear}
                disabled={disabled}
                variant="destructive"
              >
                <TrashIcon className="w-4 h-4 mr-1" />
                Remove
              </Button>
              </div>
            </div>
            </div>
        ) : (
          <div
            onClick={!disabled ? handleClick : undefined}
            onDragEnter={!disabled ? handleDrag : undefined}
            onDragLeave={!disabled ? handleDrag : undefined}
            onDragOver={!disabled ? handleDrag : undefined}
            onDrop={!disabled ? handleDrop : undefined}
            className={cn(
              "border-2 border-dashed rounded-md flex flex-col items-center justify-center cursor-pointer",
              dragActive ? "border-primary" : "border-muted-foreground/25",
              disabled ? "opacity-50 cursor-not-allowed" : "hover:border-muted-foreground/50",
              error ? "border-destructive" : "",
              className
            )}
          >
            <Label htmlFor={id} className="text-muted-foreground cursor-pointer text-center">
              {placeholder}
            </Label>
          </div>
        )}

        {error && <p className="text-destructive text-sm mt-2">{error}</p>}
        {helpText && !error && <p className="text-muted-foreground text-sm mt-2">{helpText}</p>}
      </CardContent>
    </Card>
  );
}
