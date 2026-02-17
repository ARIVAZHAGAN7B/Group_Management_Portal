
import React from 'react';
import { GroupLeaderboardCard } from './GroupLeaderboardCard';
import { GroupLeaderboardTable } from './GroupLeaderboardTable';

// Use standard icons for internal labels
import StarIconMui from "@mui/icons-material/Star";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import InsightsIcon from "@mui/icons-material/Insights";

export const GroupLeaderboard: React.FC = () => {
  // Mock data for the leaderboard - expanded to test pagination
  const leaderboardData = [
    { id: 1, name: 'Jamie Ortiz', points: '2,450', completion: 96, eligibility: 'Qualified', rank: 1 },
    { id: 2, name: 'Alex Chen', points: '2,120', completion: 88, eligibility: 'Qualified', rank: 2 },
    { id: 3, name: 'Sarah Miller', points: '1,980', completion: 82, eligibility: 'Pending', rank: 3 },
    { id: 4, name: 'Alex Johnson', points: '1,840', completion: 78, eligibility: 'Qualified', rank: 4, isCurrentUser: true },
    { id: 5, name: 'David Blake', points: '1,650', completion: 70, eligibility: 'At Risk', rank: 5 },
    { id: 6, name: 'Emily Watson', points: '1,580', completion: 68, eligibility: 'Qualified', rank: 6 },
    { id: 7, name: 'Michael Brown', points: '1,510', completion: 65, eligibility: 'Qualified', rank: 7 },
    { id: 8, name: 'Jessica Davis', points: '1,420', completion: 62, eligibility: 'Pending', rank: 8 },
    { id: 9, name: 'Chris Wilson', points: '1,380', completion: 59, eligibility: 'Qualified', rank: 9 },
    { id: 10, name: 'Amanda Taylor', points: '1,290', completion: 55, eligibility: 'At Risk', rank: 10 },
    { id: 11, name: 'Robert Garcia', points: '1,210', completion: 50, eligibility: 'At Risk', rank: 11 },
    { id: 12, name: 'Maria Martinez', points: '1,150', completion: 45, eligibility: 'At Risk', rank: 12 },
  ];

  const stats = [
    {
      label: 'Your Current Rank',
      value: '#4',
      icon: <EmojiEventsIcon />,
      trend: { value: '1 pos', isUp: true },
      bgColor: 'bg-blue-50',
      iconColor: 'text-[#003366]'
    },
    {
      label: 'Highest Contributor',
      value: 'Jamie Ortiz',
      icon: <StarIconMui />,
      bgColor: 'bg-amber-50',
      iconColor: 'text-amber-600'
    },
    {
      label: 'Group Average Completion',
      value: '78%',
      icon: <InsightsIcon />,
      trend: { value: '2%', isUp: true },
      bgColor: 'bg-indigo-50',
      iconColor: 'text-indigo-600'
    }
  ];

  return (
    <div className="flex flex-col gap-8">
      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <GroupLeaderboardCard key={index} {...stat} />
        ))}
      </div>

      {/* Leaderboard Table */}
      <GroupLeaderboardTable members={leaderboardData} />
    </div>
  );
};
