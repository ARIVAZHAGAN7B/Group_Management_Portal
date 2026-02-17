
import React, { type ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  title?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = '', title }) => {
  return (
    <div className={`bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden ${className}`}>
      {title && (
        <div className="px-6 py-4 border-b border-slate-100 font-bold text-slate-800">
          {title}
        </div>
      )}
      <div className="p-4 sm:p-6">
        {children}
      </div>

    </div>
  );
};
