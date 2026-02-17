
import React from 'react';
import { EmojiEventsIcon, TimerIcon, WorkspacePremiumIcon } from '../../Assets/Icons';

interface StatBoxProps {
  label: string;
  value: string;
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
}

const StatBox: React.FC<StatBoxProps> = ({ label, value, icon, iconBg, iconColor }) => (
  <div className="p-5 bg-white border border-slate-200 rounded-xl flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
    <div className={`h-12 w-12 ${iconBg} ${iconColor} rounded-lg flex items-center justify-center`}>
      {icon}
    </div>
    <div>
      <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">{label}</p>
      <p className="text-lg font-black text-[#003366]">{value}</p>
    </div>
  </div>
);

export const EventStatsRecap: React.FC = () => {
  return (
    <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
      <StatBox 
        label="Grand Prize" 
        value="$5,000" 
        icon={<EmojiEventsIcon sx={{ fontSize: 24 }} />}
        iconBg="bg-blue-50"
        iconColor="text-blue-600"
      />
      <StatBox 
        label="Time Remaining" 
        value="02d : 14h : 45m" 
        icon={<TimerIcon sx={{ fontSize: 24 }} />}
        iconBg="bg-emerald-50"
        iconColor="text-emerald-600"
      />
      <StatBox 
        label="Venue & Address" 
        value="Main Campus Hall, Block C" 
        icon={<WorkspacePremiumIcon sx={{ fontSize: 24 }} />}
        iconBg="bg-amber-50"
        iconColor="text-amber-600"
      />
    </div>
  );
};
