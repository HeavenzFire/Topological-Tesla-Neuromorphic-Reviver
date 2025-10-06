
import React from 'react';

interface FidelityGaugeProps {
  fidelity: number;
}

export const FidelityGauge: React.FC<FidelityGaugeProps> = ({ fidelity }) => {
  const percentage = Math.round(fidelity * 100);
  const strokeWidth = 10;
  const radius = 50 - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (fidelity * circumference);

  return (
    <div className="relative flex items-center justify-center h-40">
      <svg className="w-40 h-40 transform -rotate-90" viewBox="0 0 100 100">
        <circle
          className="text-brand-surface"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          cx="50"
          cy="50"
          r={radius}
          fill="transparent"
        />
        <circle
          className="text-brand-primary"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          cx="50"
          cy="50"
          r={radius}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          style={{ transition: 'stroke-dashoffset 0.8s ease-out' }}
        />
      </svg>
      <span className="absolute text-3xl font-mono text-brand-primary">
        {percentage}%
      </span>
    </div>
  );
};
