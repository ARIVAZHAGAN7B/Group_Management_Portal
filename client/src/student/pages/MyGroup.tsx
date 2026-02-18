import React, { useEffect } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { GroupHeader } from "../components/Group/GroupHeader";
import { useAxios } from "../hooks/useAxios";

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

interface ApiResponse {
  status: string;
  data: {
    group: GroupData;
    members: Member[];
  };
}

interface MyGroupViewProps {
  onBack?: () => void;
  isOwnGroup?: boolean;
}

export const MyGroupView: React.FC<MyGroupViewProps> = ({
  onBack,
  isOwnGroup = true,
}) => {
  const { data, loading, error } = useAxios<ApiResponse>({
    url: '/my-group',
    method: 'GET'
  });


  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#f5f7f8]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#003366]"></div>
      </div>
    );
  }

  if (error) {
    if (error.response?.status === 404) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] bg-[#f5f7f8] p-8 text-center">
          <div className="bg-white p-10 rounded-3xl shadow-xl border border-slate-100 max-w-md w-full space-y-6">
            <div className="size-20 bg-amber-50 rounded-full flex items-center justify-center mx-auto">
              <span className="text-4xl">🔍</span>
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-black text-[#003366]">No Group Found</h2>
              <p className="text-slate-500 font-medium">It looks like you haven't joined or been assigned to a group yet.</p>
            </div>
            <div className="pt-4">
              <button className="w-full bg-[#003366] text-white font-bold py-3 rounded-xl shadow-lg shadow-[#003366]/20 active:scale-95 transition-all">
                Find a Group
              </button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="flex items-center justify-center min-h-screen bg-[#f5f7f8]">
        <div className="bg-red-50 border border-red-200 text-red-600 font-bold p-6 rounded-2xl shadow-sm">
          Error loading group data: {error.message}
        </div>
      </div>
    );
  }

  const groupData = data?.data.group;
  const ALL_TEAM_MEMBERS = data?.data.members || [];

  if (!groupData) return null;

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
