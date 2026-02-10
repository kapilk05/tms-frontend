'use client';

import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <nav className="flex items-center justify-between">
          <div className="text-xl font-bold tracking-wide">TMS</div>
          <div className="flex items-center space-x-4">
            <Link
              href="/login"
              className="px-4 py-2 rounded-full border border-white/30 hover:border-white hover:bg-white/10 transition"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="px-4 py-2 rounded-full bg-white text-black font-semibold hover:bg-gray-200 transition"
            >
              Register
            </Link>
          </div>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-20 items-start">
          <div>
            <p className="text-sm uppercase tracking-widest text-gray-300">Task Management System</p>
            <h1 className="text-5xl font-bold mt-3 leading-tight">
              Organize tasks, assign teams, and track progress.
            </h1>
            <p className="text-gray-300 mt-5 text-lg">
              A sleek, modern TMS frontend with role-based access, task assignments,
              and clean analytics.
            </p>

            <div className="flex items-center space-x-4 mt-8">
              <Link
                href="/login"
                className="px-6 py-3 rounded-lg bg-white text-black font-semibold hover:bg-gray-200 transition"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="px-6 py-3 rounded-lg border border-white/30 hover:border-white hover:bg-white/10 transition"
              >
                Register
              </Link>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h2 className="text-2xl font-semibold mb-4">TMS APIs</h2>
            <div className="space-y-3 text-sm text-gray-200">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <span>Auth</span>
                <span className="text-gray-400">/auth/register, /auth/login</span>
              </div>
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <span>Members</span>
                <span className="text-gray-400">/members (CRUD)</span>
              </div>
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <span>Tasks</span>
                <span className="text-gray-400">/tasks (CRUD)</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Assignments</span>
                <span className="text-gray-400">/tasks/:id/assign</span>
              </div>
            </div>

            <div className="mt-6">
              <div className="text-xs text-gray-400">
                Base URL: https://tms-backend-uf8q.onrender.com/api
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
