'use client';

import { useMemo, useState } from 'react';
import {
  Briefcase,
  Users,
  ArrowRight,
  Sparkles,
  TrendingUp,
} from 'lucide-react';
import { sampleOfficerStudents } from '@/lib/sampleData';
import { cn } from '@/lib/utils';

/* ---------------- JOB DATA ---------------- */
const jobs = [
  { id: 1, title: 'Frontend Developer', company: 'Google', field: 'CSE' },
  { id: 2, title: 'Backend Engineer', company: 'Amazon', field: 'CSE' },
  { id: 3, title: 'Data Analyst', company: 'Microsoft', field: 'Data' },
  { id: 4, title: 'Mechanical Engineer', company: 'Tata Motors', field: 'Mechanical' },
];

export default function MatchedJobsPage() {
  const [selectedJob, setSelectedJob] = useState(jobs[0]);

  const matchedStudents = useMemo(() => {
    return sampleOfficerStudents.filter((student) =>
      student.branch.toLowerCase().includes(selectedJob.field.toLowerCase())
    );
  }, [selectedJob]);

  return (
    <div className="space-y-6">

      {/* HERO HEADER */}
      <div className="relative overflow-hidden rounded-2xl p-6 
      bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-xl">

        <div className="absolute right-0 top-0 h-32 w-32 bg-white/10 blur-2xl rounded-full" />

        <div className="flex items-center gap-3 mb-2">
          <Sparkles className="h-5 w-5" />
          <p className="text-xs uppercase tracking-widest opacity-80">
            Smart Matching
          </p>
        </div>

        <h1 className="text-2xl font-extrabold">
          Matched Jobs & Students
        </h1>

        <p className="text-sm opacity-90 mt-1">
          AI-powered job-to-student matching based on field & ATS score
        </p>
      </div>

      {/* JOB CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {jobs.map((job) => {
          const isActive = selectedJob.id === job.id;

          return (
            <div
              key={job.id}
              onClick={() => setSelectedJob(job)}
              className={cn(
                'group cursor-pointer rounded-2xl p-4 border transition-all duration-300 backdrop-blur-lg',
                isActive
                  ? 'bg-gradient-to-br from-blue-600 to-cyan-500 text-white shadow-xl scale-[1.02]'
                  : 'bg-white/70 border-[#DCE9FF] hover:shadow-lg hover:-translate-y-1'
              )}
            >
              <div className="flex items-center justify-between mb-3">
                <Briefcase className="h-5 w-5" />
                <ArrowRight className="h-4 w-4 opacity-60 group-hover:translate-x-1 transition" />
              </div>

              <h3 className="font-bold text-sm">{job.title}</h3>
              <p className="text-xs opacity-80">{job.company}</p>

              <div className="mt-3 text-xs font-semibold opacity-90">
                {job.field}
              </div>
            </div>
          );
        })}
      </div>

      {/* SELECTED JOB STATS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {/* JOB INFO */}
        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <p className="text-xs text-[#647A9A] font-bold mb-1">
            Selected Job
          </p>
          <h2 className="text-xl font-extrabold text-[#10233F]">
            {selectedJob.title}
          </h2>
          <p className="text-sm text-[#45607F]">
            {selectedJob.company} • {selectedJob.field}
          </p>
        </div>

        {/* STUDENT COUNT */}
        <div className="rounded-2xl bg-gradient-to-r from-[#EAF3FF] to-[#F5FAFF] p-5 border shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-[#647A9A]">
              Matched Students
            </p>
            <p className="text-2xl font-extrabold text-[#10233F]">
              {matchedStudents.length}
            </p>
          </div>
          <Users className="h-8 w-8 text-blue-600" />
        </div>
      </div>

      {/* STUDENT LIST */}
      <div className="rounded-2xl border bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-[#10233F]">
            Student Matches
          </h3>
          <TrendingUp className="h-5 w-5 text-blue-600" />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {matchedStudents.map((student) => (
            <div
              key={student.id}
              className="rounded-xl border border-[#E6EEFF] p-4 hover:shadow-md hover:-translate-y-1 transition bg-[#FAFCFF]"
            >
              <div className="flex items-center justify-between mb-2">
                <p className="font-semibold text-[#10233F]">
                  {student.name}
                </p>
                <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-600 font-bold">
                  ATS {student.atsScore}
                </span>
              </div>

              <p className="text-xs text-[#647A9A]">
                {student.branch} • {student.year}
              </p>

              {/* PROGRESS BAR */}
              <div className="mt-3 h-2 w-full bg-[#E6EEFF] rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-cyan-400"
                  style={{ width: `${student.atsScore}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        {matchedStudents.length === 0 && (
          <p className="text-center text-sm text-[#647A9A] py-6">
            No students matched
          </p>
        )}
      </div>
    </div>
  );
}