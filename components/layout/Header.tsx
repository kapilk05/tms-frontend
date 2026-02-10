'use client';

import React from 'react';
import { useAuth } from '@/lib/context/AuthContext';
import { Button } from '@/components/ui/Button';

export const Header = () => {
  const { user, logout } = useAuth();
  
  return (
    <header className="bg-white border-b-2 border-gray-200 shadow-md sticky top-0 z-40 ml-64">
      <div className="px-6 py-4 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            Welcome back, {user?.name}!
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Manage your tasks and team efficiently
          </p>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <p className="text-sm font-medium text-gray-900">{user?.name}</p>
            <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
          </div>
          <Button variant="outline" onClick={logout} size="sm">
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
};
