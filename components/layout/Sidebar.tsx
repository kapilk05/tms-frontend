'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/lib/context/AuthContext';

export const Sidebar = () => {
  const pathname = usePathname();
  const { user } = useAuth();
  
  const isActive = (path: string) => pathname === path || pathname?.startsWith(path + '/');
  
  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: '📊', roles: ['admin', 'user'] },
    { name: 'Tasks', path: '/tasks', icon: '📝', roles: ['admin', 'user'] },
    { name: 'Members', path: '/members', icon: '👥', roles: ['admin'] },
  ];
  
  const filteredNavItems = navItems.filter(item => 
    item.roles.includes(user?.role || '')
  );
  
  return (
    <aside className="w-64 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white min-h-screen fixed left-0 top-0 shadow-2xl">
      {/* Logo */}
      <div className="p-6 border-b border-gray-700">
        <Link href="/dashboard" className="flex items-center space-x-3 group">
          <div className="w-10 h-10 bg-gradient-to-br from-white to-gray-300 rounded-lg flex items-center justify-center text-2xl transform group-hover:scale-110 transition-transform duration-200">
            📋
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              TMS
            </h1>
            <p className="text-xs text-gray-400">Task Management</p>
          </div>
        </Link>
      </div>
      
      {/* Navigation */}
      <nav className="p-4 space-y-2">
        {filteredNavItems.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
              isActive(item.path)
                ? 'bg-white text-gray-900 shadow-lg transform scale-105'
                : 'text-gray-300 hover:bg-gray-800 hover:text-white'
            }`}
          >
            <span className="text-2xl">{item.icon}</span>
            <span className="font-medium">{item.name}</span>
          </Link>
        ))}
      </nav>
      
      {/* User Info */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-700 bg-gray-900">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-gray-600 to-gray-800 rounded-full flex items-center justify-center text-white font-bold">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">{user?.name}</p>
            <p className="text-xs text-gray-400 capitalize">{user?.role}</p>
          </div>
        </div>
      </div>
    </aside>
  );
};
