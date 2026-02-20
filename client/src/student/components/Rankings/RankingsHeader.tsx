
import React from 'react';
import SearchIcon from "@mui/icons-material/Search";

interface RankingsHeaderProps {
  search: string;
  onSearchChange: (value: string) => void;
}

export const RankingsHeader: React.FC<RankingsHeaderProps> = ({ search, onSearchChange }) => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-20 w-full shadow-sm">
      <div className="max-w-7xl mx-auto px-8 py-3 md:py-6 flex flex-col md:flex-row md:items-center justify-between gap-3 md:gap-6 w-full">
        <div>
          <h2 className="text-lg md:text-2xl font-black text-slate-900 tracking-tight leading-none mb-0.5 md:mb-1">Rankings</h2>
          <p className="text-slate-500 text-[10px] md:text-xs font-medium">AY 2023-24</p>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 md:gap-4">
          <div className="relative flex-1 sm:min-w-[240px]">
            <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400">
              <SearchIcon sx={{ fontSize: { xs: 16, md: 20 } }} />
            </span>
            <input
              type="text"
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-8 md:pl-10 pr-4 py-1.5 md:py-2 bg-slate-100 border-none rounded-lg text-[11px] md:text-sm focus:ring-2 focus:ring-[#003366]/20 transition-all outline-none"
              placeholder="Search students or groups..."
            />
          </div>
        </div>
      </div>
    </header>
  );
};
