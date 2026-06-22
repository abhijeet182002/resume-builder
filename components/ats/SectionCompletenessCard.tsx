'use client';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Check, AlertTriangle } from 'lucide-react';

const SECTIONS = [
  { name: 'Personal Info', pct: 100, status: 'complete' },
  { name: 'Summary', pct: 100, status: 'complete' },
  { name: 'Education', pct: 100, status: 'complete' },
  { name: 'Skills', pct: 100, status: 'complete' },
  { name: 'Projects', pct: 100, status: 'complete' },
  { name: 'Experience', pct: 60, status: 'partial' },
  { name: 'Certifications', pct: 100, status: 'complete' },
];

export function SectionCompletenessCard() {
  return (
    <div className="rounded-[14px] border border-[#CFE0F7] bg-[#F7FAFF] p-5 shadow-[0_1px_2px_rgba(15,23,42,0.06),0_16px_38px_rgba(37,99,235,0.09)] transition-all duration-200 hover:-translate-y-1 hover:border-primary-DEFAULT/35 hover:bg-[#EFF6FF]">
      <h3 className="text-sm font-extrabold text-[#10233F] mb-4">Section Completeness</h3>
      <div className="space-y-3">
        {SECTIONS.map((s) => (
          <div key={s.name} className="flex items-center gap-3">
            <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${s.status === 'complete' ? 'bg-emerald-100' : 'bg-amber-100'}`}>
              {s.status === 'complete'
                ? <Check className="h-3 w-3 text-success" />
                : <AlertTriangle className="h-3 w-3 text-warning" />}
            </div>
            <span className="text-xs font-bold text-[#10233F] w-28 shrink-0">{s.name}</span>
            <div className="flex-1">
              <ProgressBar value={s.pct} color={s.status === 'complete' ? 'green' : 'amber'} size="sm" />
            </div>
            <span className="text-xs font-bold text-text-muted w-10 text-right shrink-0">{s.pct}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
