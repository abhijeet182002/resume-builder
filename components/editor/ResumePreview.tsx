'use client';
import { useResumeSync } from '@/hooks/useResumeSync';

export function ResumePreview() {
  const { personal, education, skills, projects, experience, certifications, summary } = useResumeSync();

  return (
    <div className="w-full bg-white font-sans text-[#0F172A]">
      {/* Header */}
      <div className="text-center pb-5 border-b border-slate-200 mb-5">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          {personal.fullName || 'Your Name'}
        </h1>
        {personal.targetRole && (
          <p className="text-xs text-slate-500 uppercase tracking-widest mt-1 font-medium">
            {personal.targetRole}
          </p>
        )}
        <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 text-xs mt-2 text-slate-500">
          {personal.email && <span>{personal.email}</span>}
          {personal.phone && <><span>•</span><span>{personal.phone}</span></>}
          {personal.city && <><span>•</span><span>{personal.city}</span></>}
          {personal.linkedin && <><span>•</span><span>{personal.linkedin}</span></>}
          {personal.github && <><span>•</span><span>{personal.github}</span></>}
        </div>
      </div>

      {/* Summary */}
      {summary && (
        <section className="mb-5">
          <h2 className="text-[10px] font-bold text-[#2563EB] uppercase tracking-widest border-b border-slate-100 pb-1 mb-2">
            Professional Summary
          </h2>
          <p className="text-xs text-slate-700 leading-relaxed">{summary}</p>
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section className="mb-5">
          <h2 className="text-[10px] font-bold text-[#2563EB] uppercase tracking-widest border-b border-slate-100 pb-1 mb-2">
            Education
          </h2>
          <div className="space-y-2">
            {education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-baseline">
                  <h3 className="text-xs font-bold text-slate-800">{edu.institution}</h3>
                  <span className="text-[10px] text-slate-500 italic">{edu.startYear} – {edu.endYear}</span>
                </div>
                <p className="text-[10px] text-slate-600">
                  {edu.degree}{edu.branch && ` • ${edu.branch}`}
                  {edu.cgpa && ` • CGPA: ${edu.cgpa}`}
                  {edu.percentage && ` • ${edu.percentage}%`}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <section className="mb-5">
          <h2 className="text-[10px] font-bold text-[#2563EB] uppercase tracking-widest border-b border-slate-100 pb-1 mb-2">
            Technical Skills
          </h2>
          <p className="text-xs text-slate-700 leading-relaxed">{skills.join(' • ')}</p>
        </section>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <section className="mb-5">
          <h2 className="text-[10px] font-bold text-[#2563EB] uppercase tracking-widest border-b border-slate-100 pb-1 mb-2">
            Experience
          </h2>
          <div className="space-y-3">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline">
                  <h3 className="text-xs font-bold text-slate-800">{exp.role}</h3>
                  <span className="text-[10px] text-slate-500 italic">{exp.startDate} – {exp.isCurrent ? 'Present' : exp.endDate}</span>
                </div>
                <p className="text-[10px] text-[#2563EB] font-bold mb-1">{exp.company}</p>
                <ul className="text-[10px] text-slate-700 list-disc pl-3 space-y-0.5 leading-relaxed">
                  {exp.description.map((d, i) => <li key={i}>{d}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <section className="mb-5">
          <h2 className="text-[10px] font-bold text-[#2563EB] uppercase tracking-widest border-b border-slate-100 pb-1 mb-2">
            Projects
          </h2>
          <div className="space-y-3">
            {projects.map((proj) => (
              <div key={proj.id}>
                <div className="flex justify-between items-baseline">
                  <h3 className="text-xs font-bold text-slate-800">{proj.name}</h3>
                  {proj.githubLink && (
                    <span className="text-[10px] text-[#2563EB]">GitHub</span>
                  )}
                </div>
                <p className="text-[10px] text-[#2563EB] font-medium mb-0.5">{proj.techStack.join(', ')}</p>
                <p className="text-[10px] text-slate-700 leading-relaxed">{proj.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Certifications */}
      {certifications.length > 0 && (
        <section className="mb-2">
          <h2 className="text-[10px] font-bold text-[#2563EB] uppercase tracking-widest border-b border-slate-100 pb-1 mb-2">
            Certifications
          </h2>
          <div className="space-y-1">
            {certifications.map((cert) => (
              <div key={cert.id} className="flex justify-between items-baseline">
                <span className="text-xs font-medium text-slate-800">{cert.name}</span>
                <span className="text-[10px] text-slate-500">{cert.issuer} • {cert.date}</span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
