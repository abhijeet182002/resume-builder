'use client';

import { usePathname } from 'next/navigation';
import { MobileTabBar } from '@/components/layout/MobileTabBar';
import { StudentSidebar } from '@/components/layout/StudentSidebar';
import { TopBar } from '@/components/layout/TopBar';
import { useUIStore } from '@/store/uiStore';

const titles: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/resume/create': 'Create Resume',
  '/resume/upload': 'Upload Resume',
  '/placement-readiness': 'Placement Readiness',
  '/downloads': 'Downloads',
  '/settings': 'Settings',
};

function getTitle(pathname: string) {
  if (pathname.includes('/editor')) return 'Resume Editor';
  if (pathname.includes('/ats')) return 'ATS Analysis';
  return titles[pathname] ?? 'PlacementAI';
}

export default function StudentLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isSidebarOpen = useUIStore((state) => state.isSidebarOpen);

  return (
    <div className="min-h-screen bg-background">
      <StudentSidebar />
      <div className={isSidebarOpen ? 'md:pl-60 transition-all duration-200' : 'md:pl-16 transition-all duration-200'}>
        <TopBar title={getTitle(pathname)} />
        <main className="surface-grid min-h-[calc(100vh-56px)] pb-20 md:pb-0">
          <div className="page-enter">{children}</div>
        </main>
      </div>
      <MobileTabBar />
    </div>
  );
}
