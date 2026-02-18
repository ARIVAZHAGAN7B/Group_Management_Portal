
import React from 'react';
import StarsIcon from "@mui/icons-material/Stars";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

export interface GroupEntry {
  rank: number;
  name: string;
  tier: string;
  leaderName: string;
  leaderRollNumber?: string;
  avgPoints: number;
  isCurrentUserGroup?: boolean;
}


interface GroupRankingTableProps {
  data: GroupEntry[];
}

export const GroupRankingTable: React.FC<GroupRankingTableProps> = ({ data }) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden w-full">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[900px]">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest w-24">Rank</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Group Name</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Tier Level</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Team Leader</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-right pr-10">Total Points</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {data.map((entry) => (
              <tr
                key={`${entry.name}-${entry.rank}`}
                className={`transition-colors hover:bg-[#003366]/[0.02] ${entry.rank === 1 ? 'bg-[#003366]/5 border-l-4 border-[#003366]' : ''
                  } ${entry.isCurrentUserGroup && entry.rank !== 1 ? 'bg-[#003366]/5 border-l-4 border-[#003366]' : ''}`}
              >
                <td className="px-6 py-5 font-black text-slate-900">
                  <div className="flex items-center gap-1.5">
                    {entry.rank === 1 && (
                      <StarsIcon sx={{ fontSize: 18, color: '#f59e0b' }} className="fill-current" />
                    )}
                    <span>{entry.rank.toString().padStart(2, '0')}</span>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <a href="#" className="text-[#003366] font-black hover:underline transition-all">
                    {entry.name}
                  </a>
                </td>
                <td className="px-6 py-5">
                  <span className={`text-[9px] font-black px-3 py-1 rounded-lg uppercase border shadow-sm ${entry.tier === 'A' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                    entry.tier === 'B' ? 'bg-slate-50 text-slate-700 border-slate-200' :
                      entry.tier === 'C' ? 'bg-orange-50 text-orange-700 border-orange-200' :
                        'bg-red-50 text-red-700 border-red-200'
                    }`}>
                    Tier {entry.tier}
                  </span>
                </td>
                <td className="px-6 py-5 text-sm text-slate-600 font-bold">
                  <div className="flex flex-col">
                    <span>{entry.leaderName}</span>
                    <span className="text-[10px] text-slate-400 font-medium">
                      {entry.leaderRollNumber || 'ID-PENDING'}
                    </span>
                  </div>
                </td>

                <td className="px-6 py-5 text-right pr-10 text-sm font-black text-[#003366]">
                  {entry.avgPoints.toLocaleString()} <span className="text-[10px] text-slate-400">PTS</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="px-6 py-5 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
        <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest">
          Results: 1 - {data.length} of 120 groups
        </span>
        <div className="flex items-center gap-2">
          <button className="size-9 rounded-xl border border-slate-200 bg-white text-slate-400 hover:text-slate-600 hover:bg-slate-50 disabled:opacity-50 transition-all shadow-sm flex items-center justify-center">
            <ChevronLeftIcon sx={{ fontSize: 20 }} />
          </button>
          <button className="size-9 rounded-xl bg-[#003366] text-white text-xs font-black shadow-lg shadow-[#003366]/20">1</button>
          <button className="size-9 rounded-xl border border-slate-200 bg-white text-slate-600 text-xs font-black hover:bg-slate-50 transition-all shadow-sm">2</button>
          <button className="size-9 rounded-xl border border-slate-200 bg-white text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-all shadow-sm flex items-center justify-center">
            <ChevronRightIcon sx={{ fontSize: 20 }} />
          </button>
        </div>
      </div>
    </div>
  );
};
