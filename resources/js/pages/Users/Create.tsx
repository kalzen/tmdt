import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { type BreadcrumbItem } from '@/types';
import HeadingSmall from '@/components/heading-small';

export default function CreateUser() {
  const { data, setData, post, processing, errors } = useForm<{
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
    is_admin: boolean;
    is_gold: boolean;
  }>({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    is_admin: false,
    is_gold: false,
  });

  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: 'Users',
      href: route('users.index'),
    },
    {
      title: 'Create User',
      href: route('users.create'),
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post(route('users.store'));
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Create User" />

      <div className="py-6 px-6">
        <HeadingSmall 
          title="Create User" 
          description="Add a new user to the system" 
        />

        <Card className="max-w-2xl mt-6">
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <CardTitle>User Information</CardTitle>
              <CardDescription>
                Enter the details for the new user account
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  value={data.name}
                  onChange={(e) => setData('name', e.target.value)}
                  required
                />
                {errors.name && <div className="text-red-500 text-sm">{errors.name}</div>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={data.email}
                  onChange={(e) => setData('email', e.target.value)}
                  required
                />
                {errors.email && <div className="text-red-500 text-sm">{errors.email}</div>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={data.password}
                  onChange={(e) => setData('password', e.target.value)}
                  required
                />
                {errors.password && <div className="text-red-500 text-sm">{errors.password}</div>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password_confirmation">Confirm Password</Label>
                <Input
                  id="password_confirmation"
                  type="password"
                  value={data.password_confirmation}
                  onChange={(e) => setData('password_confirmation', e.target.value)}
                  required
                />
              </div>

              <div className="flex items-center space-x-8 pt-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="is_admin"
                    checked={data.is_admin}
                    onCheckedChange={(checked) => setData('is_admin', !!checked)}
                  />
                  <Label htmlFor="is_admin" className="cursor-pointer">Administrator</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="is_gold"
                    checked={data.is_gold}
                    onCheckedChange={(checked) => setData('is_gold', !!checked)}
                  />
                  <Label htmlFor="is_gold" className="cursor-pointer">Gold User</Label>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end space-x-2">
              <Button type="button" variant="outline" onClick={() => window.history.back()}>
                Cancel
              </Button>
              <Button type="submit" disabled={processing}>
                Create User
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </AppLayout>
  );
}
