'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, FileText, BarChart2, Target, Download, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SAMPLE_RESUME_ID } from '@/lib/constants';

const TAB_ITEMS = [
  { href: '/dashboard', label: 'Home', icon: LayoutDashboard },
  { href: `/resume/${SAMPLE_RESUME_ID}/editor`, label: 'Resume', icon: FileText },
  { href: `/resume/${SAMPLE_RESUME_ID}/ats`, label: 'ATS', icon: BarChart2 },
  { href: '/placement-readiness', label: 'Readiness', icon: Target },
  { href: '/downloads', label: 'Files', icon: Download },
];

export function MobileTabBar() {
  const pathname = usePathname();
  return (
    <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 bg-white/92 backdrop-blur-xl border-t border-white/70 flex justify-around items-center px-2 py-1 safe-area-inset-bottom shadow-[0_-12px_34px_rgba(15,23,42,0.10)]">
      {TAB_ITEMS.map(({ href, label, icon: Icon }) => {
        const isActive = pathname === href || pathname.startsWith(href + '/');
        return (
          <Link
            key={href}
            href={href}
            className={cn(
              'flex flex-col items-center justify-center gap-0.5 px-3 py-1.5 rounded-lg transition-all min-w-[44px] min-h-[44px]',
              isActive ? 'bg-blue-50 text-primary-DEFAULT shadow-sm' : 'text-text-muted hover:bg-surface'
            )}
          >
            <Icon className={cn('h-5 w-5', isActive && 'text-primary-DEFAULT')} />
            <span className="text-[10px] font-semibold">{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
