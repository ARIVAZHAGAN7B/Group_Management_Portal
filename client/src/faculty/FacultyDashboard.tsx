
import React from 'react';
import { Card } from '../shared/components/Card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ClockIcon } from '../Assets/Icons';

const gradeData = [
  { name: 'A', count: 12 },
  { name: 'B', count: 25 },
  { name: 'C', count: 18 },
  { name: 'D', count: 5 },
  { name: 'F', count: 2 },
];

export const FacultyDashboard: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-indigo-900 text-white border-none">
          <p className="text-[10px] font-bold uppercase tracking-widest opacity-70 mb-1">Active Courses</p>
          <h3 className="text-3xl font-black">04</h3>
          <p className="text-[11px] mt-4 opacity-70 italic font-medium">CS302, CS401, CS101, IT202</p>
        </Card>
        <Card>
          <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-1">Total Students</p>
          <h3 className="text-3xl font-black text-slate-900">142</h3>
          <p className="text-[11px] text-slate-400 mt-4 uppercase font-bold tracking-tight">Across all departments</p>
        </Card>
        <Card>
          <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-1">Pending Submissions</p>
          <h3 className="text-3xl font-black text-red-500">28</h3>
          <p className="text-[11px] text-slate-400 mt-4 uppercase font-bold tracking-tight">Requires immediate attention</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card title="Grade Distribution - CS302">
          <div className="h-[300px] w-full mt-4">
             <ResponsiveContainer width="100%" height="100%">
                <BarChart data={gradeData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 700 }} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip />
                  <Bar dataKey="count" fill="#4338ca" radius={[4, 4, 0, 0]} />
                </BarChart>
             </ResponsiveContainer>
          </div>
        </Card>

        <Card title="Upcoming Deadlines">
           <div className="space-y-4">
              {[
                { title: 'Project Proposal Review', date: 'Today, 4:00 PM', count: 12, urgent: true },
                { title: 'Midterm Grading', date: 'Oct 28', count: 45, urgent: false },
                { title: 'Research Feedback', date: 'Nov 02', count: 8, urgent: false },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                   <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${item.urgent ? 'bg-red-50 text-red-600' : 'bg-slate-200 text-slate-600'}`}>
                        <ClockIcon />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-800">{item.title}</h4>
                        <p className={`text-[10px] font-bold ${item.urgent ? 'text-red-500' : 'text-slate-500'}`}>{item.date}</p>
                      </div>
                   </div>
                   <div className="text-right">
                      <p className="text-lg font-black text-slate-900">{item.count}</p>
                      <p className="text-[9px] text-slate-400 uppercase font-bold">Submissions</p>
                   </div>
                </div>
              ))}
           </div>
        </Card>
      </div>
    </div>
  );
};
