'use client';

import Link from 'next/link';
import { Menu, Zap } from 'lucide-react';

export function OfficerNavbar() {
  return (
    <header className="fixed left-0 right-0 top-0 z-20 flex h-14 shrink-0 items-center justify-between border-b border-white/70 bg-white/[0.88] px-4 text-[#10233F] shadow-[0_1px_0_rgba(15,23,42,0.04)] backdrop-blur-xl lg:left-64 lg:px-6">
      <div className="flex items-center gap-3">
        <button className="rounded-lg bg-[#EAF3FF] p-2 text-[#45607F] lg:hidden" aria-label="Open menu">
          <Menu className="h-5 w-5" />
        </button>
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary-DEFAULT to-accent-cyan shadow-[0_10px_22px_rgba(37,99,235,0.22)] lg:hidden">
          <Zap className="h-4 w-4 text-white" />
        </div>
        <div>
          <span className="text-sm font-extrabold tracking-[-0.01em]">Officer Dashboard</span>
          <p className="hidden text-[11px] font-semibold text-[#647A9A] sm:block">Manage student resumes, ATS scores, and readiness filters</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Link href="/dashboard" className="rounded-lg bg-[#EAF3FF] px-3 py-2 text-xs font-extrabold text-[#07111F] transition-all hover:bg-gradient-to-br hover:from-[#1F5BE3] hover:to-[#1746BF] hover:text-white">
          Student View
        </Link>
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-primary-DEFAULT to-accent-cyan text-xs font-bold text-white shadow-[0_8px_20px_rgba(37,99,235,0.24)]">
          PO
        </div>
      </div>
    </header>
  );
}
