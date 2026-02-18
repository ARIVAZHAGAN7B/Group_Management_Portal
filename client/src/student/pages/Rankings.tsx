import React, { useState } from "react";
import { RankingsHeader } from "../components/Rankings/RankingsHeader";
import { RankingsFilter } from "../components/Rankings/RankingsFilter";

import { IndividualRanking } from "../rankings/InduvidualRanking";
import { LeaderRanking } from "../rankings/LeaderRanking";
import { GroupRanking } from "../rankings/GroupRanking";

type TabType = "individual" | "leader" | "group";

export const Rankings: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>("individual");
  const [search, setSearch] = useState("");
  const [tier, setTier] = useState("All");

  const renderDashboard = () => {
    switch (activeTab) {
      case "leader":
        return <LeaderRanking search={search} tier={tier} />;
      case "group":
        return <GroupRanking search={search} tier={tier} />;
      default:
        return <IndividualRanking search={search} tier={tier} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen pb-6 md:pb-12">
      {/* Constant Header */}
      <RankingsHeader search={search} onSearchChange={setSearch} />

      <main className="flex-1 bg-[#f5f7f8] pt-4 md:pt-12">
        {/* Constant Filter */}
        <RankingsFilter
          activeTab={activeTab}
          onTabChange={setActiveTab}
          tier={tier}
          onTierChange={setTier}
        />

        <div className="px-8 mt-[30px] max-w-7xl mx-auto w-full">
          {renderDashboard()}
        </div>
      </main>
    </div>
  );
};
