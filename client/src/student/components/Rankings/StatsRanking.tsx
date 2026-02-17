
import React, { type ReactNode } from 'react';

interface StatItem {
  label: string;
  value: string | number;
  icon: ReactNode;
  iconBgColor: string;
  iconColor: string;
}

interface StatsRankingProps {
  stats: StatItem[];
}

export const StatsRanking: React.FC<StatsRankingProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6 mb-4 md:mb-8">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-white p-3 md:p-6 rounded-lg md:rounded-xl border border-slate-200 shadow-sm flex items-center gap-3 md:gap-5 hover:shadow-md transition-shadow"
        >
          <div className={`size-8 md:size-12 rounded-full flex items-center justify-center shrink-0 ${stat.iconBgColor} ${stat.iconColor}`}>
            {React.cloneElement(stat.icon as React.ReactElement<{ sx: object }>, { sx: { fontSize: { xs: 16, md: 24 } } })}
          </div>
          <div className="overflow-hidden">
            <p className="text-[8px] md:text-[10px] uppercase tracking-wider font-bold text-slate-400 mb-0.5">
              {stat.label}
            </p>
            <p className="text-sm md:text-2xl font-black text-slate-900 truncate">
              {stat.value}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
