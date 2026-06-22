'use client';
import { TrendingUp, Edit, GraduationCap, Award, Sparkles } from 'lucide-react';

const ACTIVITIES = [
  { id: 1, icon: TrendingUp, iconBg: 'bg-cyan-50', iconColor: 'text-accent-cyan', title: 'ATS score improved to 74', time: '2 days ago', description: 'Based on Skills and Projects updates' },
  { id: 2, icon: Edit, iconBg: 'bg-blue-50', iconColor: 'text-primary-DEFAULT', title: 'Skills section updated', time: '3 days ago', description: 'Added Docker, MongoDB, Figma' },
  { id: 3, icon: GraduationCap, iconBg: 'bg-purple-50', iconColor: 'text-purple-600', title: 'Education details added', time: '5 days ago', description: 'IIT Delhi B.Tech CSE synced' },
  { id: 4, icon: Award, iconBg: 'bg-amber-50', iconColor: 'text-warning', title: 'AWS Certification added', time: '1 week ago', description: 'Cloud Practitioner credential verified' },
  { id: 5, icon: Sparkles, iconBg: 'bg-emerald-50', iconColor: 'text-success', title: 'Resume created', time: '2 weeks ago', description: 'Started with blank template' },
];

export function ActivityFeed() {
  return (
    <div className="bg-white rounded-[10px] border border-border shadow-card p-5">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-sm font-semibold text-text-primary">Recent Activity</h3>
        <button className="text-xs text-primary-DEFAULT font-medium hover:underline">View all</button>
      </div>
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-4 top-4 bottom-4 w-px bg-border" />
        <div className="space-y-5">
          {ACTIVITIES.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.id} className="relative flex items-start gap-4 pl-1">
                <div className={`relative z-10 w-8 h-8 rounded-full ${item.iconBg} flex items-center justify-center shrink-0`}>
                  <Icon className={`h-4 w-4 ${item.iconColor}`} />
                </div>
                <div className="min-w-0 pt-1">
                  <p className="text-sm font-semibold text-text-primary leading-snug">{item.title}</p>
                  <p className="text-xs text-text-muted mt-0.5">{item.description} • {item.time}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
