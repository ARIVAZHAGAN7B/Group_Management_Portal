import React, { useState, useMemo, useEffect } from 'react';
import { type EventData } from './EventCard';
import { EventTeamsTable, type ParticipatingTeam } from './EventTeamsTable';
import { EventStatsRecap } from './EventStatsRecap';
import { TeamDetailView } from './TeamDetailView';
import {
  CalendarMonthIcon,
  GroupsIconComp,
  AddCircleIcon,
  ChevronLeftIcon
} from '../../Assets/Icons';
import { useAxios } from '../hooks/useAxios';

interface EventDetailViewProps {
  event: EventData;
  onBack: () => void;
}

interface ApiResponse {
  status: string;
  data: {
    teams: ParticipatingTeam[];
  };
}

export const EventDetailView: React.FC<EventDetailViewProps> = ({ event, onBack }) => {
  const [activeSubTab, setActiveSubTab] = useState<'all' | 'my'>('all');
  const [selectedTeam, setSelectedTeam] = useState<ParticipatingTeam | null>(null);

  const { data, loading, error } = useAxios<ApiResponse>({
    url: `/events/${event.id}/teams`,
    method: 'GET'
  });

  const eventTeams = data?.data.teams || [];

  const myTeams = useMemo(() => {
    return eventTeams.filter((_, i) => i === 3);
  }, [eventTeams]);

  const displayedTeams = activeSubTab === 'all' ? eventTeams : myTeams;

  if (selectedTeam) {
    return (
      <TeamDetailView
        team={selectedTeam}
        eventName={event.title}
        onBack={() => setSelectedTeam(null)}
      />
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#f5f7f8]">
      <header className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-8 py-6 md:py-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="space-y-3 md:space-y-4 w-full">
              <button
                onClick={onBack}
                className="flex items-center gap-1 text-[#003366] font-bold text-[10px] md:text-xs uppercase tracking-widest hover:translate-x-[-4px] transition-transform"
              >
                <ChevronLeftIcon sx={{ fontSize: 16 }} />
                <span>Return to List</span>
              </button>
              <div className="flex flex-wrap items-center gap-2 md:gap-3">
                <h1 className="text-xl md:text-3xl font-extrabold text-[#003366] tracking-tight truncate max-w-[80vw] md:max-w-none">{event.title}</h1>
                <span className="px-2 md:px-3 py-0.5 md:py-1 bg-emerald-100 text-emerald-700 text-[9px] md:text-xs font-bold rounded-full border border-emerald-200 flex items-center gap-1.5 shadow-sm shrink-0">
                  <span className="h-1.5 w-1.5 md:h-2 md:w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  {event.status}
                </span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 text-slate-500 text-xs md:text-sm font-medium">
                <div className="flex items-center gap-2">
                  <CalendarMonthIcon sx={{ fontSize: 18 }} className="text-slate-400" />
                  <span>{event.startDate} — {event.endDate}</span>
                </div>
                <div className="flex items-center gap-2">
                  <GroupsIconComp sx={{ fontSize: 18 }} className="text-slate-400" />
                  <span>{event.teamsCount} Teams</span>
                </div>
              </div>
            </div>
            <button className="w-full md:w-auto bg-[#003366] hover:bg-[#002244] text-white px-6 py-3 rounded-xl font-bold text-sm shadow-lg shadow-[#003366]/20 transition-all flex items-center justify-center gap-2 active:scale-95">
              <AddCircleIcon sx={{ fontSize: 20 }} />
              Join Event
            </button>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-8">
          <div className="flex gap-6 sm:gap-8 overflow-x-auto no-scrollbar">
            <button
              onClick={() => setActiveSubTab('all')}
              className={`py-3 md:py-4 border-b-[3px] text-xs md:text-sm font-bold flex items-center gap-2 transition-all whitespace-nowrap ${activeSubTab === 'all'
                ? 'border-[#003366] text-[#003366]'
                : 'border-transparent text-slate-400 hover:text-slate-600'
                }`}
            >
              All Teams
              <span className={`px-1.5 md:px-2 py-0.5 rounded text-[9px] md:text-[10px] font-black ${activeSubTab === 'all' ? 'bg-[#003366]/10 text-[#003366]' : 'bg-slate-100 text-slate-400'
                }`}>
                {eventTeams.length}
              </span>
            </button>
            <button
              onClick={() => setActiveSubTab('my')}
              className={`py-3 md:py-4 border-b-[3px] text-xs md:text-sm font-bold flex items-center gap-2 transition-all whitespace-nowrap ${activeSubTab === 'my'
                ? 'border-[#003366] text-[#003366]'
                : 'border-transparent text-slate-400 hover:text-slate-600'
                }`}
            >
              My Teams
              <span className={`px-1.5 md:px-2 py-0.5 rounded text-[9px] md:text-[10px] font-black ${activeSubTab === 'my' ? 'bg-[#003366]/10 text-[#003366]' : 'bg-slate-100 text-slate-400'
                }`}>
                {myTeams.length}
              </span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-8 py-6 md:py-8 w-full flex-1">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#003366]"></div>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-center">
            Error loading teams: {error.message}
          </div>
        ) : (
          <>
            <EventTeamsTable teams={displayedTeams} onViewTeam={setSelectedTeam} />
            <EventStatsRecap />
          </>
        )}
      </main>
    </div>
  );
};
