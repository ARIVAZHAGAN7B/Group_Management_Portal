
import React from 'react';
import { GroupSettingsIcon, LeaveGroupIcon, MemberCountIcon } from '../../../Assets/Icons';
import PersonAddIcon from "@mui/icons-material/PersonAdd";

interface GroupHeaderProps {
  name: string;
  tier: string;
  membersCount: number;
  maxMembers: number;
  status: string;
  isOwnGroup?: boolean;
}

export const GroupHeader: React.FC<GroupHeaderProps> = ({
  name,
  tier,
  membersCount,
  maxMembers,
  status,
  isOwnGroup = true
}) => {
  return (
    <div className="flex flex-row items-center justify-between gap-4 w-full px-2 sm:px-0">
      {/* LEFT SIDE */}
      <div className="flex flex-col min-w-0 gap-1">
        <div className="flex items-center gap-2 sm:gap-3">
          <h2 className="text-xl sm:text-3xl font-black text-slate-900 tracking-tight truncate">
            {name}
          </h2>

          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[9px] sm:text-xs font-bold uppercase border shrink-0 ${tier === 'Tier A' ? 'bg-blue-100 text-blue-800 border-blue-200' : 'bg-amber-100 text-amber-800 border-amber-200'
            }`}>
            {tier}
          </span>
        </div>

        <div className="flex items-center gap-3 sm:gap-4 text-slate-500">
          {/* Member Count */}
          <div className="flex items-center gap-1.5 text-[11px] sm:text-sm">
            <MemberCountIcon sx={{ fontSize: { xs: 14, sm: 16 } }} className="flex-shrink-0" />
            <span className="font-bold">{membersCount}/{maxMembers} Members</span>
          </div>

          {/* Status */}
          <div className="flex items-center gap-1.5 text-[11px] sm:text-sm border-l border-slate-200 pl-3">
            <span className="relative flex h-2 w-2">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${status === 'Active' ? 'bg-green-400' : 'bg-amber-400'}`}></span>
              <span className={`relative inline-flex rounded-full h-2 w-2 ${status === 'Active' ? 'bg-green-500' : 'bg-amber-500'}`}></span>
            </span>
            <span className={`font-bold ${status === 'Active' ? 'text-green-600' : 'text-amber-600'}`}>
              {status}
            </span>
          </div>
        </div>
      </div>



      {/* RIGHT SIDE BUTTONS */}
      <div className="flex items-center gap-2 sm:gap-3">
        {isOwnGroup ? (
          <>
            <button title="Group Settings" className="p-2 sm:px-4 sm:py-2 bg-[#003366] text-white rounded-lg text-sm font-bold hover:bg-[#002244] transition flex items-center gap-2 shadow-sm">
              <GroupSettingsIcon sx={{ fontSize: 16 }} />
              <span className="hidden sm:inline text-xs sm:text-sm">Group Settings</span>
            </button>

            <button title="Leave Group" className="p-2 sm:px-4 sm:py-2 border border-slate-200 rounded-lg text-sm font-bold text-slate-700 hover:bg-slate-50 transition flex items-center gap-2 shadow-sm bg-white">
              <span className="hidden sm:inline text-xs sm:text-sm">Leave Group</span>
              <LeaveGroupIcon sx={{ fontSize: 16 }} />
            </button>
          </>
        ) : (
          <button className="bg-[#003366] hover:bg-[#002244] text-white font-bold py-2 px-4 sm:py-3 sm:px-8 rounded-lg shadow-md shadow-[#003366]/20 transition-all flex items-center gap-2">
            <PersonAddIcon sx={{ fontSize: 18 }} />
            <span className="text-xs sm:text-sm">Apply to Join</span>
          </button>
        )}
      </div>
    </div>

  );
};
