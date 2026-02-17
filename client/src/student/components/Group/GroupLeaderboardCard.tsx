
import React, { type ReactNode } from 'react';

interface GroupLeaderboardCardProps {
  label: string;
  value: string | number;
  icon: ReactNode;
  trend?: {
    value: string;
    isUp: boolean;
  };
  bgColor: string;
  iconColor: string;
}

export const GroupLeaderboardCard: React.FC<GroupLeaderboardCardProps> = ({ 
  label, 
  value, 
  icon, 
  trend, 
  bgColor, 
  iconColor 
}) => {
  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center gap-5">
      <div className={`size-12 rounded-full ${bgColor} flex items-center justify-center ${iconColor}`}>
        <span className="w-7 h-7 flex items-center justify-center">{icon}</span>
      </div>
      <div>
        <p className="text-slate-500 text-sm font-medium">{label}</p>
        <div className="flex items-center gap-2">
          <p className="text-slate-900 text-2xl font-bold">{value}</p>
          {trend && (
            <span className={`${trend.isUp ? 'text-green-600' : 'text-red-600'} text-xs font-bold flex items-center`}>
              <span className="text-[14px] leading-none">{trend.isUp ? '↑' : '↓'}</span> {trend.value}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
