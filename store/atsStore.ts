import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { ATSResult } from '@/types/ats'

interface ATSState {
  result: ATSResult | null
  jobDescription: string
  isAnalyzing: boolean
  error: string | null
  setJobDescription: (jd: string) => void
  setResult: (r: any) => void
  setAnalyzing: (v: boolean) => void
  setError: (e: string | null) => void
  reset: () => void
}

export const useATSStore = create<ATSState>()(
  persist(
    (set) => ({
      result: null,
      jobDescription: '',
      isAnalyzing: false,
      error: null,

      setJobDescription: (jd) => set({ jobDescription: jd }),
      setResult: (r) => set((state) => {
        if (!r) return { result: null, isAnalyzing: false, error: null };

        let mappedResult = { ...r };

        // 1. If result.keywords is in API object format { matched, missing }, map to KeywordMatch[]
        if (r.keywords && !Array.isArray(r.keywords) && typeof r.keywords === 'object') {
          const matched = (r.keywords.matched || []).map((k: string) => ({
            keyword: k,
            found: true,
            frequency: 1,
          }));
          const missing = (r.keywords.missing || []).map((k: string) => ({
            keyword: k,
            found: false,
            frequency: 0,
          }));
          mappedResult.keywords = [...matched, ...missing];
        }

        // 2. If result.sections is present, map to result.completeness (SectionCompletenessItem[])
        if (r.sections && Array.isArray(r.sections)) {
          mappedResult.completeness = r.sections.map((s: any) => ({
            section: s.name,
            score: s.score,
            maxScore: s.maxScore,
            issues: s.issues || [],
          }));
        }

        // 3. Make sure formatting is present
        if (!mappedResult.formatting) {
          mappedResult.formatting = [];
        }

        return { result: mappedResult, isAnalyzing: false, error: null };
      }),
      setAnalyzing: (v) => set({ isAnalyzing: v }),
      setError: (e) => set({ error: e, isAnalyzing: false }),
      reset: () => set({ result: null, jobDescription: '', error: null }),
    }),
    { name: 'ats-store' }
  )
)