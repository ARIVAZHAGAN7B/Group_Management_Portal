
import React from 'react';
import { Card } from '../shared/components/Card';
import { TrendingUpIcon, UsersIcon, ActivityIcon, ShieldIcon, DatabaseIcon, ServerIcon } from '../Assets/Icons';

export const AdminDashboard: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Uptime', value: '99.9%', color: 'text-emerald-500', icon: <TrendingUpIcon /> },
          { label: 'Active Users', value: '2.4k', color: 'text-blue-900', icon: <UsersIcon /> },
          { label: 'API Latency', value: '24ms', color: 'text-slate-900', icon: <ActivityIcon /> },
          { label: 'Security Alerts', value: '0', color: 'text-slate-400', icon: <ShieldIcon /> },
        ].map((stat, i) => (
          <Card key={i}>
            <div className="flex justify-between items-start mb-2">
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{stat.label}</p>
              <div className="w-4 h-4 text-slate-300">{stat.icon}</div>
            </div>
            <h3 className={`text-2xl font-black ${stat.color}`}>{stat.value}</h3>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
           <Card title="System Activity Logs">
              <div className="overflow-x-auto">
                 <table className="w-full text-left">
                    <thead>
                       <tr className="border-b border-slate-100">
                          <th className="pb-4 text-[10px] font-bold text-slate-400 uppercase">Timestamp</th>
                          <th className="pb-4 text-[10px] font-bold text-slate-400 uppercase">User</th>
                          <th className="pb-4 text-[10px] font-bold text-slate-400 uppercase">Action</th>
                          <th className="pb-4 text-[10px] font-bold text-slate-400 uppercase">Status</th>
                       </tr>
                    </thead>
                    <tbody className="text-xs">
                       {[
                         { time: '10:42 AM', user: 'sarah.faculty@uni.edu', action: 'Grade Export', status: 'Success' },
                         { time: '10:15 AM', user: 'john.admin@uni.edu', action: 'User Permissions Change', status: 'Pending' },
                         { time: '09:58 AM', user: 'System', action: 'DB Backup', status: 'Success' },
                         { time: '09:40 AM', user: 'alex.student@uni.edu', action: 'File Upload (50MB)', status: 'Success' },
                       ].map((log, i) => (
                         <tr key={i} className="border-b border-slate-50 last:border-none">
                            <td className="py-4 font-medium text-slate-500">{log.time}</td>
                            <td className="py-4 font-bold text-slate-800">{log.user}</td>
                            <td className="py-4 text-slate-600 font-medium">{log.action}</td>
                            <td className="py-4">
                               <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase ${log.status === 'Success' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>
                                  {log.status}
                               </span>
                            </td>
                         </tr>
                       ))}
                    </tbody>
                 </table>
              </div>
           </Card>
        </div>

        <div className="space-y-6">
           <Card title="Database Storage">
              <div className="flex justify-between items-center mb-4">
                <div className="w-8 h-8 text-blue-900 bg-blue-50 rounded-lg flex items-center justify-center">
                  <DatabaseIcon />
                </div>
                <span className="text-[10px] font-bold text-slate-400 uppercase">Cluster: DB-PROD-01</span>
              </div>
              <div className="flex justify-center py-6">
                 <div className="relative w-32 h-32 flex items-center justify-center">
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                       <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#f1f5f9" strokeWidth="3" />
                       <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#003366" strokeWidth="3" strokeDasharray="65, 100" />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                       <span className="text-xl font-black text-slate-900">65%</span>
                       <span className="text-[8px] font-bold text-slate-400 uppercase">Used</span>
                    </div>
                 </div>
              </div>
              <div className="mt-4 space-y-2">
                 <div className="flex justify-between text-[10px] font-bold">
                    <span className="text-slate-500 uppercase">Documents</span>
                    <span className="text-slate-900">12.4 GB</span>
                 </div>
                 <div className="flex justify-between text-[10px] font-bold">
                    <span className="text-slate-500 uppercase">Media Assets</span>
                    <span className="text-slate-900">45.8 GB</span>
                 </div>
              </div>
           </Card>

           <Card className="bg-slate-900 border-none">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 text-white bg-slate-800 rounded-lg flex items-center justify-center">
                  <ServerIcon />
                </div>
                <h4 className="text-sm font-bold text-white">Cloud Infrastructure</h4>
              </div>
              <p className="text-[10px] text-slate-400 mb-4 font-medium leading-relaxed">Running on 12 AWS nodes across 3 availability zones.</p>
              <button className="w-full py-2 bg-blue-600 text-white text-[10px] font-bold rounded-lg uppercase tracking-widest hover:bg-blue-500 transition-colors">Manage Cluster</button>
           </Card>
        </div>
      </div>
    </div>
  );
};
