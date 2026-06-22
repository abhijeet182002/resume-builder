'use client';
import { useATSStore } from '@/store/atsStore';

export function useATSAnalysis() {
  const store = useATSStore();
  return {
    score: store.score,
    keywordMatch: store.keywordMatch,
    sectionCompleteness: store.sectionCompleteness,
    formattingScore: store.formattingScore,
    matchedKeywords: store.matchedKeywords,
    missingKeywords: store.missingKeywords,
    suggestions: store.suggestions,
    isAnalyzing: store.isAnalyzing,
    runAnalysis: store.runAnalysis,
  };
}
