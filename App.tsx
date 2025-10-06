
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { PatternInput } from './components/PatternInput';
import { ResultsDisplay } from './components/ResultsDisplay';
import { SimulationResult } from './types';
import { generateAiAnalysis } from './services/geminiService';
import { ZapIcon } from './components/icons/ZapIcon';
import { LoadingSpinner } from './components/LoadingSpinner';

const App: React.FC = () => {
  const [pattern, setPattern] = useState<string>('1, 0, 1, 1');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<SimulationResult | null>(null);

  const handleRevive = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setResults(null);

    const binaryPattern = pattern.split(',').map(s => parseInt(s.trim())).filter(n => n === 0 || n === 1);
    if (binaryPattern.length < 2 || binaryPattern.length > 8) {
      setError("Pattern must contain between 2 and 8 bits (0s or 1s).");
      setIsLoading(false);
      return;
    }

    // Simulate Python script output
    const fidelity = 0.85 + Math.random() * 0.14; // Between 0.85 and 0.99
    
    const generateCounts = (p: number[]) => {
      const counts: { [key: string]: number } = {};
      const totalShots = 1024;
      let remainingShots = totalShots;
      
      const numEntries = 2 + Math.floor(Math.random() * (p.length / 2));
      for (let i = 0; i < numEntries; i++) {
        const key = p.map(bit => Math.random() > 0.3 ? bit : 1 - bit).join('');
        if (i === numEntries - 1) {
            counts[key] = remainingShots;
        } else {
            const shots = Math.floor((remainingShots / 2) * (Math.random() + 0.5));
            counts[key] = shots;
            remainingShots -= shots;
        }
      }
      return counts;
    };

    const counts = generateCounts(binaryPattern);

    try {
      const analysis = await generateAiAnalysis(binaryPattern, fidelity, counts);
      setResults({
        fidelity,
        counts: Object.entries(counts).map(([name, value]) => ({ name, value })),
        analysis,
      });
    } catch (e) {
      console.error(e);
      const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred with the AI service.';
      setError(`Failed to generate AI analysis: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  }, [pattern]);

  return (
    <div className="min-h-screen bg-brand-bg font-sans text-brand-text">
      <div className="relative isolate overflow-hidden">
        <div className="absolute top-0 left-0 -z-10 h-[30rem] w-full bg-gradient-to-b from-brand-secondary/20 via-transparent to-transparent opacity-50"></div>
        <div className="absolute top-1/2 left-1/2 -z-10 -translate-x-1/2 -translate-y-1/2 h-[30rem] w-[30rem] rounded-full bg-brand-primary/10 blur-3xl"></div>

        <main className="container mx-auto px-4 py-8">
          <Header />
          <div className="mt-12 max-w-3xl mx-auto flex flex-col items-center gap-8">
            <p className="text-center text-brand-text-dim">
              Input a neural spike pattern (e.g., 1, 0, 1, 1) to simulate its revival through a Topological Tesla Neuromorphic quantum state.
            </p>
            <div className="w-full flex flex-col sm:flex-row items-center gap-4 bg-brand-surface/50 p-4 rounded-lg border border-brand-primary/20 backdrop-blur-sm">
              <PatternInput value={pattern} onChange={setPattern} disabled={isLoading} />
              <button
                onClick={handleRevive}
                disabled={isLoading}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-brand-primary text-brand-bg font-bold rounded-md shadow-lg shadow-brand-primary/30 hover:bg-white hover:shadow-glow-primary transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ZapIcon className="w-5 h-5" />
                <span>{isLoading ? 'Reviving...' : 'Revive'}</span>
              </button>
            </div>
            
            {isLoading && <LoadingSpinner />}
            
            {error && (
              <div className="mt-4 p-4 w-full bg-red-900/50 border border-red-500 text-red-300 rounded-lg">
                <p className="font-mono text-sm">{`// ERROR: ${error}`}</p>
              </div>
            )}

            {results && !isLoading && <ResultsDisplay results={results} />}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
