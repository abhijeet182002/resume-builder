'use client';
import { cn } from '@/lib/utils';
import { useUIStore } from '@/store/uiStore';
import { RESUME_SECTIONS } from '@/lib/constants';
import {
  User, FileText, GraduationCap, Zap, FolderGit2, Briefcase, Award,
} from 'lucide-react';
import type { ResumeSection } from '@/types/resume';

const ICON_MAP: Record<string, React.ElementType> = {
  User, FileText, GraduationCap, Zap, FolderGit2, Briefcase, Award,
};

interface SectionNavigatorProps {
  horizontal?: boolean;
}

export function SectionNavigator({ horizontal = false }: SectionNavigatorProps) {
  const { activeSection, setActiveSection } = useUIStore();

  return (
    <div className={cn('text-white', horizontal ? 'w-full' : 'relative flex flex-1 flex-col overflow-y-auto py-4')}>
      <div className={cn(horizontal ? '' : 'px-4')}>
          <p className={cn('text-[10px] uppercase tracking-[0.16em] font-extrabold mb-3', horizontal ? 'text-[#647A9A]' : 'text-cyan-100/55')}>
            Resume Sections
          </p>
          <nav className={cn(horizontal ? 'flex gap-2 overflow-x-auto pb-1' : 'space-y-0.5')}>
            {RESUME_SECTIONS.map(({ key, label, icon }) => {
              const Icon = ICON_MAP[icon];
              const isActive = activeSection === key;
              return (
                <button
                  key={key}
                  onClick={() => setActiveSection(key as ResumeSection)}
                  className={cn(
                    'flex items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm font-bold transition-all duration-200',
                    horizontal ? 'shrink-0' : 'w-full',
                    isActive
                      ? 'bg-gradient-to-r from-primary-DEFAULT to-accent-cyan text-blue-700 shadow-[0_10px_24px_rgba(37,99,235,0.24)]'
                      : horizontal
                        ? 'bg-[#EAF3FF] text-[#45607F] hover:bg-[#DDEBFF] hover:text-primary-DEFAULT'
                        : 'text-slate-400 hover:bg-[#122238] hover:text-cyan-50 hover:translate-x-0.5'
                  )}
                >
                  {Icon && <Icon className="h-4 w-4 shrink-0" />}
                  <span>{label}</span>
                </button>
              );
            })}
          </nav>
      </div>
    </div>
  );
}
