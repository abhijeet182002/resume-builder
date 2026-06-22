import type { PersonalDetails, Education, Project, Experience, Certification } from '@/types/resume';
import type { ATSSuggestion } from '@/types/ats';
import type { OfficerStudent } from '@/types/officer';

export const samplePersonal: PersonalDetails = {
  fullName: 'Arjun Sharma',
  email: 'arjun.sharma@iitd.ac.in',
  phone: '+91 98765 43210',
  city: 'New Delhi',
  linkedin: 'linkedin.com/in/arjunsharma',
  github: 'github.com/arjunsharma',
  targetRole: 'Software Engineer',
};

export const sampleEducation: Education[] = [
  {
    id: 'edu-1',
    institution: 'Indian Institute of Technology Delhi',
    degree: 'B.Tech',
    branch: 'Computer Science Engineering',
    startYear: '2022',
    endYear: '2026',
    cgpa: '8.4',
    type: 'college',
  },
  {
    id: 'edu-2',
    institution: 'Delhi Public School, R.K. Puram',
    degree: 'Class XII (CBSE)',
    branch: 'Science (PCM + CS)',
    startYear: '2020',
    endYear: '2022',
    percentage: '94.2',
    type: 'school',
  },
];

export const sampleSkills: string[] = [
  'React', 'Next.js', 'TypeScript', 'Node.js', 'Python',
  'MongoDB', 'PostgreSQL', 'Docker', 'Git', 'Figma',
  'REST API', 'Agile',
];

export const sampleProjects: Project[] = [
  {
    id: 'proj-1',
    name: 'StudySync — AI-Powered Study Planner',
    description: 'Built a full-stack study planning platform using Next.js and OpenAI API that generates personalized study schedules. Implemented smart reminders, progress tracking, and adaptive difficulty adjustment. Used by 500+ students across IIT Delhi.',
    techStack: ['Next.js', 'TypeScript', 'OpenAI API', 'PostgreSQL', 'Prisma', 'TailwindCSS'],
    githubLink: 'https://github.com/arjunsharma/studysync',
    liveLink: 'https://studysync-iitd.vercel.app',
  },
  {
    id: 'proj-2',
    name: 'CampusCart — Campus Marketplace',
    description: 'Developed a peer-to-peer marketplace for college students to buy and sell items. Features real-time chat, image uploads, and geolocation-based search. Achieved 98% uptime with Redis caching and optimized database queries.',
    techStack: ['React', 'Node.js', 'MongoDB', 'Socket.io', 'Redis', 'AWS S3'],
    githubLink: 'https://github.com/arjunsharma/campuscart',
    liveLink: 'https://campuscart.in',
  },
  {
    id: 'proj-3',
    name: 'CodeCollab — Real-time Code Editor',
    description: 'Created a collaborative code editor with real-time synchronization using WebSockets. Supports 10+ programming languages with syntax highlighting and live code execution via Docker sandboxing. Handles 50+ concurrent users.',
    techStack: ['React', 'TypeScript', 'WebSocket', 'Python', 'Docker', 'Monaco Editor'],
    githubLink: 'https://github.com/arjunsharma/codecollab',
    liveLink: '',
  },
];

export const sampleExperience: Experience[] = [
  {
    id: 'exp-1',
    company: 'Razorpay',
    role: 'Software Engineering Intern',
    startDate: 'May 2024',
    endDate: 'Jul 2024',
    isCurrent: false,
    description: [
      'Developed and shipped 3 major features for the Razorpay Dashboard using React and TypeScript, directly impacting 2M+ merchant accounts.',
      'Optimized API response times by 40% through query optimization and Redis caching strategies.',
      'Wrote comprehensive unit and integration tests achieving 92% code coverage using Jest and React Testing Library.',
      'Collaborated with senior engineers in Agile sprints, participating in code reviews and technical design discussions.',
    ],
  },
];

export const sampleCertifications: Certification[] = [
  {
    id: 'cert-1',
    name: 'AWS Certified Cloud Practitioner',
    issuer: 'Amazon Web Services',
    date: 'March 2024',
    credentialLink: 'https://aws.amazon.com/certification/verify',
  },
  {
    id: 'cert-2',
    name: 'Meta React Developer Certificate',
    issuer: 'Meta (Coursera)',
    date: 'January 2024',
    credentialLink: 'https://coursera.org/verify/meta-react',
  },
];

export const sampleSummary =
  'Passionate Computer Science undergraduate at IIT Delhi with hands-on experience in full-stack development and cloud technologies. Proven track record of building scalable applications used by thousands of users. Seeking to leverage strong problem-solving skills and modern web development expertise in a high-growth engineering environment.';

export const sampleATSSuggestions: ATSSuggestion[] = [
  {
    id: 'sug-1',
    priority: 'High',
    title: 'Add Docker to Skills Section',
    description: 'Docker is listed in 78% of SWE job descriptions. You have project experience — add it explicitly.',
    section: 'skills',
  },
  {
    id: 'sug-2',
    priority: 'High',
    title: 'Add Kubernetes Keyword',
    description: 'Kubernetes appears in 65% of target roles. Mention it in your internship description.',
    section: 'experience',
  },
  {
    id: 'sug-3',
    priority: 'Medium',
    title: 'Quantify Project Impact',
    description: 'Add measurable metrics to StudySync project (e.g., "reduced study time by 30%").',
    section: 'projects',
  },
  {
    id: 'sug-4',
    priority: 'Low',
    title: 'Complete LinkedIn URL',
    description: 'Your LinkedIn URL is incomplete. Add the full URL for better ATS parsing.',
    section: 'personal',
  },
];

export const sampleOfficerStudents: OfficerStudent[] = [
  { id: 'st-1', name: 'Arjun Sharma', initials: 'AS', branch: 'CSE', year: '3rd', resumeStatus: 'Submitted', atsScore: 74, placementReady: true, lastUpdated: '2 days ago' },
  { id: 'st-2', name: 'Priya Nair', initials: 'PN', branch: 'ECE', year: '4th', resumeStatus: 'Submitted', atsScore: 88, placementReady: true, lastUpdated: '1 day ago' },
  { id: 'st-3', name: 'Rohit Verma', initials: 'RV', branch: 'ME', year: '3rd', resumeStatus: 'Draft', atsScore: 55, placementReady: false, lastUpdated: '5 days ago' },
  { id: 'st-4', name: 'Sneha Gupta', initials: 'SG', branch: 'CSE', year: '4th', resumeStatus: 'Submitted', atsScore: 92, placementReady: true, lastUpdated: '3 hours ago' },
  { id: 'st-5', name: 'Karan Mehta', initials: 'KM', branch: 'Civil', year: '2nd', resumeStatus: 'Not Started', atsScore: 0, placementReady: false, lastUpdated: 'Never' },
  { id: 'st-6', name: 'Ananya Krishnan', initials: 'AK', branch: 'CSE', year: '3rd', resumeStatus: 'Draft', atsScore: 61, placementReady: false, lastUpdated: '1 week ago' },
  { id: 'st-7', name: 'Vikram Yadav', initials: 'VY', branch: 'ECE', year: '4th', resumeStatus: 'Submitted', atsScore: 79, placementReady: true, lastUpdated: '4 days ago' },
  { id: 'st-8', name: 'Meera Iyer', initials: 'MI', branch: 'CSE', year: '2nd', resumeStatus: 'Draft', atsScore: 48, placementReady: false, lastUpdated: '2 weeks ago' },
  { id: 'st-9', name: 'Aditya Bansal', initials: 'AB', branch: 'ME', year: '4th', resumeStatus: 'Submitted', atsScore: 83, placementReady: true, lastUpdated: '6 hours ago' },
  { id: 'st-10', name: 'Deepika Rao', initials: 'DR', branch: 'Civil', year: '3rd', resumeStatus: 'Not Started', atsScore: 0, placementReady: false, lastUpdated: 'Never' },
  { id: 'st-11', name: 'Nikhil Joshi', initials: 'NJ', branch: 'CSE', year: '4th', resumeStatus: 'Submitted', atsScore: 70, placementReady: true, lastUpdated: '1 day ago' },
  { id: 'st-12', name: 'Pooja Tiwari', initials: 'PT', branch: 'ECE', year: '3rd', resumeStatus: 'Draft', atsScore: 42, placementReady: false, lastUpdated: '3 weeks ago' },
];
