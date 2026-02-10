'use client';

import { useState, useEffect } from 'react';
import { getTasks } from '@/lib/api/tasks';
import { Task, TaskListResponse } from '@/types/task';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Table } from '@/components/ui/Table';
import { Pagination } from '@/components/ui/Pagination';
import { Badge } from '@/components/ui/Badge';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { formatDate, getStatusColor, getPriorityColor } from '@/lib/utils/formatters';
import { TASK_STATUSES, TASK_PRIORITIES } from '@/lib/utils/constants';

export default function TasksPage() {
  const router = useRouter();
  const [data, setData] = useState<TaskListResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    search: '',
    status: '',
    priority: '',
  });
  
  useEffect(() => {
    loadTasks();
  }, [currentPage, filters]);
  
  const loadTasks = async () => {
    setLoading(true);
    try {
      const response = await getTasks({ 
        page: currentPage, 
        perPage: 10,
        search: filters.search || undefined,
        status: (filters.status as any) || undefined,
        priority: (filters.priority as any) || undefined,
      });
      setData(response);
    } catch (error) {
      console.error('Failed to load tasks:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const columns = [
    {
      key: 'title' as keyof Task,
      header: 'Title',
      render: (task: Task) => (
        <Link 
          href={`/tasks/${task.id}`}
          className="font-medium text-gray-900 hover:text-gray-700 underline"
        >
          {task.title}
        </Link>
      ),
    },
    {
      key: 'status' as keyof Task,
      header: 'Status',
      render: (task: Task) => (
        <Badge className={getStatusColor(task.status)}>
          {task.status.replace('_', ' ')}
        </Badge>
      ),
    },
    {
      key: 'priority' as keyof Task,
      header: 'Priority',
      render: (task: Task) => (
        <Badge className={getPriorityColor(task.priority)}>
          {task.priority}
        </Badge>
      ),
    },
    {
      key: 'due_date' as keyof Task,
      header: 'Due Date',
      render: (task: Task) => (
        <span className="text-sm text-gray-600">{formatDate(task.due_date)}</span>
      ),
    },
    {
      key: 'id' as keyof Task,
      header: 'Actions',
      render: (task: Task) => (
        <Button
          variant="outline"
          size="sm"
          onClick={() => router.push(`/tasks/${task.id}`)}
        >
          View
        </Button>
      ),
    },
  ];
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Tasks</h1>
          <p className="text-gray-600 mt-1">Manage and track all your tasks</p>
        </div>
        <Link href="/tasks/new">
          <Button>
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Create Task
          </Button>
        </Link>
      </div>
      
      <Card>
        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <input
            type="text"
            placeholder="Search tasks..."
            value={filters.search}
            onChange={(e) => {
              setFilters({ ...filters, search: e.target.value });
              setCurrentPage(1);
            }}
            className="px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-gray-900 transition-colors"
          />
          
          <select
            value={filters.status}
            onChange={(e) => {
              setFilters({ ...filters, status: e.target.value });
              setCurrentPage(1);
            }}
            className="px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-gray-900 transition-colors"
          >
            <option value="">All Statuses</option>
            {TASK_STATUSES.map((status) => (
              <option key={status.value} value={status.value}>
                {status.label}
              </option>
            ))}
          </select>
          
          <select
            value={filters.priority}
            onChange={(e) => {
              setFilters({ ...filters, priority: e.target.value });
              setCurrentPage(1);
            }}
            className="px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-gray-900 transition-colors"
          >
            <option value="">All Priorities</option>
            {TASK_PRIORITIES.map((priority) => (
              <option key={priority.value} value={priority.value}>
                {priority.label}
              </option>
            ))}
          </select>
        </div>
        
        <Table
          columns={columns}
          data={data?.tasks || []}
          loading={loading}
          emptyMessage="No tasks found"
        />
        
        {data && data.pagination && data.pagination.total_pages > 1 && (
          <div className="mt-6">
            <Pagination
              currentPage={currentPage}
              totalPages={data.pagination.total_pages}
              onPageChange={setCurrentPage}
            />
          </div>
        )}
      </Card>
    </div>
  );
}
