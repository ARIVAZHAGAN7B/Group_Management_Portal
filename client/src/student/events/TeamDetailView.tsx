
import React from 'react';
import type { ParticipatingTeam } from './EventTeamsTable';
import { TeamOverview } from './TeamOverview';
import { ParticularTeamTable } from './ParticularTeamTable';
import {
  EventIcon,
  CheckCircleIcon,
  StarsIcon,
  PersonAddIcon,
  ChevronLeftIcon
} from '../../assets/Icons';

interface TeamDetailViewProps {
  team: ParticipatingTeam;
  eventName: string;
  onBack: () => void;
}

export const TeamDetailView: React.FC<TeamDetailViewProps> = ({ team, eventName, onBack }) => {
  return (
    <div className="flex flex-col min-h-screen bg-[#f5f7f8]">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-20 shadow-sm">
        <div className="max-w-7xl mx-auto px-8 py-6 md:py-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 md:space-y-4 w-full">
            <button
              onClick={onBack}
              className="flex items-center gap-1 text-[#003366] font-bold text-[10px] md:text-xs uppercase tracking-widest hover:translate-x-[-4px] transition-transform"
            >
              <ChevronLeftIcon sx={{ fontSize: 16 }} />
              <span>Back to Event</span>
            </button>
            <div>
              <div className="flex items-center gap-2 text-[#003366] mb-1">
                <EventIcon sx={{ fontSize: 14 }} />
                <span className="text-xs md:text-sm font-medium truncate max-w-[70vw]">{eventName}</span>
              </div>
              <h2 className="text-xl md:text-3xl font-black text-slate-900 tracking-tight">{team.name}</h2>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 md:gap-3 w-full md:w-auto">
            <div className="flex flex-1 md:flex-none items-center justify-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] md:text-sm font-bold shadow-sm">
              <CheckCircleIcon sx={{ fontSize: 16 }} className="text-emerald-500" />
              {team.status === 'Active' ? 'Active' : 'Qualified'}
            </div>
            <div className="flex flex-1 md:flex-none items-center justify-center gap-1.5 px-3 py-1.5 rounded-full bg-[#003366]/5 text-[#003366] border border-[#003366]/20 text-[10px] md:text-sm font-bold">
              <StarsIcon sx={{ fontSize: 16 }} />
              Captain
            </div>
            <button className="w-full md:w-auto flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-lg bg-[#003366] text-white hover:bg-[#002244] transition-all text-xs md:text-sm font-bold shadow-lg shadow-[#003366]/20 active:scale-95">
              <PersonAddIcon sx={{ fontSize: 18 }} />
              Join Team
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-8 py-6 md:py-8 space-y-6 md:space-y-8 w-full">
        <TeamOverview
          leaderName={team.leaderName}
          memberCount={team.currentSize}
          maxMembers={team.maxSize}
        />
        <ParticularTeamTable />
      </div>

      <footer className="max-w-7xl mx-auto px-8 py-8 md:py-10 border-t border-slate-200 mt-auto mb-8 flex flex-col md:flex-row gap-4 items-center justify-between opacity-60 w-full">
        <p className="text-[10px] md:text-xs font-medium italic">© 2024 University Portal</p>
        <div className="flex gap-4 md:gap-6 text-[10px] md:text-xs font-bold uppercase tracking-wider">
          <a className="hover:text-[#003366] transition-colors" href="#">Guidelines</a>
          <a className="hover:text-[#003366] transition-colors" href="#">Support</a>
          <a className="hover:text-[#003366] transition-colors" href="#">Privacy</a>
        </div>
      </footer>
    </div>
  );
};
