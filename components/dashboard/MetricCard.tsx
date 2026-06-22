'use client';
import { ScoreRing } from '@/components/ui/ScoreRing';
import { cn } from '@/lib/utils';

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  type?: 'ring' | 'badge' | 'text';
  color?: string;
  badgeVariant?: 'blue' | 'green' | 'amber' | 'gray';
  icon?: React.ReactNode;
}

export function MetricCard({ title, value, subtitle, type = 'text', color = '#2563EB', badgeVariant = 'blue', icon }: MetricCardProps) {
  return (
    <div className="group flex items-center gap-4 rounded-[12px] border border-[#D7E4F7] bg-[#F7FAFF] p-5 shadow-card backdrop-blur-sm transition-all duration-200 hover:-translate-y-1 hover:border-primary-DEFAULT/35 hover:bg-[#EFF6FF] hover:shadow-[0_18px_42px_rgba(37,99,235,0.10)]">
      {type === 'ring' && typeof value === 'number' && (
        <div className="shrink-0">
          <ScoreRing score={value} max={100} size={60} strokeWidth={6} color={color} />
        </div>
      )}
      {type !== 'ring' && (
        <div className={cn('w-11 h-11 rounded-[10px] flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-105', {
          'bg-blue-50': badgeVariant === 'blue',
          'bg-emerald-50': badgeVariant === 'green',
          'bg-amber-50': badgeVariant === 'amber',
          'bg-slate-100': badgeVariant === 'gray',
        })}>
          {icon}
        </div>
      )}
      <div className="min-w-0">
        <p className="text-xs text-text-muted font-medium mb-0.5">{title}</p>
        {type === 'badge' ? (
          <span className={cn('inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold', {
            'bg-blue-50 text-blue-700': badgeVariant === 'blue',
            'bg-emerald-50 text-emerald-700': badgeVariant === 'green',
            'bg-amber-50 text-amber-700': badgeVariant === 'amber',
            'bg-slate-100 text-slate-600': badgeVariant === 'gray',
          })}>{value}</span>
        ) : (
          <p className="text-base font-bold text-text-primary truncate">{value}</p>
        )}
        {subtitle && <p className="text-xs text-text-muted mt-0.5">{subtitle}</p>}
      </div>
    </div>
  );
}
