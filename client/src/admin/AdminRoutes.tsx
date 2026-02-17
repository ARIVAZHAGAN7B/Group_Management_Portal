
import React, { useState } from 'react';
import { AdminDashboard } from './AdminDashboard';

export const AdminRoutes: React.FC = () => {
  const [currentTab] = useState('health');

  const renderContent = () => {
    switch (currentTab) {
      case 'health':
        return <AdminDashboard />;
      case 'users':
        return <div className="p-8 bg-white rounded-xl border border-slate-200">Global User Directory (Coming Soon)</div>;
      case 'settings':
        return <div className="p-8 bg-white rounded-xl border border-slate-200">Global System Settings (Coming Soon)</div>;
      default:
        return <AdminDashboard />;
    }
  };

  return (
    <div className="admin-module-container">
      {renderContent()}
    </div>
  );
};
