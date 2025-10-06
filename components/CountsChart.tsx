
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { CountData } from '../types';

interface CountsChartProps {
  data: CountData[];
}

// Recharts is expected to be loaded from a global script
declare const Recharts: {
    BarChart: typeof BarChart;
    Bar: typeof Bar;
    XAxis: typeof XAxis;
    YAxis: typeof YAxis;
    Tooltip: typeof Tooltip;
    ResponsiveContainer: typeof ResponsiveContainer;
    CartesianGrid: typeof CartesianGrid;
};

export const CountsChart: React.FC<CountsChartProps> = ({ data }) => {
  if (typeof Recharts === 'undefined') {
    return <div className="text-red-500">Recharts library not loaded.</div>;
  }
    
  const { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } = Recharts;

  return (
    <div className="w-full h-40">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#ffffff1a" />
          <XAxis dataKey="name" tick={{ fill: '#a0a0a0', fontSize: 12 }} stroke="#a0a0a0" />
          <YAxis tick={{ fill: '#a0a0a0', fontSize: 12 }} stroke="#a0a0a0" />
          <Tooltip
            contentStyle={{
              backgroundColor: '#121829',
              borderColor: '#00f6ff',
              color: '#e0e0e0',
              borderRadius: '0.5rem'
            }}
            cursor={{ fill: 'rgba(0, 246, 255, 0.1)' }}
          />
          <Bar dataKey="value" fill="#00f6ff" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
