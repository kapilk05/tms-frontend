'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/context/AuthContext';
import { getTasks } from '@/lib/api/tasks';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Task } from '@/types/task';
import Link from 'next/link';
import { formatDate, getStatusColor, getPriorityColor } from '@/lib/utils/formatters';

export default function DashboardPage() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    inProgress: 0,
    completed: 0,
  });
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    loadDashboardData();
  }, []);
  
  const loadDashboardData = async () => {
    try {
      const response = await getTasks({ page: 1, perPage: 5 });
      setTasks(response.tasks.slice(0, 5));
      
      // Calculate stats (in real app, get from API)
      const allTasks = response.tasks;
      setStats({
        total: allTasks.length,
        pending: allTasks.filter(t => t.status === 'pending').length,
        inProgress: allTasks.filter(t => t.status === 'in_progress').length,
        completed: allTasks.filter(t => t.status === 'completed').length,
      });
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }
  
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-gray-900 to-gray-700 text-white border-none">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-300 text-sm mb-1">Total Tasks</p>
              <p className="text-4xl font-bold">{stats.total}</p>
            </div>
            <div className="text-5xl opacity-20">📋</div>
          </div>
        </Card>
        
        <Card className="bg-gradient-to-br from-yellow-500 to-orange-500 text-white border-none">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-100 text-sm mb-1">Pending</p>
              <p className="text-4xl font-bold">{stats.pending}</p>
            </div>
            <div className="text-5xl opacity-20">⏳</div>
          </div>
        </Card>
        
        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-none">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm mb-1">In Progress</p>
              <p className="text-4xl font-bold">{stats.inProgress}</p>
            </div>
            <div className="text-5xl opacity-20">🚀</div>
          </div>
        </Card>
        
        <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-none">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm mb-1">Completed</p>
              <p className="text-4xl font-bold">{stats.completed}</p>
            </div>
            <div className="text-5xl opacity-20">✅</div>
          </div>
        </Card>
      </div>
      
      {/* Recent Tasks */}
      <Card>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Recent Tasks</h2>
          <Link 
            href="/tasks" 
            className="text-gray-700 hover:text-gray-900 font-medium flex items-center space-x-2 transition-colors"
          >
            <span>View All</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
        
        {tasks.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No tasks yet. Create your first task!</p>
            <Link href="/tasks/new">
              <button className="mt-4 px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors">
                Create Task
              </button>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {tasks.map((task) => (
              <Link 
                key={task.id} 
                href={`/tasks/${task.id}`}
                className="block p-4 border-2 border-gray-200 rounded-lg hover:border-gray-900 hover:shadow-lg transition-all duration-200"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-2">{task.title}</h3>
                    <p className="text-sm text-gray-600 line-clamp-2 mb-3">{task.description}</p>
                    <div className="flex items-center space-x-3">
                      <Badge className={getStatusColor(task.status)}>
                        {task.status.replace('_', ' ')}
                      </Badge>
                      <Badge className={getPriorityColor(task.priority)}>
                        {task.priority}
                      </Badge>
                      <span className="text-xs text-gray-500">
                        Due: {formatDate(task.due_date)}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
