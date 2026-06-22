'use client';

import { useRouter } from 'next/navigation';
import { ATSScoreOverview } from '@/components/ats/ATSScoreOverview';
import { FormattingCard } from '@/components/ats/FormattingCard';
import { KeywordMatchCard } from '@/components/ats/KeywordMatchCard';
import { SectionCompletenessCard } from '@/components/ats/SectionCompletenessCard';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { SAMPLE_RESUME_ID } from '@/lib/constants';
import { useATSStore } from '@/store/atsStore';

export default function ATSPage() {
  const router = useRouter();
  const suggestions = useATSStore((state) => state.suggestions);

  return (
    <div className="mx-auto max-w-7xl space-y-5 p-4 sm:p-6">
      <ATSScoreOverview />
      <div className="grid gap-5 lg:grid-cols-3">
        <KeywordMatchCard />
        <SectionCompletenessCard />
        <FormattingCard />
      </div>
      <section className="rounded-[16px] border border-[#CFE0F7] bg-[#EAF3FF] p-5 shadow-[0_1px_2px_rgba(15,23,42,0.06),0_18px_42px_rgba(37,99,235,0.10)]">
        <div className="mb-4 flex items-end justify-between gap-3">
          <div>
            <p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#647A9A]">Action plan</p>
            <h2 className="mt-1 text-lg font-extrabold tracking-[-0.02em] text-[#10233F]">Improvement Suggestions</h2>
          </div>
          <Badge variant="blue">4 fixes</Badge>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          {suggestions.map((suggestion) => (
            <div key={suggestion.id} className="rounded-[14px] border border-[#CFE0F7] bg-[#F7FAFF] p-4 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-primary-DEFAULT/35 hover:bg-[#EFF6FF] hover:shadow-[0_16px_34px_rgba(37,99,235,0.10)]">
              <div className="mb-2 flex items-center justify-between gap-3">
                <h3 className="text-sm font-extrabold text-[#10233F]">{suggestion.title}</h3>
                <Badge variant={suggestion.priority === 'High' ? 'amber' : suggestion.priority === 'Medium' ? 'blue' : 'gray'}>{suggestion.priority}</Badge>
              </div>
              <p className="mb-3 text-xs font-medium leading-relaxed text-[#45607F]">{suggestion.description}</p>
              <Button
                size="sm"
                variant="secondary"
                onClick={() => router.push(`/resume/${SAMPLE_RESUME_ID}/editor`)}
                className="bg-[#DDEBFF] text-[#07111F] hover:from-[#1F5BE3] hover:to-[#1746BF] hover:bg-gradient-to-br hover:text-white"
              >
                Fix Now
              </Button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
