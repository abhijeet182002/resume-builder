'use client';
import { Bell, Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useUIStore } from '@/store/uiStore';

interface TopBarProps {
  title: string;
  className?: string;
}

export function TopBar({ title, className }: TopBarProps) {
  const { toggleSidebar } = useUIStore();
  return (
    <header className={cn('sticky top-0 h-14 bg-white/[0.88] backdrop-blur-xl border-b border-white/70 flex items-center justify-between px-5 shrink-0 z-20 shadow-[0_1px_0_rgba(15,23,42,0.04)]', className)}>
      <div className="flex items-center gap-3">
        <button
          onClick={toggleSidebar}
          className="md:hidden p-2 rounded-lg hover:bg-surface text-text-muted transition-colors"
          aria-label="Toggle sidebar"
        >
          <Menu className="h-5 w-5" />
        </button>
        <h1 className="text-base font-semibold text-text-primary tracking-[-0.01em]">{title}</h1>
      </div>
      <div className="flex items-center gap-2">
        <button className="relative p-2 rounded-lg text-text-muted transition-all hover:bg-blue-50 hover:text-primary-DEFAULT hover:shadow-sm" aria-label="Notifications">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-danger rounded-full" />
        </button>
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-DEFAULT to-accent-cyan flex items-center justify-center text-xs font-bold text-white shadow-[0_8px_20px_rgba(37,99,235,0.24)]">
          AS
        </div>
      </div>
    </header>
  );
}
