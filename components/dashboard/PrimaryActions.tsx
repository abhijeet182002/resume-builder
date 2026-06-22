'use client';
import Link from 'next/link';
import { ArrowRight, CloudUpload, Sparkles } from 'lucide-react';
import { SAMPLE_RESUME_ID } from '@/lib/constants';

export function PrimaryActions() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Link
        href="/resume/create"
        className="group relative isolate flex min-h-[124px] items-center justify-between overflow-hidden rounded-[12px] bg-gradient-to-br from-primary-DEFAULT to-primary-dark p-5 text-[#07111F] shadow-[0_1px_2px_rgba(15,23,42,0.08),0_18px_42px_rgba(37,99,235,0.26)] transition-all duration-200 hover:-translate-y-1 hover:from-[#1F5BE3] hover:to-[#1746BF] hover:text-white hover:shadow-[0_1px_2px_rgba(15,23,42,0.08),0_24px_54px_rgba(37,99,235,0.34)] active:scale-[0.98]"
      >
        <span className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_18%,rgba(255,255,255,0.16),transparent_30%)] opacity-70 transition-opacity duration-200 group-hover:opacity-35" />
        <div>
          <h4 className="text-base font-bold">Create Resume</h4>
          <p className="mt-1 max-w-[220px] text-xs leading-relaxed text-[#17233A] transition-colors duration-200 group-hover:text-blue-100">Start with a guided, campus-ready template</p>
        </div>
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#123FB3]/45 text-white ring-1 ring-white/15 transition-transform group-hover:translate-x-1 group-hover:bg-[#0F369A]/55">
          <ArrowRight className="h-5 w-5 shrink-0" />
        </span>
      </Link>

      <Link
        href="/resume/upload"
        className="group relative isolate flex min-h-[124px] items-center justify-between overflow-hidden rounded-[12px] border border-[#BFD7FF] bg-[#EAF3FF] p-5 text-[#10233F] shadow-[0_1px_2px_rgba(15,23,42,0.06),0_16px_38px_rgba(37,99,235,0.13)] transition-all duration-200 hover:-translate-y-1 hover:border-primary-DEFAULT hover:bg-[#DDEBFF] hover:shadow-[0_22px_48px_rgba(37,99,235,0.20)] active:scale-[0.98]"
      >
        <span className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_85%_15%,rgba(37,99,235,0.18),transparent_32%)] opacity-80 transition-opacity group-hover:opacity-100" />
        <div>
          <h4 className="text-base font-extrabold tracking-[-0.01em]">Upload Resume</h4>
          <p className="mt-1 max-w-[220px] text-xs leading-relaxed text-[#45607F]">Extract, review, and improve your existing document</p>
        </div>
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-DEFAULT text-white shadow-[0_10px_22px_rgba(37,99,235,0.28)] transition-transform group-hover:-translate-y-1 group-hover:scale-105">
          <CloudUpload className="h-5 w-5 shrink-0" />
        </span>
      </Link>

      <Link
        href={`/resume/${SAMPLE_RESUME_ID}/editor`}
        className="group relative isolate flex min-h-[124px] items-center justify-between overflow-hidden rounded-[12px] border border-cyan-200 bg-[#E7FBFF] p-5 text-[#083344] shadow-[0_1px_2px_rgba(15,23,42,0.06),0_16px_38px_rgba(6,182,212,0.14)] transition-all duration-200 hover:-translate-y-1 hover:border-accent-cyan hover:bg-[#D9F7FF] hover:shadow-[0_22px_48px_rgba(6,182,212,0.24)] active:scale-[0.98]"
      >
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_78%_18%,rgba(6,182,212,0.22),transparent_34%),linear-gradient(135deg,rgba(255,255,255,0.30),transparent)] opacity-90 transition-opacity group-hover:opacity-100" />
        <div className="relative z-10">
          <h4 className="text-base font-extrabold tracking-[-0.01em] text-[#06758A]">Improve with AI</h4>
          <p className="mt-1 max-w-[220px] text-xs leading-relaxed text-[#3E6E78]">Rewrite bullets, tailor keywords, and raise ATS score</p>
        </div>
        <span className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full bg-accent-cyan text-white shadow-[0_10px_22px_rgba(6,182,212,0.30)] transition-transform group-hover:rotate-6 group-hover:scale-105">
          <Sparkles className="h-5 w-5 shrink-0" />
        </span>
      </Link>
    </div>
  );
}
