import { usePage } from '@inertiajs/react';
import { PageProps } from '@inertiajs/core';

/**
 * Translate function that uses the translations provided by the server
 * Chỉ sử dụng trong React components
 * @param key The translation key
 * @param defaultValue The default value to return if the key is not found
 * @returns The translated string or the default value
 */
export function useTranslation() {
    const page = usePage<PageProps>();
    const translations = page.props.translations as Record<string, string> | undefined;
    
    return (key: string, defaultValue: string): string => {
        return translations && key in translations ? translations[key] : defaultValue;
    };
}

/**
 * Hàm dịch đơn giản, sử dụng cả trong và ngoài component
 */
export function __(key: string, defaultValue: string): string {
    try {
        const page = usePage();
        const translations = page.props.translations as Record<string, string> | undefined;
        return translations && key in translations ? translations[key] : defaultValue;
    } catch (error) {
        return defaultValue;
    }
}
