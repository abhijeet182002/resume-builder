import Link from 'next/link';
import { ArrowRight, CheckCircle2, Layers3, Linkedin, Target, Wrench } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { ScoreRing } from '@/components/ui/ScoreRing';
import { SAMPLE_RESUME_ID } from '@/lib/constants';

const nextSteps = [
  { text: 'Add one internship project', icon: Layers3 },
  { text: 'Improve project descriptions with metrics', icon: Wrench },
  { text: 'Add 4 more role-specific keywords', icon: Target },
  { text: 'Complete your LinkedIn URL', icon: Linkedin },
];

const readinessCards = [
  {
    label: 'Resume Completed',
    value: '85%',
    detail: 'Most sections are ready',
    color: 'green' as const,
    content: <ProgressBar value={85} color="green" className="mt-4" />,
  },
  {
    label: 'ATS Score',
    value: '74/100',
    detail: 'Good baseline score',
    color: 'blue' as const,
    content: <div className="mt-4"><ScoreRing score={74} size={82} color="#2563EB" /></div>,
  },
  {
    label: 'Project Quality',
    value: '2 of 3 Strong',
    detail: 'Add more measurable impact',
    color: 'purple' as const,
    content: <ProgressBar value={66} color="blue" className="mt-4" />,
  },
  {
    label: 'Skill Coverage',
    value: '8 of 12 Matched',
    detail: 'Role keywords need work',
    color: 'cyan' as const,
    content: <ProgressBar value={67} color="cyan" className="mt-4" />,
  },
  {
    label: 'Profile Strength',
    value: 'Good',
    detail: 'LinkedIn can improve trust',
    color: 'amber' as const,
    content: <Badge variant="amber" className="mt-4">Needs polish</Badge>,
  },
];

const colorClasses = {
  green: 'from-emerald-50 to-white border-emerald-100 text-emerald-700',
  blue: 'from-blue-50 to-white border-blue-100 text-primary-DEFAULT',
  purple: 'from-purple-50 to-white border-purple-100 text-purple-700',
  cyan: 'from-cyan-50 to-white border-cyan-100 text-[#06758A]',
  amber: 'from-amber-50 to-white border-amber-100 text-amber-700',
};

export default function PlacementReadinessPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-5 p-4 sm:p-6">
      <section className="relative isolate overflow-hidden rounded-[16px] border border-[#F2CF8A] bg-[#FFF4DD] p-6 shadow-[0_1px_2px_rgba(15,23,42,0.06),0_18px_42px_rgba(245,158,11,0.12)]">
        <div className="absolute right-8 top-6 -z-10 h-32 w-32 rounded-full bg-warning/20 blur-2xl" />
        <div className="absolute bottom-0 right-0 -z-10 h-20 w-72 bg-gradient-to-l from-cyan-200/35 to-transparent blur-xl" />
        <Badge variant="amber" className="px-4 py-2 text-sm">Getting There - 62% Ready</Badge>
        <div className="mt-5 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#8A6B27]">Placement readiness</p>
            <h1 className="mt-1 text-3xl font-extrabold tracking-[-0.04em] text-[#10233F]">You are close to placement-ready.</h1>
            <p className="mt-2 max-w-2xl text-sm font-medium leading-relaxed text-[#6F5B2D]">
              Your resume foundation is solid. Complete the high-impact actions below to improve recruiter confidence and ATS matching.
            </p>
          </div>
          <div className="rounded-[18px] border border-white/70 bg-white/75 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.7),0_14px_32px_rgba(245,158,11,0.10)]">
            <ScoreRing score={62} size={112} color="#F59E0B" />
          </div>
        </div>
      </section>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {readinessCards.map((card) => (
          <section
            key={card.label}
            className={`rounded-[14px] border bg-gradient-to-br p-5 shadow-[0_1px_2px_rgba(15,23,42,0.06),0_16px_38px_rgba(37,99,235,0.08)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_18px_42px_rgba(37,99,235,0.12)] ${colorClasses[card.color]}`}
          >
            <p className="text-xs font-extrabold uppercase tracking-[0.14em] opacity-75">{card.label}</p>
            <p className="mt-2 text-xl font-extrabold tracking-[-0.02em] text-[#10233F]">{card.value}</p>
            <p className="mt-1 text-xs font-medium text-[#647A9A]">{card.detail}</p>
            {card.content}
          </section>
        ))}
      </div>

      <section className="rounded-[16px] border border-[#CFE0F7] bg-[#EAF3FF] p-5 shadow-[0_1px_2px_rgba(15,23,42,0.06),0_18px_42px_rgba(37,99,235,0.10)]">
        <div className="mb-4 flex items-end justify-between gap-3">
          <div>
            <p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#647A9A]">Next moves</p>
            <h2 className="mt-1 text-lg font-extrabold tracking-[-0.02em] text-[#10233F]">What to do next</h2>
          </div>
          <Badge variant="blue">4 actions</Badge>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          {nextSteps.map(({ text, icon: Icon }, index) => (
            <div
              key={text}
              className="group flex items-center justify-between gap-3 rounded-[14px] border border-[#CFE0F7] bg-[#F7FAFF] p-4 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-primary-DEFAULT/35 hover:bg-[#EFF6FF] hover:shadow-[0_16px_34px_rgba(37,99,235,0.10)]"
            >
              <div className="flex min-w-0 items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-[#DDEBFF] text-primary-DEFAULT transition group-hover:bg-primary-DEFAULT group-hover:text-white">
                  <Icon className="h-4 w-4" />
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-extrabold text-[#10233F]">{text}</p>
                  <p className="text-xs font-medium text-[#647A9A]">Step {index + 1} for stronger placement profile</p>
                </div>
              </div>
              <Badge size="sm" variant="blue">High Impact</Badge>
            </div>
          ))}
        </div>
      </section>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 text-sm font-bold text-[#45607F]">
          <CheckCircle2 className="h-4 w-4 text-success" />
          Resume and ATS are synced with your latest edits.
        </div>
        <Link
          href={`/resume/${SAMPLE_RESUME_ID}/editor`}
          className="group inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-[8px] bg-[#DDEBFF] px-6 py-3 text-base font-extrabold text-[#07111F] shadow-[0_1px_2px_rgba(15,23,42,0.08),0_14px_30px_rgba(37,99,235,0.16)] transition-all hover:-translate-y-0.5 hover:bg-gradient-to-br hover:from-[#1F5BE3] hover:to-[#1746BF] hover:text-white hover:shadow-[0_18px_42px_rgba(37,99,235,0.32)] sm:w-auto"
        >
          Improve Resume Now
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </div>
  );
}
