'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BarChart3, ClipboardCheck, Download, Filter, GraduationCap, Settings, Users, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: BarChart3 },
  { href: '/admin/dashboard', label: 'Students', icon: Users },
  { href: '/admin/dashboard', label: 'Readiness', icon: ClipboardCheck },
  { href: '/admin/dashboard', label: 'Filters', icon: Filter },
  { href: '/admin/dashboard', label: 'Reports', icon: Download },
  { href: '/admin/dashboard', label: 'Settings', icon: Settings },
];

export function OfficerSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-30 hidden h-full w-64 flex-col bg-[#07111F] text-white shadow-[18px_0_46px_rgba(3,7,18,0.26)] before:pointer-events-none before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_20%_0%,rgba(37,99,235,0.20),transparent_32%),linear-gradient(180deg,rgba(6,182,212,0.08),transparent_34%)] lg:flex">
      <div className="relative flex items-center gap-3 border-b border-white/10 bg-white/[0.035] px-4 py-5">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-[#3B82F6] via-primary-DEFAULT to-accent-cyan shadow-[0_10px_24px_rgba(37,99,235,0.38)]">
          <Zap className="h-4 w-4 text-white" />
        </div>
        <div>
          <p className="text-sm font-extrabold leading-none tracking-[-0.02em] text-white">PlacementAI</p>
          <p className="mt-0.5 text-[10px] font-bold uppercase tracking-[0.18em] text-cyan-100/55">Officer</p>
        </div>
      </div>

      <nav className="relative flex-1 space-y-1 overflow-y-auto px-2 py-4">
        {navItems.map(({ href, label, icon: Icon }, index) => {
          const isActive = pathname === href && index === 0;
          return (
            <Link
              key={`${label}-${index}`}
              href={href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold transition-all duration-200',
                isActive
                  ? 'bg-gradient-to-r from-primary-DEFAULT to-accent-cyan text-white shadow-[0_12px_28px_rgba(37,99,235,0.30)]'
                  : 'text-slate-400 hover:translate-x-0.5 hover:bg-[#122238] hover:text-cyan-50'
              )}
            >
              <Icon className="h-5 w-5 shrink-0" />
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="relative border-t border-white/10 p-3">
        <div className="rounded-[12px] border border-white/10 bg-[#0B1A2E] p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
          <div className="mb-3 flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#3B82F6] to-accent-cyan text-xs font-bold text-white">
              PO
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-bold text-white">Placement Officer</p>
              <p className="truncate text-xs text-cyan-100/55">IIT Delhi</p>
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-lg bg-white/[0.04] px-3 py-2 text-xs font-bold text-cyan-50">
            <GraduationCap className="h-4 w-4 text-accent-cyan" />
            248 students tracked
          </div>
        </div>
      </div>
    </aside>
  );
}
