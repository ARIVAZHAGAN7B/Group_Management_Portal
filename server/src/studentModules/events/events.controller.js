
// Mock data migrated from EventTeamsView.tsx
const MOCK_EVENTS = [
    { id: '#EVN-2024-001', title: 'Annual University Hackathon 2024', description: 'Join the biggest coding challenge of the year. Build innovative solutions.', status: 'Active', startDate: '2024-10-15', endDate: '2024-10-17', teamsCount: 42 },
    { id: '#EVN-2024-002', title: 'Inter-College Robotics Expo', description: 'A showcase of the latest in autonomous systems.', status: 'Upcoming', startDate: '2024-11-02', endDate: '2024-11-05', teamsCount: 18 },
    { id: '#EVN-2024-003', title: 'Sustainable Design Workshop', description: 'Collaborative workshop focused on eco-friendly urban planning.', status: 'Upcoming', startDate: '2024-11-20', endDate: '2024-11-21', teamsCount: 8 },
    { id: '#EVN-2024-004', title: 'AI Ethics Symposium', description: 'Discussion on the moral implications of artificial intelligence.', status: 'Active', startDate: '2024-10-25', endDate: '2024-10-26', teamsCount: 12 },
    { id: '#EVN-2024-005', title: 'Cyber Security Capture The Flag', description: 'Intense competition for security enthusiasts.', status: 'Upcoming', startDate: '2024-12-05', endDate: '2024-12-06', teamsCount: 30 },
    { id: '#EVN-2024-006', title: 'Data Science Summit', description: 'Deep dive into big data analytics and machine learning.', status: 'Upcoming', startDate: '2025-01-15', endDate: '2025-01-17', teamsCount: 25 },
    { id: '#EVN-2024-007', title: 'Blockchain Revolution Talk', description: 'Understanding the future of decentralized finance.', status: 'Active', startDate: '2024-10-10', endDate: '2024-10-11', teamsCount: 15 },
    { id: '#EVN-2024-008', title: 'UX/UI Design Sprint', description: 'Design thinking workshop for creative problem solving.', status: 'Upcoming', startDate: '2024-11-12', endDate: '2024-11-14', teamsCount: 20 },
    { id: '#EVN-2024-009', title: 'Mobile App Innovation Lab', description: 'Build and deploy your first native mobile application.', status: 'Completed', startDate: '2024-09-01', endDate: '2024-09-05', teamsCount: 14 },
    { id: '#EVN-2024-000', title: 'Fall Semester Chess Championship', description: 'The annual strategic battle for the title of Grandmaster.', status: 'Completed', startDate: '2024-09-10', endDate: '2024-09-12', teamsCount: 64 },
];

const MOCK_TEAMS = [
    { rank: 1, name: 'Alpha Coders', shortName: 'AC', leaderName: 'Jane Smith', currentSize: 4, maxSize: 6, status: 'Qualified' },
    { rank: 2, name: 'Beta Bytes', shortName: 'BB', leaderName: 'John Doe', currentSize: 6, maxSize: 6, status: 'Active' },
    { rank: 3, name: 'Gamma Ray', shortName: 'GR', leaderName: 'Alice Wong', currentSize: 3, maxSize: 6, status: 'Eliminated' },
    { rank: 4, name: 'Delta Force', shortName: 'DF', leaderName: 'Bob Miller', currentSize: 5, maxSize: 6, status: 'Active' },
    { rank: 5, name: 'Epsilon Team', shortName: 'ET', leaderName: 'Sarah Chen', currentSize: 6, maxSize: 6, status: 'Qualified' },
    { rank: 6, name: 'Zeta Squad', shortName: 'ZS', leaderName: 'Mike Ross', currentSize: 2, maxSize: 6, status: 'Active' },
    { rank: 7, name: 'Lambda Loop', shortName: 'LL', leaderName: 'Chris Evans', currentSize: 4, maxSize: 6, status: 'Active' },
    { rank: 8, name: 'Sigma Source', shortName: 'SS', leaderName: 'Tessa Violet', currentSize: 5, maxSize: 6, status: 'Qualified' },
];

exports.getAllEvents = async (req, res, next) => {
    try {
        res.status(200).json({
            status: 'success',
            results: MOCK_EVENTS.length,
            data: { events: MOCK_EVENTS }
        });
    } catch (error) {
        next(error);
    }
};

exports.getEventTeams = async (req, res, next) => {
    try {
        const { id } = req.params;
        // For now, return the same base teams with some randomized rank/status to mimic frontend logic
        const teams = MOCK_TEAMS.map((t, idx) => ({
            ...t,
            rank: idx + 1,
            currentSize: Math.floor(Math.random() * 5) + 1,
            status: Math.random() > 0.3 ? 'Active' : 'Qualified'
        }));

        res.status(200).json({
            status: 'success',
            results: teams.length,
            data: { teams }
        });
    } catch (error) {
        next(error);
    }
};
