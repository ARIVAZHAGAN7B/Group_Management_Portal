import React, { useMemo } from "react";
import { GroupRankingTable, type GroupEntry } from "../components/Rankings/GroupRankingTable";
import { Podium } from "../components/Rankings/Podium";
import { useAxios } from "../hooks/useAxios";

interface Props {
  search: string;
  tier: string;
}

interface ApiResponse {
  status: string;
  data: {
    rankings: GroupEntry[];
  };
}

export const GroupRanking: React.FC<Props> = ({ search, tier }) => {
  const { data, loading, error } = useAxios<ApiResponse>({
    url: '/rankings/groups',
    method: 'GET'
  });

  const MOCK_GROUPS = useMemo(() => data?.data.rankings || [], [data?.data.rankings]);

  const allFilteredData = useMemo(() => {
    return MOCK_GROUPS.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.leaderName.toLowerCase().includes(search.toLowerCase());

      const matchesTier = tier === "All" || item.tier === tier;

      return matchesSearch && matchesTier;
    });
  }, [MOCK_GROUPS, search, tier]);

  const podiumData = useMemo(() => {
    return allFilteredData.slice(0, 3).map(g => ({
      rank: g.rank,
      name: g.name,
      rollNumber: g.leaderRollNumber,
      groupName: `Leader: ${g.leaderName}`,
      tier: g.tier,
      points: g.avgPoints,
    }));
  }, [allFilteredData]);

  const tableData = useMemo(() => allFilteredData.slice(3), [allFilteredData]);

  // Find current user group in the FULL mock list so it's always shown in the mini-card
  const currentUserGroup = useMemo(() => MOCK_GROUPS.find(g => g.isCurrentUserGroup), [MOCK_GROUPS]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#003366]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-center">
        Error loading rankings: {error.message}
      </div>
    );
  }


  return (
    <>
      {podiumData.length > 0 && (
        <Podium
          topThree={podiumData}
          userRank={currentUserGroup?.rank || 0}
          userPoints={currentUserGroup?.avgPoints.toLocaleString() || "0"}
        />
      )}

      <GroupRankingTable data={tableData} />

      {allFilteredData.length === 0 && (
        <div className="py-12 text-center bg-white rounded-xl border border-dashed border-slate-300">
          <p className="text-slate-500 text-sm font-medium">
            No results matching your search.
          </p>
        </div>
      )}
    </>
  );
};
