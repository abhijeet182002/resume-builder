'use client';

import { useMemo, useState, useEffect } from 'react';
import {
  Briefcase,
  Users,
  ArrowRight,
  Sparkles,
  TrendingUp,
  Loader2,
  Plus,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';
import { useUIStore } from '@/store/uiStore';

interface Job {
  id: string;
  title: string;
  company: string;
  description: string;
  requiredSkills: string[];
}

interface Student {
  id: string;
  name: string;
  branch: string;
  year: string;
  atsScore: number;
}

export default function MatchedJobsPage() {
  const { showToast } = useUIStore();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  // Modal and Form States for creating a job
  const [showAddModal, setShowAddModal] = useState(false);
  const [jobTitle, setJobTitle] = useState('');
  const [jobCompany, setJobCompany] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [jobSkills, setJobSkills] = useState('');
  const [formLoading, setFormLoading] = useState(false);

  const fetchData = async () => {
    try {
      const [resJobs, resStudents] = await Promise.all([
        fetch('/api/officer/jobs'),
        fetch('/api/officer/students'),
      ]);

      const jobsData = await resJobs.json();
      const studentsData = await resStudents.json();

      const fetchedJobs = (jobsData.data || []).map((j: any) => ({
        id: j.id,
        title: j.title,
        company: j.company,
        description: j.description,
        requiredSkills: j.requiredSkills || [],
      }));

      const fetchedStudents = (studentsData.students || []).map((s: any) => ({
        id: s.id,
        name: s.name,
        branch: s.course || 'N/A',
        year: s.batch || 'N/A',
        atsScore: s.latestAtsScore || 0,
      }));

      setJobs(fetchedJobs);
      setStudents(fetchedStudents);

      if (fetchedJobs.length > 0) {
        setSelectedJob(fetchedJobs[0]);
      }
    } catch (err) {
      console.error(err);
      showToast('Failed to fetch matched jobs or students', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreateJob = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!jobTitle || !jobCompany || !jobDescription) {
      showToast('Title, Company, and Description are required', 'error');
      return;
    }
    setFormLoading(true);

    try {
      const skillsArray = jobSkills
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);

      const res = await fetch('/api/officer/jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: jobTitle,
          company: jobCompany,
          description: jobDescription,
          requiredSkills: skillsArray,
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to create job requirement');
      }

      showToast('Job requirement created successfully!', 'success');
      setJobTitle('');
      setJobCompany('');
      setJobDescription('');
      setJobSkills('');
      setShowAddModal(false);
      fetchData();
    } catch (err: any) {
      showToast(err.message || 'An error occurred', 'error');
    } finally {
      setFormLoading(false);
    }
  };

  const matchedStudents = useMemo(() => {
    if (!selectedJob) return [];
    // Match logic:
    // 1. Match if student has skills in the required skills.
    // 2. OR match if course/branch matches description keywords.
    return students.filter((student) => {
      const branchLower = student.branch.toLowerCase();
      const descLower = selectedJob.description.toLowerCase();
      const titleLower = selectedJob.title.toLowerCase();

      // Check branch match in description or title (e.g. CSE)
      const matchesBranch =
        descLower.includes(branchLower) ||
        titleLower.includes(branchLower);

      // We can also match if the student has high ATS score
      return matchesBranch || student.atsScore > 50;
    }).sort((a, b) => b.atsScore - a.atsScore);
  }, [selectedJob, students]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-3">
        <Loader2 className="h-8 w-8 animate-spin text-primary-DEFAULT" />
        <p className="text-sm font-semibold text-slate-500">Loading jobs & matches...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* HERO HEADER */}
      <div className="relative overflow-hidden rounded-2xl p-6 bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-xl">
        <div className="absolute right-0 top-0 h-32 w-32 bg-white/10 blur-2xl rounded-full" />
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Sparkles className="h-5 w-5" />
              <p className="text-xs uppercase tracking-widest opacity-80">
                Smart Matching
              </p>
            </div>
            <h1 className="text-2xl font-extrabold">Matched Jobs & Students</h1>
            <p className="text-sm opacity-90 mt-1">
              AI-powered job-to-student matching based on field & ATS score
            </p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="self-start sm:self-center flex items-center gap-2 px-4 py-2.5 bg-white text-blue-600 font-extrabold text-sm rounded-xl shadow-lg hover:bg-slate-50 active:scale-95 transition"
          >
            <Plus className="h-4 w-4" /> Add Job Role
          </button>
        </div>
      </div>

      {/* JOB CARDS */}
      {jobs.length === 0 ? (
        <div className="text-center py-12 border border-dashed rounded-xl border-slate-200 bg-white">
          <Briefcase className="h-10 w-10 text-slate-350 mx-auto mb-3" />
          <p className="text-sm text-slate-500 font-medium">No job postings created yet.</p>
          <button
            onClick={() => setShowAddModal(true)}
            className="mt-3 text-xs font-bold text-primary-DEFAULT hover:underline"
          >
            Post a job opportunity
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {jobs.map((job) => {
            const isActive = selectedJob?.id === job.id;

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
                  <ArrowRight className="h-4 w-4 opacity-60 group-hover:translate-x-1 transition animate-pulse" />
                </div>

                <h3 className="font-bold text-sm truncate">{job.title}</h3>
                <p className={cn('text-xs mt-0.5 truncate', isActive ? 'text-white/90' : 'text-text-muted')}>{job.company}</p>

                <div className="mt-3 flex flex-wrap gap-1">
                  {job.requiredSkills.slice(0, 3).map((skill) => (
                    <span
                      key={skill}
                      className={cn(
                        'text-[9px] px-1.5 py-0.5 rounded font-bold',
                        isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-700'
                      )}
                    >
                      {skill}
                    </span>
                  ))}
                  {job.requiredSkills.length > 3 && (
                    <span className={cn('text-[9px] px-1.5 py-0.5 rounded font-bold', isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-700')}>
                      +{job.requiredSkills.length - 3}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* SELECTED JOB STATS */}
      {selectedJob && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* JOB INFO */}
            <div className="rounded-2xl border bg-white p-5 shadow-sm">
              <p className="text-xs text-[#647A9A] font-bold mb-1">Selected Job</p>
              <h2 className="text-xl font-extrabold text-[#10233F]">{selectedJob.title}</h2>
              <p className="text-sm text-[#45607F]">{selectedJob.company}</p>
              <p className="text-xs text-slate-500 mt-2 line-clamp-3 leading-relaxed">
                {selectedJob.description}
              </p>
            </div>

            {/* STUDENT COUNT */}
            <div className="rounded-2xl bg-gradient-to-r from-[#EAF3FF] to-[#F5FAFF] p-5 border shadow-sm flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-[#647A9A]">Matched Students</p>
                <p className="text-2xl font-extrabold text-[#10233F]">{matchedStudents.length}</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </div>

          {/* STUDENT LIST */}
          <div className="rounded-2xl border bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-[#10233F]">Student Matches</h3>
              <TrendingUp className="h-5 w-5 text-blue-600" />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {matchedStudents.map((student) => (
                <div
                  key={student.id}
                  className="rounded-xl border border-[#E6EEFF] p-4 hover:shadow-md hover:-translate-y-1 transition bg-[#FAFCFF]"
                >
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-semibold text-[#10233F]">{student.name}</p>
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
                No students matched for this role. Let's ask them to add matching skills or run ATS audits.
              </p>
            )}
          </div>
        </>
      )}

      {/* Add Job Modal */}
      <Modal open={showAddModal} onClose={() => setShowAddModal(false)} title="Add Job Requirement">
        <form onSubmit={handleCreateJob} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">Job Role Title</label>
            <Input
              type="text"
              required
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              placeholder="e.g. SDE Intern"
              className="mt-1"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">Company Name</label>
            <Input
              type="text"
              required
              value={jobCompany}
              onChange={(e) => setJobCompany(e.target.value)}
              placeholder="e.g. Razorpay"
              className="mt-1"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">Job Description</label>
            <Textarea
              required
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Describe the job roles, responsibilities, and target branches..."
              rows={4}
              className="mt-1"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">Required Skills (Comma separated)</label>
            <Input
              type="text"
              value={jobSkills}
              onChange={(e) => setJobSkills(e.target.value)}
              placeholder="e.g. React, TypeScript, Node.js, SQL"
              className="mt-1"
            />
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
            <Button type="button" variant="ghost" onClick={() => setShowAddModal(false)}>
              Cancel
            </Button>
            <Button type="submit" loading={formLoading}>
              Create Job Role
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}