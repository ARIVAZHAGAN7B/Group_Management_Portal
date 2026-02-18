import React from "react";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import PersonIcon from "@mui/icons-material/Person";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import GroupsIcon from "@mui/icons-material/Groups";

type TabType = "individual" | "leader" | "group";

interface Props {
    activeTab: TabType;
    onTabChange: (tab: TabType) => void;
    tier: string;
    onTierChange: (tier: string) => void;
}

export const RankingsFilter: React.FC<Props> = ({
    activeTab,
    onTabChange,
    tier,
    onTierChange,
}) => {
    const tabs = [
        { id: "individual", label: "Individual", icon: <PersonIcon sx={{ fontSize: 18 }} /> },
        { id: "leader", label: "Leader", icon: <MilitaryTechIcon sx={{ fontSize: 18 }} /> },
        { id: "group", label: "Group", icon: <GroupsIcon sx={{ fontSize: 18 }} /> },
    ] as const;

    const tiers = ["All", "A", "B", "C","D"];

    return (
        <div className="bg-white border-b border-slate-200 sticky top-23 z-20">
            <div className="max-w-7xl mx-auto px-8 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                {/* Tabs */}
                <div className="flex bg-slate-100 p-1 rounded-xl w-fit">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => onTabChange(tab.id as TabType)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all duration-200 ${activeTab === tab.id
                                    ? "bg-white text-blue-900 shadow-sm shadow-blue-900/5 scale-[1.02]"
                                    : "text-slate-500 hover:text-slate-700 hover:bg-white/50"
                                }`}
                        >
                            {tab.icon}
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Tier Filter */}
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 text-amber-700 rounded-lg border border-amber-100">
                        <WorkspacePremiumIcon sx={{ fontSize: 16 }} />
                        <span className="text-xs font-black uppercase tracking-wider">Filter Tier</span>
                    </div>

                    <div className="flex gap-1.5">
                        {tiers.map((t) => (
                            <button
                                key={t}
                                onClick={() => onTierChange(t)}
                                className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all duration-200 border-2 ${tier === t
                                        ? "bg-blue-900 border-blue-900 text-white shadow-md shadow-blue-900/20 scale-110"
                                        : "bg-white border-slate-200 text-slate-400 hover:border-slate-300 hover:text-slate-600"
                                    }`}
                            >
                                {t}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
