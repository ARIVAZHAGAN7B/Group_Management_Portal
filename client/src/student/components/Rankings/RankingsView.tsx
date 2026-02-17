import React, { useState, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { RankingsHeader } from "./RankingsHeader";
import { RankingsFilter } from "./RankingsFilter";
import { RankingTable, type RankingEntry } from "./RankingTable";
import { GroupRankingTable, type GroupEntry } from "./GroupRankingTable";
import { Podium } from "./Podium";
import { StatsRanking } from "./StatsRanking";

import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import TrophyIcon from "@mui/icons-material/EmojiEvents";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import GroupsIcon from "@mui/icons-material/Groups";

type TabType = "individual" | "leader" | "group";

const MOCK_INDIVIDUALS: RankingEntry[] = [
  { rank: 1, name: "Sarah Jenkins", groupName: "Group Alpha", tier: "A", points: 2450, role: "Captain" },
  { rank: 2, name: "Michael Chen", groupName: "Group Delta", tier: "A", points: 2310, role: "Captain" },
  { rank: 3, name: "Elena Rodriguez", groupName: "Group Beta", tier: "A", points: 2280, role: "Captain" },
  { rank: 4, name: "James Wilson", groupName: "Group Gamma", tier: "B", points: 2150, role: "Vice-Captain" },
  { rank: 5, name: "Sana Patel", groupName: "Group Alpha", tier: "B", points: 2090, role: "Lead Researcher" },
  { rank: 6, name: "Robert Fox", groupName: "Group Zeta", tier: "B", points: 1950, role: "Member" },
  { rank: 7, name: "Esther Howard", groupName: "Group Delta", tier: "C", points: 1820, role: "Member" },
  { rank: 8, name: "Jenny Wilson", groupName: "Group Epsilon", tier: "C", points: 1750, role: "Member" },
  { rank: 9, name: "Marcus Aurelius", groupName: "Group Alpha", tier: "A", points: 1680, role: "Captain" },
  { rank: 10, name: "Julia Roberts", groupName: "Group Beta", tier: "B", points: 1550, role: "Captain" },
  { rank: 42, name: "Alex Johnson", groupName: "Group Epsilon", tier: "C", points: 1120, isCurrentUser: true, role: "Captain" }
];

const MOCK_GROUPS: GroupEntry[] = [
  { rank: 1, name: "Alpha Robotics Society", tier: "A", leaderName: "Sarah Chen", avgPoints: 1240, isCurrentUserGroup: true },
  { rank: 2, name: "Quantum Theory Soc.", tier: "B", leaderName: "Marcus Wright", avgPoints: 1180 },
  { rank: 3, name: "Neural Net Pioneers", tier: "B", leaderName: "Elena Petrova", avgPoints: 1150 },
  { rank: 4, name: "Cyber Defense Hub", tier: "C", leaderName: "Kevin Smith", avgPoints: 920 }
];

export const RankingsView: React.FC = () => {
  const navigate = useNavigate();
  const { type } = useParams();

  const activeTab: TabType =
    type === "leader" || type === "group" ? type : "individual";

  const [search, setSearch] = useState("");
  const [tier, setTier] = useState("All");

  const tableData = useMemo(() => {
    if (activeTab === "group") {
      return MOCK_GROUPS.filter((item) => {
        const matchesSearch =
          item.name.toLowerCase().includes(search.toLowerCase()) ||
          item.leaderName.toLowerCase().includes(search.toLowerCase());

        const matchesTier = tier === "All" || item.tier === tier;

        return matchesSearch && matchesTier;
      });
    }

    return MOCK_INDIVIDUALS.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.groupName.toLowerCase().includes(search.toLowerCase());

      const matchesTier = tier === "All" || item.tier === tier;

      const hideTopThree =
        activeTab === "individual" && search === "" && tier === "All";

      if (hideTopThree && item.rank <= 3) return false;

      return matchesSearch && matchesTier;
    });
  }, [activeTab, search, tier]);

  const stats = useMemo(() => {
    if (activeTab === "leader") {
      return [
        {
          label: "Total Leaders",
          value: "480",
          icon: <PersonSearchIcon />,
          iconBgColor: "bg-[#003366]/5",
          iconColor: "text-[#003366]"
        },
        {
          label: "Top Leader",
          value: MOCK_INDIVIDUALS[0].name.split(" ")[0],
          icon: <TrophyIcon />,
          iconBgColor: "bg-orange-50",
          iconColor: "text-orange-600"
        },
        {
          label: "Your Rank",
          value: "#42",
          icon: <WorkspacePremiumIcon />,
          iconBgColor: "bg-emerald-50",
          iconColor: "text-emerald-600"
        }
      ];
    }

    if (activeTab === "group") {
      return [
        {
          label: "Total Groups",
          value: "120",
          icon: <GroupsIcon />,
          iconBgColor: "bg-blue-50",
          iconColor: "text-blue-600"
        },
        {
          label: "Top Group",
          value: MOCK_GROUPS[0].name,
          icon: <TrophyIcon />,
          iconBgColor: "bg-amber-50",
          iconColor: "text-amber-600"
        },
        {
          label: "Grp Rank",
          value: "#01",
          icon: <WorkspacePremiumIcon />,
          iconBgColor: "bg-emerald-50",
          iconColor: "text-emerald-600"
        }
      ];
    }

    return [];
  }, [activeTab]);

  return (
    <div className="flex flex-col min-h-screen pb-6 md:pb-12">
      <RankingsHeader search={search} onSearchChange={setSearch} />

      <main className="flex-1 bg-[#f5f7f8] pt-4 md:pt-12">
        <RankingsFilter
          activeTab={activeTab}
          onTabChange={(tab: TabType) => navigate(`/rankings/${tab}`)}
          tier={tier}
          onTierChange={setTier}
        />

        <div className="px-8 max-w-7xl mx-auto w-full">
          {activeTab === "individual" && search === "" && tier === "All" && (
            <Podium
              topThree={MOCK_INDIVIDUALS.slice(0, 3)}
              userRank={42}
              userPoints="1,120"
            />
          )}

          {(activeTab === "leader" || activeTab === "group") && (
            <StatsRanking stats={stats} />
          )}

          {activeTab === "group" ? (
            <GroupRankingTable data={tableData as GroupEntry[]} />
          ) : (
            <RankingTable
              data={tableData as RankingEntry[]}
              currentPage={1}
              pageSize={10}
              totalResults={tableData.length}
              onPageChange={() => { }}
              isLeaderView={activeTab === "leader"}
            />
          )}

          {tableData.length === 0 && (
            <div className="py-12 md:py-20 text-center bg-white rounded-xl border border-dashed border-slate-300">
              <p className="text-slate-500 text-sm font-medium">
                No results matching your search.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};
