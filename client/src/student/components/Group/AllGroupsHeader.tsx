
import React from 'react';
import { SearchIcon, FilterListIcon } from '../../../Assets/Icons';
import CloseIcon from "@mui/icons-material/Close";

interface AllGroupsHeaderProps {
  search: string;
  onSearchChange: (value: string) => void;
  tierFilter: string;
  onTierFilterChange: (value: string) => void;
  statusFilter: string;
  onStatusFilterChange: (value: string) => void;
  isFilterOpen: boolean;
  onToggleFilter: () => void;
}

export const AllGroupsHeader: React.FC<AllGroupsHeaderProps> = ({
  search,
  onSearchChange,
  tierFilter,
  onTierFilterChange,
  statusFilter,
  onStatusFilterChange,
  isFilterOpen,
  onToggleFilter
}) => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30 w-full shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-4 md:py-6">
        <div className="flex flex-col gap-6">
          {/* Top Row: Title and Toggle Icon */}
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">All Groups Directory</h2>
              <p className="text-slate-500 text-xs mt-0.5">Browse university organizations</p>
            </div>
            
            <button 
              onClick={onToggleFilter}
              className={`p-2.5 rounded-xl border transition-all duration-200 shadow-sm flex items-center gap-2 font-bold text-xs ${
                isFilterOpen 
                ? 'bg-[#003366] text-white border-[#003366]' 
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
              title="Toggle Filters"
            >
              {isFilterOpen ? <CloseIcon sx={{ fontSize: 18 }} /> : <FilterListIcon sx={{ fontSize: 18 }} />}
              <span className="hidden sm:inline">Filters</span>
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative w-full max-w-2xl">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
              <SearchIcon sx={{ fontSize: 18 }} />
            </span>
            <input 
              type="text"
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-[#003366]/10 focus:border-[#003366] outline-none transition-all shadow-inner" 
              placeholder="Search by group name or leader..." 
            />
          </div>
        </div>

        {/* Expandable Filter Row */}
        {isFilterOpen && (
          <div className="mt-6 pt-6 border-t border-slate-100 flex flex-wrap items-center gap-4 animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="flex flex-col gap-1.5">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Tier</span>
              <div className="bg-slate-100 border border-slate-200 px-3 py-2 rounded-xl shadow-sm">
                <select 
                  value={tierFilter}
                  onChange={(e) => onTierFilterChange(e.target.value)}
                  className="bg-transparent border-none text-xs font-bold p-0 focus:ring-0 cursor-pointer text-slate-700 min-w-[120px] outline-none"
                >
                  <option value="All">All Tiers</option>
                  <option value="Tier A">Tier A</option>
                  <option value="Tier B">Tier B</option>
                  <option value="Tier C">Tier C</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Status</span>
              <div className="bg-slate-100 border border-slate-200 px-3 py-2 rounded-xl shadow-sm">
                <select 
                  value={statusFilter}
                  onChange={(e) => onStatusFilterChange(e.target.value)}
                  className={`bg-transparent border-none text-xs font-bold p-0 focus:ring-0 cursor-pointer ${statusFilter === 'Active' ? 'text-emerald-600' : statusFilter === 'Frozen' ? 'text-amber-600' : 'text-slate-700'} min-w-[120px] outline-none`}
                >
                  <option value="All">All Status</option>
                  <option value="Active">Active</option>
                  <option value="Frozen">Frozen</option>
                </select>
              </div>
            </div>
            
            <button 
              onClick={() => {
                onTierFilterChange('All');
                onStatusFilterChange('Active');
                onSearchChange('');
              }}
              className="mt-5 text-[10px] font-bold text-blue-900 uppercase tracking-wider hover:underline px-4"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
