
import React from 'react';
import PersonIcon from "@mui/icons-material/Person";
import StarsIcon from "@mui/icons-material/Stars";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

export interface RankingEntry {
  rank: number;
  name: string;
  rollNumber?: string;
  avatar?: string;
  groupName: string;
  tier: string;
  points: number;
  isCurrentUser?: boolean;
  role?: string;
}


interface RankingTableProps {
  data: RankingEntry[];
  currentPage: number;
  pageSize: number;
  totalResults: number;
  onPageChange: (page: number) => void;
  isLeaderView?: boolean;
}

export const RankingTable: React.FC<RankingTableProps> = ({
  data,
  isLeaderView = false
}) => {
  return (
    <div className="bg-white rounded-lg md:rounded-xl border border-slate-200 shadow-sm overflow-hidden w-full">
      <div className="overflow-x-auto scrollbar-thin">
        <table className="w-full text-left border-collapse min-w-[600px] md:min-w-[800px]">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="px-3 md:px-6 py-2.5 md:py-4 text-[9px] md:text-[10px] font-bold text-slate-500 uppercase tracking-widest w-16 md:w-24">Rank</th>
              <th className="px-3 md:px-6 py-2.5 md:py-4 text-[9px] md:text-[10px] font-bold text-slate-500 uppercase tracking-widest">{isLeaderView ? 'Leader' : 'Student'}</th>
              <th className="px-3 md:px-6 py-2.5 md:py-4 text-[9px] md:text-[10px] font-bold text-slate-500 uppercase tracking-widest">Group</th>
              <th className="px-3 md:px-6 py-2.5 md:py-4 text-[9px] md:text-[10px] font-bold text-slate-500 uppercase tracking-widest text-center">{isLeaderView ? 'Role' : 'Tier'}</th>
              <th className="px-3 md:px-6 py-2.5 md:py-4 text-[9px] md:text-[10px] font-bold text-slate-500 uppercase tracking-widest text-right pr-4 md:pr-10">Points</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-[11px] md:text-sm">
            {data.map((entry) => (
              <tr
                key={`${entry.name}-${entry.rank}`}
                className={`hover:bg-slate-50/80 transition-colors ${entry.isCurrentUser ? 'bg-[#003366]/5 border-l-2 md:border-l-4 border-[#003366]' : ''}`}
              >
                <td className="px-3 md:px-6 py-2 md:py-5 font-bold text-slate-500">
                  <div className="flex items-center gap-1 md:gap-2">
                    {entry.rank === 1 && <StarsIcon sx={{ fontSize: { xs: 14, md: 18 }, color: '#f59e0b' }} />}
                    <span className={entry.rank <= 3 ? 'text-slate-900 font-black' : 'text-slate-500'}>
                      {entry.rank.toString().padStart(2, '0')}
                    </span>
                  </div>
                </td>
                <td className="px-3 md:px-6 py-2 md:py-5">
                  <div className="flex items-center gap-2 md:gap-3">
                    <div className="size-6 md:size-9 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center overflow-hidden text-slate-400 shadow-inner shrink-0">
                      <PersonIcon sx={{ fontSize: { xs: 12, md: 18 } }} />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <div className="flex items-center gap-1 md:gap-2">
                        <span className={`font-bold text-slate-900 truncate ${entry.isCurrentUser ? 'text-[#003366]' : ''}`}>
                          {entry.name}
                        </span>
                        {entry.isCurrentUser && (
                          <span className="px-1 py-0.5 bg-[#003366] text-white text-[7px] md:text-[8px] font-bold rounded uppercase">You</span>
                        )}
                      </div>
                      <span className="text-[9px] md:text-[10px] text-slate-400 font-medium truncate">
                        {entry.rollNumber || (entry.isCurrentUser ? '2023CS101' : 'ID-PENDING')}
                      </span>
                    </div>

                  </div>
                </td>
                <td className="px-3 md:px-6 py-2 md:py-5">
                  <span className="text-[10px] md:text-sm text-slate-600 font-medium hover:text-[#003366] underline decoration-slate-200 underline-offset-2 md:underline-offset-4 cursor-pointer truncate block max-w-[100px] md:max-w-none">
                    {entry.groupName}
                  </span>
                </td>
                <td className="px-3 md:px-6 py-2 md:py-5 text-center">
                  {isLeaderView ? (
                    <span className="px-1.5 py-0.5 md:px-2.5 md:py-1 bg-[#003366] text-white text-[8px] md:text-[9px] font-black uppercase tracking-wider rounded shadow-sm">
                      {entry.role || 'Mbr'}
                    </span>
                  ) : (
                    <span className={`px-1.5 py-0.5 md:px-2.5 md:py-1 text-[8px] md:text-[9px] font-black rounded-full uppercase border ${entry.tier === 'A' ? 'bg-blue-100 text-blue-700 border-blue-200' :
                      entry.tier === 'B' ? 'bg-emerald-100 text-emerald-700 border-emerald-200' :
                        entry.tier === 'C' ? 'bg-amber-100 text-amber-700 border-amber-200' :
                          'bg-slate-100 text-slate-600 border-slate-200'
                      }`}>
                      Tier {entry.tier}
                    </span>
                  )}
                </td>
                <td className="px-3 md:px-6 py-2 md:py-5 text-right pr-4 md:pr-10 font-black text-slate-900">
                  {entry.points.toLocaleString()} <span className="text-[8px] md:text-[10px] text-slate-400 font-bold uppercase">pts</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="px-4 md:px-6 py-2.5 md:py-4 bg-slate-50 border-t border-slate-200 flex justify-between items-center text-[9px] md:text-xs text-slate-500 font-bold uppercase tracking-widest">
        <p>Showing <span className="text-slate-900">{data.length}</span></p>
        <div className="flex gap-1 md:gap-1.5">
          <button className="size-6 md:size-8 flex items-center justify-center border border-slate-200 rounded md:rounded-lg bg-white hover:bg-slate-50 text-slate-400 disabled:opacity-50 transition-colors shadow-sm">
            <ChevronLeftIcon sx={{ fontSize: { xs: 16, md: 20 } }} />
          </button>
          <button className="size-6 md:size-8 flex items-center justify-center rounded md:rounded-lg bg-[#003366] text-white text-[10px] md:text-xs font-black shadow-sm">1</button>
          <button className="size-6 md:size-8 flex items-center justify-center rounded md:rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 text-[10px] md:text-xs font-black transition-all">2</button>
          <button className="size-6 md:size-8 flex items-center justify-center rounded md:rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-400 transition-colors shadow-sm">
            <ChevronRightIcon sx={{ fontSize: { xs: 16, md: 20 } }} />
          </button>
        </div>
      </div>
    </div>
  );
};
