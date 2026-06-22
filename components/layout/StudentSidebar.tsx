'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  FileText,
  BarChart2,
  Target,
  Download,
  Settings,
  Zap,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useUIStore } from '@/store/uiStore';
import { SAMPLE_RESUME_ID } from '@/lib/constants';
import { Tooltip } from '@/components/ui/Tooltip';

const NAV_ITEMS = [
  {
    href: '/dashboard',
    label: 'Dashboard',
    icon: LayoutDashboard,
  },
  {
    href: `/resume/${SAMPLE_RESUME_ID}/editor`,
    label: 'My Resume',
    icon: FileText,
  },
  {
    href: `/resume/${SAMPLE_RESUME_ID}/ats`,
    label: 'ATS Analysis',
    icon: BarChart2,
  },
  {
    href: '/placement-readiness',
    label: 'Readiness',
    icon: Target,
  },
  {
    href: '/downloads',
    label: 'Downloads',
    icon: Download,
  },
  {
    href: '/settings',
    label: 'Settings',
    icon: Settings,
  },
];

export function StudentSidebar() {
  const pathname = usePathname();
  const { isSidebarOpen, toggleSidebar } = useUIStore();

  return (
    <aside
      className={cn(
        'hidden md:flex fixed left-0 top-0 z-90 h-screen flex-col overflow-hidden',
        'border-r border-white/10',
        'bg-[#07111F]/95 backdrop-blur-2xl',
        'shadow-[20px_0_60px_rgba(0,0,0,0.35)]',
        'transition-all duration-300 ease-in-out',
        'before:absolute before:inset-0 before:pointer-events-none',
        'before:bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.25),transparent_35%)]',
        'after:absolute after:inset-0 after:pointer-events-none',
        'after:bg-[radial-gradient(circle_at_bottom_left,rgba(6,182,212,0.15),transparent_30%)]',
        isSidebarOpen ? 'w-64' : 'w-20'
      )}
    >
      {/* Logo */}
      <div
        className={cn(
          'relative flex items-center gap-3 border-b border-white/10 px-5 py-5',
          !isSidebarOpen && 'justify-center px-0'
        )}
      >
        <motion.div
          whileHover={{ rotate: 10, scale: 1.05 }}
          className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 via-indigo-500 to-cyan-400 shadow-[0_0_35px_rgba(59,130,246,0.45)]"
        >
          <Zap className="h-5 w-5 text-white" />
        </motion.div>

        {isSidebarOpen && (
          <div>
            <p className="bg-gradient-to-r from-white via-blue-100 to-cyan-300 bg-clip-text text-base font-black tracking-tight text-transparent">
              PlacementAI
            </p>
            <p className="mt-0.5 text-[10px] uppercase tracking-[0.22em] text-cyan-100/50">
              Resume Suite
            </p>
          </div>
        )}
      </div>

      {/* Progress Card */}
      {isSidebarOpen && (
        <div className="mx-3 mt-4 rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400">
              Resume Progress
            </span>
            <span className="text-sm font-bold text-white">
              72%
            </span>
          </div>

          <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '72%' }}
              transition={{ duration: 1 }}
              className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-500"
            />
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="relative flex-1 space-y-2 overflow-y-auto px-3 py-5">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const isActive =
            pathname === href ||
            pathname.startsWith(href + '/');

          const navLink = (
            <Link
              key={href}
              href={href}
              className={cn(
                'group relative flex items-center gap-3 overflow-hidden rounded-xl px-3 py-3 text-sm font-semibold transition-all duration-300',
                isActive
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-[0_12px_30px_rgba(37,99,235,0.35)]'
                  : 'text-slate-400 hover:bg-white/[0.05] hover:text-white',
                !isSidebarOpen &&
                  'mx-auto h-12 w-12 justify-center px-0'
              )}
            >
              {/* Active Indicator */}
              {isActive && (
                <span className="absolute left-0 top-1/2 h-8 w-1 -translate-y-1/2 rounded-r-full bg-cyan-300 shadow-[0_0_20px_rgba(34,211,238,0.9)]" />
              )}

              {/* Hover Glow */}
              <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-cyan-500/10 to-blue-500/5" />
              </div>

              {/* Icon */}
              <div
                className={cn(
                  'relative z-10 flex h-9 w-9 items-center justify-center rounded-xl transition-all duration-300',
                  isActive
                    ? 'bg-white/15'
                    : 'bg-white/[0.04] group-hover:bg-white/[0.08]'
                )}
              >
                <Icon className="h-5 w-5" />
              </div>

              {isSidebarOpen && (
                <span className="relative z-10">
                  {label}
                </span>
              )}
            </Link>
          );

          return isSidebarOpen ? (
            navLink
          ) : (
            <Tooltip key={href} content={label}>
              {navLink}
            </Tooltip>
          );
        })}
      </nav>

      {/* User Card */}
      {isSidebarOpen && (
        <div className="border-t border-white/10 p-4">
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3 backdrop-blur-xl">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 font-bold text-white">
                  AS
                </div>

                <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-[#07111F] bg-emerald-400" />
              </div>

              <div className="min-w-0">
                <p className="truncate text-sm font-bold text-white">
                  Arjun Sharma
                </p>

                <p className="truncate text-xs text-slate-400">
                  3rd Year • CSE
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <motion.button
        whileHover={{
          scale: 1.1,
          rotate: 180,
        }}
        whileTap={{
          scale: 0.9,
        }}
        onClick={toggleSidebar}
        className="absolute -right-3 top-24 z-50 flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white shadow-[0_10px_30px_rgba(0,0,0,0.15)]"
        aria-label={
          isSidebarOpen
            ? 'Collapse sidebar'
            : 'Expand sidebar'
        }
      >
        {isSidebarOpen ? (
          <ChevronLeft className="h-4 w-4 text-slate-700" />
        ) : (
          <ChevronRight className="h-4 w-4 text-slate-700" />
        )}
      </motion.button>
    </aside>
  );
}