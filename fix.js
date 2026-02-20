const fs = require('fs');
const clientFiles = [
    'client/src/student/myGroup/PhasesPage.tsx',
    'client/src/student/events/TeamOverview.tsx',
    'client/src/student/events/TeamDetailView.tsx',
    'client/src/student/events/ParticularTeamTable.tsx',
    'client/src/student/events/EventTeamsTable.tsx',
    'client/src/student/events/EventStatsRecap.tsx',
    'client/src/student/events/EventDetailView.tsx',
    'client/src/student/events/EventCard.tsx',
    'client/src/student/components/Group/MembersTable.tsx',
    'client/src/student/components/Group/LeaderCard.tsx',
    'client/src/student/components/Group/GroupHeader.tsx',
    'client/src/student/components/Group/AllGroupsTable.tsx',
    'client/src/student/components/Group/AllGroupsHeader.tsx',
    'client/src/shared/components/Icons.tsx',
    'client/src/faculty/FacultyDashboard.tsx'
];
clientFiles.forEach(f => {
    if (fs.existsSync(f)) {
        let content = fs.readFileSync(f, 'utf8');
        content = content.replace(/Assets\/Icons/g, 'assets/Icons');
        fs.writeFileSync(f, content);
    }
});

const serverFiles = [
    'server/src/studentModules/rankings/rankings.routes.js',
    'server/src/studentModules/groups/groups.routes.js',
    'server/src/studentModules/events/events.routes.js'
];
serverFiles.forEach(f => {
    if (fs.existsSync(f)) {
        let content = fs.readFileSync(f, 'utf8');
        content = content.replace(/\.\.\/auth\/auth\.middleware/g, '../../sharedModules/auth/auth.middleware');
        fs.writeFileSync(f, content);
    }
});
console.log('Done replacement');
