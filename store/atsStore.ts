import { create } from 'zustand';
import type { ATSSuggestion } from '@/types/ats';
import { sampleATSSuggestions } from '@/lib/sampleData';

interface ATSStore {
  score: number;
  keywordMatch: number;
  sectionCompleteness: number;
  formattingScore: number;
  matchedKeywords: string[];
  missingKeywords: string[];
  suggestions: ATSSuggestion[];
  isAnalyzing: boolean;
  runAnalysis: () => void;
}

export const useATSStore = create<ATSStore>((set) => ({
  score: 74,
  keywordMatch: 62,
  sectionCompleteness: 88,
  formattingScore: 91,
  matchedKeywords: ['React', 'Node.js', 'TypeScript', 'REST API', 'Git', 'Agile'],
  missingKeywords: ['Docker', 'Kubernetes', 'CI/CD', 'System Design'],
  suggestions: sampleATSSuggestions,
  isAnalyzing: false,

  runAnalysis: () => {
    set({ isAnalyzing: true });
    setTimeout(() => {
      set({
        isAnalyzing: false,
        score: 74,
        keywordMatch: 62,
        sectionCompleteness: 88,
        formattingScore: 91,
      });
    }, 1500);
  },
}));
