
import React, { useState } from 'react';

interface PatternInputProps {
  value: string;
  onChange: (value: string) => void;
  disabled: boolean;
}

export const PatternInput: React.FC<PatternInputProps> = ({ value, onChange, disabled }) => {
  const [localValue, setLocalValue] = useState(value);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    // Allow only numbers, commas, and spaces
    if (/^[0-9, ]*$/.test(newValue)) {
      setLocalValue(newValue);
      onChange(newValue);
    }
  };

  return (
    <div className="flex-grow w-full">
      <label htmlFor="pattern-input" className="sr-only">Neural Pattern</label>
      <input
        id="pattern-input"
        type="text"
        value={localValue}
        onChange={handleChange}
        disabled={disabled}
        placeholder="e.g., 1, 0, 1, 1"
        className="w-full bg-brand-bg/50 border-2 border-brand-primary/40 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/50 text-brand-text font-mono text-lg rounded-md px-4 py-2.5 outline-none transition-all duration-300 disabled:opacity-50"
      />
    </div>
  );
};
