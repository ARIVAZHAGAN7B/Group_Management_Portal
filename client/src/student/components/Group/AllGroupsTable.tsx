
import React from 'react';
import { UserIcon } from '../../../Assets/Icons';
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

export interface GroupItem {
  id: number;
  name: string;
  status: 'Active' | 'Frozen';
  tier: 'Tier A' | 'Tier B' | 'Tier C';
  leaderName: string;
  leaderAvatar?: string;
  leaderRank: number;
  groupRank: number;
  members: number;
  maxMembers: number;
}

interface AllGroupsTableProps {
  groups: GroupItem[];
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalResults: number;
  onPageChange: (page: number) => void;
  onViewGroup: (group: GroupItem) => void;
}

export const AllGroupsTable: React.FC<AllGroupsTableProps> = ({
  groups,
  currentPage,
  totalPages,
  pageSize,
  totalResults,
  onPageChange,
  onViewGroup
}) => {
  const startIndex = (currentPage - 1) * pageSize;

  return (
    <div className="w-full">
      {/* Scrollable Container - Enforced Width */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1100px]">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest w-[25%]">Group Identity</th>
                <th className="px-4 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center w-[10%]">Tier</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest w-[20%]">Leader Info</th>
                <th className="px-4 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center w-[10%]">LDR Rank</th>
                <th className="px-4 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center w-[10%]">GRP Rank</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right w-[25%] pr-8">Capacity & Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {groups.map((group) => (
                <tr key={group.id} className={`hover:bg-slate-50/50 transition-colors group/row ${group.status === 'Frozen' ? 'opacity-80' : ''}`}>
                  <td className="px-6 py-5">
                    <div>
                      <h4 className="font-bold text-slate-900 group-hover/row:text-[#003366] transition-colors">{group.name}</h4>
                      <div className="flex items-center gap-1.5 mt-1">
                        <span className={`w-2 h-2 rounded-full ${group.status === 'Active' ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
                        <span className={`text-[10px] font-bold uppercase tracking-wider ${group.status === 'Active' ? 'text-emerald-600' : 'text-amber-600'}`}>
                          {group.status}
                        </span>
                      </div>
                    </div>
                  </td>
                  
                  <td className="px-4 py-5 text-center">
                    <span className={`px-3 py-1 text-[10px] font-black rounded uppercase inline-block shadow-sm ${group.tier === 'Tier A' ? 'bg-[#003366]/10 text-[#003366]' : 'bg-slate-100 text-slate-600'}`}>
                      {group.tier}
                    </span>
                  </td>

                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 border border-slate-200 overflow-hidden shrink-0 shadow-sm">
                        {group.leaderAvatar ? (
                          <img src={group.leaderAvatar} alt={group.leaderName} className="w-full h-full object-cover" />
                        ) : (
                          <UserIcon sx={{ fontSize: 18 }} />
                        )}
                      </div>
                      <span className="text-sm font-semibold text-slate-700 truncate max-w-[140px]">{group.leaderName}</span>
                    </div>
                  </td>

                  <td className="px-4 py-5 text-center">
                    <span className="text-sm font-bold text-slate-500">#{group.leaderRank}</span>
                  </td>

                  <td className="px-4 py-5 text-center">
                    <span className="text-lg font-black text-[#003366]">#{group.groupRank}</span>
                  </td>

                  <td className="px-6 py-5 pr-8">
                    <div className="flex items-center justify-end gap-8">
                      <div className="flex-1 max-w-[140px]">
                        <div className="flex justify-between items-center mb-1.5">
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Capacity</span>
                          <span className={`text-[10px] font-black ${group.members === group.maxMembers ? 'text-emerald-600' : 'text-slate-700'}`}>
                            {group.members}/{group.maxMembers}
                          </span>
                        </div>
                        <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full transition-all duration-700 ${group.members === group.maxMembers ? 'bg-emerald-500' : 'bg-[#003366]'}`}
                            style={{ width: `${(group.members / group.maxMembers) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                      <button 
  onClick={() => onViewGroup(group)}
  className="bg-[#003366] hover:bg-[#002244] text-white text-[10px] font-bold px-5 py-2.5 rounded-xl transition-all shadow-md shadow-[#003366]/10 active:scale-95 whitespace-nowrap uppercase tracking-widest"
>
  View Group
</button>

                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {groups.length === 0 && (
          <div className="p-16 border-t border-slate-100 text-center bg-white">
            <p className="text-slate-500 font-bold italic opacity-60">No organizations matching your criteria.</p>
          </div>
        )}
      </div>

      {/* Pagination Container */}
      <div className="mt-8 flex flex-col sm:flex-row items-center justify-between px-6 py-5 bg-white rounded-xl border border-slate-200 shadow-sm gap-4">
        <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">
          Results: <span className="text-slate-900">{totalResults > 0 ? startIndex + 1 : 0} to {Math.min(startIndex + pageSize, totalResults)}</span> of <span className="text-slate-900">{totalResults}</span>
        </p>
        <div className="flex gap-2">
          <button 
            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="size-10 flex items-center justify-center border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors disabled:opacity-30 disabled:cursor-not-allowed bg-white shadow-sm"
          >
            <ChevronLeftIcon sx={{ fontSize: 24 }} />
          </button>
          
          <div className="flex items-center gap-1.5">
            {[...Array(totalPages)].map((_, i) => (
              <button 
                key={i}
                onClick={() => onPageChange(i + 1)}
                className={`size-10 flex items-center justify-center font-black rounded-xl transition-all duration-200 text-xs ${currentPage === i + 1 ? 'bg-[#003366] text-white shadow-lg' : 'text-slate-600 hover:bg-slate-50 bg-white border border-slate-100'}`}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <button 
            onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="size-10 flex items-center justify-center border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors disabled:opacity-30 disabled:cursor-not-allowed bg-white shadow-sm"
          >
            <ChevronRightIcon sx={{ fontSize: 24 }} />
          </button>
        </div>
      </div>
    </div>
  );
};
