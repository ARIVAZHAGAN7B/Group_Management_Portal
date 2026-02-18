import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AllGroupsHeader } from '../components/Group/AllGroupsHeader';
import { AllGroupsTable } from '../components/Group/AllGroupsTable';
import type { GroupItem } from '../components/Group/AllGroupsTable';
import { useAxios } from '../hooks/useAxios';

interface ApiResponse {
  status: string;
  results: number;
  data: {
    groups: GroupItem[];
  };
}

export const AllGroups: React.FC = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');
  const [tierFilter, setTierFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const { data, loading, error } = useAxios<ApiResponse>({
    url: '/groups',
    method: 'GET'
  });

  const allGroups = data?.data.groups || [];

  // Filter groups based on search and filters
  const filteredGroups = allGroups.filter((group) => {
    const matchesSearch =
      group.name.toLowerCase().includes(search.toLowerCase()) ||
      group.leaderName.toLowerCase().includes(search.toLowerCase());
    const matchesTier = tierFilter === 'All' || group.tier === tierFilter;
    const matchesStatus = statusFilter === 'All' || group.status === statusFilter;
    return matchesSearch && matchesTier && matchesStatus;
  });

  const pageSize = 10;
  const totalPages = Math.ceil(filteredGroups.length / pageSize);
  const paginatedGroups = filteredGroups.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleViewGroup = (group: GroupItem) => {
    navigate(`/student/all-groups/${group.id}`);
  };

  return (
    <div className="flex flex-col w-full bg-[#f5f7f8] min-h-screen">
      <AllGroupsHeader
        search={search}
        onSearchChange={setSearch}
        tierFilter={tierFilter}
        onTierFilterChange={setTierFilter}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        isFilterOpen={isFilterOpen}
        onToggleFilter={() => setIsFilterOpen(!isFilterOpen)}
      />

      <main className="flex-1 px-4 sm:px-6 md:px-8 py-6 md:py-8">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#003366]"></div>
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-center">
              Error loading groups: {error.message}
            </div>
          ) : (
            <AllGroupsTable
              groups={paginatedGroups}
              currentPage={currentPage}
              totalPages={totalPages}
              pageSize={pageSize}
              totalResults={filteredGroups.length}
              onPageChange={setCurrentPage}
              onViewGroup={handleViewGroup}
            />
          )}

          {!loading && !error && filteredGroups.length === 0 && (
            <div className="py-20 text-center bg-white rounded-xl border border-dashed border-slate-300 mt-4">
              <p className="text-slate-500 font-medium">No groups found matching your criteria.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};
