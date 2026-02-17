
import React, { useState } from 'react';
import { FacultyDashboard } from './FacultyDashboard';

export const FacultyRoutes: React.FC = () => {
  const [currentTab] = useState('overview');

  const renderContent = () => {
    switch (currentTab) {
      case 'overview':
        return <FacultyDashboard />;
      case 'students':
        return <div className="p-8 bg-white rounded-xl border border-slate-200">Student Management List (Coming Soon)</div>;
      case 'grading':
        return <div className="p-8 bg-white rounded-xl border border-slate-200">Grading Interface (Coming Soon)</div>;
      default:
        return <FacultyDashboard />;
    }
  };

  return (
    <div className="faculty-module-container">
      {renderContent()}
    </div>
  );
};
