'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, CloudUpload, Sparkles, FilePlus, Download, Target } from 'lucide-react';
import { useUIStore } from '@/store/uiStore';

export function PrimaryActions() {
  const router = useRouter();
  const { showToast } = useUIStore();
  const [latestId, setLatestId] = useState<string | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    fetch('/api/dashboard/stats')
      .then(res => res.json())
      .then(data => {
        if (data && data.latestResumeId) {
          setLatestId(data.latestResumeId);
        }
      });
  }, []);

  const handleDownload = async () => {
    if (!latestId) {
      showToast('No resumes found to download.', 'error');
      return;
    }
    setIsDownloading(true);
    try {
      const res = await fetch(`/api/resume/${latestId}`);
      if (!res.ok) throw new Error();
      const { resume } = await res.json();
      const sections = resume.sections || {};
      const personal = sections.personal || {};
      const summary = sections.summary || '';
      const experience = sections.experience || [];
      const education = sections.education || [];
      const skills = sections.skills || [];
      const projects = sections.projects || [];
      const certifications = sections.certifications || [];
      
      const container = document.createElement('div');
      container.style.position = 'absolute';
      container.style.left = '-9999px';
      container.style.top = '-9999px';
      container.id = 'resume-preview-content';
      document.body.appendChild(container);

      const experienceHtml = (experience || []).map((exp: any) => `
        <div style="margin-bottom: 8px;">
          <div style="display: flex; justify-content: space-between; font-size: 11px; font-weight: bold;">
            <span>${exp.role || ''}</span>
            <span style="font-style: italic; font-weight: normal; font-size: 10px;">${exp.startDate || ''} - ${exp.current ? 'Present' : exp.endDate || ''}</span>
          </div>
          <p style="font-size: 11px; color: #2563EB; margin: 2px 0; font-weight: bold;">${exp.company || ''}</p>
          <ul style="font-size: 11px; color: #334155; margin: 4px 0 0 15px; padding: 0; list-style-type: disc;">
            ${(exp.bullets || []).map((b: string) => `<li>${b}</li>`).join('')}
          </ul>
        </div>
      `).join('');

      const educationHtml = (education || []).map((edu: any) => `
        <div style="margin-bottom: 8px;">
          <div style="display: flex; justify-content: space-between; font-size: 11px; font-weight: bold;">
            <span>${edu.institution || ''}</span>
            <span style="font-style: italic; font-weight: normal; font-size: 10px;">${edu.startDate || ''} - ${edu.endDate || ''}</span>
          </div>
          <p style="font-size: 11px; color: #475569; margin: 2px 0;">${edu.degree || ''} ${edu.field ? `in ${edu.field}` : ''} ${edu.cgpa ? `• CGPA: ${edu.cgpa}` : ''}</p>
        </div>
      `).join('');

      const skillsHtml = (skills || []).map((g: any) => {
        if (typeof g === 'string') {
          return `<span style="font-size: 11px; margin-right: 5px;">${g}</span>`;
        }
        return `
          <div style="font-size: 11px; margin-bottom: 3px;">
            <strong>${g.category || 'Skills'}:</strong> ${(g.skills || []).join(', ')}
          </div>
        `;
      }).join('');

      const projectsHtml = (projects || []).map((p: any) => `
        <div style="margin-bottom: 8px;">
          <div style="font-size: 11px; font-weight: bold;">${p.name || ''}</div>
          <p style="font-size: 10px; color: #2563EB; margin: 1px 0;">${(p.techStack || []).join(', ')}</p>
          <p style="font-size: 11px; color: #334155; margin: 2px 0;">${p.description || ''}</p>
        </div>
      `).join('');

      const certsHtml = (certifications || []).map((c: any) => `
        <div style="display: flex; justify-content: space-between; font-size: 11px; margin-bottom: 3px;">
          <span><strong>${c.name || ''}</strong> • ${c.issuer || ''}</span>
          <span style="font-size: 10px; color: #64748b;">${c.date || ''}</span>
        </div>
      `).join('');

      container.innerHTML = `
        <div style="font-family: Arial, sans-serif; color: #0F172A; padding: 40px; background: white; width: 180mm; min-height: 250mm;">
          <div style="text-align: center; border-bottom: 1px solid #e2e8f0; padding-bottom: 15px; margin-bottom: 15px;">
            <h1 style="font-size: 22px; font-weight: bold; margin: 0; color: #0f172a;">${personal.fullName || resume.title}</h1>
            <div style="font-size: 11px; color: #64748b; margin-top: 6px; display: flex; justify-content: center; gap: 8px;">
              ${personal.email ? `<span>${personal.email}</span>` : ''}
              ${personal.phone ? `<span>• ${personal.phone}</span>` : ''}
              ${personal.location ? `<span>• ${personal.location}</span>` : ''}
            </div>
          </div>
          ${summary ? `
            <div style="margin-bottom: 15px;">
              <h2 style="font-size: 10px; font-weight: bold; color: #2563EB; text-transform: uppercase; border-bottom: 1px solid #f1f5f9; padding-bottom: 2px; margin-bottom: 6px; tracking-widest: 0.1em;">Professional Summary</h2>
              <p style="font-size: 11px; line-height: 1.5; margin: 0; color: #334155;">${summary}</p>
            </div>
          ` : ''}
          ${experienceHtml ? `
            <div style="margin-bottom: 15px;">
              <h2 style="font-size: 10px; font-weight: bold; color: #2563EB; text-transform: uppercase; border-bottom: 1px solid #f1f5f9; padding-bottom: 2px; margin-bottom: 6px; tracking-widest: 0.1em;">Work Experience</h2>
              ${experienceHtml}
            </div>
          ` : ''}
          ${educationHtml ? `
            <div style="margin-bottom: 15px;">
              <h2 style="font-size: 10px; font-weight: bold; color: #2563EB; text-transform: uppercase; border-bottom: 1px solid #f1f5f9; padding-bottom: 2px; margin-bottom: 6px; tracking-widest: 0.1em;">Education</h2>
              ${educationHtml}
            </div>
          ` : ''}
          ${skillsHtml ? `
            <div style="margin-bottom: 15px;">
              <h2 style="font-size: 10px; font-weight: bold; color: #2563EB; text-transform: uppercase; border-bottom: 1px solid #f1f5f9; padding-bottom: 2px; margin-bottom: 6px; tracking-widest: 0.1em;">Technical Skills</h2>
              ${skillsHtml}
            </div>
          ` : ''}
          ${projectsHtml ? `
            <div style="margin-bottom: 15px;">
              <h2 style="font-size: 10px; font-weight: bold; color: #2563EB; text-transform: uppercase; border-bottom: 1px solid #f1f5f9; padding-bottom: 2px; margin-bottom: 6px; tracking-widest: 0.1em;">Projects</h2>
              ${projectsHtml}
            </div>
          ` : ''}
          ${certsHtml ? `
            <div style="margin-bottom: 15px;">
              <h2 style="font-size: 10px; font-weight: bold; color: #2563EB; text-transform: uppercase; border-bottom: 1px solid #f1f5f9; padding-bottom: 2px; margin-bottom: 6px; tracking-widest: 0.1em;">Certifications</h2>
              ${certsHtml}
            </div>
          ` : ''}
        </div>
      `;

      const html2pdf = (await import('html2pdf.js')).default;
      await html2pdf().set({
        margin: 0,
        filename: `resume-${resume.title || 'export'}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      }).from(container).save();

      document.body.removeChild(container);

      // Log download event
      await fetch(`/api/resume/${latestId}/download`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fileName: `resume-${resume.title}.pdf` }),
      });

      showToast('PDF downloaded successfully!', 'success');
    } catch {
      showToast('Failed to download resume. Please try from editor.', 'error');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Create Resume */}
      <button
        onClick={() => router.push('/resume/create')}
        className="text-left group relative isolate flex min-h-[124px] items-center justify-between overflow-hidden rounded-[12px] bg-gradient-to-br from-blue-600 to-indigo-650 p-5 text-white shadow-md transition-all duration-200 hover:-translate-y-1 active:scale-[0.98]"
      >
        <div>
          <h4 className="text-base font-bold">Create New Resume</h4>
          <p className="mt-1 max-w-[180px] text-xs leading-relaxed text-blue-100">Start with a guided template</p>
        </div>
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-transform group-hover:translate-x-1">
          <FilePlus className="h-5 w-5" />
        </span>
      </button>

      {/* Upload Resume */}
      <button
        onClick={() => router.push('/resume/upload')}
        className="text-left group relative isolate flex min-h-[124px] items-center justify-between overflow-hidden rounded-[12px] border border-[#BFD7FF] bg-[#EAF3FF] p-5 text-[#10233F] shadow-sm transition-all duration-200 hover:-translate-y-1 hover:bg-[#DDEBFF] active:scale-[0.98]"
      >
        <div>
          <h4 className="text-base font-extrabold">Upload Resume</h4>
          <p className="mt-1 max-w-[180px] text-xs leading-relaxed text-[#45607F]">Extract details from existing files</p>
        </div>
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-DEFAULT text-white shadow-md">
          <CloudUpload className="h-5 w-5" />
        </span>
      </button>

      {/* ATS Check */}
      <button
        onClick={() => {
          if (latestId) {
            router.push(`/resume/${latestId}/ats`);
          } else {
            showToast('Please create a resume first.', 'info');
          }
        }}
        className="text-left group relative isolate flex min-h-[124px] items-center justify-between overflow-hidden rounded-[12px] border border-cyan-200 bg-[#E7FBFF] p-5 text-[#083344] shadow-sm transition-all duration-200 hover:-translate-y-1 hover:bg-[#D9F7FF] active:scale-[0.98]"
      >
        <div>
          <h4 className="text-base font-extrabold text-[#06758A]">Run ATS Check</h4>
          <p className="mt-1 max-w-[180px] text-xs leading-relaxed text-[#3E6E78]">Audit score and keyword density</p>
        </div>
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#06B6D4] text-white">
          <Target className="h-5 w-5" />
        </span>
      </button>

      {/* Download Resume */}
      <button
        onClick={handleDownload}
        disabled={isDownloading}
        className="text-left group relative isolate flex min-h-[124px] items-center justify-between overflow-hidden rounded-[12px] border border-emerald-250 bg-[#EAFBF3] p-5 text-[#064E3B] shadow-sm transition-all duration-200 hover:-translate-y-1 hover:bg-[#DDFBEB] active:scale-[0.98] disabled:opacity-50"
      >
        <div>
          <h4 className="text-base font-extrabold text-[#047857]">Download Resume</h4>
          <p className="mt-1 max-w-[180px] text-xs leading-relaxed text-[#047857] opacity-80">
            {isDownloading ? 'Exporting PDF...' : 'Download latest PDF'}
          </p>
        </div>
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#10B981] text-white">
          <Download className="h-5 w-5" />
        </span>
      </button>
    </div>
  );
}
