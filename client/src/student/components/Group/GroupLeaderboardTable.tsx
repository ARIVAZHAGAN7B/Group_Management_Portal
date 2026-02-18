
import React, { useState } from 'react';
import { UserIcon } from '../../../assets/Icons';

interface LeaderboardMember {
  id: number;
  name: string;
  rollNumber: string;
  points: string;
  completion: number;
  eligibility: string;
  rank: number;
  isCurrentUser?: boolean;
}


interface GroupLeaderboardTableProps {
  members: LeaderboardMember[];
}

export const GroupLeaderboardTable: React.FC<GroupLeaderboardTableProps> = ({ members }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const totalPages = Math.ceil(members.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const currentMembers = members.slice(startIndex, startIndex + pageSize);

  const getRankStyles = (rank: number) => {
    switch (rank) {
      case 1: return 'bg-amber-100 text-[#d4af37]';
      case 2: return 'bg-slate-200 text-[#aaa9ad]';
      case 3: return 'bg-orange-100 text-[#b08d57]';
      default: return 'text-slate-500';
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
        <h3 className="text-slate-900 font-bold text-lg">Member Rankings</h3>
        <button className="text-[#003366] text-sm font-semibold flex items-center hover:underline">
          Download Report
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-4 text-slate-500 font-bold text-[10px] uppercase tracking-wider w-24">Rank</th>
              <th className="px-6 py-4 text-slate-500 font-bold text-[10px] uppercase tracking-wider">Member</th>
              <th className="px-6 py-4 text-slate-500 font-bold text-[10px] uppercase tracking-wider text-center">Base Points</th>
              <th className="px-6 py-4 text-slate-500 font-bold text-[10px] uppercase tracking-wider">Completion %</th>
              <th className="px-6 py-4 text-slate-500 font-bold text-[10px] uppercase tracking-wider">Eligibility</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {currentMembers.map((member) => (
              <tr
                key={member.id}
                className={`${member.isCurrentUser ? 'bg-[#003366]/5' : 'hover:bg-slate-50'} transition-colors`}
              >
                <td className="px-6 py-4">
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm ${getRankStyles(member.rank)}`}>
                    {member.rank}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400">
                      <UserIcon />
                    </div>
                    <div className="flex flex-col">
                      <span className={`text-sm text-slate-900 font-bold ${member.isCurrentUser ? 'italic' : ''}`}>
                        {member.isCurrentUser ? 'You' : member.name}
                      </span>
                      <span className="text-[10px] text-slate-400 font-medium">
                        {member.rollNumber}
                      </span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-center font-semibold text-slate-700">{member.points}</td>
                <td className="px-6 py-4">
                  <span className="text-sm font-black text-slate-900">{member.completion}%</span>
                </td>

                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${member.eligibility === 'Qualified'
                    ? 'bg-green-100 text-green-700'
                    : (member.eligibility === 'Pending' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700')
                    }`}>
                    {member.eligibility}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-between items-center">
        <span className="text-slate-500 text-xs font-medium">
          Showing {startIndex + 1} to {Math.min(startIndex + pageSize, members.length)} of {members.length} members
        </span>
        <div className="flex gap-2">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-white border border-slate-200 rounded text-xs font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Previous
          </button>
          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 bg-white border border-slate-200 rounded text-xs font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};
