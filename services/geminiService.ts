
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export const generateAiAnalysis = async (
  pattern: number[],
  fidelity: number,
  counts: { [key: string]: number }
): Promise<string> => {
  const patternString = `[${pattern.join(', ')}]`;
  const countsString = JSON.stringify(counts);
  const fidelityString = fidelity.toFixed(4);

  const prompt = `
    You are a quantum neuro-computational AI assistant for the 'Topological Tesla Neuromorphic Reviver' (TTNR) project. 
    A neural pattern \`${patternString}\` was submitted for revival. 
    The simulation resulted in a high-fidelity score of ${fidelityString} and the following quantum state distribution (revived counts): ${countsString}.
    
    Provide a brief, technical, and slightly dramatic analysis of the revival process. Your analysis should be a single paragraph.

    In your explanation, seamlessly integrate the following concepts:
    - Topological protection against decoherence
    - Majorana zero modes as robust information carriers
    - Tesla-resonant perturbation to energize the quantum state
    - Chiral edge modes for fault-tolerant state transfer
    
    The tone should be confident, scientific, and awe-inspiring, as if reporting a successful, groundbreaking experiment.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Gemini API call failed:", error);
    throw new Error("Failed to communicate with the AI analysis service.");
  }
};
