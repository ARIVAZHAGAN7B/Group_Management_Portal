
import React from 'react';
import { type RankingEntry } from './RankingTable';
import PersonIcon from "@mui/icons-material/Person";
import StarsIcon from "@mui/icons-material/Stars";

interface PodiumProps {
  topThree: RankingEntry[];
  userRank: number;
  userPoints: string;
}

export const Podium: React.FC<PodiumProps> = ({ topThree, userRank, userPoints }) => {
  if (topThree.length < 3) return null;

  return (
    <div className="grid grid-cols-12 gap-1.5 md:gap-4 mb-6 md:mb-10 items-end">
      {/* Podium - Rank 2 */}
      <div className="col-span-4 md:col-span-3 bg-white p-2 md:p-4 rounded-lg md:rounded-xl border border-slate-200 flex flex-col items-center text-center shadow-sm relative mt-4 md:mt-8 order-2 md:order-1 self-end">
        <div className="absolute -top-2 md:-top-2.5 bg-slate-200 text-slate-700 font-bold px-1.5 md:px-2 py-0.5 rounded-full text-[7px] md:text-[10px] shadow-sm">02</div>
        <div className="size-6 md:size-12 rounded-full bg-slate-100 mb-1 md:mb-3 border md:border-2 border-slate-50 flex items-center justify-center text-slate-400 shadow-sm shrink-0">
          <PersonIcon sx={{ fontSize: { xs: 14, md: 24 } }} />
        </div>
        <h3 className="text-[8px] md:text-sm font-bold text-slate-900 truncate w-full px-0.5">{topThree[1].name.split(' ')[0]}</h3>
        <p className="text-[6px] md:text-[10px] text-slate-400 font-medium truncate w-full px-0.5 leading-tight">{topThree[1].rollNumber}</p>
        <p className="text-[7px] md:text-[10px] text-slate-500 mb-0.5 md:mb-1.5 truncate w-full px-0.5 opacity-0 md:opacity-100">{topThree[1].groupName}</p>
        <p className="text-[10px] md:text-base font-black text-[#003366]">{topThree[1].points.toLocaleString()}<span className="hidden sm:inline text-[7px] md:text-[9px] uppercase opacity-60 ml-0.5">pts</span></p>
      </div>

      {/* Podium - Rank 1 */}
      <div className="col-span-4 md:col-span-4 bg-white p-2.5 md:p-6 rounded-lg md:rounded-xl border border-[#003366]/20 flex flex-col items-center text-center shadow-md relative md:transform md:scale-105 z-10 order-1 md:order-2 self-end">
        <div className="absolute -top-2.5 md:-top-3 bg-yellow-400 text-yellow-900 font-bold px-2 md:px-3 py-0.5 rounded-full text-[8px] md:text-xs shadow-sm flex items-center gap-0.5 md:gap-1">
          <StarsIcon sx={{ fontSize: { xs: 8, md: 14 } }} />
          <span>01</span>
        </div>
        <div className="size-8 md:size-16 rounded-full bg-slate-100 mb-1.5 md:mb-3 border md:border-4 border-[#003366]/10 flex items-center justify-center text-[#003366] shadow-md shrink-0">
          <PersonIcon sx={{ fontSize: { xs: 18, md: 32 } }} />
        </div>
        <h3 className="text-[9px] md:text-lg font-black text-slate-900 truncate w-full px-0.5">{topThree[0].name.split(' ')[0]}</h3>
        <p className="text-[7px] md:text-xs text-slate-400 font-medium truncate w-full px-0.5 leading-tight">{topThree[0].rollNumber}</p>
        <p className="text-[7px] md:text-xs text-slate-500 mb-1 md:mb-2 truncate w-full px-0.5 opacity-0 md:opacity-100">{topThree[0].groupName}</p>
        <div className="bg-[#003366]/5 px-1.5 md:px-5 py-0.5 md:py-1.5 rounded-md md:rounded-lg border border-[#003366]/10">
          <p className="text-[11px] md:text-2xl font-black text-[#003366]">{topThree[0].points.toLocaleString()}<span className="hidden sm:inline text-[8px] md:text-[10px] font-bold uppercase opacity-60 ml-0.5">pts</span></p>
        </div>
      </div>

      {/* Podium - Rank 3 */}
      <div className="col-span-4 md:col-span-3 bg-white p-2 md:p-4 rounded-lg md:rounded-xl border border-slate-200 flex flex-col items-center text-center shadow-sm relative mt-2 md:mt-8 order-3 self-end">
        <div className="absolute -top-2 md:-top-2.5 bg-[#CD7F32] text-white font-bold px-1.5 md:px-2 py-0.5 rounded-full text-[7px] md:text-[10px] shadow-sm">03</div>
        <div className="size-6 md:size-12 rounded-full bg-slate-100 mb-1 md:mb-3 border md:border-2 border-slate-50 flex items-center justify-center text-slate-400 shadow-sm shrink-0">
          <PersonIcon sx={{ fontSize: { xs: 14, md: 24 } }} />
        </div>
        <h3 className="text-[8px] md:text-sm font-bold text-slate-900 truncate w-full px-0.5">{topThree[2].name.split(' ')[0]}</h3>
        <p className="text-[6px] md:text-[10px] text-slate-400 font-medium truncate w-full px-0.5 leading-tight">{topThree[2].rollNumber}</p>
        <p className="text-[7px] md:text-[10px] text-slate-500 mb-0.5 md:mb-1.5 truncate w-full px-0.5 opacity-0 md:opacity-100">{topThree[2].groupName}</p>
        <p className="text-[10px] md:text-base font-black text-[#003366]">{topThree[2].points.toLocaleString()}<span className="hidden sm:inline text-[7px] md:text-[9px] uppercase opacity-60 ml-0.5">pts</span></p>
      </div>

      {/* Your Rank Mini-Card */}
      <div className="col-span-12 md:col-span-2 bg-[#003366] p-2 md:p-4 rounded-lg md:rounded-xl text-white flex flex-row md:flex-col justify-between md:justify-center items-center shadow-lg relative overflow-hidden h-10 md:h-full mt-2 md:mt-0 order-4 md:mb-1">
        <div className="absolute -right-3 -bottom-3 opacity-10 hidden md:block">
          <PersonIcon sx={{ fontSize: 64 }} />
        </div>
        <div className="text-left md:text-center">
          <p className="text-[7px] md:text-[9px] font-black uppercase tracking-widest opacity-70 mb-0">You</p>
          <p className="text-sm md:text-2xl font-black leading-none">{userRank}</p>
        </div>
        <div className="h-px w-4 md:w-8 bg-white/20 my-0 md:my-2 hidden md:block"></div>
        <p className="text-[9px] md:text-[12px] font-bold whitespace-nowrap">{userPoints}<span className="hidden sm:inline ml-1 font-normal opacity-60">pts</span></p>
      </div>
    </div>
  );
};
