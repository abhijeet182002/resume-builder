'use client';

import { Maximize2, Minimize2, Save, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { AIDrawer } from '@/components/editor/AIDrawer';
import { CertificationsForm } from '@/components/editor/forms/CertificationsForm';
import { EducationForm } from '@/components/editor/forms/EducationForm';
import { ExperienceForm } from '@/components/editor/forms/ExperienceForm';
import { PersonalForm } from '@/components/editor/forms/PersonalForm';
import { ProjectsForm } from '@/components/editor/forms/ProjectsForm';
import { SkillsForm } from '@/components/editor/forms/SkillsForm';
import { SummaryForm } from '@/components/editor/forms/SummaryForm';
import { InsightPanel } from '@/components/editor/InsightPanel';
import { ResumePreview } from '@/components/editor/ResumePreview';
import { SectionNavigator } from '@/components/editor/SectionNavigator';
import { Button } from '@/components/ui/Button';
import { useAIAction } from '@/hooks/useAIAction';
import { useUIStore } from '@/store/uiStore';
import type { ResumeSection } from '@/types/resume';

function ActiveForm({ section }: { section: ResumeSection }) {
  const forms: Record<ResumeSection, React.ReactNode> = {
    personal: <PersonalForm />,
    summary: <SummaryForm />,
    education: <EducationForm />,
    skills: <SkillsForm />,
    projects: <ProjectsForm />,
    experience: <ExperienceForm />,
    certifications: <CertificationsForm />,
  };
  return forms[section];
}

export function EditorLayout() {
  const [zoom, setZoom] = useState(72);
  const [mobileView, setMobileView] = useState<'edit' | 'preview' | 'ats'>('preview');
  const [isPreviewWide, setIsPreviewWide] = useState(false);
  const activeSection = useUIStore((state) => state.activeSection);
  const { triggerAction } = useAIAction();
  const paperWidth = 794;
  const paperHeight = 1123;
  const scaledPaperWidth = Math.round((paperWidth * zoom) / 100);
  const scaledPaperHeight = Math.round((paperHeight * zoom) / 100);
  const toggleWidePreview = () => {
    setIsPreviewWide((current) => {
      const next = !current;
      setZoom(next ? 88 : 72);
      return next;
    });
  };

  return (
    <div className="h-[calc(100vh-56px)] overflow-hidden bg-[#EEF4FF] lg:flex">
      <div className="hidden w-[224px] shrink-0 bg-[#07111F] shadow-[18px_0_46px_rgba(3,7,18,0.26)] lg:flex lg:flex-col">
        <div className="border-b border-white/10 bg-white/[0.035] px-4 py-4">
          <input
            defaultValue="Arjun Sharma Resume"
            className="w-full rounded-md bg-transparent px-1 py-1 text-sm font-extrabold tracking-[-0.01em] text-white outline-none transition focus:bg-white/[0.06] focus:ring-1 focus:ring-primary-DEFAULT"
            aria-label="Resume name"
          />
          <p className="mt-1 px-1 text-[11px] font-medium text-cyan-100/55">Last saved just now</p>
        </div>
        <SectionNavigator />
        <div className="border-t border-white/10 p-3">
          <Button variant="ghost" size="sm" className="w-full bg-[#0B1A2E] text-cyan-50 hover:bg-[#122238] hover:text-white">
            <Save className="h-4 w-4" />
            Save Draft
          </Button>
        </div>
      </div>

      <div className="flex h-full min-w-0 flex-1 flex-col bg-[#EEF4FF]">
        <div className="flex h-14 shrink-0 items-center justify-between border-b border-white/70 bg-white/[0.88] px-3 backdrop-blur-xl">
          <div className="hidden items-center gap-1 rounded-[10px] border border-[#CFE0F7] bg-[#EAF3FF] p-1 lg:flex">
            {[60, 72, 88, 100].map((value) => (
              <button
                key={value}
                onClick={() => setZoom(value)}
                className={zoom === value ? 'rounded-md bg-primary-DEFAULT px-3 py-1.5 text-xs font-extrabold text-white shadow-sm' : 'rounded-md px-3 py-1.5 text-xs font-bold text-[#45607F] transition hover:bg-[#DDEBFF] hover:text-primary-DEFAULT'}
              >
                {value === 72 ? 'Fit' : `${value}%`}
              </button>
            ))}
          </div>
          <div className="flex w-full justify-center gap-1 rounded-[10px] border border-[#CFE0F7] bg-[#EAF3FF] p-1 lg:hidden">
            {(['edit', 'preview', 'ats'] as const).map((view) => (
              <button
                key={view}
                onClick={() => setMobileView(view)}
                className={mobileView === view ? 'rounded-md bg-primary-DEFAULT px-4 py-2 text-xs font-extrabold capitalize text-white shadow-sm' : 'rounded-md px-4 py-2 text-xs font-bold capitalize text-[#45607F]'}
              >
                {view}
              </button>
            ))}
          </div>
          <div className="hidden items-center gap-2 lg:flex">
            <button
              onClick={() => triggerAction('Generate Summary')}
              className="inline-flex items-center gap-2 rounded-lg bg-[#E7FBFF] px-3 py-2 text-xs font-extrabold text-[#06758A] shadow-sm transition hover:-translate-y-0.5 hover:bg-accent-cyan hover:text-white"
            >
              <Sparkles className="h-4 w-4" />
              AI Assistant
            </button>
            <span className="rounded-full bg-white px-3 py-1.5 text-xs font-bold text-[#45607F] shadow-sm">Page 1 of 1</span>
            <button
              onClick={toggleWidePreview}
              className="rounded-lg bg-[#EAF3FF] p-2 text-[#45607F] transition hover:bg-primary-DEFAULT hover:text-white"
              aria-label={isPreviewWide ? 'Exit wide preview' : 'Widen preview'}
              title={isPreviewWide ? 'Exit wide preview' : 'Widen preview'}
            >
              {isPreviewWide ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <div className={isPreviewWide ? 'min-h-0 flex-1 overflow-y-auto p-3 sm:p-4 lg:block' : 'min-h-0 flex-1 overflow-y-auto p-3 sm:p-4 lg:grid lg:grid-cols-[minmax(340px,430px)_minmax(420px,1fr)] lg:gap-4 xl:grid-cols-[minmax(340px,420px)_minmax(480px,1fr)]'}>
          <div className={mobileView === 'edit' ? 'block' : isPreviewWide ? 'hidden' : 'hidden lg:block'}>
            <div className="mb-4 rounded-[12px] border border-white/70 bg-white/95 p-4 shadow-card backdrop-blur-sm lg:hidden">
              <SectionNavigator horizontal />
            </div>
            <div className="rounded-[14px] border border-[#D7E4F7] bg-[#F7FAFF] p-4 shadow-[0_1px_2px_rgba(15,23,42,0.06),0_18px_42px_rgba(37,99,235,0.10)] sm:p-5">
              <div className="mb-4 flex items-center justify-between gap-3">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#647A9A]">Editing section</p>
                  <h2 className="mt-1 text-lg font-extrabold capitalize tracking-[-0.02em] text-[#10233F]">{activeSection}</h2>
                </div>
                <span className="rounded-full bg-[#EAF3FF] px-3 py-1 text-[11px] font-bold text-primary-DEFAULT">Live sync</span>
              </div>
              <ActiveForm section={activeSection} />
            </div>
          </div>

          <div className={mobileView === 'preview' ? 'block' : isPreviewWide ? 'block' : 'hidden lg:block'}>
            <div className="rounded-[18px] border border-[#CFE0F7] bg-[#DCEAFF] p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.70),0_22px_60px_rgba(37,99,235,0.16)] sm:p-5">
              <div className="mb-3 flex items-center justify-between gap-3">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#647A9A]">Resume preview</p>
                  <h3 className="text-sm font-extrabold text-[#10233F]">{isPreviewWide ? 'Wide A4 paper view' : 'A4 paper view'}</h3>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => triggerAction('Generate Summary')}
                    className="inline-flex items-center gap-2 rounded-full bg-[#E7FBFF] px-3 py-1.5 text-xs font-extrabold text-[#06758A] shadow-sm transition hover:bg-accent-cyan hover:text-white"
                  >
                    <Sparkles className="h-3.5 w-3.5" />
                    AI
                  </button>
                  <div className="rounded-full bg-white px-3 py-1 text-xs font-bold text-primary-DEFAULT shadow-sm">{zoom === 72 ? 'Fit to screen' : `${zoom}%`}</div>
                </div>
              </div>
              <div className={isPreviewWide ? 'max-h-[calc(100vh-174px)] overflow-auto rounded-[14px] bg-[#BFD7FF]/35 p-3 sm:p-6' : 'max-h-[calc(100vh-174px)] overflow-auto rounded-[14px] bg-[#BFD7FF]/35 p-3 sm:p-5'}>
                <div className="mx-auto" style={{ width: `${scaledPaperWidth}px`, height: `${scaledPaperHeight}px`, maxWidth: '100%' }}>
                  <div
                    className="resume-paper origin-top-left rounded-sm bg-white p-7 sm:p-8"
                    style={{
                      width: `${paperWidth}px`,
                      minHeight: `${paperHeight}px`,
                      transform: `scale(${zoom / 100})`,
                      transformOrigin: 'top left',
                    }}
                  >
                    <ResumePreview />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={mobileView === 'ats' ? 'block lg:hidden' : 'hidden'}>
            <InsightPanel />
          </div>
        </div>
      </div>

      <div className={isPreviewWide ? 'hidden' : 'hidden xl:block'}>
        <InsightPanel />
      </div>
      <AIDrawer />
    </div>
  );
}
