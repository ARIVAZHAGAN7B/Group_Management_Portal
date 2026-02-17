import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { GroupHeader } from "../components/Group/GroupHeader";

interface GroupData {
  name: string;
  tier: string;
  members: number;
  maxMembers: number;
  status: string;
}

interface Member {
  id: number;
  name: string;
  role: string;
  points: string;
  completion: number;
  eligibility: string;
  incubation: string;
  isLeader?: boolean;
}

interface MyGroupViewProps {
  groupData?: GroupData;
  membersList?: Member[];
  onBack?: () => void;
  isOwnGroup?: boolean;
}

export const MyGroupView: React.FC<MyGroupViewProps> = ({
  groupData = {
    name: "Project Zeta",
    tier: "Tier B",
    members: 10,
    maxMembers: 11,
    status: "Active",
  },
  membersList,
  onBack,
  isOwnGroup = true,
}) => {
  // ✅ DATA STAYS HERE
  const ALL_TEAM_MEMBERS: Member[] = membersList || [
    { id: 101, name: "Alex Johnson", role: "Captain", points: "2,840", completion: 95, eligibility: "Qualified", incubation: "ACTIVE", isLeader: true },
    { id: 102, name: "Maya Sterling", role: "Vice-Captain", points: "2,420", completion: 88, eligibility: "Qualified", incubation: "ACTIVE", isLeader: true },
    { id: 103, name: "Liam Chen", role: "Strategist", points: "2,650", completion: 92, eligibility: "Qualified", incubation: "ACTIVE", isLeader: true },
    { id: 104, name: "Sarah Smyth", role: "Manager", points: "2,100", completion: 85, eligibility: "Qualified", incubation: "ACTIVE", isLeader: true },
    { id: 1, name: "Jordan Lee", role: "Research Analyst", points: "1,240", completion: 78, eligibility: "Qualified", incubation: "ACTIVE" },
    { id: 2, name: "Sam Rivera", role: "Frontend Lead", points: "980", completion: 45, eligibility: "At Risk", incubation: "ACTIVE" },
    { id: 3, name: "Taylor Kim", role: "Documentation", points: "1,100", completion: 82, eligibility: "Qualified", incubation: "NONE" },
    { id: 4, name: "Casey Wright", role: "QA Tester", points: "850", completion: 65, eligibility: "Qualified", incubation: "ACTIVE" },
    { id: 5, name: "Jamie Ortiz", role: "DevOps", points: "1,420", completion: 90, eligibility: "Qualified", incubation: "ACTIVE" },
    { id: 6, name: "Morgan Smith", role: "Backend Dev", points: "1,150", completion: 72, eligibility: "Qualified", incubation: "ACTIVE" },
  ];

  return (
    <div className="flex flex-col w-full bg-[#f5f7f8] min-h-screen">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-20 w-full shadow-sm">
        <div className="max-w-7xl mx-auto px-8 pt-8">
          <div className="flex items-center gap-4 mb-4">
            {onBack && (
              <button
                onClick={onBack}
                className="p-2 hover:bg-slate-100 rounded-lg"
              >
                ←
              </button>
            )}

            <GroupHeader
              name={groupData.name}
              tier={groupData.tier}
              membersCount={groupData.members}
              maxMembers={groupData.maxMembers}
              status={groupData.status}
              isOwnGroup={isOwnGroup}
            />
          </div>

          {/* Router Navbar */}
          <div className="mt-8 flex gap-8 border-b border-slate-100">
            <NavLink to="members" className={({ isActive }) =>
              `pb-4 text-sm font-bold border-b-[3px] ${
                isActive
                  ? "border-[#003366] text-[#003366]"
                  : "border-transparent text-slate-400 hover:text-slate-600"
              }`
            }>
              Members
            </NavLink>

            <NavLink to="phases" className={({ isActive }) =>
              `pb-4 text-sm font-bold border-b-[3px] ${
                isActive
                  ? "border-[#003366] text-[#003366]"
                  : "border-transparent text-slate-400 hover:text-slate-600"
              }`
            }>
              Phases & Eligibility
            </NavLink>

            {isOwnGroup && (
              <NavLink to="group-leader-board" className={({ isActive }) =>
                `pb-4 text-sm font-bold border-b-[3px] ${
                  isActive
                    ? "border-[#003366] text-[#003366]"
                    : "border-transparent text-slate-400 hover:text-slate-600"
                }`
              }>
                Group Leaderboard
              </NavLink>
            )}
          </div>
        </div>
      </header>

      <main className="w-full">
        {/* ✅ Pass data to child routes */}
        <Outlet context={{ members: ALL_TEAM_MEMBERS }} />
      </main>
    </div>
  );
};
