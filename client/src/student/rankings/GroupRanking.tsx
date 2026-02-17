import React, { useMemo } from "react";
import { GroupRankingTable, type GroupEntry } from "../components/Rankings/GroupRankingTable";
import { Podium } from "../components/Rankings/Podium";

interface Props {
  search: string;
  tier: string;
}

const MOCK_GROUPS: GroupEntry[] = [
  { rank: 1, name: "Alpha Robotics Society", tier: "A", leaderName: "Sarah Chen", leaderRollNumber: "2023CS001", avgPoints: 1240, isCurrentUserGroup: true },
  { rank: 2, name: "Quantum Theory Soc.", tier: "B", leaderName: "Marcus Wright", leaderRollNumber: "2023CS042", avgPoints: 1180 },
  { rank: 3, name: "Neural Net Pioneers", tier: "B", leaderName: "Elena Petrova", leaderRollNumber: "2023CS012", avgPoints: 1150 }
];


export const GroupRanking: React.FC<Props> = ({ search, tier }) => {
  const filteredData = useMemo(() => {
    return MOCK_GROUPS.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.leaderName.toLowerCase().includes(search.toLowerCase());

      const matchesTier = tier === "All" || item.tier === tier;

      const hideTopThree = search === "" && tier === "All";
      if (hideTopThree && item.rank <= 3) return false;

      return matchesSearch && matchesTier;
    });
  }, [search, tier]);

  const podiumData = useMemo(() => {
    return MOCK_GROUPS.slice(0, 3).map(g => ({
      rank: g.rank,
      name: g.name,
      rollNumber: g.leaderRollNumber,
      groupName: `Leader: ${g.leaderName}`,
      tier: g.tier,
      points: g.avgPoints,
    }));
  }, []);

  return (
    <>
      {search === "" && tier === "All" && (
        <Podium
          topThree={podiumData}
          userRank={1}
          userPoints="1,240"
        />
      )}

      <GroupRankingTable data={filteredData} />

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
