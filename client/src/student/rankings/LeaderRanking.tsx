import React, { useMemo } from "react";
import { RankingTable, type RankingEntry } from "../components/Rankings/RankingTable";
import { Podium } from "../components/Rankings/Podium";
import { useAxios } from "../hooks/useAxios";

interface Props {
  search: string;
  tier: string;
}

interface ApiResponse {
  status: string;
  data: {
    rankings: RankingEntry[];
  };
}

export const LeaderRanking: React.FC<Props> = ({ search, tier }) => {
  const { data, loading, error } = useAxios<ApiResponse>({
    url: '/rankings/leaders',
    method: 'GET'
  });

  const MOCK_LEADERS = useMemo(() => data?.data.rankings || [], [data?.data.rankings]);

  const allFilteredData = useMemo(() => {
    return MOCK_LEADERS.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.groupName.toLowerCase().includes(search.toLowerCase());

      const matchesTier = tier === "All" || item.tier === tier;

      return matchesSearch && matchesTier;
    });
  }, [MOCK_LEADERS, search, tier]);

  const podiumData = useMemo(() => allFilteredData.slice(0, 3), [allFilteredData]);
  const tableData = useMemo(() => allFilteredData.slice(3), [allFilteredData]);

  // Find current user in the FULL mock list so it's always shown in the mini-card
  const currentUser = useMemo(() => MOCK_LEADERS.find(u => u.isCurrentUser), [MOCK_LEADERS]);

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
          userRank={currentUser?.rank || 0}
          userPoints={currentUser?.points.toLocaleString() || "0"}
        />
      )}

      <RankingTable
        data={tableData}
        currentPage={1}
        pageSize={10}
        totalResults={allFilteredData.length}
        onPageChange={() => { }}
        isLeaderView
      />

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
