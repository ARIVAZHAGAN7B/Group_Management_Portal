import React, { useState, useMemo, useEffect } from 'react';
import { EventCard, type EventData } from './EventCard';
import { EventDetailView } from './EventDetailView';
import { ChevronLeftIcon, ChevronRightIcon, SearchIcon } from '../../assets/Icons';
import FilterListIcon from "@mui/icons-material/FilterList";
import { useAxios } from '../hooks/useAxios';

interface ApiResponse {
  status: string;
  data: {
    events: EventData[];
  };
}

export const EventTeamsView: React.FC = () => {
  const { data, loading, error } = useAxios<ApiResponse>({
    url: '/events',
    method: 'GET'
  });

  const MOCK_EVENTS = data?.data.events || [];
  const [selectedEvent, setSelectedEvent] = useState<EventData | null>(null);
  const [activeSubTab, setActiveSubTab] = useState<'all' | 'my'>('all');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 4;

  const filteredEvents = useMemo(() => {
    let result = activeSubTab === 'all'
      ? MOCK_EVENTS
      : MOCK_EVENTS.filter(e => e.status === 'Active' || e.title.includes('Hackathon'));

    if (search) {
      result = result.filter(e => e.title.toLowerCase().includes(search.toLowerCase()));
    }

    if (statusFilter !== 'All') {
      result = result.filter(e => e.status === statusFilter);
    }

    if (startDate) {
      result = result.filter(e => new Date(e.startDate) >= new Date(startDate));
    }
    if (endDate) {
      result = result.filter(e => new Date(e.endDate) <= new Date(endDate));
    }

    return result;
  }, [activeSubTab, search, statusFilter, startDate, endDate]);

  const totalPages = Math.ceil(filteredEvents.length / pageSize) || 1;
  const paginatedEvents = filteredEvents.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const clearFilters = () => {
    setSearch('');
    setStatusFilter('All');
    setStartDate('');
    setEndDate('');
    setCurrentPage(1);
  };

  const handleViewEvent = (event: EventData) => {
    setSelectedEvent(event);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (selectedEvent) {
    return <EventDetailView event={selectedEvent} onBack={() => setSelectedEvent(null)} />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#f5f7f8]">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-20 w-full shadow-sm">
        <div className="max-w-7xl mx-auto px-8 pt-4 sm:pt-6 md:pt-8 w-full">
          <div className="flex flex-wrap items-center justify-between mb-4 md:mb-6 gap-4">
            <div className="flex flex-wrap items-center gap-4 md:gap-6 flex-1">
              <h2 className="text-xl md:text-3xl font-black text-slate-900 tracking-tight leading-none shrink-0">Events</h2>

              {/* Filter Area - Flexible Wrapping */}
              <div className="flex flex-wrap items-center gap-2 md:gap-3 flex-1">
                {/* Search */}
                <div className="relative flex-1 min-w-[160px] max-w-sm">
                  <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400">
                    <SearchIcon sx={{ fontSize: 16 }} />
                  </span>
                  <input
                    type="text"
                    placeholder="Search events..."
                    value={search}
                    onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
                    className="w-full pl-8 pr-3 py-1.5 md:py-2 text-[10px] md:text-xs bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#003366]/10 outline-none transition-all shadow-inner"
                  />
                </div>

                {/* Status Dropdown */}
                <div className="flex items-center gap-1 bg-slate-50 border border-slate-200 px-2 py-1.5 rounded-lg shadow-sm">
                  <span className="hidden xs:inline-block text-[8px] md:text-[9px] font-bold text-slate-400 uppercase tracking-widest">Status</span>
                  <select
                    value={statusFilter}
                    onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
                    className="text-[9px] md:text-[10px] font-bold text-slate-700 bg-transparent border-none p-0 outline-none focus:ring-0 cursor-pointer"
                  >
                    <option value="All">All</option>
                    <option value="Active">Active</option>
                    <option value="Upcoming">Upcoming</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>

                {/* Date Ranges - hidden on very small screens or compact */}
                <div className="hidden sm:flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-2 py-1.5 rounded-lg shadow-sm">
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">From</span>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => { setStartDate(e.target.value); setCurrentPage(1); }}
                    className="text-[10px] font-bold text-slate-700 bg-transparent border-none p-0 outline-none focus:ring-0 cursor-pointer"
                  />
                </div>
              </div>
            </div>

            <button
              onClick={clearFilters}
              className="text-[10px] md:text-xs font-bold text-blue-900 bg-blue-50 px-3 md:px-4 py-1.5 md:py-2 rounded-lg hover:bg-blue-100 transition-colors uppercase tracking-wider shadow-sm border border-blue-100 whitespace-nowrap"
            >
              Reset
            </button>
          </div>

          <div className="flex gap-4 sm:gap-8 overflow-x-auto no-scrollbar">
            <button
              onClick={() => { setActiveSubTab('all'); setCurrentPage(1); }}
              className={`pb-3 md:pb-4 text-xs md:text-sm font-bold flex items-center gap-2 transition-all border-b-[3px] whitespace-nowrap ${activeSubTab === 'all'
                ? 'text-[#003366] border-[#003366]'
                : 'text-slate-400 border-transparent hover:text-slate-600'
                }`}
            >
              All Events
              <span className={`text-[8px] md:text-[10px] px-1.5 md:px-2 py-0.5 rounded-full font-black ${activeSubTab === 'all' ? 'bg-[#003366]/10 text-[#003366]' : 'bg-slate-100 text-slate-400'
                }`}>
                {MOCK_EVENTS.length}
              </span>
            </button>
            <button
              onClick={() => { setActiveSubTab('my'); setCurrentPage(1); }}
              className={`pb-3 md:pb-4 text-xs md:text-sm font-bold flex items-center gap-2 transition-all border-b-[3px] whitespace-nowrap ${activeSubTab === 'my'
                ? 'text-[#003366] border-[#003366]'
                : 'text-slate-400 border-transparent hover:text-slate-600'
                }`}
            >
              My Events
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto px-8 py-6 md:py-8 space-y-4 w-full">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#003366]"></div>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-center">
            Error loading events: {error.message}
          </div>
        ) : (
          paginatedEvents.map((event) => (
            <EventCard key={event.id} event={event} onClick={handleViewEvent} />
          ))
        )}

        {!loading && !error && paginatedEvents.length === 0 && (
          <div className="py-16 md:py-24 text-center bg-white rounded-xl border border-dashed border-slate-300 flex flex-col items-center">
            <div className="size-12 md:size-16 bg-slate-50 text-slate-300 rounded-full flex items-center justify-center mb-4">
              <FilterListIcon sx={{ fontSize: 24 }} />
            </div>
            <p className="text-slate-500 font-bold text-base md:text-lg">No matches</p>
            <button
              onClick={clearFilters}
              className="mt-4 text-[10px] md:text-sm font-bold text-[#003366] hover:underline uppercase tracking-widest"
            >
              Clear filters
            </button>
          </div>
        )}
      </main>

      <footer className="max-w-7xl mx-auto px-8 py-4 sm:py-6 mb-8 flex flex-col sm:flex-row items-center justify-between w-full bg-white border border-slate-200 rounded-xl shadow-sm gap-4">
        <p className="text-[10px] md:text-xs text-slate-500 font-medium tracking-wide">
          Showing {paginatedEvents.length} of {filteredEvents.length} results
        </p>
        <div className="flex gap-2">
          <button
            onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="size-7 md:size-8 flex items-center justify-center rounded border border-slate-200 text-slate-400 hover:bg-slate-50 disabled:opacity-50 transition-colors"
          >
            <ChevronLeftIcon sx={{ fontSize: 16 }} />
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => handlePageChange(i + 1)}
              className={`size-7 md:size-8 flex items-center justify-center rounded border font-bold text-[10px] md:text-xs transition-all ${currentPage === i + 1
                ? 'border-[#003366] text-[#003366] bg-[#003366]/5 shadow-sm'
                : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="size-7 md:size-8 flex items-center justify-center rounded border border-slate-200 text-slate-400 hover:bg-slate-50 disabled:opacity-50 transition-colors"
          >
            <ChevronRightIcon sx={{ fontSize: 16 }} />
          </button>
        </div>
      </footer>
    </div>
  );
};
