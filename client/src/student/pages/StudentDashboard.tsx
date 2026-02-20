import React from 'react';
import { Card } from '../../shared/components/Card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import {
  UserIcon,
  UserGroupIcon,
  ShieldIcon,
  CalendarIcon,
  WarningIcon,
  ClockIcon
} from '../../assets/Icons';

const data = [
  { name: 'W1', score: 40 },
  { name: 'W2', score: 30 },
  { name: 'W3', score: 55 },
  { name: 'W4', score: 45 },
  { name: 'W5', score: 70 },
  { name: 'W6', score: 65 },
  { name: 'W7', score: 85 },
];

export const StudentDashboard: React.FC = () => {
  return (
    <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">


      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {[
          { title: "Individual Target", value: "85", total: "100", percent: "85%", icon: <UserIcon /> },
          { title: "Group Target", value: "420", total: "500", percent: "84%", icon: <UserGroupIcon /> }
        ].map((item, i) => (
          <Card key={i} className="p-4 sm:p-5">
            <div className="flex justify-between items-center mb-3">
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                {item.title}
              </p>
              <div className="w-5 h-5 text-blue-300">{item.icon}</div>
            </div>

            <div className="flex items-baseline gap-1">
              <h3 className="text-xl sm:text-2xl font-black">{item.value}</h3>
              <span className="text-xs text-slate-400">/ {item.total}</span>
            </div>

            <div className="w-full bg-slate-100 h-1.5 rounded-full my-2">
              <div className="bg-blue-900 h-full rounded-full" style={{ width: item.percent }} />
            </div>

            <p className="text-[11px] text-slate-500">{item.percent} Completion</p>
          </Card>
        ))}

        {/* Eligibility */}
        <Card className="p-4 sm:p-5">
          <div className="flex justify-between items-center mb-3">
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Eligibility</p>
            <ShieldIcon className="w-5 h-5 text-blue-300" />
          </div>
          <span className="inline-block px-3 py-1 text-xs bg-green-50 text-green-700 font-bold rounded">
            Pass
          </span>
          <p className="text-[11px] text-slate-500 mt-2">
            High probability based on engagement.
          </p>
        </Card>

        {/* Status */}
        <Card className="p-4 sm:p-5">
          <div className="flex justify-between items-center mb-3">
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Status</p>
            <CalendarIcon className="w-5 h-5 text-blue-300" />
          </div>
          <p className="text-sm font-bold">Active</p>
          <p className="text-xs text-blue-900">Until Dec 15, 2023</p>
          <p className="text-[10px] text-slate-400 mt-1">Deadline Approaching</p>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">

        {/* Chart */}
        <div className="lg:col-span-8">
          <Card title="Performance Insights" className="h-full">
            <div className="flex flex-col sm:flex-row justify-between gap-2 mb-4">
              <div>
                <p className="text-[10px] uppercase text-slate-400 font-bold tracking-wider">Base Points Trend</p>
                <p className="text-lg sm:text-xl font-black text-blue-900">
                  #12 <span className="text-xs font-normal text-slate-400">Overall Rank</span>
                </p>
              </div>
              <p className="text-xs font-bold text-emerald-500 self-start sm:self-center bg-emerald-50 px-2 py-1 rounded">
                +4% week
              </p>
            </div>

            <div className="h-[200px] sm:h-[240px] md:h-[280px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                  <YAxis hide />
                  <Tooltip
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                  />
                  <Line type="monotone" dataKey="score" stroke="#003366" strokeWidth={3} dot={{ fill: '#003366', strokeWidth: 2, r: 4 }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        {/* Alerts */}
        <div className="lg:col-span-4 space-y-4">
          <h3 className="font-bold text-slate-800 text-sm px-1">Alerts & Notices</h3>

          <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded-xl shadow-sm">
            <div className="flex items-center gap-2">
              <WarningIcon className="w-4 h-4 text-orange-600" />
              <h4 className="font-bold text-orange-800 text-sm">Multiplier Disabled</h4>
            </div>
            <p className="text-[11px] text-orange-700 mt-2 leading-relaxed">
              Group streak broken. Complete 3 tasks today to restore your 1.5x bonus.
            </p>
          </div>

          <Card className="hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                <ClockIcon className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h4 className="font-bold text-sm">Schedule Update</h4>
                <p className="text-[10px] text-slate-500 font-medium">Monday, Oct 24 • 10:00 AM</p>
              </div>
            </div>
            <p className="text-[11px] text-slate-500 mt-3 leading-relaxed">
              Session schedule changed. Check your group's "Phases" tab for the new timeline.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};

