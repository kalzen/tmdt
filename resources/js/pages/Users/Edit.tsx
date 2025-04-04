import React from 'react';
import { Head, useForm, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { type BreadcrumbItem } from '@/types';
import HeadingSmall from '@/components/heading-small';

interface UserType {
  id: number;
  name: string;
  email: string;
  is_admin: boolean;
  is_gold: boolean;
  avatar: string;
}

interface Props {
  user: UserType;
}

export default function EditUser({ user }: Props) {
  const { data, setData, put, processing, errors, reset } = useForm({
    name: user.name || '',
    email: user.email || '',
    password: '',
    password_confirmation: '',
    is_admin: user.is_admin || false,
    is_gold: user.is_gold || false,
    avatar: null as File | null,
    _method: 'PUT', // Add this to ensure Laravel knows it's a PUT request
  });

  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: 'Users',
      href: route('users.index'),
    },
    {
      title: 'Edit User',
      href: route('users.edit', user.id),
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create a new form data object that only includes the fields that changed
    const formData = new FormData();
    formData.append('_method', 'PUT');
    
    // Always send the role information
    formData.append('is_admin', data.is_admin ? '1' : '0');
    formData.append('is_gold', data.is_gold ? '1' : '0');
    
    // Only include other fields if they were changed
    if (data.name !== user.name) {
      formData.append('name', data.name);
    }
    
    if (data.email !== user.email) {
      formData.append('email', data.email);
    }
    
    if (data.password) {
      formData.append('password', data.password);
      formData.append('password_confirmation', data.password_confirmation);
    }
    
    if (data.avatar) {
      formData.append('avatar', data.avatar);
    }
    
    // Submit the form using the Inertia's router instead of the useForm's put method
    router.post(route('users.update', user.id), formData);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setData('avatar', e.target.files[0]);
    }
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title={`Edit User: ${user.name}`} />

      <div className="py-6 px-6">
        <HeadingSmall 
          title={`Edit User: ${user.name}`} 
          description="Update user information and permissions" 
        />

        <Card className="max-w-2xl mt-6">
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <CardTitle>User Information</CardTitle>
              <CardDescription>
                Update the user's details and permissions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col items-center mb-6">
                <div className="w-24 h-24 rounded-full overflow-hidden mb-3">
                  <img 
                    src={user.avatar || '/assets/images/default-avatar.png'} 
                    alt={user.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="avatar">Profile Photo</Label>
                  <Input
                    id="avatar"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </div>
              </div>

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
                <Label htmlFor="password">Password (leave blank to keep current)</Label>
                <Input
                  id="password"
                  type="password"
                  value={data.password}
                  onChange={(e) => setData('password', e.target.value)}
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
                Update User
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </AppLayout>
  );
}
