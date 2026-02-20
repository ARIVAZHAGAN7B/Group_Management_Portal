
const MOCK_INDIVIDUALS = [
    { rank: 1, name: "Sarah Jenkins", rollNumber: "2023CS001", groupName: "Group Alpha", tier: "A", points: 2450, role: "Captain" },
    { rank: 2, name: "Michael Chen", rollNumber: "2023CS005", groupName: "Group Delta", tier: "A", points: 2310, role: "Captain" },
    { rank: 3, name: "Elena Rodriguez", rollNumber: "2023CS012", groupName: "Group Beta", tier: "A", points: 2280, role: "Captain" },
    { rank: 4, name: "James Wilson", rollNumber: "2023BI045", groupName: "Group Gamma", tier: "B", points: 2150, role: "Vice-Captain" },
    { rank: 5, name: "Sana Patel", rollNumber: "2023ME089", groupName: "Group Alpha", tier: "B", points: 2090, role: "Lead Researcher" },
    { rank: 6, name: "Robert Fox", rollNumber: "2023CS034", groupName: "Group Zeta", tier: "B", points: 1950, role: "Member" },
    { rank: 7, name: "Esther Howard", rollNumber: "2023EE012", groupName: "Group Delta", tier: "C", points: 1820, role: "Member" },
    { rank: 8, name: "Jenny Wilson", rollNumber: "2023BI011", groupName: "Group Epsilon", tier: "C", points: 1750, role: "Member" },
    { rank: 9, name: "Marcus Aurelius", rollNumber: "2023HS001", groupName: "Group Alpha", tier: "A", points: 1680, role: "Captain" },
    { rank: 10, name: "Julia Roberts", rollNumber: "2023CS022", groupName: "Group Beta", tier: "B", points: 1550, role: "Captain" },
    { rank: 11, name: "David Miller", rollNumber: "2023EE045", groupName: "Group Gamma", tier: "C", points: 1420, role: "Member" },
    { rank: 12, name: "Sophia Garcia", rollNumber: "2023ME011", groupName: "Group Delta", tier: "D", points: 1350, role: "Member" },
    { rank: 13, name: "Liam Brown", rollNumber: "2023BI067", groupName: "Group Epsilon", tier: "D", points: 1280, role: "Member" },
    { rank: 42, name: "Alex Johnson", rollNumber: "2023CS101", groupName: "Group Epsilon", tier: "C", points: 1120, isCurrentUser: true, role: "Captain" }
];

const MOCK_LEADERS = [
    ...MOCK_INDIVIDUALS // For now, leaders data is the same as individuals in the mock
];

const MOCK_GROUPS = [
    { rank: 1, name: "Alpha Robotics Society", tier: "A", leaderName: "Sarah Chen", leaderRollNumber: "2023CS001", avgPoints: 1240, isCurrentUserGroup: true },
    { rank: 2, name: "Quantum Theory Soc.", tier: "B", leaderName: "Marcus Wright", leaderRollNumber: "2023CS042", avgPoints: 1180 },
    { rank: 3, name: "Neural Net Pioneers", tier: "B", leaderName: "Elena Petrova", leaderRollNumber: "2023CS012", avgPoints: 1150 },
    { rank: 4, name: "Cyber Defense Hub", tier: "C", leaderName: "Kevin Smith", leaderRollNumber: "2023IT045", avgPoints: 920 },
    { rank: 5, name: "Data Science Squad", tier: "A", leaderName: "Emily Davis", leaderRollNumber: "2023DS001", avgPoints: 890 },
    { rank: 6, name: "IoT Innovators", tier: "C", leaderName: "Robert Green", leaderRollNumber: "2023EE033", avgPoints: 850 },
    { rank: 7, name: "BioTech Vanguard", tier: "D", leaderName: "James Bond", leaderRollNumber: "2023BI007", avgPoints: 780 },
    { rank: 8, name: "Cloud Architects", tier: "D", leaderName: "Linda White", leaderRollNumber: "2023CS056", avgPoints: 720 }
];

exports.getIndividualRankings = async (req, res, next) => {
    try {
        res.status(200).json({
            status: 'success',
            results: MOCK_INDIVIDUALS.length,
            data: { rankings: MOCK_INDIVIDUALS }
        });
    } catch (error) {
        next(error);
    }
};

exports.getLeaderRankings = async (req, res, next) => {
    try {
        res.status(200).json({
            status: 'success',
            results: MOCK_LEADERS.length,
            data: { rankings: MOCK_LEADERS }
        });
    } catch (error) {
        next(error);
    }
};

exports.getGroupRankings = async (req, res, next) => {
    try {
        res.status(200).json({
            status: 'success',
            results: MOCK_GROUPS.length,
            data: { rankings: MOCK_GROUPS }
        });
    } catch (error) {
        next(error);
    }
};
