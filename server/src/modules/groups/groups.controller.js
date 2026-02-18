
// Mock data migrated from AllGroups.tsx
const GROUPS = [
    {
        id: 1,
        name: "Alpha Robotics Society",
        status: 'Active',
        tier: 'Tier A',
        leaderName: "Sarah Chen",
        leaderRank: 2,
        groupRank: 1,
        members: 11,
        maxMembers: 12,
    },
    {
        id: 2,
        name: "Quantum Theory Soc.",
        status: 'Active',
        tier: 'Tier B',
        leaderName: "Marcus Wright",
        leaderRank: 5,
        groupRank: 2,
        members: 10,
        maxMembers: 12,
    },
    {
        id: 3,
        name: "Neural Net Pioneers",
        status: 'Active',
        tier: 'Tier B',
        leaderName: "Elena Petrova",
        leaderRank: 7,
        groupRank: 3,
        members: 9,
        maxMembers: 12,
    },
    {
        id: 4,
        name: "Biotech Innovation Lab",
        status: 'Active',
        tier: 'Tier C',
        leaderName: "James Wilson",
        leaderRank: 12,
        groupRank: 4,
        members: 8,
        maxMembers: 12,
    },
    {
        id: 5,
        name: "Data Science Hub",
        status: 'Frozen',
        tier: 'Tier A',
        leaderName: "Lisa Anderson",
        leaderRank: 3,
        groupRank: 5,
        members: 7,
        maxMembers: 12,
    },
];

exports.getAllGroups = async (req, res, next) => {
    try {
        res.status(200).json({
            status: 'success',
            results: GROUPS.length,
            data: {
                groups: GROUPS
            }
        });
    } catch (error) {
        next(error);
    }
};
