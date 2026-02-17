import React from 'react';
import {
  CaptainIcon,
  ViceCaptainIcon,
  StrategistIcon,
  ManagerIcon,
  UserIcon
} from "../../../Assets/Icons";

interface LeaderCardProps {
  name: string;
  rollNumber: string;
  role: string;
}

export const LeaderCard: React.FC<LeaderCardProps> = ({ name, rollNumber, role }) => {
  const getRoleIcon = () => {
    switch (role.toLowerCase()) {
      case 'captain':
        return <CaptainIcon className="w-6 h-6 sm:w-8 sm:h-8 text-amber-500" />;
      case 'vice-captain':
        return <ViceCaptainIcon className="w-6 h-6 sm:w-8 sm:h-8 text-slate-400" />;
      case 'strategist':
        return <StrategistIcon className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500" />;
      case 'manager':
        return <ManagerIcon className="w-6 h-6 sm:w-8 sm:h-8 text-[#003366]" />;
      default:
        return <UserIcon className="w-6 h-6 sm:w-8 sm:h-8" />;
    }
  };

  const getRoleColor = () => {
    switch (role.toLowerCase()) {
      case 'captain': return 'bg-amber-50 border-amber-100';
      case 'vice-captain': return 'bg-slate-50 border-slate-100';
      case 'strategist': return 'bg-blue-50 border-blue-100';
      case 'manager': return 'bg-indigo-50 border-indigo-100';
      default: return 'bg-slate-50 border-slate-100';
    }
  };

  return (
    <div className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col">

      {/* Header */}
      <div className="flex items-start justify-between mb-3 sm:mb-4">
        <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-lg flex items-center justify-center border ${getRoleColor()}`}>
          {getRoleIcon()}
        </div>
      </div>

      {/* Name & Role */}
      <h4 className="font-bold text-slate-900 text-sm sm:text-base truncate">
        {name}
      </h4>
      <p className="text-[10px] font-medium text-slate-400 mb-1 truncate">
        {rollNumber}
      </p>
      <p className="text-[11px] sm:text-xs font-black text-[#003366] mb-1 uppercase tracking-wider">
        {role}
      </p>
    </div>
  );
};

