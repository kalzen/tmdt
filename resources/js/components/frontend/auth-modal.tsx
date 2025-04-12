import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import * as Dialog from '@radix-ui/react-dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { RememberCheckbox } from '@/components/ui/remember-checkbox';
import { Link, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'login' | 'signup';
}

export function AuthModal({ isOpen, onClose, defaultTab = 'login' }: AuthModalProps) {
  const loginForm = useForm<{
    email: string;
    password: string;
    remember: boolean;
  }>({
    email: '',
    password: '',
    remember: false,
  });

  const signupForm = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    loginForm.post(route('login'), {
      preserveScroll: true,
      onSuccess: () => {
        onClose();
        loginForm.reset();
      },
    });
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    signupForm.post(route('register'), {
      preserveScroll: true,
      onSuccess: () => {
        onClose();
        signupForm.reset();
      },
    });
  };

  return (
    <Dialog.Root 
      open={isOpen} 
      onOpenChange={(open) => {
        if (!open) {
          onClose();
          loginForm.reset();
          signupForm.reset();
        }
      }}
    >
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
        <Dialog.Content className="fixed left-[50%] top-[50%] z-50 w-full max-w-[425px] translate-x-[-50%] translate-y-[-50%] rounded-lg border bg-background p-6 shadow-lg">
          <div className="text-center mb-6">
          <Link href={route('home')} className="mx-auto">
            <img src="/logo.png" alt="84Gate" className="h-8 w-auto" />
          </Link>
          </div>

        <Tabs defaultValue={defaultTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login">
            <form onSubmit={handleLogin} className="space-y-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email address</Label>
                <Input
                  id="email"
                  type="email"
                  autoFocus
                  autoComplete="email"
                  placeholder="email@example.com"
                  value={loginForm.data.email}
                  onChange={e => loginForm.setData('email', e.target.value)}
                  disabled={loginForm.processing}
                />
                {loginForm.errors.email && (
                  <p className="text-sm text-red-500">{loginForm.errors.email}</p>
                )}
              </div>
              
              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    href={route('password.request')}
                    className="text-sm text-primary hover:text-primary/80"
                    onClick={() => onClose()}
                  >
                    Forgot password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  placeholder="Password"
                  value={loginForm.data.password}
                  onChange={e => loginForm.setData('password', e.target.value)}
                  disabled={loginForm.processing}
                />
                {loginForm.errors.password && (
                  <p className="text-sm text-red-500">{loginForm.errors.password}</p>
                )}
              </div>

              <RememberCheckbox
                id="remember"
                label="Remember me"
                checked={loginForm.data.remember}
                onChange={(checked) => loginForm.setData('remember', checked)}
                disabled={loginForm.processing}
              />

              <Button type="submit" className="w-full" disabled={loginForm.processing}>
                {loginForm.processing && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
                {loginForm.processing ? 'Logging in...' : 'Login'}
              </Button>
            </form>
          </TabsContent>
          
          <TabsContent value="signup">
            <form onSubmit={handleSignup} className="space-y-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Full name</Label>
                <Input
                  id="name"
                  type="text"
                  autoComplete="name"
                  placeholder="John Doe"
                  value={signupForm.data.name}
                  onChange={e => signupForm.setData('name', e.target.value)}
                  disabled={signupForm.processing}
                />
                {signupForm.errors.name && (
                  <p className="text-sm text-red-500">{signupForm.errors.name}</p>
                )}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="signup-email">Email address</Label>
                <Input
                  id="signup-email"
                  type="email"
                  autoComplete="email"
                  placeholder="email@example.com"
                  value={signupForm.data.email}
                  onChange={e => signupForm.setData('email', e.target.value)}
                  disabled={signupForm.processing}
                />
                {signupForm.errors.email && (
                  <p className="text-sm text-red-500">{signupForm.errors.email}</p>
                )}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="signup-password">Password</Label>
                <Input
                  id="signup-password"
                  type="password"
                  autoComplete="new-password"
                  placeholder="Create a password"
                  value={signupForm.data.password}
                  onChange={e => signupForm.setData('password', e.target.value)}
                  disabled={signupForm.processing}
                />
                {signupForm.errors.password && (
                  <p className="text-sm text-red-500">{signupForm.errors.password}</p>
                )}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="password_confirmation">Confirm password</Label>
                <Input
                  id="password_confirmation"
                  type="password"
                  autoComplete="new-password"
                  placeholder="Confirm your password"
                  value={signupForm.data.password_confirmation}
                  onChange={e => signupForm.setData('password_confirmation', e.target.value)}
                  disabled={signupForm.processing}
                />
              </div>

              <Button type="submit" className="w-full" disabled={signupForm.processing}>
                {signupForm.processing && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
                {signupForm.processing ? 'Creating account...' : 'Create Account'}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
