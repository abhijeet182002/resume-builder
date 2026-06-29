'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter, useParams } from 'next/navigation';
import { ATSScoreOverview } from '@/components/ats/ATSScoreOverview';
import { FormattingCard } from '@/components/ats/FormattingCard';
import { KeywordMatchCard } from '@/components/ats/KeywordMatchCard';
import { SectionCompletenessCard } from '@/components/ats/SectionCompletenessCard';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Textarea } from '@/components/ui/Textarea';
import { Card } from '@/components/ui/Card';
import { useATSAnalysis } from '@/hooks/useATSAnalysis';
import { useATSStore } from '@/store/atsStore';
import { useResumeStore } from '@/store/resumeStore';
import { useAIAction } from '@/hooks/useAIAction';
import { useUIStore } from '@/store/uiStore';
import { useResumeSync } from '@/hooks/useResumeSync';
import { Sparkles, ArrowRight, Loader2 } from 'lucide-react';

export default function ATSPage() {
  const router = useRouter();
  const { resumeId } = useParams<{ resumeId: string }>();
  useResumeSync(resumeId);
  const { result, isAnalyzing, analyze } = useATSAnalysis();
  const [jobDescription, setJobDescription] = useState('');
  const resume = useResumeStore((s) => s.resume);
  const setResume = useResumeStore((s) => s.setResume);
  const setATSResult = useATSStore((s) => s.setResult);
  const setATSJobDescription = useATSStore((s) => s.setJobDescription);
  const { trigger: triggerAI } = useAIAction();
  const showToast = useUIStore((s) => s.showToast);
  const [fixingIndex, setFixingIndex] = useState<number | null>(null);

  useEffect(() => {
    if (!resumeId) return;
    fetch(`/api/resume/${resumeId}`)
      .then((r) => r.json())
      .then(({ resume }) => {
        if (resume) {
          setResume({
            id: resume.id,
            title: resume.title,
            personal: (resume.personal as any) ?? { fullName: '', email: '', phone: '', location: '', socials: {} },
            summary: resume.summary ?? '',
            experience: (resume.experience as any[]) ?? [],
            education: (resume.education as any[]) ?? [],
            skills: (resume.skills as any[]) ?? [],
            projects: (resume.projects as any[]) ?? [],
            certifications: (resume.certifications as any[]) ?? [],
            completionScore: resume.completionScore,
            status: resume.status,
          });
          const lastAnalysis = (resume as any).atsAnalyses?.[0];
          if (lastAnalysis) {
            setATSResult(lastAnalysis);
            setATSJobDescription(lastAnalysis.jobDescription || '');
            setJobDescription(lastAnalysis.jobDescription || '');
          }
        }
      });
  }, [resumeId, setResume, setATSResult, setATSJobDescription]);

  const suggestions = result?.suggestions ?? [];

  const handleRunAudit = async () => {
    await analyze(jobDescription);
  };

  const handleFixWithAI = async (suggestion: any, index: number) => {
    setFixingIndex(index);
    let actionType: 'enhance_bullet' | 'generate_summary' | 'suggest_skills' = 'enhance_bullet';

    if (suggestion.section === 'summary') {
      actionType = 'generate_summary';
    } else if (suggestion.section === 'skills') {
      actionType = 'suggest_skills';
    }

    const input = `Fix the following issue in my resume: "${suggestion.issue}". Recommendation: "${suggestion.fix}". Provide a professional and clean replacement.`;

    try {
      const res = await fetch('/api/ai/enhance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: actionType,
          input,
          context: {
            name: resume?.personal?.fullName || '',
            role: resume?.experience?.[0]?.role || '',
            skills: (resume?.skills as any[] || []).map(s => typeof s === 'string' ? s : (s as any).skills?.join(', ') || '').join(', '),
          },
        }),
      });

      if (!res.ok) throw new Error('Failed to fetch from AI');

      const reader = res.body?.getReader();
      if (!reader) throw new Error('No reader found');

      const decoder = new TextDecoder();
      let done = false;
      let text = '';

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        if (value) {
          text += decoder.decode(value, { stream: !done });
        }
      }

      const resumeStore = useResumeStore.getState();
      const sectionLower = suggestion.section.toLowerCase();

      if (sectionLower.includes('summary')) {
        resumeStore.updateSummary(text);
        showToast('Summary updated successfully!', 'success');
      } else if (sectionLower.includes('skills')) {
        const skillsList = text.split(/,|\n/).map((s) => s.trim()).filter(Boolean);
        const currentSkills = resumeStore.resume.skills ?? [];
        const updated = Array.from(new Set([...currentSkills, ...skillsList]));
        resumeStore.updateSection('skills', updated);
        showToast(`Added ${skillsList.length} skills successfully!`, 'success');
      } else if (sectionLower.includes('project')) {
        let proj = resumeStore.resume.projects[0];
        if (!proj) {
          resumeStore.addProject();
          proj = useResumeStore.getState().resume.projects[0];
        }
        if (proj) {
          resumeStore.updateProject(proj.id, { description: text });
          showToast('Project description updated successfully!', 'success');
        } else {
          showToast('Could not find a project to update.', 'error');
        }
      } else if (sectionLower.includes('education') || sectionLower.includes('coursework')) {
        let edu = resumeStore.resume.education[0];
        if (!edu) {
          resumeStore.addEducation();
          edu = useResumeStore.getState().resume.education[0];
        }
        if (edu) {
          resumeStore.updateEducation(edu.id, { highlights: text });
          showToast('Education highlights updated successfully!', 'success');
        } else {
          showToast('Could not find an education entry to update.', 'error');
        }
      } else if (sectionLower.includes('cert')) {
        const certNames = text.split(/,|\n/).map((c) => c.replace(/^\d+\.\s*/, '').replace(/^[-*•]\s*/, '').trim()).filter(Boolean);
        const currentCerts = resumeStore.resume.certifications ?? [];
        const newCerts = certNames.map(name => ({
          id: crypto.randomUUID(),
          name,
          issuer: 'Suggested Organization',
          date: new Date().getFullYear().toString(),
        }));
        resumeStore.updateSection('certifications', [...currentCerts, ...newCerts]);
        showToast(`Added ${newCerts.length} suggested certifications successfully!`, 'success');
      } else {
        let exp = resumeStore.resume.experience[0];
        if (!exp) {
          resumeStore.addExperience();
          exp = useResumeStore.getState().resume.experience[0];
        }
        if (exp) {
          const nextBullets = [...exp.bullets];
          nextBullets[0] = text;
          resumeStore.updateExperience(exp.id, { bullets: nextBullets });
          showToast('Experience bullet updated successfully!', 'success');
        } else {
          showToast('Could not find experience entry to update.', 'error');
        }
      }

      // Remove this suggestion from the ATS suggestions list
      const atsStore = useATSStore.getState();
      if (atsStore.result) {
        const updatedSuggestions = atsStore.result.suggestions.filter((_, i) => i !== index);
        atsStore.setResult({
          ...atsStore.result,
          suggestions: updatedSuggestions,
        });
      }
    } catch (err) {
      console.error(err);
      showToast('AI Auto-Fix failed. Please try again.', 'error');
    } finally {
      setFixingIndex(null);
    }
  };

  return (
    <div className="relative mx-auto max-w-7xl px-4 py-6 sm:px-6">
      {/* Background Glow */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-50 via-white to-indigo-50 blur-2xl opacity-70" />

      {/* JOB DESCRIPTION INPUT CARD */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <Card 
          className="p-5 border border-[#CFE0F7] bg-white/80 backdrop-blur-md rounded-2xl shadow-sm"
          header={<h2 className="text-base font-bold text-slate-800 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-blue-600" />
            ATS Audit against Job Description
          </h2>}
        >
          <div className="space-y-4">
            <Textarea
              label="Paste Job Description / Requirements"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the job description from the hiring portal (e.g. skills required, roles and responsibilities) to calculate keyword matching and section score suitability..."
              rows={5}
            />
            <div className="flex justify-end">
              <Button
                variant="primary"
                onClick={handleRunAudit}
                loading={isAnalyzing}
                disabled={!jobDescription.trim() || isAnalyzing}
                className="bg-blue-600 text-white font-semibold hover:bg-blue-700 rounded-xl"
              >
                Run Full ATS Audit
                <ArrowRight className="h-4 w-4 ml-1.5" />
              </Button>
            </div>
          </div>
        </Card>
      </motion.div>

      {result ? (
        <>
          {/* Score Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ATSScoreOverview />
          </motion.div>

          {/* Cards Grid */}
          <div className="mt-6 grid gap-5 lg:grid-cols-3">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="rounded-2xl border border-white/40 bg-white/60 backdrop-blur-xl shadow-lg p-4"
            >
              <KeywordMatchCard />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="rounded-2xl border border-white/40 bg-white/60 backdrop-blur-xl shadow-lg p-4"
            >
              <SectionCompletenessCard />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="rounded-2xl border border-white/40 bg-white/60 backdrop-blur-xl shadow-lg p-4"
            >
              <FormattingCard />
            </motion.div>
          </div>

          {/* Suggestions Section */}
          <motion.section
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-8 rounded-3xl border border-blue-100 bg-gradient-to-br from-blue-50 to-indigo-100 p-6 shadow-xl"
          >
            <div className="mb-5 flex items-center justify-between flex-wrap gap-3">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-gray-500">Action Plan</p>
                <h2 className="text-xl font-extrabold text-gray-800">Improvement Suggestions</h2>
              </div>
              <Badge variant="blue" className="text-sm px-3 py-1">
                {suggestions.length} fixes
              </Badge>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {suggestions.map((suggestion, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.08 }}
                  whileHover={{ scale: 1.03 }}
                  className="group rounded-2xl border border-white/50 bg-white/70 backdrop-blur-lg p-5 shadow-md transition-all"
                >
                  <div className="mb-3 flex items-center justify-between">
                    <h3 className="text-sm font-bold text-gray-800 capitalize">{suggestion.section} Issue</h3>
                    <Badge variant={suggestion.priority === 'high' ? 'amber' : suggestion.priority === 'medium' ? 'blue' : 'gray'}>
                      {suggestion.priority}
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-700 leading-relaxed font-bold mb-1">Issue: {suggestion.issue}</p>
                  <p className="text-xs text-gray-650 leading-relaxed mb-4">Fix: {suggestion.fix}</p>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      disabled={fixingIndex !== null}
                      onClick={() => handleFixWithAI(suggestion, index)}
                      className="flex-1 bg-amber-500 hover:bg-amber-600 text-white font-semibold flex items-center justify-center gap-1 rounded-xl disabled:opacity-75"
                    >
                      {fixingIndex === index ? (
                        <>
                          <Loader2 className="h-3.5 w-3.5 animate-spin" /> Fixing...
                        </>
                      ) : (
                        <>
                          <Sparkles className="h-3.5 w-3.5" /> Auto-Fix
                        </>
                      )}
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => router.push(`/resume/${resumeId}/editor`)}
                      className="flex-1 border border-slate-200 text-slate-700 hover:bg-slate-100 rounded-xl"
                    >
                      Fix Now →
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
        </>
      ) : (
        <div className="text-center py-16 border border-dashed rounded-[20px] bg-white/40 border-slate-300">
          <Sparkles className="h-10 w-10 text-slate-400 mx-auto mb-3 animate-bounce" />
          <h3 className="text-base font-bold text-slate-700">Audit your Resume against Jobs</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1.5 leading-relaxed">
            Enter the job specifications in the card above and click audit to get an detailed ATS score match.
          </p>
        </div>
      )}
    </div>
  );
}