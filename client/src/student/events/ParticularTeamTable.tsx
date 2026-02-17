
import React from 'react';
import { EditIcon, DeleteIcon, PersonAddIcon } from '../../Assets/Icons';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  registeredOn: string;
  avatar: string;
}

const MOCK_MEMBERS: TeamMember[] = [
  { id: '1', name: 'Jordan Lee', role: 'Research Analyst', registeredOn: 'Jan 12, 2024', avatar: 'https://picsum.photos/seed/jordan/100' },
  { id: '2', name: 'Sam Rivera', role: 'Frontend Lead', registeredOn: 'Jan 14, 2024', avatar: 'https://picsum.photos/seed/sam/100' },
  { id: '3', name: 'Casey Smith', role: 'UI/UX Designer', registeredOn: 'Jan 15, 2024', avatar: 'https://picsum.photos/seed/casey/100' },
  { id: '4', name: 'Alex Johnson', role: 'Captain', registeredOn: 'Jan 10, 2024', avatar: 'https://picsum.photos/seed/alex/100' },
];

export const ParticularTeamTable: React.FC = () => {
  return (
    <section>
      <div className="flex items-center justify-between mb-4 px-1">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">Team Roster</h3>
        <button className="text-xs font-bold text-[#003366] hover:underline flex items-center gap-1">
          <PersonAddIcon sx={{ fontSize: 16 }} />
          Invite Member
        </button>
      </div>
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Role</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Registered On</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {MOCK_MEMBERS.map((member) => (
                <tr key={member.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img src={member.avatar} alt={member.name} className="size-8 rounded-full bg-slate-100 border border-slate-200" />
                      <span className="text-sm font-semibold text-slate-900">{member.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-xs font-medium text-slate-600">{member.role}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{member.registeredOn}</td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button className="text-slate-400 hover:text-[#003366] transition-colors">
                      <EditIcon sx={{ fontSize: 18 }} />
                    </button>
                    <button className="text-slate-400 hover:text-red-500 transition-colors">
                      <DeleteIcon sx={{ fontSize: 18 }} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
