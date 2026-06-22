export interface ATSSuggestion {
  id: string;
  priority: 'High' | 'Medium' | 'Low';
  title: string;
  description: string;
  section: string;
}

export interface ATSScore {
  score: number;
  keywordMatch: number;
  sectionCompleteness: number;
  formattingScore: number;
  matchedKeywords: string[];
  missingKeywords: string[];
  suggestions: ATSSuggestion[];
}
