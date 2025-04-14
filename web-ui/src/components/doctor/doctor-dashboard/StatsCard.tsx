import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface StatsCardProps {
  label: string;
  value: number;
  icon: React.ReactNode;
  percentage: string;
  isIncrease: boolean;
}

const StatsCard: React.FC<StatsCardProps> = ({ label, value, icon, percentage, isIncrease }) => {
  return (
    <div className="flex items-center justify-between bg-white rounded-xl shadow-md p-4">
      <div>
        <h4 className="text-gray-600 text-sm">{label}</h4>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
        <p className={`text-sm flex items-center ${isIncrease ? 'text-green-500' : 'text-red-500'}`}>
          {isIncrease ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
          {percentage} From {isIncrease ? 'Last Week' : 'Yesterday'}
        </p>
      </div>
      <div className="text-4xl text-gray-400">{icon}</div>
    </div>
  );
};

export default StatsCard;
