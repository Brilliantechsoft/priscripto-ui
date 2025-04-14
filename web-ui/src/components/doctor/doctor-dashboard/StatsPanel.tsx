import React from 'react';
import StatsCard from './StatsCard';
import { CalendarDays, Users, UserCheck2 } from 'lucide-react';

const StatsPanel = () => {
  return (
    <div className="space-y-6 w-64">
      <StatsCard
        label="Total Patient"
        value={978}
        icon={<Users />}
        percentage="15%"
        isIncrease={true}
      />
      <StatsCard
        label="Patients Today"
        value={80}
        icon={<UserCheck2 />}
        percentage="15%"
        isIncrease={false}
      />
      <StatsCard
        label="Appointments Today"
        value={50}
        icon={<CalendarDays />}
        percentage="20%"
        isIncrease={true}
      />
    </div>
  );
};

export default StatsPanel;
