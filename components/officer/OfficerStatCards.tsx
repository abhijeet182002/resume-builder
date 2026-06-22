import { ArrowUpRight } from 'lucide-react';

const stats = [
  { label: 'Total Students', value: '248' },
  { label: 'Resumes Submitted', value: '186' },
  { label: 'Average ATS Score', value: '71' },
  { label: 'Placement Ready', value: '94' },
];

export function OfficerStatCards() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <div key={stat.label} className="group rounded-[14px] border border-[#CFE0F7] bg-[#F7FAFF] p-5 shadow-[0_1px_2px_rgba(15,23,42,0.06),0_16px_38px_rgba(37,99,235,0.08)] transition-all duration-200 hover:-translate-y-1 hover:border-primary-DEFAULT/35 hover:bg-[#EFF6FF] hover:shadow-[0_18px_42px_rgba(37,99,235,0.12)]">
          <div className="flex items-center justify-between">
            <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-[#647A9A]">{stat.label}</p>
            <ArrowUpRight className="h-4 w-4 text-success transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
          <p className="mt-3 text-3xl font-extrabold tracking-[-0.03em] text-[#10233F]">{stat.value}</p>
        </div>
      ))}
    </div>
  );
}
