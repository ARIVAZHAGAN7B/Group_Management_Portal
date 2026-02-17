
import React, { useState } from 'react';
import { SearchIcon, FilterListIcon, ChevronLeftIcon, ChevronRightIcon } from '../../Assets/Icons';

export interface ParticipatingTeam {
  rank: number;
  name: string;
  shortName: string;
  leaderName: string;
  currentSize: number;
  maxSize: number;
  status: 'Qualified' | 'Active' | 'Eliminated';
}

interface EventTeamsTableProps {
  teams: ParticipatingTeam[];
  onViewTeam: (team: ParticipatingTeam) => void;
}

export const EventTeamsTable: React.FC<EventTeamsTableProps> = ({ teams, onViewTeam }) => {
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const filteredTeams = teams.filter(t => 
    t.name.toLowerCase().includes(search.toLowerCase()) || 
    t.leaderName.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredTeams.length / pageSize) || 1;
  const paginatedTeams = filteredTeams.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'Qualified': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case 'Active': return 'bg-blue-50 text-blue-600 border-blue-100';
      case 'Eliminated': return 'bg-red-50 text-red-600 border-red-100';
      default: return 'bg-slate-50 text-slate-600 border-slate-100';
    }
  };

  const getRankStyle = (rank: number) => {
    if (rank === 1) return 'bg-amber-50 text-amber-600';
    return 'bg-slate-50 text-slate-600';
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
      {/* Table Toolbar */}
      <div className="px-6 py-4 border-b border-slate-100 flex flex-wrap justify-between items-center bg-slate-50/50 gap-4">
        <h2 className="text-slate-800 font-bold text-base">Participating Teams</h2>
        <div className="flex items-center gap-2">
          <div className="relative">
            <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400">
              <SearchIcon sx={{ fontSize: 18 }} />
            </span>
            <input 
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 pr-4 py-1.5 text-sm bg-white border border-slate-200 rounded-lg focus:ring-[#003366] focus:border-[#003366] w-64 outline-none" 
              placeholder="Search team..." 
            />
          </div>
          <button className="p-1.5 border border-slate-200 rounded-lg text-slate-500 hover:bg-white transition-colors">
            <FilterListIcon sx={{ fontSize: 20 }} />
          </button>
        </div>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-white text-slate-400 text-[11px] font-bold uppercase tracking-wider">
              <th className="px-6 py-4 font-semibold border-b border-slate-100 w-20">Rank</th>
              <th className="px-6 py-4 font-semibold border-b border-slate-100">Team Name</th>
              <th className="px-6 py-4 font-semibold border-b border-slate-100">Leader Name</th>
              <th className="px-6 py-4 font-semibold border-b border-slate-100">Size</th>
              <th className="px-6 py-4 font-semibold border-b border-slate-100">Status</th>
              <th className="px-6 py-4 font-semibold border-b border-slate-100 text-right pr-10">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {paginatedTeams.map((team) => (
              <tr key={`${team.rank}-${team.name}`} className="hover:bg-slate-50/50 transition-colors group">
                <td className="px-6 py-4">
                  <span className={`h-6 w-6 flex items-center justify-center rounded-md font-bold text-xs ${getRankStyle(team.rank)}`}>
                    {team.rank.toString().padStart(2, '0')}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded bg-[#003366]/10 flex items-center justify-center text-[#003366] font-bold text-xs">
                      {team.shortName}
                    </div>
                    <span className="text-slate-900 font-semibold text-sm">{team.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-slate-600 text-sm">{team.leaderName}</td>
                <td className="px-6 py-4">
                  <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden mb-1">
                    <div 
                      className="bg-[#003366] h-full rounded-full" 
                      style={{ width: `${(team.currentSize / team.maxSize) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-[10px] text-slate-400 font-bold block">{team.currentSize} / {team.maxSize} Members</span>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide rounded border ${getStatusStyle(team.status)}`}>
                    {team.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right pr-10">
                  <button 
                    onClick={() => onViewTeam(team)}
                    className="bg-[#003366] hover:bg-[#002244] text-white px-3 py-1.5 rounded text-xs font-bold transition-colors shadow-sm whitespace-nowrap active:scale-95"
                  >
                    View Team
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Table Pagination */}
      <div className="px-6 py-4 border-t border-slate-100 flex flex-wrap justify-between items-center bg-slate-50/30 gap-4">
        <p className="text-xs text-slate-500 font-medium">
          Showing {paginatedTeams.length} of {filteredTeams.length} teams
        </p>
        <div className="flex gap-1">
          <button 
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(p => p - 1)}
            className="p-1.5 text-slate-400 hover:text-[#003366] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronLeftIcon sx={{ fontSize: 20 }} />
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button 
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`h-8 w-8 text-xs font-bold rounded transition-colors ${currentPage === i + 1 ? 'bg-[#003366] text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'}`}
            >
              {i + 1}
            </button>
          ))}
          <button 
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(p => p + 1)}
            className="p-1.5 text-slate-400 hover:text-[#003366] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronRightIcon sx={{ fontSize: 20 }} />
          </button>
        </div>
      </div>
    </div>
  );
};
