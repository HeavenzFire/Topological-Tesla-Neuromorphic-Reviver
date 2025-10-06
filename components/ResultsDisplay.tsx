
import React from 'react';
import { SimulationResult } from '../types';
import { FidelityGauge } from './FidelityGauge';
import { CountsChart } from './CountsChart';

interface ResultsDisplayProps {
  results: SimulationResult;
}

const ResultCard: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="bg-brand-surface/50 border border-brand-primary/20 rounded-lg p-6 backdrop-blur-sm shadow-lg w-full">
    <h3 className="font-mono text-lg text-brand-primary border-b border-brand-primary/20 pb-2 mb-4">
      {`// ${title}`}
    </h3>
    {children}
  </div>
);

export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ results }) => {
  return (
    <div className="w-full max-w-3xl mx-auto mt-8 flex flex-col gap-6 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <ResultCard title="Revival Fidelity">
            <FidelityGauge fidelity={results.fidelity} />
          </ResultCard>
        </div>
        <div className="md:col-span-2">
          <ResultCard title="Quantum State Distribution">
            <CountsChart data={results.counts} />
          </ResultCard>
        </div>
      </div>
      <ResultCard title="AI Analysis Log">
        <p className="text-brand-text-dim leading-relaxed">{results.analysis}</p>
      </ResultCard>
    </div>
  );
};
