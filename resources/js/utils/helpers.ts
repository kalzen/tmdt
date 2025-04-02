/**
 * Format a number as currency
 * 
 * @param amount The amount to format
 * @param locale The locale to use for formatting (defaults to 'en-US')
 * @param currency The currency code to use (defaults to 'USD')
 * @returns Formatted currency string
 */
export function formatCurrency(amount: number, locale = 'en-US', currency = 'USD'): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(amount);
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
