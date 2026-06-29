'use client';
import { useResumeStore } from '@/store/resumeStore';

export function ResumePreview() {
  const resume = useResumeStore((s) => s.resume);
  const { personal, education, skills, projects, experience, certifications, summary, layout } = resume;

  const p = personal ?? { fullName: '', email: '', phone: '', location: '' };

  const style = layout ?? {
    themeColor: '#2563EB',
    fontSize: 'md',
    fontFamily: 'sans',
    lineHeight: 'normal',
    spacing: 'normal',
  };

  // Font family mappings
  const fontStyles = {
    sans: "font-sans style-sans",
    serif: "font-serif style-serif",
    mono: "font-mono style-mono",
    display: "font-sans tracking-wide style-display",
  };
  const fontClass = fontStyles[style.fontFamily] ?? 'font-sans';

  // Font size config
  const sizeStyles = {
    sm: { body: 'text-[10px]', sub: 'text-[9px]', head: 'text-[10px]', title: 'text-lg', label: 'text-[9px]' },
    md: { body: 'text-[11px]', sub: 'text-[10px]', head: 'text-xs', title: 'text-xl', label: 'text-[10px]' },
    lg: { body: 'text-[12px]', sub: 'text-[11px]', head: 'text-sm', title: 'text-2xl', label: 'text-[11px]' }
  };
  const size = sizeStyles[style.fontSize] ?? sizeStyles.md;

  // Line height config
  const lhStyles = {
    compact: 'leading-tight',
    normal: 'leading-normal',
    loose: 'leading-relaxed',
  };
  const lhClass = lhStyles[style.lineHeight] ?? 'leading-normal';

  // Margin/spacing config
  const spacingStyles = {
    compact: { mb: 'mb-2.5', space: 'space-y-1.5', p: 'p-4', gap: 'gap-y-1' },
    normal: { mb: 'mb-4', space: 'space-y-3', p: 'p-6', gap: 'gap-y-2' },
    loose: { mb: 'mb-6', space: 'space-y-4', p: 'p-8', gap: 'gap-y-3' },
  };
  const spacing = spacingStyles[style.spacing] ?? spacingStyles.normal;

  return (
    <div className={`w-full bg-white text-[#0F172A] ${fontClass} ${spacing.p} shadow-sm border border-slate-100 rounded-lg max-w-[800px] mx-auto transition-all`}>
      {/* Google Fonts Link */}
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Inconsolata:wght@400;700&family=Outfit:wght@400;500;700&display=swap"
        rel="stylesheet"
      />

      {/* Printable Area */}
      <div id="resume-preview-content" className={`bg-white print:p-0 print:shadow-none text-[#0F172A] ${lhClass}`}>
        {/* Header */}
        <div className={`text-center pb-3 border-b border-slate-200 ${spacing.mb}`}>
          <h1 className={`${size.title} font-bold tracking-tight text-slate-900`}>
            {p.fullName || 'Your Name'}
          </h1>
          <div className="flex flex-wrap justify-center gap-x-2.5 gap-y-1 text-[10px] mt-1 text-slate-500 font-medium">
            {p.email && <span>{p.email}</span>}
            {p.phone && <><span>•</span><span>{p.phone}</span></>}
            {p.location && <><span>•</span><span>{p.location}</span></>}
            {(p.socials?.linkedIn || (p as any).linkedIn) && (
              <><span>•</span><span>{p.socials?.linkedIn || (p as any).linkedIn}</span></>
            )}
            {(p.socials?.github || (p as any).github) && (
              <><span>•</span><span>{p.socials?.github || (p as any).github}</span></>
            )}
            {(p.socials?.portfolio || (p as any).portfolio) && (
              <><span>•</span><span>{p.socials?.portfolio || (p as any).portfolio}</span></>
            )}
          </div>
        </div>

        {/* Summary */}
        {summary && (
          <section className={spacing.mb}>
            <h2 
              className={`${size.label} font-bold uppercase tracking-widest border-b border-slate-100 pb-0.5 mb-1.5`}
              style={{ color: style.themeColor, borderColor: `${style.themeColor}20` }}
            >
              Professional Summary
            </h2>
            <p className={`${size.body} text-slate-700`}>{summary}</p>
          </section>
        )}

        {/* Experience */}
        {experience && experience.length > 0 && (
          <section className={spacing.mb}>
            <h2 
              className={`${size.label} font-bold uppercase tracking-widest border-b border-slate-100 pb-0.5 mb-1.5`}
              style={{ color: style.themeColor, borderColor: `${style.themeColor}20` }}
            >
              Experience
            </h2>
            <div className={spacing.space}>
              {experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline">
                    <h3 className={`${size.head} font-bold text-slate-800`}>{exp.role}</h3>
                    <span className="text-[9px] text-slate-500 italic">
                      {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  <p className={`${size.body} font-bold mb-1`} style={{ color: style.themeColor }}>{exp.company}</p>
                  {exp.bullets && exp.bullets.length > 0 && (
                    <ul className={`${size.body} text-slate-700 list-disc pl-4 space-y-0.5`}>
                      {exp.bullets.map((b, i) => b && <li key={i}>{b}</li>)}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {education && education.length > 0 && (
          <section className={spacing.mb}>
            <h2 
              className={`${size.label} font-bold uppercase tracking-widest border-b border-slate-100 pb-0.5 mb-1.5`}
              style={{ color: style.themeColor, borderColor: `${style.themeColor}20` }}
            >
              Education
            </h2>
            <div className={spacing.gap}>
              {education.map((edu) => (
                <div key={edu.id}>
                  <div className="flex justify-between items-baseline">
                    <h3 className={`${size.head} font-bold text-slate-800`}>{edu.institution}</h3>
                    <span className="text-[9px] text-slate-500 italic">
                      {edu.startDate} – {edu.endDate}
                    </span>
                  </div>
                  <p className={`${size.body} text-slate-600 font-medium`}>
                    {edu.degree}{edu.field && ` in ${edu.field}`}
                    {edu.cgpa && ` • Grade/CGPA: ${edu.cgpa}`}
                  </p>
                  {edu.highlights && (
                    <p className={`${size.body} text-slate-750 mt-1 pl-2.5 border-l border-slate-200 leading-relaxed whitespace-pre-wrap`}>
                      {edu.highlights}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {skills && skills.length > 0 && (
          <section className={spacing.mb}>
            <h2 
              className={`${size.label} font-bold uppercase tracking-widest border-b border-slate-100 pb-0.5 mb-1.5`}
              style={{ color: style.themeColor, borderColor: `${style.themeColor}20` }}
            >
              Technical Skills
            </h2>
            <div className={`${size.body} text-slate-700`}>
              {skills.join(', ')}
            </div>
          </section>
        )}

        {/* Projects */}
        {projects && projects.length > 0 && (
          <section className={spacing.mb}>
            <h2 
              className={`${size.label} font-bold uppercase tracking-widest border-b border-slate-100 pb-0.5 mb-1.5`}
              style={{ color: style.themeColor, borderColor: `${style.themeColor}20` }}
            >
              Projects
            </h2>
            <div className={spacing.space}>
              {projects.map((proj) => (
                <div key={proj.id}>
                  <div className="flex justify-between items-baseline">
                    <h3 className={`${size.head} font-bold text-slate-800`}>
                      {proj.name}
                      {proj.link && (
                        <span className="text-[9px] text-slate-400 font-normal normal-case ml-2">
                          ({proj.link})
                        </span>
                      )}
                    </h3>
                  </div>
                  <p className="text-[9px] font-bold mb-0.5" style={{ color: style.themeColor }}>
                    {proj.techStack.join(', ')}
                  </p>
                  <p className={`${size.body} text-slate-700`}>{proj.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Certifications */}
        {certifications && certifications.length > 0 && (
          <section className="mb-2">
            <h2 
              className={`${size.label} font-bold uppercase tracking-widest border-b border-slate-100 pb-0.5 mb-1.5`}
              style={{ color: style.themeColor, borderColor: `${style.themeColor}20` }}
            >
              Certifications
            </h2>
            <div className="space-y-1">
              {certifications.map((cert) => (
                <div key={cert.id} className="flex justify-between items-baseline">
                  <span className={`${size.body} font-bold text-slate-800`}>
                    {cert.name}
                    {cert.credentialUrl && (
                      <span className="text-[8px] text-slate-400 font-normal ml-1">
                        ({cert.credentialUrl})
                      </span>
                    )}
                  </span>
                  <span className="text-[9px] text-slate-500">
                    {cert.issuer} • {cert.date}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Font Family Helper Styles & Print Media Queries */}
      <style jsx global>{`
        .style-sans {
          font-family: 'Inter', sans-serif !important;
        }
        .style-serif {
          font-family: 'Playfair Display', Georgia, serif !important;
        }
        .style-mono {
          font-family: 'Inconsolata', monospace !important;
        }
        .style-display {
          font-family: 'Outfit', sans-serif !important;
        }
        @media print {
          body {
            background: white !important;
          }
          #resume-preview-content {
            width: 210mm;
            min-height: 297mm;
            padding: 20mm !important;
            margin: 0 !important;
            box-shadow: none !important;
            border: none !important;
          }
        }
      `}</style>
    </div>
  );
}
