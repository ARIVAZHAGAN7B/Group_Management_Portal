
import React from 'react';
import { PersonIcon, Person2Icon, GroupsIconComp } from '../../Assets/Icons';

interface TeamOverviewProps {
  leaderName: string;
  memberCount: number;
  maxMembers: number;
}

export const TeamOverview: React.FC<TeamOverviewProps> = ({ leaderName, memberCount, maxMembers }) => {
  const progressWidth = (memberCount / maxMembers) * 100;

  return (
    <section>
      <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-4 px-1">Team Overview</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Leader */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-start gap-4 hover:shadow-md transition-shadow">
          <div className="size-12 rounded-full bg-[#003366]/5 flex items-center justify-center border border-[#003366]/10 text-[#003366]">
            <PersonIcon sx={{ fontSize: 24 }} />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Leader</p>
            <h4 className="text-lg font-bold text-slate-900">{leaderName}</h4>
            <p className="text-sm text-[#003366] font-medium">Captain</p>
          </div>
        </div>

        {/* Card 2: Co-Leader (Mock) */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-start gap-4 hover:shadow-md transition-shadow">
          <div className="size-12 rounded-full bg-[#003366]/5 flex items-center justify-center border border-[#003366]/10 text-[#003366]">
            <Person2Icon sx={{ fontSize: 24 }} />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Co-Leader</p>
            <h4 className="text-lg font-bold text-slate-900">Maya Sterling</h4>
            <p className="text-sm text-[#003366] font-medium">Vice-Captain</p>
          </div>
        </div>

        {/* Card 3: Member Count */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-start gap-4 hover:shadow-md transition-shadow">
          <div className="size-12 rounded-full bg-[#003366]/5 flex items-center justify-center border border-[#003366]/10 text-[#003366]">
            <GroupsIconComp sx={{ fontSize: 24 }} />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Member Count</p>
            <h4 className="text-lg font-bold text-slate-900">{memberCount} / {maxMembers} Members</h4>
            <div className="w-full bg-slate-100 h-1.5 rounded-full mt-2 overflow-hidden min-w-[120px]">
              <div className="bg-[#003366] h-full" style={{ width: `${progressWidth}%` }}></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
