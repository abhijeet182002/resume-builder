import { Bell, GraduationCap, Mail, Save, Shield, User } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { samplePersonal } from '@/lib/sampleData';

const preferenceItems = [
  { label: 'Resume score alerts', description: 'Notify when ATS score changes', enabled: true },
  { label: 'Placement reminders', description: 'Weekly readiness checklist', enabled: true },
  { label: 'Officer visibility', description: 'Allow placement team to view resume status', enabled: true },
];

export default function SettingsPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-5 p-4 sm:p-6">
      <section className="relative isolate overflow-hidden rounded-[16px] border border-[#BFD7FF] bg-[#EAF3FF] p-6 shadow-[0_1px_2px_rgba(15,23,42,0.06),0_18px_42px_rgba(37,99,235,0.12)]">
        <div className="absolute right-8 top-6 -z-10 h-32 w-32 rounded-full bg-primary-DEFAULT/15 blur-2xl" />
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-[18px] bg-gradient-to-br from-primary-DEFAULT to-accent-cyan text-xl font-extrabold text-white shadow-[0_14px_32px_rgba(37,99,235,0.28)]">
              AS
            </div>
            <div>
              <Badge variant="blue" className="mb-2">Student profile</Badge>
              <h1 className="text-3xl font-extrabold tracking-[-0.04em] text-[#10233F]">{samplePersonal.fullName}</h1>
              <p className="mt-1 text-sm font-medium text-[#45607F]">{samplePersonal.email}</p>
            </div>
          </div>
          <div className="rounded-[14px] border border-white/70 bg-white/75 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.70),0_14px_32px_rgba(37,99,235,0.10)]">
            <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#647A9A]">Profile status</p>
            <p className="mt-1 text-2xl font-extrabold text-success">Good</p>
          </div>
        </div>
      </section>

      <div className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
        <section className="rounded-[16px] border border-[#CFE0F7] bg-[#F7FAFF] p-5 shadow-[0_1px_2px_rgba(15,23,42,0.06),0_16px_38px_rgba(37,99,235,0.08)]">
          <div className="mb-5 flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-[#DDEBFF] text-primary-DEFAULT">
              <User className="h-5 w-5" />
            </span>
            <div>
              <p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#647A9A]">Account</p>
              <h2 className="text-lg font-extrabold tracking-[-0.02em] text-[#10233F]">Profile details</h2>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Input label="Full name" defaultValue={samplePersonal.fullName} />
            <Input label="Email" defaultValue={samplePersonal.email} />
            <Input label="Phone" defaultValue={samplePersonal.phone} />
            <Input label="City" defaultValue={samplePersonal.city} />
            <Input label="LinkedIn" defaultValue={samplePersonal.linkedin} />
            <Input label="GitHub" defaultValue={samplePersonal.github} />
          </div>
        </section>

        <section className="rounded-[16px] border border-[#CFE0F7] bg-[#F7FAFF] p-5 shadow-[0_1px_2px_rgba(15,23,42,0.06),0_16px_38px_rgba(37,99,235,0.08)]">
          <div className="mb-5 flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-[#DDEBFF] text-primary-DEFAULT">
              <GraduationCap className="h-5 w-5" />
            </span>
            <div>
              <p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#647A9A]">Academics</p>
              <h2 className="text-lg font-extrabold tracking-[-0.02em] text-[#10233F]">Institute details</h2>
            </div>
          </div>
          <div className="space-y-4">
            <Input label="College" defaultValue="IIT Delhi" />
            <Select
              label="Branch"
              defaultValue="CSE"
              options={[
                { value: 'CSE', label: 'Computer Science Engineering' },
                { value: 'ECE', label: 'Electronics and Communication' },
                { value: 'ME', label: 'Mechanical Engineering' },
                { value: 'Civil', label: 'Civil Engineering' },
              ]}
            />
            <Select
              label="Year"
              defaultValue="3rd"
              options={[
                { value: '1st', label: '1st Year' },
                { value: '2nd', label: '2nd Year' },
                { value: '3rd', label: '3rd Year' },
                { value: '4th', label: '4th Year' },
              ]}
            />
            <Input label="Target role" defaultValue={samplePersonal.targetRole} />
          </div>
        </section>
      </div>

      <section className="rounded-[16px] border border-[#CFE0F7] bg-[#EAF3FF] p-5 shadow-[0_1px_2px_rgba(15,23,42,0.06),0_18px_42px_rgba(37,99,235,0.10)]">
        <div className="mb-4 flex items-end justify-between gap-3">
          <div>
            <p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#647A9A]">Preferences</p>
            <h2 className="mt-1 text-lg font-extrabold tracking-[-0.02em] text-[#10233F]">Notifications and privacy</h2>
          </div>
          <Badge variant="green">Enabled</Badge>
        </div>
        <div className="grid gap-3 md:grid-cols-3">
          {preferenceItems.map((item) => (
            <div key={item.label} className="rounded-[14px] border border-[#CFE0F7] bg-[#F7FAFF] p-4 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-primary-DEFAULT/35 hover:bg-[#EFF6FF]">
              <div className="mb-3 flex items-center justify-between gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-[#DDEBFF] text-primary-DEFAULT">
                  {item.label.includes('visibility') ? <Shield className="h-4 w-4" /> : item.label.includes('alerts') ? <Bell className="h-4 w-4" /> : <Mail className="h-4 w-4" />}
                </span>
                <span className="rounded-full bg-success/10 px-2.5 py-1 text-xs font-extrabold text-success">On</span>
              </div>
              <p className="text-sm font-extrabold text-[#10233F]">{item.label}</p>
              <p className="mt-1 text-xs font-medium leading-relaxed text-[#647A9A]">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="flex justify-end">
        <button className="group inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-[8px] bg-[#DDEBFF] px-6 py-3 text-base font-extrabold text-[#07111F] shadow-[0_1px_2px_rgba(15,23,42,0.08),0_14px_30px_rgba(37,99,235,0.16)] transition-all hover:-translate-y-0.5 hover:bg-gradient-to-br hover:from-[#1F5BE3] hover:to-[#1746BF] hover:text-white hover:shadow-[0_18px_42px_rgba(37,99,235,0.32)] sm:w-auto">
          <Save className="h-4 w-4" />
          Save Settings
        </button>
      </div>
    </div>
  );
}
