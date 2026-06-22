export const ROUTES = {
  LOGIN: '/login',
  ONBOARDING: '/onboarding',
  DASHBOARD: '/dashboard',
  RESUME_CREATE: '/resume/create',
  RESUME_UPLOAD: '/resume/upload',
  RESUME_EDITOR: (id: string) => `/resume/${id}/editor`,
  RESUME_ATS: (id: string) => `/resume/${id}/ats`,
  PLACEMENT_READINESS: '/placement-readiness',
  DOWNLOADS: '/downloads',
  SETTINGS: '/settings',
  OFFICER_DASHBOARD: '/admin/dashboard',
} as const;

export const SAMPLE_RESUME_ID = 'resume-001';

export const RESUME_SECTIONS = [
  { key: 'personal', label: 'Personal Info', icon: 'User' },
  { key: 'summary', label: 'Summary', icon: 'FileText' },
  { key: 'education', label: 'Education', icon: 'GraduationCap' },
  { key: 'skills', label: 'Skills', icon: 'Zap' },
  { key: 'projects', label: 'Projects', icon: 'FolderGit2' },
  { key: 'experience', label: 'Experience', icon: 'Briefcase' },
  { key: 'certifications', label: 'Certifications', icon: 'Award' },
] as const;

export const SUGGESTED_SKILLS = [
  'React', 'Next.js', 'TypeScript', 'JavaScript', 'Node.js', 'Python',
  'Java', 'C++', 'MongoDB', 'PostgreSQL', 'MySQL', 'Redis',
  'Docker', 'Kubernetes', 'AWS', 'GCP', 'Azure', 'Git',
  'REST API', 'GraphQL', 'Figma', 'TailwindCSS', 'Express.js',
  'FastAPI', 'Django', 'Machine Learning', 'Data Structures', 'Algorithms',
  'System Design', 'CI/CD', 'Agile', 'Scrum', 'Linux',
];
