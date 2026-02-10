'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getTaskById, updateTask, getTaskAssignments, assignTask, unassignTask } from '@/lib/api/tasks';
import { getMembers } from '@/lib/api/members';
import { Task, UpdateTaskRequest } from '@/types/task';
import { Member } from '@/types/member';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { formatDate, getStatusColor, getPriorityColor } from '@/lib/utils/formatters';
import { TASK_STATUSES, TASK_PRIORITIES } from '@/lib/utils/constants';

export default function TaskDetailPage() {
  const params = useParams();
  const router = useRouter();
  const taskId = params.id as string;
  
  const [task, setTask] = useState<Task | null>(null);
  const [assignments, setAssignments] = useState<Member[]>([]);
  const [allMembers, setAllMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedMemberId, setSelectedMemberId] = useState('');
  const [error, setError] = useState('');
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm<UpdateTaskRequest>();
  
  useEffect(() => {
    loadTaskData();
  }, [taskId]);
  
  const loadTaskData = async () => {
    setLoading(true);
    try {
      const [taskData, assignmentsData, membersData] = await Promise.all([
        getTaskById(Number(taskId)),
        getTaskAssignments(Number(taskId)),
        getMembers({ page: 1, perPage: 100 }),
      ]);
      
      setTask(taskData);
      setAssignments(assignmentsData);
      setAllMembers(membersData.members);
      reset({
        title: taskData.title,
        description: taskData.description,
        status: taskData.status,
        priority: taskData.priority,
        due_date: taskData.due_date,
      });
    } catch (err) {
      setError('Failed to load task');
    } finally {
      setLoading(false);
    }
  };
  
  const onSubmit = async (data: UpdateTaskRequest) => {
    setIsSubmitting(true);
    setError('');
    
    try {
      await updateTask(Number(taskId), data);
      await loadTaskData();
      setIsEditing(false);
    } catch (err: any) {
      setError(err.message || 'Failed to update task');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleAssign = async () => {
    if (!selectedMemberId) return;
    
    try {
      await assignTask(Number(taskId), { member_id: Number(selectedMemberId) });
      await loadTaskData();
      setShowAssignModal(false);
      setSelectedMemberId('');
    } catch (err: any) {
      setError(err.message || 'Failed to assign member');
    }
  };
  
  const handleUnassign = async (memberId: number) => {
    try {
      await unassignTask(Number(taskId), memberId);
      await loadTaskData();
    } catch (err: any) {
      setError(err.message || 'Failed to unassign member');
    }
  };
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }
  
  if (!task) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 mb-4">{error || 'Task not found'}</p>
        <Link href="/tasks">
          <Button>Back to Tasks</Button>
        </Link>
      </div>
    );
  }
  
  // Available members to assign (not already assigned)
  const availableMembers = allMembers.filter(
    (member) => !assignments.some((a) => a.id === member.id)
  );
  
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/tasks">
            <Button variant="outline" size="sm">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{task.title}</h1>
            <div className="flex items-center space-x-3 mt-2">
              <Badge className={getStatusColor(task.status)}>
                {task.status.replace('_', ' ')}
              </Badge>
              <Badge className={getPriorityColor(task.priority)}>
                {task.priority}
              </Badge>
            </div>
          </div>
        </div>
        {!isEditing && (
          <Button variant="outline" onClick={() => setIsEditing(true)}>
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Edit Task
          </Button>
        )}
      </div>
      
      {error && (
        <div className="p-4 border-2 border-red-500 bg-red-50 rounded-lg flex items-center space-x-3">
          <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-red-800">{error}</span>
        </div>
      )}
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Task Details */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            {isEditing ? (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <Input
                  label="Task Title"
                  {...register('title', { required: 'Title is required' })}
                  error={errors.title?.message}
                />
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    {...register('description', { required: 'Description is required' })}
                    rows={4}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-gray-900 transition-colors resize-none"
                  />
                  {errors.description && (
                    <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Status
                    </label>
                    <select
                      {...register('status', { required: 'Status is required' })}
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-gray-900 transition-colors"
                    >
                      {TASK_STATUSES.map((status) => (
                        <option key={status.value} value={status.value}>
                          {status.label}
                        </option>
                      ))}
                    </select>
                    {errors.status && (
                      <p className="mt-1 text-sm text-red-600">{errors.status.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Priority
                    </label>
                    <select
                      {...register('priority', { required: 'Priority is required' })}
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-gray-900 transition-colors"
                    >
                      {TASK_PRIORITIES.map((priority) => (
                        <option key={priority.value} value={priority.value}>
                          {priority.label}
                        </option>
                      ))}
                    </select>
                    {errors.priority && (
                      <p className="mt-1 text-sm text-red-600">{errors.priority.message}</p>
                    )}
                  </div>
                  
                  <Input
                    label="Due Date"
                    type="date"
                    {...register('due_date', { required: 'Due date is required' })}
                    error={errors.due_date?.message}
                  />
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
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-2">Description</label>
                  <p className="text-gray-900 whitespace-pre-wrap">{task.description}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">Due Date</label>
                    <p className="text-lg text-gray-900">{formatDate(task.due_date)}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">Created</label>
                    <p className="text-lg text-gray-900">{formatDate(task.created_at)}</p>
                  </div>
                </div>
              </div>
            )}
          </Card>
        </div>
        
        {/* Assignments Sidebar */}
        <div className="space-y-6">
          <Card>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Assigned To</h3>
              {availableMembers.length > 0 && (
                <Button size="sm" onClick={() => setShowAssignModal(true)}>
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Assign
                </Button>
              )}
            </div>
            
            {assignments.length === 0 ? (
              <p className="text-gray-500 text-sm text-center py-4">No members assigned</p>
            ) : (
              <div className="space-y-3">
                {assignments.map((member) => (
                  <div 
                    key={member.id} 
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div>
                      <p className="font-medium text-gray-900">{member.name}</p>
                      <p className="text-sm text-gray-600">{member.email}</p>
                    </div>
                    <button
                      onClick={() => handleUnassign(member.id)}
                      className="text-red-600 hover:text-red-800 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>
      </div>
      
      {/* Assign Member Modal */}
      <Modal
        isOpen={showAssignModal}
        onClose={() => {
          setShowAssignModal(false);
          setSelectedMemberId('');
        }}
        title="Assign Member"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Member
            </label>
            <select
              value={selectedMemberId}
              onChange={(e) => setSelectedMemberId(e.target.value)}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-gray-900 transition-colors"
            >
              <option value="">Choose a member...</option>
              {availableMembers.map((member) => (
                <option key={member.id} value={member.id}>
                  {member.name} ({member.email})
                </option>
              ))}
            </select>
          </div>
          
          <div className="flex space-x-3 justify-end">
            <Button 
              variant="outline" 
              onClick={() => {
                setShowAssignModal(false);
                setSelectedMemberId('');
              }}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleAssign}
              disabled={!selectedMemberId}
            >
              Assign
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
