export interface OfficerStudent {
  id: string;
  name: string;
  initials: string;
  branch: 'CSE' | 'ECE' | 'ME' | 'Civil';
  year: '1st' | '2nd' | '3rd' | '4th';
  resumeStatus: 'Submitted' | 'Draft' | 'Not Started';
  atsScore: number;
  placementReady: boolean;
  lastUpdated: string;
}
