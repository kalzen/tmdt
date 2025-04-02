import { Page } from '@inertiajs/inertia';

declare namespace Inertia {
  export interface PageProps {
    locale?: string;
    translations?: Record<string, string>;
    auth?: {
      user: {
        id: number;
        name: string;
        email: string;
        [key: string]: any;
      };
    };
    flash?: {
      toast?: boolean;
      'toast.type'?: 'success' | 'error' | 'warning' | 'info' | 'default';
      'toast.message'?: string;
      [key: string]: any;
    };
  }
}

export = Inertia;
export as namespace Inertia;
