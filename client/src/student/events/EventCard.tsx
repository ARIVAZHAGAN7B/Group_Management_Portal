
import React from 'react';
import { ArrowForwardIcon, ArchiveIcon } from '../../Assets/Icons';

export interface EventData {
  id: string;
  title: string;
  description: string;
  status: 'Active' | 'Upcoming' | 'Completed';
  startDate: string;
  endDate: string;
  teamsCount: number;
}

interface EventCardProps {
  event: EventData;
  onClick?: (event: EventData) => void;
}

export const EventCard: React.FC<EventCardProps> = ({ event, onClick }) => {
  const isCompleted = event.status === 'Completed';

  const getStatusStyles = () => {
    switch (event.status) {
      case 'Active':
        return 'bg-emerald-100 text-emerald-700';
      case 'Upcoming':
        return 'bg-blue-100 text-blue-700';
      case 'Completed':
        return 'bg-slate-200 text-slate-600';
      default:
        return 'bg-slate-100 text-slate-500';
    }
  };

  return (
    <div 
      onClick={() => onClick?.(event)}
      className={`bg-white border border-slate-200 rounded-xl p-4 md:p-6 shadow-sm hover:shadow-md transition-all group cursor-pointer active:scale-[0.99] ${isCompleted ? 'opacity-80' : ''}`}
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-6">
        {/* Top: Header Info */}
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2 flex-wrap">
            <span className={`${getStatusStyles()} text-[8px] md:text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border shadow-sm`}>
              {event.status}
            </span>
            <span className="text-[10px] md:text-xs text-slate-400 font-medium tracking-tight">ID: {event.id}</span>
          </div>
          <h3 className={`text-base md:text-lg font-bold ${isCompleted ? 'text-slate-700' : 'text-slate-900 group-hover:text-[#003366]'} transition-colors truncate md:whitespace-normal`}>
            {event.title}
          </h3>
          <p className="text-slate-500 text-[11px] md:text-sm mt-1 leading-relaxed max-w-md line-clamp-2 md:line-clamp-none">
            {event.description}
          </p>
        </div>

        {/* Middle: Key Figures - Stacked on Mobile */}
        <div className="grid grid-cols-3 md:flex md:items-center gap-4 md:gap-8 md:px-8 md:border-l md:border-r border-slate-100 py-3 md:py-0 border-t border-b md:border-t-0 md:border-b-0">
          <div className="text-center md:text-left">
            <p className="text-[8px] md:text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">Starts</p>
            <p className={`text-[10px] md:text-sm font-bold ${isCompleted ? 'text-slate-500' : 'text-slate-700'} uppercase truncate`}>{event.startDate}</p>
          </div>
          <div className="text-center md:text-left">
            <p className="text-[8px] md:text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">Ends</p>
            <p className={`text-[10px] md:text-sm font-bold ${isCompleted ? 'text-slate-500' : 'text-slate-700'} uppercase truncate`}>{event.endDate}</p>
          </div>
          <div className="text-center md:text-left">
            <p className="text-[8px] md:text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">Teams</p>
            <p className={`text-[10px] md:text-sm font-bold ${isCompleted ? 'text-slate-500' : 'text-slate-700'}`}>{event.teamsCount}</p>
          </div>
        </div>

        {/* Bottom: Action CTA */}
        <div className="flex items-center justify-end md:min-w-[140px]">
          {isCompleted ? (
            <button className="w-full md:w-auto bg-slate-100 text-slate-500 px-4 md:px-5 py-2 md:py-2.5 rounded-lg text-xs md:text-sm font-bold shadow-sm transition-all flex items-center justify-center gap-2 cursor-default">
              Archive
              <ArchiveIcon sx={{ fontSize: 16 }} />
            </button>
          ) : (
            <button 
              className="w-full md:w-auto bg-[#003366] hover:bg-[#002244] text-white px-4 md:px-5 py-2 md:py-2.5 rounded-lg text-xs md:text-sm font-bold shadow-sm transition-all active:scale-95 flex items-center justify-center gap-2"
              onClick={(e) => {
                e.stopPropagation();
                onClick?.(event);
              }}
            >
              View Details
              <ArrowForwardIcon sx={{ fontSize: 16 }} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
