'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard, FileText, BarChart2, Target, Download,
  Settings, Zap, ChevronLeft, ChevronRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useUIStore } from '@/store/uiStore';
import { SAMPLE_RESUME_ID } from '@/lib/constants';
import { Tooltip } from '@/components/ui/Tooltip';

const NAV_ITEMS = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: `/resume/${SAMPLE_RESUME_ID}/editor`, label: 'My Resume', icon: FileText },
  { href: `/resume/${SAMPLE_RESUME_ID}/ats`, label: 'ATS Analysis', icon: BarChart2 },
  { href: '/placement-readiness', label: 'Readiness', icon: Target },
  { href: '/downloads', label: 'Downloads', icon: Download },
  { href: '/settings', label: 'Settings', icon: Settings },
];

export function StudentSidebar() {
  const pathname = usePathname();
  const { isSidebarOpen, toggleSidebar } = useUIStore();

  return (
    <aside
      className={cn(
        'hidden md:flex flex-col fixed left-0 top-0 h-full bg-[#07111F] text-white z-30 transition-all duration-200 ease-in-out shadow-[18px_0_46px_rgba(3,7,18,0.26)] before:absolute before:inset-0 before:pointer-events-none before:bg-[radial-gradient(circle_at_20%_0%,rgba(37,99,235,0.20),transparent_32%),linear-gradient(180deg,rgba(6,182,212,0.08),transparent_34%)]',
        isSidebarOpen ? 'w-60' : 'w-16'
      )}
    >
      {/* Logo */}
      <div className={cn('relative flex items-center gap-3 px-4 py-5 border-b border-white/10 bg-white/[0.035]', !isSidebarOpen && 'justify-center px-0')}>
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#3B82F6] via-primary-DEFAULT to-accent-cyan flex items-center justify-center shrink-0 shadow-[0_10px_24px_rgba(37,99,235,0.38)]">
          <Zap className="h-4 w-4 text-white" />
        </div>
        {isSidebarOpen && (
          <div>
            <p className="text-sm font-extrabold text-white leading-none tracking-[-0.02em]">PlacementAI</p>
            <p className="text-[10px] text-cyan-100/55 mt-0.5 uppercase tracking-[0.18em]">Suite</p>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="relative flex-1 px-2 py-4 space-y-1 overflow-y-auto">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href || pathname.startsWith(href + '/');
          const item = (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200',
                isActive
                  ? 'bg-gradient-to-r from-primary-DEFAULT to-accent-cyan text-white shadow-[0_12px_28px_rgba(37,99,235,0.30)]'
                  : 'text-slate-400 hover:bg-[#122238] hover:text-cyan-50 hover:translate-x-0.5',
                !isSidebarOpen && 'justify-center px-0 w-10 h-10 mx-auto'
              )}
            >
              <Icon className="h-5 w-5 shrink-0" />
              {isSidebarOpen && <span>{label}</span>}
            </Link>
          );
          return isSidebarOpen ? item : (
            <Tooltip key={href} content={label}>{item}</Tooltip>
          );
        })}
      </nav>

      {/* User */}
      {isSidebarOpen && (
        <div className="relative px-3 py-4 border-t border-white/10">
          <div className="flex items-center gap-3 rounded-[10px] border border-white/10 bg-[#0B1A2E] p-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#3B82F6] to-accent-cyan flex items-center justify-center text-xs font-bold text-white shrink-0">
              AS
            </div>
            <div className="min-w-0">
              <p className="text-sm font-bold text-white truncate">Arjun Sharma</p>
              <p className="text-xs text-cyan-100/55 truncate">3rd Year - CSE</p>
            </div>
          </div>
        </div>
      )}

      {/* Collapse Toggle */}
      <button
        onClick={toggleSidebar}
        className="absolute -right-3 top-20 w-6 h-6 rounded-full bg-white border border-border shadow-card flex items-center justify-center text-text-secondary hover:text-primary-DEFAULT hover:scale-105 transition-all z-10"
        aria-label={isSidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
      >
        {isSidebarOpen ? <ChevronLeft className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
      </button>
    </aside>
  );
}
