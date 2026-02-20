import React, { useState, useMemo } from 'react';
import { useStore } from '../../../store/store';
import { SearchIcon, EditIcon, PersonRemoveIcon, UserIcon } from '../../../assets/Icons';

interface Member {
  id: number;
  name: string;
  rollNumber: string;
  role: string;
  totalBasePoints: string;
  phaseBasePoints: string;
  totalPoints: string;
  incubation: string;
}


interface MembersTableProps {
  members: Member[];
}

export const MembersTable: React.FC<MembersTableProps> = ({ members }) => {
  const { auth } = useStore();
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');
  const pageSize = 5;

  const isLeader = auth.user?.name === 'Alex Johnson';



  const filteredMembers = useMemo(() => {
    return members.filter(m =>
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.role.toLowerCase().includes(search.toLowerCase())
    );
  }, [members, search]);

  const totalPages = Math.ceil(filteredMembers.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const currentMembers = filteredMembers.slice(startIndex, startIndex + pageSize);

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">

      {/* Header */}
      <div className="px-4 sm:px-6 py-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <h3 className="text-base sm:text-lg font-bold text-slate-900">
          All Members
        </h3>

        <div className="relative w-full sm:w-64">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4">
            <SearchIcon />
          </span>
          <input
            type="text"
            placeholder="Search members..."
            className="pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:ring-[#003366] focus:border-[#003366] w-full"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-225 w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              <th className="px-4 sm:px-6 py-3 text-[10px] font-black text-slate-500 uppercase tracking-widest">Name</th>
              <th className="px-4 sm:px-6 py-3 text-[10px] font-black text-slate-500 uppercase tracking-widest">Role</th>
              <th className="px-4 sm:px-6 py-3 text-[10px] font-black text-slate-500 uppercase tracking-widest text-center">Total Base Pts</th>
              <th className="px-4 sm:px-6 py-3 text-[10px] font-black text-slate-500 uppercase tracking-widest text-center">Phase Base Pts</th>
              <th className="px-4 sm:px-6 py-3 text-[10px] font-black text-slate-500 uppercase tracking-widest text-center">Total Points</th>
              <th className="px-4 sm:px-6 py-3 text-[10px] font-black text-slate-500 uppercase tracking-widest text-center">Incubation</th>
              <th className="px-4 sm:px-6 py-3 text-[10px] font-black text-slate-500 uppercase tracking-widest text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 text-sm">
            {currentMembers.map((member) => (
              <tr key={member.id} className="hover:bg-slate-50/50 transition-colors">

                {/* Name */}
                <td className="px-4 sm:px-6 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 shrink-0">
                      <span className="w-5 h-5"><UserIcon /></span>
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-sm font-bold text-slate-900 truncate max-w-35">
                        {member.name}
                      </span>
                      <span className="text-[10px] font-medium text-slate-400 truncate">
                        {member.rollNumber}
                      </span>
                    </div>
                  </div>
                </td>


                {/* Role */}
                <td className="px-4 sm:px-6 py-3 text-xs font-medium text-slate-600 truncate max-w-[140px]">
                  {member.role}
                </td>

                {/* Total Base Points */}
                <td className="px-4 sm:px-6 py-3 text-center">
                  <span className="text-sm font-bold text-slate-600">
                    {member.totalBasePoints}
                  </span>
                </td>

                {/* Phase Base Points */}
                <td className="px-4 sm:px-6 py-3 text-center">
                  <span className="text-sm font-bold text-[#003366]">
                    {member.phaseBasePoints}
                  </span>
                </td>

                {/* Total Points */}
                <td className="px-4 sm:px-6 py-3 text-center">
                  <span className="text-sm font-black text-slate-900">
                    {member.totalPoints}
                  </span>
                </td>

                {/* Incubation */}
                <td className="px-4 sm:px-6 py-3 text-center">
                  {member.incubation === 'ACTIVE' ? (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#003366]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#003366]" />
                      ACTIVE
                    </span>
                  ) : (
                    <span className="text-[10px] font-bold text-slate-400">NONE</span>
                  )}
                </td>


                {/* Actions */}
                <td className="px-4 sm:px-6 py-3 text-right">
                  {isLeader && (
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-1.5 text-slate-400 hover:text-[#003366] transition-colors" title="Edit Member">
                        <span className="w-4 h-4"><EditIcon /></span>
                      </button>
                      <button className="p-1.5 text-slate-400 hover:text-red-500 transition-colors" title="Remove Member">
                        <span className="w-4 h-4"><PersonRemoveIcon /></span>
                      </button>
                    </div>
                  )}
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="px-4 sm:px-6 py-3 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs text-slate-500 font-medium">
        <span>
          Showing {currentMembers.length} of {filteredMembers.length} members
        </span>

        <div className="flex items-center gap-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(p => p - 1)}
            className="px-3 py-1 bg-white border border-slate-200 rounded-md hover:bg-slate-100 disabled:opacity-50 transition-colors"
          >
            Previous
          </button>

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(p => p + 1)}
            className="px-3 py-1 bg-white border border-slate-200 rounded-md hover:bg-slate-100 disabled:opacity-50 transition-colors"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};
