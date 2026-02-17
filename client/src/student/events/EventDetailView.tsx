
import React, { useState, useMemo } from 'react';
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

interface EventDetailViewProps {
  event: EventData;
  onBack: () => void;
}

const GET_MOCK_TEAMS = (eventId: string): ParticipatingTeam[] => {
  const seed = eventId.split('-').pop() || '1';
  const baseTeams: ParticipatingTeam[] = [
    { rank: 1, name: 'Alpha Coders', shortName: 'AC', leaderName: 'Jane Smith', currentSize: 4, maxSize: 6, status: 'Qualified' },
    { rank: 2, name: 'Beta Bytes', shortName: 'BB', leaderName: 'John Doe', currentSize: 6, maxSize: 6, status: 'Active' },
    { rank: 3, name: 'Gamma Ray', shortName: 'GR', leaderName: 'Alice Wong', currentSize: 3, maxSize: 6, status: 'Eliminated' },
    { rank: 4, name: 'Delta Force', shortName: 'DF', leaderName: 'Bob Miller', currentSize: 5, maxSize: 6, status: 'Active' },
    { rank: 5, name: 'Epsilon Team', shortName: 'ET', leaderName: 'Sarah Chen', currentSize: 6, maxSize: 6, status: 'Qualified' },
    { rank: 6, name: 'Zeta Squad', shortName: 'ZS', leaderName: 'Mike Ross', currentSize: 2, maxSize: 6, status: 'Active' },
    { rank: 7, name: 'Lambda Loop', shortName: 'LL', leaderName: 'Chris Evans', currentSize: 4, maxSize: 6, status: 'Active' },
    { rank: 8, name: 'Sigma Source', shortName: 'SS', leaderName: 'Tessa Violet', currentSize: 5, maxSize: 6, status: 'Qualified' },
  ];

  if (seed === '001') return baseTeams;
  return baseTeams.map((t, idx) => ({
    ...t,
    rank: idx + 1,
    currentSize: Math.floor(Math.random() * 5) + 1,
    status: Math.random() > 0.3 ? 'Active' : 'Qualified'
  }));
};

export const EventDetailView: React.FC<EventDetailViewProps> = ({ event, onBack }) => {
  const [activeSubTab, setActiveSubTab] = useState<'all' | 'my'>('all');
  const [selectedTeam, setSelectedTeam] = useState<ParticipatingTeam | null>(null);

  const eventTeams = useMemo(() => GET_MOCK_TEAMS(event.id), [event.id]);

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
        <EventTeamsTable teams={displayedTeams} onViewTeam={setSelectedTeam} />
        <EventStatsRecap />
      </main>
    </div>
  );
};
