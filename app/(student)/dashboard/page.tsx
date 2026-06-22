import { ActivityFeed } from '@/components/dashboard/ActivityFeed';
import { MetricCard } from '@/components/dashboard/MetricCard';
import { PrimaryActions } from '@/components/dashboard/PrimaryActions';
import { Clock, Target } from 'lucide-react';

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-6 p-4 sm:p-6">
      <section className="relative isolate overflow-hidden rounded-[12px] border border-[#BFD7FF] bg-[#EAF3FF] p-6 shadow-[0_1px_2px_rgba(15,23,42,0.06),0_18px_42px_rgba(37,99,235,0.12)]">
        <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-primary-DEFAULT to-accent-cyan" />
        <div className="absolute right-5 top-5 h-28 w-28 rounded-full bg-primary-DEFAULT/15 blur-2xl" />
        <div className="absolute bottom-0 right-0 h-20 w-64 bg-gradient-to-l from-cyan-200/35 to-transparent blur-xl" />
        <h2 className="relative text-2xl font-extrabold tracking-[-0.03em] text-[#10233F]">Good morning, Arjun</h2>
        <p className="relative mt-1 text-sm font-medium text-[#45607F]">Your resume is 72% complete. Keep going!</p>
      </section>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard title="Resume Completion" value={72} type="ring" subtitle="8 sections started" />
        <MetricCard title="ATS Score" value={74} type="ring" color="#06B6D4" subtitle="Good match" />
        <MetricCard title="Placement Readiness" value="Getting There" type="badge" badgeVariant="amber" icon={<Target className="h-5 w-5 text-warning" />} subtitle="3 actions pending" />
        <MetricCard title="Last Updated" value="2 days ago" type="text" badgeVariant="gray" icon={<Clock className="h-5 w-5 text-text-muted" />} subtitle="Draft auto-saved" />
      </section>

      <PrimaryActions />
      <ActivityFeed />
    </div>
  );
}
