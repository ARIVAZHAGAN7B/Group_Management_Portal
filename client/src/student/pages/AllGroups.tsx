import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AllGroupsHeader } from '../components/Group/AllGroupsHeader';
import { AllGroupsTable } from '../components/Group/AllGroupsTable';
import type { GroupItem } from '../components/Group/AllGroupsTable';

export const AllGroups: React.FC = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');
  const [tierFilter, setTierFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Mock data - replace with API call in production
  const mockGroups: GroupItem[] = [
    {
      id: 1,
      name: "Alpha Robotics Society",
      status: 'Active',
      tier: 'Tier A',
      leaderName: "Sarah Chen",
      leaderRank: 2,
      groupRank: 1,
      members: 11,
      maxMembers: 12,
    },
    {
      id: 2,
      name: "Quantum Theory Soc.",
      status: 'Active',
      tier: 'Tier B',
      leaderName: "Marcus Wright",
      leaderRank: 5,
      groupRank: 2,
      members: 10,
      maxMembers: 12,
    },
    {
      id: 3,
      name: "Neural Net Pioneers",
      status: 'Active',
      tier: 'Tier B',
      leaderName: "Elena Petrova",
      leaderRank: 7,
      groupRank: 3,
      members: 9,
      maxMembers: 12,
    },
    {
      id: 4,
      name: "Biotech Innovation Lab",
      status: 'Active',
      tier: 'Tier C',
      leaderName: "James Wilson",
      leaderRank: 12,
      groupRank: 4,
      members: 8,
      maxMembers: 12,
    },
    {
      id: 5,
      name: "Data Science Hub",
      status: 'Frozen',
      tier: 'Tier A',
      leaderName: "Lisa Anderson",
      leaderRank: 3,
      groupRank: 5,
      members: 7,
      maxMembers: 12,
    },
  ];

  // Filter groups based on search and filters
  const filteredGroups = mockGroups.filter((group) => {
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
          <AllGroupsTable
            groups={paginatedGroups}
            currentPage={currentPage}
            totalPages={totalPages}
            pageSize={pageSize}
            totalResults={filteredGroups.length}
            onPageChange={setCurrentPage}
            onViewGroup={handleViewGroup}
          />
        </div>
      </main>
    </div>
  );
};
