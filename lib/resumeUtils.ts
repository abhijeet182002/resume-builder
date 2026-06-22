import type { PersonalDetails, Education, Project, Experience, Certification } from '@/types/resume';

export function calculateCompletion(data: {
  personal: PersonalDetails;
  education: Education[];
  skills: string[];
  projects: Project[];
  experience: Experience[];
  certifications: Certification[];
  summary: string;
}): number {
  let score = 0;
  const max = 100;

  // Personal: 20pts
  const p = data.personal;
  const personalFields = [p.fullName, p.email, p.phone, p.city, p.linkedin, p.github, p.targetRole];
  const filledPersonal = personalFields.filter(Boolean).length;
  score += Math.round((filledPersonal / personalFields.length) * 20);

  // Summary: 10pts
  if (data.summary.length > 50) score += 10;
  else if (data.summary.length > 0) score += 5;

  // Education: 15pts
  if (data.education.length >= 2) score += 15;
  else if (data.education.length === 1) score += 8;

  // Skills: 15pts
  if (data.skills.length >= 8) score += 15;
  else if (data.skills.length >= 4) score += 8;
  else if (data.skills.length > 0) score += 4;

  // Projects: 20pts
  if (data.projects.length >= 3) score += 20;
  else if (data.projects.length === 2) score += 13;
  else if (data.projects.length === 1) score += 7;

  // Experience: 15pts
  if (data.experience.length >= 1) score += 15;

  // Certifications: 5pts
  if (data.certifications.length >= 1) score += 5;

  return Math.min(score, max);
}

export function formatDate(dateStr: string): string {
  return dateStr;
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}
