import { create } from 'zustand';
import type { PersonalDetails, Education, Project, Experience, Certification } from '@/types/resume';
import {
  samplePersonal,
  sampleEducation,
  sampleSkills,
  sampleProjects,
  sampleExperience,
  sampleCertifications,
  sampleSummary,
} from '@/lib/sampleData';
import { calculateCompletion } from '@/lib/resumeUtils';

interface ResumeStore {
  personal: PersonalDetails;
  education: Education[];
  skills: string[];
  projects: Project[];
  experience: Experience[];
  certifications: Certification[];
  summary: string;
  completionPercent: number;
  lastUpdated: string;
  updatePersonal: (data: PersonalDetails) => void;
  updateEducation: (data: Education[]) => void;
  updateSkills: (data: string[]) => void;
  updateProjects: (data: Project[]) => void;
  updateExperience: (data: Experience[]) => void;
  updateCertifications: (data: Certification[]) => void;
  updateSummary: (text: string) => void;
  calculateCompletion: () => void;
}

export const useResumeStore = create<ResumeStore>((set, get) => ({
  personal: samplePersonal,
  education: sampleEducation,
  skills: sampleSkills,
  projects: sampleProjects,
  experience: sampleExperience,
  certifications: sampleCertifications,
  summary: sampleSummary,
  completionPercent: 72,
  lastUpdated: '2 days ago',

  updatePersonal: (data) => {
    set({ personal: data, lastUpdated: 'Just now' });
    get().calculateCompletion();
  },
  updateEducation: (data) => {
    set({ education: data, lastUpdated: 'Just now' });
    get().calculateCompletion();
  },
  updateSkills: (data) => {
    set({ skills: data, lastUpdated: 'Just now' });
    get().calculateCompletion();
  },
  updateProjects: (data) => {
    set({ projects: data, lastUpdated: 'Just now' });
    get().calculateCompletion();
  },
  updateExperience: (data) => {
    set({ experience: data, lastUpdated: 'Just now' });
    get().calculateCompletion();
  },
  updateCertifications: (data) => {
    set({ certifications: data, lastUpdated: 'Just now' });
    get().calculateCompletion();
  },
  updateSummary: (text) => {
    set({ summary: text, lastUpdated: 'Just now' });
    get().calculateCompletion();
  },
  calculateCompletion: () => {
    const state = get();
    const pct = calculateCompletion({
      personal: state.personal,
      education: state.education,
      skills: state.skills,
      projects: state.projects,
      experience: state.experience,
      certifications: state.certifications,
      summary: state.summary,
    });
    set({ completionPercent: pct });
  },
}));
