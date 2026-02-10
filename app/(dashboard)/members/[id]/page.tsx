'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getMemberById, updateMember, deleteMember } from '@/lib/api/members';
import { Member, UpdateMemberRequest } from '@/types/member';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { formatDate } from '@/lib/utils/formatters';

export default function MemberDetailPage() {
  const params = useParams();
  const router = useRouter();
  const memberId = params.id as string;
  
  const [member, setMember] = useState<Member | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [error, setError] = useState('');
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm<UpdateMemberRequest>();
  
  useEffect(() => {
    loadMember();
  }, [memberId]);
  
  const loadMember = async () => {
    setLoading(true);
    try {
      const data = await getMemberById(Number(memberId));
      setMember(data);
      reset({
        name: data.name,
        email: data.email,
        role_name: data.role,
      });
    } catch (err) {
      setError('Failed to load member');
    } finally {
      setLoading(false);
    }
  };
  
  const onSubmit = async (data: UpdateMemberRequest) => {
    setIsSubmitting(true);
    setError('');
    
    try {
      await updateMember(Number(memberId), data);
      await loadMember();
      setIsEditing(false);
    } catch (err: any) {
      setError(err.message || 'Failed to update member');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleDelete = async () => {
    try {
      await deleteMember(Number(memberId));
      router.push('/members');
    } catch (err: any) {
      setError(err.message || 'Failed to delete member');
      setShowDeleteModal(false);
    }
  };
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }
  
  if (!member) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 mb-4">{error || 'Member not found'}</p>
        <Link href="/members">
          <Button>Back to Members</Button>
        </Link>
      </div>
    );
  }
  
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/members">
            <Button variant="outline" size="sm">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{member.name}</h1>
            <p className="text-gray-600 mt-1">{member.email}</p>
          </div>
        </div>
        <div className="flex space-x-3">
          {!isEditing && (
            <>
              <Button variant="outline" onClick={() => setIsEditing(true)}>
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Edit
              </Button>
              <Button variant="danger" onClick={() => setShowDeleteModal(true)}>
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Delete
              </Button>
            </>
          )}
        </div>
      </div>
      
      {error && (
        <div className="p-4 border-2 border-red-500 bg-red-50 rounded-lg flex items-center space-x-3">
          <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-red-800">{error}</span>
        </div>
      )}
      
      <Card>
        {isEditing ? (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <Input
              label="Full Name"
              {...register('name', { required: 'Name is required' })}
              error={errors.name?.message}
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
                Save Changes
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => {
                  setIsEditing(false);
                  reset();
                }}
              >
                Cancel
              </Button>
            </div>
          </form>
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Name</label>
                <p className="text-lg text-gray-900">{member.name}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Email</label>
                <p className="text-lg text-gray-900">{member.email}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Role</label>
                <Badge className={member.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'}>
                  {member.role}
                </Badge>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Member Since</label>
                <p className="text-lg text-gray-900">{formatDate(member.created_at)}</p>
              </div>
            </div>
          </div>
        )}
      </Card>
      
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Delete Member"
      >
        <div className="space-y-4">
          <p className="text-gray-700">
            Are you sure you want to delete <strong>{member.name}</strong>? This action cannot be undone.
          </p>
          <div className="flex space-x-3 justify-end">
            <Button variant="outline" onClick={() => setShowDeleteModal(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleDelete}>
              Delete
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
