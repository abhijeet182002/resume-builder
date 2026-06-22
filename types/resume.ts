export interface PersonalDetails {
  fullName: string;
  email: string;
  phone: string;
  city: string;
  linkedin: string;
  github: string;
  targetRole: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  branch: string;
  startYear: string;
  endYear: string;
  cgpa?: string;
  percentage?: string;
  type: 'college' | 'school';
}

export interface Project {
  id: string;
  name: string;
  description: string;
  techStack: string[];
  githubLink: string;
  liveLink: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  description: string[];
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  credentialLink: string;
}

export type ResumeSection =
  | 'personal'
  | 'summary'
  | 'education'
  | 'skills'
  | 'projects'
  | 'experience'
  | 'certifications';
