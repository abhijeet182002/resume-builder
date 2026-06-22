'use client';
import { useResumeStore } from '@/store/resumeStore';

export function useResumeSync() {
  const store = useResumeStore();
  return {
    personal: store.personal,
    education: store.education,
    skills: store.skills,
    projects: store.projects,
    experience: store.experience,
    certifications: store.certifications,
    summary: store.summary,
    completionPercent: store.completionPercent,
    lastUpdated: store.lastUpdated,
  };
}
