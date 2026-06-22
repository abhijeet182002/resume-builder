'use client';
import { useUIStore } from '@/store/uiStore';
import { useATSStore } from '@/store/atsStore';
import { useAIAction } from '@/hooks/useAIAction';
import { Tabs } from '@/components/ui/Tabs';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ScoreRing } from '@/components/ui/ScoreRing';
import { Sparkles, RefreshCw, Lightbulb, Wrench } from 'lucide-react';
import type { AIAction } from '@/store/aiStore';

const TAB_ITEMS = [
  { key: 'ats', label: 'ATS Score' },
  { key: 'suggestions', label: 'Suggestions' },
  { key: 'keywords', label: 'Keywords' },
  { key: 'ai', label: <span className="flex items-center gap-1"><Sparkles className="h-3 w-3" />AI</span> },
];

const AI_ACTIONS: AIAction[] = [
  'Improve Description',
  'Generate Summary',
  'Rewrite Experience',
  'Suggest Skills',
  'Tailor to Role',
];

export function InsightPanel() {
  const { activeRightTab, setActiveRightTab } = useUIStore();
  const ats = useATSStore();
  const { triggerAction } = useAIAction();

  return (
    <aside className="flex w-full shrink-0 flex-col rounded-[14px] border border-[#CFE0F7] bg-[#EAF3FF] shadow-[0_18px_42px_rgba(37,99,235,0.10)] xl:h-[calc(100vh-56px)] xl:w-[320px] xl:rounded-none xl:border-y-0 xl:border-r-0">
      <div className="shrink-0 border-b border-[#CFE0F7] bg-white/[0.72] backdrop-blur-xl">
        <Tabs
          items={TAB_ITEMS}
          activeKey={activeRightTab}
          onChange={(k) => setActiveRightTab(k as 'ats' | 'suggestions' | 'keywords' | 'ai')}
        />
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* ATS Tab */}
        {activeRightTab === 'ats' && (
          <>
            <div className="flex flex-col items-center rounded-[12px] border border-[#CFE0F7] bg-[#F7FAFF] p-4 shadow-card">
              <ScoreRing score={ats.score} max={100} size={100} strokeWidth={9} color="#2563EB" />
              <h3 className="mt-3 font-semibold text-text-primary text-sm">Good Match</h3>
              <p className="text-[11px] text-text-muted text-center mt-1">
                Fix 3 issues to push your score past 90+.
              </p>
              <Button
                variant="secondary"
                size="sm"
                className="mt-3 w-full bg-[#EAF3FF] text-[#10233F] hover:bg-primary-DEFAULT hover:text-white"
                loading={ats.isAnalyzing}
                onClick={ats.runAnalysis}
              >
                <RefreshCw className="h-3.5 w-3.5" />
                {ats.isAnalyzing ? 'Analyzing...' : 'Re-analyze'}
              </Button>
            </div>
            <div className="space-y-3 rounded-[12px] border border-[#CFE0F7] bg-[#F7FAFF] p-4 shadow-card">
              {[
                { label: 'Keyword Match', value: ats.keywordMatch, color: 'blue' as const },
                { label: 'Section Fill', value: ats.sectionCompleteness, color: 'green' as const },
                { label: 'Formatting', value: ats.formattingScore, color: 'cyan' as const },
              ].map(({ label, value, color }) => (
                <div key={label}>
                  <div className="flex justify-between mb-1.5">
                    <span className="text-xs text-text-muted font-medium">{label}</span>
                    <span className="text-xs font-bold text-primary-DEFAULT">{value}%</span>
                  </div>
                  <ProgressBar value={value} color={color} />
                </div>
              ))}
            </div>
          </>
        )}

        {/* Suggestions Tab */}
        {activeRightTab === 'suggestions' && (
          <div className="space-y-3">
            {ats.suggestions.map((s) => (
              <div key={s.id} className={`rounded-[10px] border p-3 ${
                s.priority === 'High' ? 'bg-amber-50 border-amber-100' :
                s.priority === 'Medium' ? 'bg-blue-50 border-blue-100' :
                'bg-cyan-50 border-cyan-100'
              }`}>
                <div className="flex items-start gap-2">
                  <Lightbulb className={`h-4 w-4 mt-0.5 shrink-0 ${
                    s.priority === 'High' ? 'text-amber-600' :
                    s.priority === 'Medium' ? 'text-blue-600' : 'text-cyan-600'
                  }`} />
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-xs font-bold text-text-primary">{s.title}</p>
                      <Badge variant={s.priority === 'High' ? 'amber' : s.priority === 'Medium' ? 'blue' : 'gray'} size="sm">
                        {s.priority}
                      </Badge>
                    </div>
                    <p className="text-[11px] text-text-muted leading-relaxed">{s.description}</p>
                    <button className="mt-2 flex items-center gap-1 rounded-md bg-white px-2 py-1 text-[10px] font-bold text-primary-DEFAULT shadow-sm transition hover:bg-primary-DEFAULT hover:text-white">
                      <Wrench className="h-3 w-3" /> Fix Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Keywords Tab */}
        {activeRightTab === 'keywords' && (
          <div className="space-y-4">
            <div className="rounded-[12px] border border-[#CFE0F7] bg-[#F7FAFF] p-4 shadow-card">
              <p className="text-xs font-semibold text-text-primary mb-3">✅ Matched Keywords</p>
              <div className="flex flex-wrap gap-1.5">
                {ats.matchedKeywords.map((kw) => (
                  <Badge key={kw} variant="green" size="sm">{kw}</Badge>
                ))}
              </div>
            </div>
            <div className="rounded-[12px] border border-[#CFE0F7] bg-[#F7FAFF] p-4 shadow-card">
              <p className="text-xs font-semibold text-text-primary mb-3">❌ Missing Keywords</p>
              <div className="flex flex-wrap gap-1.5">
                {ats.missingKeywords.map((kw) => (
                  <Badge key={kw} variant="red" size="sm">{kw}</Badge>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* AI Tab */}
        {activeRightTab === 'ai' && (
          <div className="space-y-3">
            <p className="text-xs text-text-muted font-medium">Choose an AI action to enhance your resume:</p>
            {AI_ACTIONS.map((action) => (
              <button
                key={action}
                onClick={() => triggerAction(action)}
                className="group w-full rounded-[10px] border border-[#CFE0F7] bg-[#F7FAFF] px-4 py-3 text-left text-sm font-bold text-[#10233F] transition-all hover:-translate-y-0.5 hover:border-primary-DEFAULT hover:bg-[#DDEBFF] hover:shadow-[0_12px_28px_rgba(37,99,235,0.12)]"
              >
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-primary-DEFAULT group-hover:rotate-12 transition-transform" />
                  {action}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Bottom CTA */}
      <div className="shrink-0 border-t border-[#CFE0F7] bg-white/[0.72] p-4 backdrop-blur-xl">
        <Button variant="primary" size="sm" className="w-full" onClick={ats.runAnalysis} loading={ats.isAnalyzing}>
          <Sparkles className="h-4 w-4" />
          Run Full ATS Audit
        </Button>
      </div>
    </aside>
  );
}
