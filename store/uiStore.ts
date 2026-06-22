import { create } from 'zustand';
import type { ResumeSection } from '@/types/resume';

interface UIStore {
  wizardStep: number;
  activeRightTab: 'ats' | 'suggestions' | 'keywords' | 'ai';
  activeSection: ResumeSection;
  isSidebarOpen: boolean;
  isAIDrawerOpen: boolean;
  activeModal: string | null;
  setWizardStep: (step: number) => void;
  setActiveRightTab: (tab: 'ats' | 'suggestions' | 'keywords' | 'ai') => void;
  setActiveSection: (section: ResumeSection) => void;
  toggleSidebar: () => void;
  toggleAIDrawer: () => void;
  openModal: (id: string) => void;
  closeModal: () => void;
}

export const useUIStore = create<UIStore>((set) => ({
  wizardStep: 1,
  activeRightTab: 'ats',
  activeSection: 'personal',
  isSidebarOpen: true,
  isAIDrawerOpen: false,
  activeModal: null,

  setWizardStep: (step) => set({ wizardStep: step }),
  setActiveRightTab: (tab) => set({ activeRightTab: tab }),
  setActiveSection: (section) => set({ activeSection: section }),
  toggleSidebar: () => set((s) => ({ isSidebarOpen: !s.isSidebarOpen })),
  toggleAIDrawer: () => set((s) => ({ isAIDrawerOpen: !s.isAIDrawerOpen })),
  openModal: (id) => set({ activeModal: id }),
  closeModal: () => set({ activeModal: null }),
}));
