'use client';

import { useMemo, useState } from 'react';
import { Search, Users } from 'lucide-react';
import { FilterBar, type OfficerFilters } from '@/components/officer/FilterBar';
import { OfficerStatCards } from '@/components/officer/OfficerStatCards';
import { StudentTable } from '@/components/officer/StudentTable';
import { Input } from '@/components/ui/Input';
import { sampleOfficerStudents } from '@/lib/sampleData';

export default function OfficerDashboardPage() {
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState<OfficerFilters>({ branch: 'All', year: 'All', score: 'All', status: 'All' });
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const students = useMemo(() => sampleOfficerStudents.filter((student) => {
    const matchesQuery = [student.name, student.branch, student.year].join(' ').toLowerCase().includes(query.toLowerCase());
    const matchesBranch = filters.branch === 'All' || student.branch === filters.branch;
    const matchesYear = filters.year === 'All' || student.year === filters.year;
    const matchesStatus = filters.status === 'All' || student.resumeStatus === filters.status;
    const matchesScore =
      filters.score === 'All' ||
      (filters.score === 'Below 50' && student.atsScore < 50) ||
      (filters.score === '50-70' && student.atsScore >= 50 && student.atsScore <= 70) ||
      (filters.score === 'Above 70' && student.atsScore > 70);
    return matchesQuery && matchesBranch && matchesYear && matchesStatus && matchesScore;
  }), [filters, query]);
  const totalPages = Math.max(1, Math.ceil(students.length / pageSize));
  const paginatedStudents = students.slice((page - 1) * pageSize, page * pageSize);

  const updateFilters = (nextFilters: OfficerFilters) => {
    setFilters(nextFilters);
    setPage(1);
  };

  return (
    <div className="space-y-5">
      <section className="relative isolate overflow-hidden rounded-[16px] border border-[#BFD7FF] bg-[#EAF3FF] p-6 shadow-[0_1px_2px_rgba(15,23,42,0.06),0_18px_42px_rgba(37,99,235,0.12)]">
        <div className="absolute right-8 top-6 -z-10 h-32 w-32 rounded-full bg-primary-DEFAULT/15 blur-2xl" />
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#647A9A]">Officer workspace</p>
            <h1 className="mt-1 text-3xl font-extrabold tracking-[-0.04em] text-[#10233F]">Student resume overview</h1>
            <p className="mt-2 max-w-2xl text-sm font-medium leading-relaxed text-[#45607F]">
              Search, filter, and monitor ATS readiness across submitted campus resumes.
            </p>
          </div>
          <div className="flex items-center gap-3 rounded-[14px] border border-white/70 bg-white/75 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.70),0_14px_32px_rgba(37,99,235,0.10)]">
            <Users className="h-5 w-5 text-primary-DEFAULT" />
            <div>
              <p className="text-xs font-bold text-[#647A9A]">Visible students</p>
              <p className="text-xl font-extrabold text-[#10233F]">{students.length}</p>
            </div>
          </div>
        </div>
      </section>
      <OfficerStatCards />
      <div className="relative rounded-[14px] border border-[#CFE0F7] bg-[#F7FAFF] p-2 shadow-[0_1px_2px_rgba(15,23,42,0.06),0_16px_38px_rgba(37,99,235,0.08)]">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
        <Input value={query} onChange={(event) => { setQuery(event.target.value); setPage(1); }} placeholder="Search by name, roll number, or branch..." className="border-transparent bg-transparent pl-10 shadow-none" />
      </div>
      <FilterBar filters={filters} onChange={updateFilters} />
      <StudentTable students={paginatedStudents} />
      <div className="flex flex-col gap-3 rounded-[14px] border border-[#CFE0F7] bg-[#F7FAFF] p-4 text-sm font-bold text-[#45607F] shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <span>Showing {paginatedStudents.length} of {students.length} students - Page {page} of {totalPages}</span>
        <div className="flex gap-2">
          <button
            disabled={page === 1}
            onClick={() => setPage((value) => Math.max(1, value - 1))}
            className="rounded-lg bg-[#DDEBFF] px-4 py-2 text-[#07111F] transition hover:bg-primary-DEFAULT hover:text-white disabled:cursor-not-allowed disabled:opacity-45"
          >
            Prev
          </button>
          <button
            disabled={page === totalPages}
            onClick={() => setPage((value) => Math.min(totalPages, value + 1))}
            className="rounded-lg bg-[#DDEBFF] px-4 py-2 text-[#07111F] transition hover:bg-primary-DEFAULT hover:text-white disabled:cursor-not-allowed disabled:opacity-45"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
