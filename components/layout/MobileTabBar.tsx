'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  FileText,
  BarChart2,
  Target,
  Download,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export function MobileTabBar() {
  const pathname = usePathname();
  const [latestResumeId, setLatestResumeId] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch('/api/dashboard/stats');
        const data = await res.json();

        if (data?.latestResumeId) {
          setLatestResumeId(data.latestResumeId);
        }
      } catch (e) {
        console.log(e);
      }
    };

    load();
  }, []);

  const resumeEditorHref = latestResumeId
    ? `/resume/${latestResumeId}/editor`
    : '/resume/create';

  const resumeAtsHref = latestResumeId
    ? `/resume/${latestResumeId}/ats`
    : '#';

  const tabs = [
    {
      href: '/dashboard',
      label: 'Home',
      icon: LayoutDashboard,
    },
    {
      href: resumeEditorHref,
      label: 'Resume',
      icon: FileText,
    },
    {
      href: resumeAtsHref,
      label: 'ATS',
      icon: BarChart2,
      disabled: !latestResumeId,
    },
    {
      href: '/placement-readiness',
      label: 'Readiness',
      icon: Target,
    },
    {
      href: '/downloads',
      label: 'Files',
      icon: Download,
    },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-[9999] flex items-center justify-around border-t bg-white shadow-lg pb-[env(safe-area-inset-bottom)]">
      {tabs.map(({ href, label, icon: Icon, disabled }) => {
        const active =
          !disabled &&
          (pathname === href ||
            (href !== '/' && pathname.startsWith(`${href}/`)));

        const className = cn(
          'flex flex-1 flex-col items-center justify-center gap-1 py-3 transition-colors',
          disabled
            ? 'pointer-events-none opacity-40'
            : active
            ? 'text-blue-600'
            : 'text-gray-500 hover:text-blue-600'
        );

        if (disabled) {
          return (
            <div key={label} className={className}>
              <Icon className="h-5 w-5" />
              <span className="text-[11px]">{label}</span>
            </div>
          );
        }

        return (
          <Link
            key={href}
            href={href}
            className={className}
            prefetch={false}
          >
            <Icon className="h-5 w-5" />
            <span className="text-[11px]">{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}