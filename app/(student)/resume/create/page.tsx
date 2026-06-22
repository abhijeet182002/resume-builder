'use client';

import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Badge } from '@/components/ui/Badge';
import { WizardShell } from '@/components/wizard/WizardShell';
import { sampleEducation, sampleExperience, samplePersonal, sampleProjects, sampleSkills } from '@/lib/sampleData';
import { SAMPLE_RESUME_ID, SUGGESTED_SKILLS } from '@/lib/constants';

const titles = ['Personal Details', 'Education', 'Skills', 'Projects', 'Experience', 'Certifications', 'Generate'];

export default function CreateResumePage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [touched, setTouched] = useState(false);
  const [skills, setSkills] = useState(sampleSkills.slice(0, 8));
  const missingName = touched && step === 1 && !samplePersonal.fullName;
  const content = useMemo(() => {
    if (step === 1) {
      return (
        <div className="grid gap-4 sm:grid-cols-2">
          <Input label="Full Name" defaultValue={samplePersonal.fullName} error={missingName ? 'Full name is required' : undefined} />
          <Input label="Email" defaultValue={samplePersonal.email} />
          <Input label="Phone" defaultValue={samplePersonal.phone} />
          <Input label="LinkedIn" defaultValue={samplePersonal.linkedin} />
          <Input label="GitHub" defaultValue={samplePersonal.github} />
          <Input label="City" defaultValue={samplePersonal.city} />
          <Input className="sm:col-span-2" label="Target Role" defaultValue={samplePersonal.targetRole} />
        </div>
      );
    }
    if (step === 2) {
      return (
        <div className="space-y-4">
          {sampleEducation.map((education) => (
            <div key={education.id} className="grid gap-3 rounded-lg border border-border p-3 sm:grid-cols-2">
              <Input label="Institution" defaultValue={education.institution} />
              <Input label="Degree" defaultValue={education.degree} />
              <Input label="Branch" defaultValue={education.branch} />
              <Input label="Score" defaultValue={education.cgpa ?? `${education.percentage}%`} />
            </div>
          ))}
        </div>
      );
    }
    if (step === 3) {
      return (
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => <Badge key={skill} variant="blue">{skill}</Badge>)}
          </div>
          <div>
            <p className="mb-2 text-xs font-semibold text-text-muted">Suggested skills</p>
            <div className="flex flex-wrap gap-2">
              {SUGGESTED_SKILLS.slice(0, 12).map((skill) => (
                <button key={skill} onClick={() => setSkills((current) => current.includes(skill) ? current : [...current, skill])} className="rounded-full border border-border px-3 py-1 text-xs font-semibold text-text-secondary hover:border-primary-DEFAULT hover:text-primary-DEFAULT">
                  {skill}
                </button>
              ))}
            </div>
          </div>
        </div>
      );
    }
    if (step === 4) {
      return <div className="space-y-4">{sampleProjects.map((project) => <div key={project.id} className="rounded-lg border border-border p-3"><Input label="Project name" defaultValue={project.name} /><Textarea className="mt-3" label="Description" defaultValue={project.description} /><Input className="mt-3" label="GitHub link" defaultValue={project.githubLink} /></div>)}</div>;
    }
    if (step === 5) {
      const exp = sampleExperience[0];
      return <div className="grid gap-4 sm:grid-cols-2"><Input label="Company" defaultValue={exp.company} /><Input label="Role" defaultValue={exp.role} /><Input label="Duration" defaultValue={`${exp.startDate} - ${exp.endDate}`} /><Textarea className="sm:col-span-2" label="Description bullets" defaultValue={exp.description.join('\n')} /></div>;
    }
    if (step === 6) {
      return <div className="grid gap-4 sm:grid-cols-2"><Input label="Certification" defaultValue="AWS Certified Cloud Practitioner" /><Input label="Issuer" defaultValue="Amazon Web Services" /><Input label="Date" defaultValue="March 2024" /><Input label="Credential link" defaultValue="https://aws.amazon.com/certification/verify" /></div>;
    }
    return (
      <div className="grid gap-3 sm:grid-cols-2">
        {['Personal complete', '2 education entries', `${skills.length} skills`, '3 projects', '1 internship', '2 certifications'].map((item) => (
          <div key={item} className="rounded-lg border border-border bg-surface p-3 text-sm font-semibold text-text-primary">{item}</div>
        ))}
      </div>
    );
  }, [missingName, skills, step]);

  return (
    <WizardShell
      step={step}
      title={titles[step - 1]}
      footer={
        <div className="flex items-center justify-between gap-3">
          <Button variant="ghost" onClick={() => setStep((value) => Math.max(1, value - 1))}>Save Draft</Button>
          <Button onClick={() => {
            setTouched(true);
            if (step < 7) setStep((value) => value + 1);
            else router.push(`/resume/${SAMPLE_RESUME_ID}/editor`);
          }}>
            {step === 7 ? 'Generate Resume' : 'Next'}
          </Button>
        </div>
      }
    >
      {content}
    </WizardShell>
  );
}
