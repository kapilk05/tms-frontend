'use client';

import { useState, useEffect } from 'react';
import { getMembers } from '@/lib/api/members';
import { Member, MemberListResponse } from '@/types/member';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Table } from '@/components/ui/Table';
import { Pagination } from '@/components/ui/Pagination';
import { Badge } from '@/components/ui/Badge';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { formatDate } from '@/lib/utils/formatters';

export default function MembersPage() {
  const router = useRouter();
  const [data, setData] = useState<MemberListResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  
  useEffect(() => {
    loadMembers();
  }, [currentPage, searchQuery]);
  
  const loadMembers = async () => {
    setLoading(true);
    try {
      const response = await getMembers({ 
        page: currentPage, 
        perPage: 10, 
        search: searchQuery || undefined 
      });
      setData(response);
    } catch (error) {
      console.error('Failed to load members:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const columns = [
    {
      key: 'name' as keyof Member,
      header: 'Name',
      render: (member: Member) => (
        <Link 
          href={`/members/${member.id}`}
          className="font-medium text-gray-900 hover:text-gray-700 underline"
        >
          {member.name}
        </Link>
      ),
    },
    {
      key: 'email' as keyof Member,
      header: 'Email',
      render: (member: Member) => (
        <span className="text-gray-600">{member.email}</span>
      ),
    },
    {
      key: 'role' as keyof Member,
      header: 'Role',
      render: (member: Member) => (
        <Badge className={member.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'}>
          {member.role}
        </Badge>
      ),
    },
    {
      key: 'created_at' as keyof Member,
      header: 'Created',
      render: (member: Member) => (
        <span className="text-sm text-gray-500">{formatDate(member.created_at)}</span>
      ),
    },
    {
      key: 'id' as keyof Member,
      header: 'Actions',
      render: (member: Member) => (
        <Button
          variant="outline"
          size="sm"
          onClick={() => router.push(`/members/${member.id}`)}
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
          <h1 className="text-3xl font-bold text-gray-900">Team Members</h1>
          <p className="text-gray-600 mt-1">Manage your team and their roles</p>
        </div>
        <Link href="/members/new">
          <Button>
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add Member
          </Button>
        </Link>
      </div>
      
      <Card>
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search members..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full md:w-96 px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-gray-900 transition-colors"
          />
        </div>
        
        <Table
          columns={columns}
          data={data?.members || []}
          loading={loading}
          emptyMessage="No members found"
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
