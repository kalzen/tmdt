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
