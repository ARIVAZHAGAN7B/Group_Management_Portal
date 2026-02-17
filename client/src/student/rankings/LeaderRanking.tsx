import React, { useMemo } from "react";
import { RankingTable, type RankingEntry } from "../components/Rankings/RankingTable";
import { Podium } from "../components/Rankings/Podium";

interface Props {
  search: string;
  tier: string;
}

const MOCK_LEADERS: RankingEntry[] = [
  { rank: 1, name: "Sarah Jenkins", rollNumber: "2023CS001", groupName: "Group Alpha", tier: "A", points: 2450, role: "Captain" },
  { rank: 2, name: "Michael Chen", rollNumber: "2023CS005", groupName: "Group Delta", tier: "A", points: 2310, role: "Captain" },
  { rank: 3, name: "Elena Rodriguez", rollNumber: "2023CS012", groupName: "Group Beta", tier: "A", points: 2280, role: "Captain" },
  { rank: 4, name: "James Wilson", rollNumber: "2023BI045", groupName: "Group Gamma", tier: "B", points: 2150, role: "Vice-Captain" },
  { rank: 42, name: "Alex Johnson", rollNumber: "2023CS101", groupName: "Group Epsilon", tier: "C", points: 1120, isCurrentUser: true, role: "Captain" }
];


export const LeaderRanking: React.FC<Props> = ({ search, tier }) => {
  const filteredData = useMemo(() => {
    return MOCK_LEADERS.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.groupName.toLowerCase().includes(search.toLowerCase());

      const matchesTier = tier === "All" || item.tier === tier;

      const hideTopThree = search === "" && tier === "All";
      if (hideTopThree && item.rank <= 3) return false;

      return matchesSearch && matchesTier;
    });
  }, [search, tier]);

  return (
    <>
      {search === "" && tier === "All" && (
        <Podium
          topThree={MOCK_LEADERS.slice(0, 3)}
          userRank={42}
          userPoints="1,120"
        />
      )}

      <RankingTable
        data={filteredData}
        currentPage={1}
        pageSize={10}
        totalResults={filteredData.length}
        onPageChange={() => { }}
        isLeaderView
      />

      {filteredData.length === 0 && (
        <div className="py-12 text-center bg-white rounded-xl border border-dashed border-slate-300">
          <p className="text-slate-500 text-sm font-medium">
            No results matching your search.
          </p>
        </div>
      )}
    </>
  );
};
