import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { GroupHeader } from "./components/Group/GroupHeader";

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
  rollNumber: string;
  role: string;
  totalBasePoints: string;
  phaseBasePoints: string;
  totalPoints: string;
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
    { id: 101, name: "Alex Johnson", rollNumber: "2023CS101", role: "Captain", totalBasePoints: "1,500", phaseBasePoints: "1,200", totalPoints: "2,840", incubation: "ACTIVE", isLeader: true },
    { id: 102, name: "Maya Sterling", rollNumber: "2023CS102", role: "Vice-Captain", totalBasePoints: "1,400", phaseBasePoints: "1,100", totalPoints: "2,420", incubation: "ACTIVE", isLeader: true },
    { id: 103, name: "Liam Chen", rollNumber: "2023CS103", role: "Strategist", totalBasePoints: "1,450", phaseBasePoints: "1,150", totalPoints: "2,650", incubation: "ACTIVE", isLeader: true },
    { id: 104, name: "Sarah Smyth", rollNumber: "2023BI101", role: "Manager", totalBasePoints: "1,350", phaseBasePoints: "1,050", totalPoints: "2,100", incubation: "ACTIVE", isLeader: true },
    { id: 1, name: "Jordan Lee", rollNumber: "2023CS201", role: "Research Analyst", totalBasePoints: "1,100", phaseBasePoints: "850", totalPoints: "1,240", incubation: "ACTIVE" },
    { id: 2, name: "Sam Rivera", rollNumber: "2023CS202", role: "Frontend Lead", totalBasePoints: "900", phaseBasePoints: "600", totalPoints: "980", incubation: "ACTIVE" },
    { id: 3, name: "Taylor Kim", rollNumber: "2023CS203", role: "Documentation", totalBasePoints: "1,000", phaseBasePoints: "780", totalPoints: "1,100", incubation: "NONE" },
    { id: 4, name: "Casey Wright", rollNumber: "2023CS204", role: "QA Tester", totalBasePoints: "800", phaseBasePoints: "550", totalPoints: "850", incubation: "ACTIVE" },
    { id: 5, name: "Jamie Ortiz", rollNumber: "2023BI102", role: "DevOps", totalBasePoints: "1,200", phaseBasePoints: "920", totalPoints: "1,420", incubation: "ACTIVE" },
    { id: 6, name: "Morgan Smith", rollNumber: "2023BI103", role: "Backend Dev", totalBasePoints: "1,050", phaseBasePoints: "810", totalPoints: "1,150", incubation: "ACTIVE" },
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
              `pb-4 text-sm font-bold border-b-[3px] ${isActive
                ? "border-[#003366] text-[#003366]"
                : "border-transparent text-slate-400 hover:text-slate-600"
              }`
            }>
              Members
            </NavLink>

            <NavLink to="phases" className={({ isActive }) =>
              `pb-4 text-sm font-bold border-b-[3px] ${isActive
                ? "border-[#003366] text-[#003366]"
                : "border-transparent text-slate-400 hover:text-slate-600"
              }`
            }>
              Phases & Eligibility
            </NavLink>

            {isOwnGroup && (
              <NavLink to="group-leader-board" className={({ isActive }) =>
                `pb-4 text-sm font-bold border-b-[3px] ${isActive
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
