'use client';

import {
  Maximize2,
  Minimize2,
  Save,
  Sparkles,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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
  return <>{forms[section]}</>;
}

export function EditorLayout() {
  const [zoom, setZoom] = useState(72);
  const [mobileView, setMobileView] = useState<'edit' | 'preview' | 'ats'>('preview');
  const [isPreviewWide, setIsPreviewWide] = useState(false);
  const [showForm, setShowForm] = useState(true);
  const [showATS, setShowATS] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  const activeSection = useUIStore((s) => s.activeSection);
  const { triggerAction } = useAIAction();

  const paperWidth = 794;

  // ✅ FIX hydration
  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth > 1024);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="h-[calc(100vh-56px)] flex overflow-hidden bg-gradient-to-br from-[#eef4ff] via-white to-[#e6f0ff] relative"
    >
      {/* SIDEBAR */}
      <aside className="hidden lg:flex w-[200px] flex-col bg-[#0B1220] text-white border-r">
        <div className="p-4 border-b">
          <input
            defaultValue="My Resume"
            className="w-full bg-transparent font-bold text-sm outline-none"
          />
          <p className="text-xs text-gray-400 mt-1">Auto saved</p>
        </div>

        <SectionNavigator />

        <div className="p-3 mt-auto">
          <Button className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
            <Save className="w-4 h-4 mr-2" />
            Save
          </Button>
        </div>
      </aside>

      {/* FORM TOGGLE */}
      <motion.button
        onClick={() => setShowForm((prev) => !prev)}
        whileTap={{ scale: 0.9 }}
        className="hidden lg:flex absolute z-30 top-1/2 -translate-y-1/2 left-[210px] bg-white shadow-lg border rounded-full p-2"
      >
        {showForm ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
      </motion.button>

      {/* MAIN */}
      <div className="flex flex-col flex-1 min-w-0">
        
        {/* HEADER */}
        <div className="flex h-14 items-center justify-between px-4 bg-white/70 backdrop-blur border-b">

          {/* Desktop Zoom */}
          <div className="hidden lg:flex gap-1">
            {[60, 72, 88, 100].map((v) => (
              <button
                key={v}
                onClick={() => setZoom(v)}
                className={`px-3 py-1 text-xs rounded ${
                  zoom === v ? 'bg-blue-600 text-white' : 'bg-gray-100'
                }`}
              >
                {v === 72 ? 'Fit' : `${v}%`}
              </button>
            ))}
          </div>

          {/* Mobile Tabs */}
          <div className="flex lg:hidden gap-2 mx-auto">
            {(['edit', 'preview', 'ats'] as const).map((view) => (
              <button
                key={view}
                onClick={() => setMobileView(view)}
                className={`px-3 py-1 text-xs rounded ${
                  mobileView === view
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200'
                }`}
              >
                {view}
              </button>
            ))}
          </div>

          {/* Actions */}
          <div className="hidden lg:flex gap-2">
            <button
              onClick={() => triggerAction('Generate Summary')}
              className="flex items-center gap-2 px-3 py-2 text-xs rounded bg-gradient-to-r from-cyan-400 to-blue-500 text-white"
            >
              <Sparkles className="w-4 h-4" />
              AI
            </button>

            <button
              onClick={() => setIsPreviewWide(!isPreviewWide)}
              className="p-2 bg-white rounded shadow"
            >
              {isPreviewWide ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
            </button>
          </div>
        </div>

        {/* BODY */}
        <div
          className={`flex-1 overflow-hidden p-4 ${
            showForm && !isPreviewWide
              ? 'grid lg:grid-cols-[380px_1fr] gap-4'
              : 'flex justify-center'
          }`}
        >
          {/* FORM */}
          <AnimatePresence>
            {showForm && !isPreviewWide && (
              <motion.div
                key="form"
                initial={{ x: -150, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -150, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 260, damping: 25 }}
                className="bg-white rounded-xl shadow p-5 overflow-auto w-full lg:w-[380px]"
              >
                <h2 className="font-bold mb-4 capitalize">
                  {activeSection}
                </h2>

                <ActiveForm section={activeSection} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* PREVIEW */}
          <motion.div layout className="bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl p-4 flex flex-col w-full">
            <div className="flex justify-between mb-2">
              <span className="text-sm font-semibold">Preview</span>
              <span className="text-xs">{zoom}%</span>
            </div>

            <div className="flex-1 overflow-auto flex justify-center">
              <motion.div
                layout
                style={{
                  width: paperWidth,
                  transform: `scale(${zoom / 100})`,
                  transformOrigin: 'top left',
                }}
                className="bg-white shadow-xl p-8"
              >
                <ResumePreview />
              </motion.div>
            </div>
          </motion.div>

          {/* ATS BUTTON */}
          {mobileView === 'ats' && (
            <motion.button
              onClick={() => setShowATS((prev) => !prev)}
              whileTap={{ scale: 0.9 }}
              className="lg:hidden fixed z-30 top-1/2 -translate-y-1/2 right-2 bg-white shadow-lg border rounded-full p-2"
            >
              {showATS ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
            </motion.button>
          )}

          {/* OVERLAY */}
          <AnimatePresence>
            {showATS && (
              <motion.div
                onClick={() => setShowATS(false)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/30 backdrop-blur-sm z-10 lg:hidden"
              />
            )}
          </AnimatePresence>

          {/* ATS PANEL */}
          <AnimatePresence>
            {mobileView === 'ats' && showATS && (
              <motion.div
                key="ats"
                initial={{ x: 120, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 120, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 260, damping: 25 }}
                className="lg:hidden fixed inset-y-0 right-0 w-[85%] max-w-sm bg-white rounded-l-xl shadow-xl p-4 z-20"
              >
                <InsightPanel />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* DESKTOP ATS */}
      {!isPreviewWide && (
        <div className="hidden xl:block w-[300px] bg-white border-l">
          <InsightPanel />
        </div>
      )}

      <AIDrawer />
    </motion.div>
  );
}