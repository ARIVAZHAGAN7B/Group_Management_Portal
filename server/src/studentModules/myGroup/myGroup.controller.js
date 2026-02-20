
// Mock data migrated from MyGroup.tsx
const GROUP_DATA = {
    name: "Project Zeta",
    tier: "Tier B",
    members: 10,
    maxMembers: 11,
    status: "Active",
};

const TEAM_MEMBERS = [
    { id: 101, name: "Alex Johnson", role: "Captain", points: "2,840", completion: 95, eligibility: "Qualified", incubation: "ACTIVE", isLeader: true },
    { id: 102, name: "Maya Sterling", role: "Vice-Captain", points: "2,420", completion: 88, eligibility: "Qualified", incubation: "ACTIVE", isLeader: true },
    { id: 103, name: "Liam Chen", role: "Strategist", points: "2,650", completion: 92, eligibility: "Qualified", incubation: "ACTIVE", isLeader: true },
    { id: 104, name: "Sarah Smyth", role: "Manager", points: "2,100", completion: 85, eligibility: "Qualified", incubation: "ACTIVE", isLeader: true },
    { id: 1, name: "Jordan Lee", role: "Research Analyst", points: "1,240", completion: 78, eligibility: "Qualified", incubation: "ACTIVE" },
    { id: 2, name: "Sam Rivera", role: "Frontend Lead", points: "980", completion: 45, eligibility: "At Risk", incubation: "ACTIVE" },
    { id: 3, name: "Taylor Kim", role: "Documentation", points: "1,100", completion: 82, eligibility: "Qualified", incubation: "NONE" },
    { id: 4, name: "Casey Wright", role: "QA Tester", points: "850", completion: 65, eligibility: "Qualified", incubation: "ACTIVE" },
    { id: 5, name: "Jamie Ortiz", role: "DevOps", points: "1,420", completion: 90, eligibility: "Qualified", incubation: "ACTIVE" },
    { id: 6, name: "Morgan Smith", role: "Backend Dev", points: "1,150", completion: 72, eligibility: "Qualified", incubation: "ACTIVE" },
];


exports.getGroupDetails = async (req, res, next) => {
    try {
        // In a real app, we'd query the DB for the group the user belongs to.
        // For this mock, we'll check if the authenticated user's roll number
        // matches one of our "known" active students.

        const currentUserRoll = req.user.rollNumber;

        // Define which students belong to this mock group
        const groupMembersRolls = [
            '2023CS101', // Alex Johnson
            '7376231CS116', // Arivazhagan
            '2023CS202', // Sarah Miller
            '2023CS303'  // Michael Brown
        ];

        if (!groupMembersRolls.includes(currentUserRoll)) {
            const error = new Error('You are not currently in any group');
            error.status = 404;
            throw error;
        }

        res.status(200).json({
            status: 'success',
            data: {
                group: GROUP_DATA,
                members: TEAM_MEMBERS
            }
        });
    } catch (error) {
        next(error);
    }
};
