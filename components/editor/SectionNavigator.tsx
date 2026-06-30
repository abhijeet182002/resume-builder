'use client';
import { cn } from '@/lib/utils';
import { useResumeStore } from '@/store/resumeStore';
import { RESUME_SECTIONS } from '@/lib/constants';
import {
  User, FileText, GraduationCap, Zap, FolderGit2, Briefcase, Award,
} from 'lucide-react';
import type { SectionKey } from '@/types/resume';

const ICON_MAP: Record<string, React.ElementType> = {
  User, FileText, GraduationCap, Zap, FolderGit2, Briefcase, Award,
};

interface SectionNavigatorProps {
  horizontal?: boolean;
}

export function SectionNavigator({ horizontal = false }: SectionNavigatorProps) {
  const { activeSection, setActiveSection } = useResumeStore();

  return (
    <div className={cn(horizontal ? 'w-full text-text-primary' : 'relative flex flex-1 flex-col overflow-y-auto py-4 text-text-primary')}>
      <div className={cn(horizontal ? '' : 'px-4')}>
          <p className="text-[10px] uppercase tracking-[0.16em] font-extrabold mb-3 text-text-secondary">
            Resume Sections
          </p>
          <nav className={cn(horizontal ? 'flex gap-2 overflow-x-auto pb-1' : 'space-y-0.5')}>
            {RESUME_SECTIONS.map(({ key, label, icon }) => {
              const Icon = ICON_MAP[icon];
              const isActive = activeSection === key;
              return (
                <button
  key={key}
  onClick={() => setActiveSection(key as SectionKey)}
  className={cn(
    "flex items-center gap-2 rounded-xl px-3 py-2.5 text-left text-sm font-semibold transition-all duration-300",
    horizontal ? "shrink-0" : "w-full",

    isActive
      ? "bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg scale-[1.02]"
      : horizontal
      ? "bg-white text-slate-600 hover:bg-violet-50 hover:text-violet-600"
      : "text-slate-600 hover:bg-violet-50 hover:text-violet-600"
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
