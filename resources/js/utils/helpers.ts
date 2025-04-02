/**
 * Format a number as currency
 */
export function formatCurrency(amount: number | string, locale: string = 'vi-VN', currency: string = 'VND'): string {
    const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
    
    if (isNaN(numAmount)) {
        return '0 ₫';
    }
    
    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(numAmount);
}

/**
 * Format a storage URL to ensure it has the correct path
 * For URLs that start with /storage, this function will return the full URL
 * @param url The storage URL to format
 * @returns The formatted URL
 */
export function formatStorageUrl(url: string | null): string {
  if (!url) return '';
  
  // If URL already includes the base URL or is an external URL, return as is
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  
  // For storage URLs, ensure they start with /storage
  if (url.startsWith('storage/')) {
    return `/${url}`;
  }
  
  // If the URL already starts with /storage, return as is
  if (url.startsWith('/storage/')) {
    return url;
  }
  
  // Otherwise, assume it's a storage URL that needs to be prefixed
  return `/storage/${url}`;
}
