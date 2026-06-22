'use client';

import { useState } from 'react';
import { Check, Download, FileDown, FileText, LayoutTemplate } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { ResumePreview } from '@/components/editor/ResumePreview';
import { cn } from '@/lib/utils';

const templates = [
  { name: 'Classic', accent: 'bg-primary-DEFAULT', tint: 'from-blue-50 to-white' },
  { name: 'Modern', accent: 'bg-accent-cyan', tint: 'from-cyan-50 to-white' },
  { name: 'Minimal', accent: 'bg-slate-700', tint: 'from-slate-100 to-white' },
];

export default function DownloadsPage() {
  const [template, setTemplate] = useState('Classic');
  const [format, setFormat] = useState<'PDF' | 'DOCX'>('PDF');
  const [pageLength, setPageLength] = useState<'fit' | 'flow'>('fit');
  const [toast, setToast] = useState(false);

  const showToast = () => {
    setToast(true);
    setTimeout(() => setToast(false), 3000);
  };

  return (
    <div className="mx-auto grid max-w-7xl gap-6 p-4 pb-32 sm:p-6 lg:grid-cols-[55fr_45fr]">
      <section className="space-y-5">
        <div className="relative isolate overflow-hidden rounded-[16px] border border-[#BFD7FF] bg-[#EAF3FF] p-6 shadow-[0_1px_2px_rgba(15,23,42,0.06),0_18px_42px_rgba(37,99,235,0.12)]">
          <div className="absolute right-8 top-6 -z-10 h-32 w-32 rounded-full bg-primary-DEFAULT/15 blur-2xl" />
          <Badge variant="blue" className="mb-4">Export center</Badge>
          <h1 className="text-3xl font-extrabold tracking-[-0.04em] text-[#10233F]">Download your placement resume.</h1>
          <p className="mt-2 max-w-2xl text-sm font-medium leading-relaxed text-[#45607F]">
            Choose a clean ATS-friendly template, preview the final page, and export in the format recruiters expect.
          </p>
        </div>

        <section className="rounded-[16px] border border-[#CFE0F7] bg-[#EAF3FF] p-5 shadow-[0_1px_2px_rgba(15,23,42,0.06),0_18px_42px_rgba(37,99,235,0.10)]">
          <div className="mb-4 flex items-end justify-between gap-3">
            <div>
              <p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#647A9A]">Template</p>
              <h2 className="mt-1 text-lg font-extrabold tracking-[-0.02em] text-[#10233F]">Choose template</h2>
            </div>
            <Badge variant="blue">{template}</Badge>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {templates.map((item) => {
              const selected = template === item.name;
              return (
                <button
                  key={item.name}
                  onClick={() => setTemplate(item.name)}
                  className={cn(
                    'group rounded-[14px] border bg-gradient-to-br p-4 text-left shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_18px_42px_rgba(37,99,235,0.12)]',
                    item.tint,
                    selected ? 'border-primary-DEFAULT ring-2 ring-primary-DEFAULT/20' : 'border-[#CFE0F7] hover:border-primary-DEFAULT/45'
                  )}
                >
                  <div className="mb-3 aspect-[3/4] rounded-[10px] border border-[#D7E4F7] bg-white p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.75)]">
                    <div className={cn('mb-3 h-2 w-10 rounded-full', item.accent)} />
                    <div className="mb-2 h-3 w-2/3 rounded bg-slate-300" />
                    <div className="space-y-1.5">
                      {Array.from({ length: 8 }).map((_, index) => (
                        <div key={index} className={cn('h-1.5 rounded bg-slate-200', index % 3 === 0 && 'w-4/5')} />
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-extrabold text-[#10233F]">{item.name}</p>
                    <span className={cn('flex h-6 w-6 items-center justify-center rounded-full transition', selected ? 'bg-primary-DEFAULT text-white' : 'bg-[#DDEBFF] text-primary-DEFAULT group-hover:bg-primary-DEFAULT group-hover:text-white')}>
                      <Check className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        <section className="rounded-[16px] border border-[#CFE0F7] bg-[#F7FAFF] p-5 shadow-[0_1px_2px_rgba(15,23,42,0.06),0_16px_38px_rgba(37,99,235,0.08)]">
          <div className="mb-4 flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-[#DDEBFF] text-primary-DEFAULT">
              <LayoutTemplate className="h-5 w-5" />
            </span>
            <div>
              <h2 className="text-sm font-extrabold text-[#10233F]">Page length</h2>
              <p className="text-xs font-medium text-[#647A9A]">Control how tightly your resume fits.</p>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { key: 'fit' as const, label: 'Fit to 1 Page', desc: 'Best for campus applications' },
              { key: 'flow' as const, label: 'Let it flow naturally', desc: 'Use when experience is detailed' },
            ].map((option) => (
              <button
                key={option.key}
                onClick={() => setPageLength(option.key)}
                className={cn(
                  'rounded-[12px] border p-4 text-left transition-all duration-200 hover:-translate-y-0.5',
                  pageLength === option.key
                    ? 'border-primary-DEFAULT bg-[#DDEBFF] shadow-[0_12px_28px_rgba(37,99,235,0.12)]'
                    : 'border-[#CFE0F7] bg-white hover:bg-[#EFF6FF]'
                )}
              >
                <p className="text-sm font-extrabold text-[#10233F]">{option.label}</p>
                <p className="mt-1 text-xs font-medium text-[#647A9A]">{option.desc}</p>
              </button>
            ))}
          </div>
        </section>
      </section>

      <section>
        <div className="sticky top-20 rounded-[18px] border border-[#CFE0F7] bg-[#DCEAFF] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.70),0_22px_60px_rgba(37,99,235,0.16)] sm:p-5">
          <div className="mb-3 flex items-center justify-between gap-3">
            <div>
              <p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#647A9A]">Live preview</p>
              <h2 className="text-sm font-extrabold text-[#10233F]">A4 export view</h2>
            </div>
            <Badge>{template}</Badge>
          </div>
          <div className="max-h-[720px] overflow-y-auto rounded-[14px] bg-[#BFD7FF]/35 p-4">
            <div className="resume-paper mx-auto max-w-[540px] rounded-sm bg-white p-6">
              <ResumePreview />
            </div>
          </div>
        </div>
      </section>

      <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-white/70 bg-white/[0.90] px-4 py-3 shadow-[0_-16px_42px_rgba(15,23,42,0.10)] backdrop-blur-xl md:left-16">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <span className="hidden h-10 w-10 items-center justify-center rounded-[10px] bg-[#DDEBFF] text-primary-DEFAULT sm:flex">
              <FileText className="h-5 w-5" />
            </span>
            <div className="flex rounded-[10px] border border-[#BFD7FF] bg-[#EAF3FF] p-1">
              {(['PDF', 'DOCX'] as const).map((item) => (
                <button
                  key={item}
                  onClick={() => setFormat(item)}
                  className={cn(
                    'rounded-md px-4 py-2 text-sm font-extrabold transition-all',
                    format === item ? 'bg-primary-DEFAULT text-white shadow-sm' : 'text-[#07111F] hover:bg-[#DDEBFF] hover:text-primary-DEFAULT'
                  )}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <button
            onClick={showToast}
            className="group inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-[8px] bg-[#DDEBFF] px-6 py-3 text-base font-extrabold text-[#07111F] shadow-[0_1px_2px_rgba(15,23,42,0.08),0_14px_30px_rgba(37,99,235,0.16)] transition-all hover:-translate-y-0.5 hover:bg-gradient-to-br hover:from-[#1F5BE3] hover:to-[#1746BF] hover:text-white hover:shadow-[0_18px_42px_rgba(37,99,235,0.32)] sm:w-auto"
          >
            <Download className="h-4 w-4" />
            Download Resume
          </button>
        </div>
      </div>

      {toast && (
        <div className="animate-toast-in fixed bottom-28 right-4 z-50 flex items-center gap-3 rounded-[12px] bg-[#07111F] px-4 py-3 text-sm font-bold text-white shadow-[0_18px_42px_rgba(3,7,18,0.26)]">
          <FileDown className="h-4 w-4 text-accent-cyan" />
          Resume downloaded successfully
        </div>
      )}
    </div>
  );
}
