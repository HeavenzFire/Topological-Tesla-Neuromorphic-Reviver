
export interface CountData {
  name: string;
  value: number;
}

export interface SimulationResult {
  fidelity: number;
  counts: CountData[];
  analysis: string;
}
