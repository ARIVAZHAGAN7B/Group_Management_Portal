
import React from 'react';
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

interface RankingsFilterProps {
  activeTab: 'individual' | 'leader' | 'group';
  onTabChange: (tab: 'individual' | 'leader' | 'group') => void;
  tier: string;
  onTierChange: (tier: string) => void;
}

export const RankingsFilter: React.FC<RankingsFilterProps> = ({
  activeTab,
  onTabChange,
  tier,
  onTierChange
}) => {
  return (
    <div className="flex flex-col gap-4 md:gap-6 mb-4 md:mb-8 px-8 max-w-7xl mx-auto w-full">
      <div className="flex flex-wrap gap-3 md:gap-6">
        <div className="flex flex-col gap-1">
          <span className="text-[8px] md:text-[10px] font-bold text-slate-400 uppercase tracking-wider">Phase</span>
          <div className="relative">
            <select className="appearance-none bg-white border border-slate-200 rounded-md px-2 py-1 md:px-3 md:py-1.5 pr-6 md:pr-8 text-[10px] md:text-xs font-bold text-slate-700 focus:ring-0 cursor-pointer shadow-sm">
              <option>Final Phase</option>
              <option>Phase 2</option>
              <option>Phase 1</option>
            </select>
            <span className="absolute right-1 md:right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
              <KeyboardArrowDownIcon sx={{ fontSize: { xs: 14, md: 18 } }} />
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-[8px] md:text-[10px] font-bold text-slate-400 uppercase tracking-wider">Tier</span>
          <div className="flex bg-slate-100 p-0.5 md:p-1 rounded-md shadow-inner">
            {['All', 'A', 'B', 'C', 'D'].map((t) => (
              <button
                key={t}
                onClick={() => onTierChange(t)}
                className={`min-w-[30px] md:min-w-[40px] px-1.5 md:px-2 h-6 md:h-7 flex items-center justify-center text-[10px] md:text-xs font-bold rounded transition-all ${tier === t ? 'bg-white shadow-sm text-[#003366]' : 'text-slate-500 hover:text-slate-700'
                  }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      <nav className="flex gap-4 md:gap-8 overflow-x-auto no-scrollbar border-b border-slate-100">
        {[
          { id: 'individual', label: 'Individual' },
          { id: 'leader', label: 'Leaders' },
          { id: 'group', label: 'Groups' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id as 'individual' | 'leader' | 'group')}
            className={`pb-1.5 md:pb-2 text-[11px] md:text-sm font-bold transition-all border-b-2 whitespace-nowrap ${activeTab === tab.id
              ? 'text-[#003366] border-[#003366]'
              : 'text-slate-400 border-transparent hover:text-slate-600'
              }`}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  );
};
