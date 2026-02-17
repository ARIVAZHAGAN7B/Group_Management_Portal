import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

/* Core Pages */
import { StudentDashboard } from './pages/StudentDashboard';
import { AllGroups } from './pages/AllGroups';
import { EventTeams } from './pages/EventTeams';
import { MyGroupView } from './MyGroupView';
import { Rankings } from './pages/Rankings';

/* My Group Components */
import { MembersPage } from './myGroup/MemberPage';
import { GroupLeaderboardPage } from './myGroup/GroupLeaderboardPage';
import { PhasesPage } from './myGroup/PhasesPage';

// /* Events */
// import { AllEvents } from './events/AllEvents';
// import { EventAllTeams } from './events/EventAllTeams';
// import { EventMyTeams } from './events/EventMyTeams';
// import { EventTeamDetails } from './events/EventTeamDetails';
// import { MyEvents } from './events/MyEvents';
// import { MyEventAllTeams } from './events/MyEventAllTeams';
// import { MyEventMyTeams } from './events/MyEventMyTeams';

export const StudentRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Default Redirect */}
      <Route path="/" element={<Navigate to="dashboard" replace />} />

      {/* ================= Dashboard ================= */}
      <Route path="dashboard" element={<StudentDashboard />} />

      {/* ================= My Group ================= */}
      <Route path="mygroup" element={<MyGroupView isOwnGroup={true} />}>
        <Route path="members" element={<MembersPage />} />
        <Route path="phases" element={<PhasesPage />} />
        <Route path="group-leader-board" element={<GroupLeaderboardPage />} />
        <Route index element={<Navigate to="members" replace />} />
      </Route>

      {/* ================= All Groups ================= */}
      <Route path="all-groups">
        <Route index element={<AllGroups />} />
        <Route path=":groupId" element={<MyGroupView isOwnGroup={false} />}>
          <Route path="members" element={<MembersPage />} />
          <Route path="phases" element={<PhasesPage />} />
          <Route index element={<Navigate to="members" replace />} />
        </Route>
      </Route>

      {/* ================= Rankings ================= */}
      <Route path="rankings" element={<Rankings />} />

      {/* ================= Events ================= */}
      <Route path="events" element={<EventTeams />} />

      {/* 404 fallback */}
      <Route path="*" element={<Navigate to="dashboard" replace />} />
    </Routes>
  );
};
