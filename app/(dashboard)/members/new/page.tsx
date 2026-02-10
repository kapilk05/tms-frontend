'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createMember } from '@/lib/api/members';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useForm } from 'react-hook-form';
import { CreateMemberRequest } from '@/types/member';
import Link from 'next/link';

export default function NewMemberPage() {
  const router = useRouter();
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { register, handleSubmit, formState: { errors } } = useForm<CreateMemberRequest>();
  
  const onSubmit = async (data: CreateMemberRequest) => {
    setIsSubmitting(true);
    setError('');
    
    try {
      await createMember(data);
      router.push('/members');
    } catch (err: any) {
      setError(err.message || 'Failed to create member');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center space-x-4">
        <Link href="/members">
          <Button variant="outline" size="sm">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Add New Member</h1>
          <p className="text-gray-600 mt-1">Create a new team member account</p>
        </div>
      </div>
      
      <Card>
        {error && (
          <div className="mb-6 p-4 border-2 border-red-500 bg-red-50 rounded-lg flex items-center space-x-3">
            <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-red-800">{error}</span>
          </div>
        )}
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <Input
            label="Full Name"
            {...register('name', { required: 'Name is required' })}
            error={errors.name?.message}
            placeholder="John Doe"
          />
          
          <Input
            label="Email Address"
            type="email"
            {...register('email', { 
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address',
              },
            })}
            error={errors.email?.message}
            placeholder="john@example.com"
          />
          
          <Input
            label="Password"
            type="password"
            {...register('password', { 
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters',
              },
            })}
            error={errors.password?.message}
            placeholder="••••••••"
          />
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Role
            </label>
            <select
              {...register('role_name', { required: 'Role is required' })}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-gray-900 transition-colors"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
            {errors.role_name && (
              <p className="mt-1 text-sm text-red-600">{errors.role_name.message}</p>
            )}
          </div>
          
          <div className="flex space-x-4 pt-4">
            <Button type="submit" loading={isSubmitting} disabled={isSubmitting}>
              Create Member
            </Button>
            <Link href="/members">
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </Link>
          </div>
        </form>
      </Card>
    </div>
  );
}
