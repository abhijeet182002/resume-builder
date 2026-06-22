'use client';

import { Badge } from '@/components/ui/Badge';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { useATSStore } from '@/store/atsStore';

export function KeywordMatchCard() {
  const { keywordMatch, matchedKeywords, missingKeywords } = useATSStore();

  return (
    <div className="rounded-[14px] border border-[#CFE0F7] bg-[#F7FAFF] p-5 shadow-[0_1px_2px_rgba(15,23,42,0.06),0_16px_38px_rgba(37,99,235,0.09)] transition-all duration-200 hover:-translate-y-1 hover:border-primary-DEFAULT/35 hover:bg-[#EFF6FF]">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-extrabold text-[#10233F]">Keyword Match</h3>
        <span className="text-lg font-extrabold text-primary-DEFAULT">{keywordMatch}%</span>
      </div>
      <ProgressBar value={keywordMatch} color="blue" size="md" className="mb-5" />
      <div className="space-y-3">
        <div>
          <p className="mb-2 text-xs font-bold text-[#647A9A]">Matched Keywords</p>
          <div className="flex flex-wrap gap-1.5">
            {matchedKeywords.map((keyword) => (
              <Badge key={keyword} variant="green" size="sm">{keyword}</Badge>
            ))}
          </div>
        </div>
        <div>
          <p className="mb-2 text-xs font-bold text-[#647A9A]">Missing Keywords</p>
          <div className="flex flex-wrap gap-1.5">
            {missingKeywords.map((keyword) => (
              <Badge key={keyword} variant="red" size="sm">{keyword}</Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
