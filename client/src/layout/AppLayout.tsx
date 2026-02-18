import React from "react";
import { type ReactNode } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { useStore } from "../store/store";
import { UserRole } from "../types";

import {
  DashboardIcon,
  UsersIcon,
  ExploreIcon,
  RankingsIcon,
  SettingsIcon,
  BellIcon,
  LogoIcon,
  ScheduleIcon,
  MessageIcon,
  TimerIcon,
  LogoutIcon
} from "../Assets/Icons";



import { ThemeProvider, createTheme } from "@mui/material/styles";
import Badge from "@mui/material/Badge";


const muiTheme = createTheme({
  typography: {
    fontFamily: "Inter, sans-serif",
  },
});

interface MenuItem {
  label: string;
  icon: ReactNode;
  path: string;
}

export const AppLayout: React.FC = () => {
  const { auth, logout } = useStore();
  const { user } = auth;
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  if (!user) return null;

  const menuItems: Record<UserRole, MenuItem[]> = {
    [UserRole.STUDENT]: [
      { label: "Dashboard", icon: <DashboardIcon />, path: "/student/dashboard" },
      { label: "My Group", icon: <UsersIcon />, path: "/student/mygroup/members" },
      { label: "All Groups", icon: <ExploreIcon />, path: "/student/all-groups" },
      { label: "Rankings", icon: <RankingsIcon />, path: "/student/rankings" },
      { label: "Event Teams", icon: <ScheduleIcon />, path: "/student/events" },
    ],
    [UserRole.FACULTY]: [
      { label: "Overview", icon: <DashboardIcon />, path: "/faculty/dashboard" },
    ],
    [UserRole.ADMIN]: [
      { label: "System Health", icon: <DashboardIcon />, path: "/admin/dashboard" },
    ],
    [UserRole.GUEST]: [],
  };

  const phaseInfo = {
    number: 3,
    start: "Feb 10, 2024",
    end: "Feb 20, 2024 11:59 PM",
    remaining: "3D 4H"
  };


  return (
    <ThemeProvider theme={muiTheme}>
      <div className="flex h-screen bg-slate-50 overflow-hidden">
        {/* Mobile Sidebar Backdrop */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-slate-900/50 z-40 lg:hidden backdrop-blur-sm"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside className={`
          fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 flex flex-col transition-transform duration-300 transform
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 lg:static lg:inset-0
        `}>
          <div className="p-6 flex items-center justify-between lg:justify-start gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-900 rounded-lg flex items-center justify-center text-white">
                <LogoIcon />
              </div>
              <h1 className="font-bold text-lg text-blue-900">UniPortal</h1>
            </div>
            {/* Close button for mobile */}
            <button
              className="lg:hidden p-2 text-slate-400 hover:bg-slate-50 rounded-lg"
              onClick={() => setIsSidebarOpen(false)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <nav className="flex-1 px-3 space-y-1 overflow-y-auto">
            {menuItems[user.role]?.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setIsSidebarOpen(false)}
                className={({ isActive }) =>
                  `w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${isActive
                    ? "bg-blue-50 border-l-4 border-blue-900 text-blue-900 font-semibold"
                    : "text-slate-600 hover:bg-slate-50"
                  }`
                }
              >
                <span className="w-5 h-5">{item.icon}</span>
                <span className="text-sm">{item.label}</span>
              </NavLink>
            ))}
          </nav>

          <div className="p-4 border-t border-slate-100 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <img src={user.avatar} className="w-8 h-8 rounded-full" />
              <div className="flex-1 overflow-hidden">
                <p className="text-xs font-bold truncate">{user.name}</p>
                <p className="text-[10px] text-slate-400 font-medium truncate">{user.rollNumber}</p>
              </div>

              <button className="text-slate-400 hover:text-blue-900 transition-colors">
                <SettingsIcon sx={{ fontSize: 18 }} />
              </button>
            </div>

            <button
              onClick={logout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-all duration-200 font-semibold border border-transparent hover:border-red-100"
            >
              <LogoutIcon sx={{ fontSize: 20 }} />
              <span className="text-sm">Logout Session</span>
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm/5">
            <div className="pr-4 py-2 flex justify-between items-center bg-white/80 backdrop-blur-md">
              <div className="flex items-center gap-4 flex-1 min-w-0">
                {/* Hamburger Switch for mobile */}
                <button
                  className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors ml-4"
                  onClick={() => setIsSidebarOpen(true)}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                  </svg>
                </button>

                {/* Simplified Phase Info Row */}
                <div className="flex items-center gap-2 sm:gap-3 px-4 py-1 text-[11px] sm:text-xs font-medium text-slate-500 overflow-x-auto no-scrollbar shrink-0">
                  <div className="flex items-center gap-1.5 shrink-0">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse"></div>
                    <span className="font-bold text-blue-900">Phase {phaseInfo.number}</span>
                  </div>

                  <span className="hidden sm:inline text-slate-300">•</span>

                  <div className="hidden md:flex items-center gap-1 shrink-0">
                    <span className="opacity-60">Start:</span>
                    <span className="font-bold text-slate-700">{phaseInfo.start.split(',')[0]}</span>
                  </div>

                  <span className="hidden md:inline text-slate-300">•</span>

                  <div className="flex items-center gap-1 shrink-0">
                    <span className="opacity-60">End:</span>
                    <span className="font-bold text-slate-700">{phaseInfo.end.split(' ')[0]} {phaseInfo.end.split(' ')[1]}</span>
                  </div>

                  <div className="ml-1 px-2 py-0.5 bg-blue-900 text-[10px] font-black text-white rounded flex items-center gap-1 shrink-0 shadow-sm">
                    <TimerIcon sx={{ fontSize: 12, opacity: 0.8 }} />
                    <span className="tracking-widest capitalize">{phaseInfo.remaining} left</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1 sm:gap-2 ml-4">
                <button title="Messages & Requests" className="p-2 text-slate-400 hover:bg-slate-50 hover:text-blue-900 rounded-lg transition-all duration-200">
                  <Badge
                    badgeContent={3}
                    color="primary"
                    sx={{
                      '& .MuiBadge-badge': {
                        fontSize: '9px',
                        height: '16px',
                        minWidth: '16px',
                        fontWeight: 'bold',
                        border: '2px solid white',
                        top: 2,
                        right: 2
                      }
                    }}
                  >
                    <MessageIcon sx={{ fontSize: 18 }} />
                  </Badge>
                </button>

                <button title="Notifications" className="p-2 text-slate-400 hover:bg-slate-50 hover:text-red-900 rounded-lg transition-all duration-200">
                  <Badge
                    variant="dot"
                    color="error"
                    sx={{
                      '& .MuiBadge-badge': {
                        top: 2,
                        right: 2,
                        border: '2px solid white'
                      }
                    }}
                  >
                    <BellIcon sx={{ fontSize: 18 }} />
                  </Badge>
                </button>
              </div>
            </div>
          </header>


          <div className="flex-1 overflow-y-auto">
            <Outlet />
          </div>
        </main>


      </div>
    </ThemeProvider>
  );
};

