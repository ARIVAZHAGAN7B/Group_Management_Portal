import React from "react";
import { useOutletContext } from "react-router-dom";
import { LeaderCard } from "../components/Group/LeaderCard";
import { MembersTable } from "../components/Group/MembersTable";

interface Member {
  id: number;
  name: string;
  rollNumber: string;
  role: string;
  totalBasePoints: string;
  phaseBasePoints: string;
  totalPoints: string;
  incubation: string;
  isLeader?: boolean;
}


interface ContextType {
  members: Member[];
}

export const MembersPage: React.FC = () => {
  const { members } = useOutletContext<ContextType>();

  return (
    <div className="max-w-7xl mx-auto px-8 py-8 space-y-8">
      <section>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-slate-900">
            Leadership Team
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {members.filter(m => m.isLeader).map((leader) => (
            <LeaderCard
              key={leader.id}
              name={leader.name}
              rollNumber={leader.rollNumber}
              role={leader.role}
            />
          ))}
        </div>

      </section>


      <section>
        <MembersTable members={members} />
      </section>
    </div>
  );
};
