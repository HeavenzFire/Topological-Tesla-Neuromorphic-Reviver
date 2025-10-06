
import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="text-center">
      <h1 className="text-4xl sm:text-5xl font-bold text-brand-primary tracking-widest uppercase font-mono animate-pulse">
        TTNR Interface
      </h1>
      <p className="mt-2 text-lg text-brand-text-dim font-light">
        Topological Tesla Neuromorphic Reviver
      </p>
    </header>
  );
};
