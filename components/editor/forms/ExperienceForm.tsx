'use client';
import { useState } from 'react';
import { useResumeStore } from '@/store/resumeStore';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Trash2, Plus, X } from 'lucide-react';
import type { Experience } from '@/types/resume';

export function ExperienceForm() {
  const { experience, updateExperience } = useResumeStore();
  const [items, setItems] = useState<Experience[]>(experience);
  const [bulletInputs, setBulletInputs] = useState<Record<string, string>>({});

  const update = <K extends keyof Experience>(id: string, field: K, value: Experience[K]) =>
    setItems((prev) => prev.map((e) => e.id === id ? { ...e, [field]: value } : e));

  const addBullet = (id: string) => {
    const val = (bulletInputs[id] ?? '').trim();
    if (!val) return;
    setItems((prev) => prev.map((e) => e.id === id ? { ...e, description: [...e.description, val] } : e));
    setBulletInputs((b) => ({ ...b, [id]: '' }));
  };

  const removeBullet = (id: string, idx: number) =>
    setItems((prev) => prev.map((e) => e.id === id ? { ...e, description: e.description.filter((_, i) => i !== idx) } : e));

  const add = () => setItems((prev) => [...prev, {
    id: `exp-${Date.now()}`, company: '', role: '', startDate: '', endDate: '', isCurrent: false, description: [],
  }]);

  const remove = (id: string) => setItems((prev) => prev.filter((e) => e.id !== id));

  return (
    <div className="space-y-5">
      {items.map((exp) => (
        <div key={exp.id} className="border border-border rounded-[10px] p-4 space-y-3 bg-white">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-text-primary">Experience</p>
            <button onClick={() => remove(exp.id)} className="text-danger hover:opacity-70 transition-opacity"><Trash2 className="h-4 w-4" /></button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input label="Company" value={exp.company} onChange={(e) => update(exp.id, 'company', e.target.value)} placeholder="Razorpay" />
            <Input label="Role" value={exp.role} onChange={(e) => update(exp.id, 'role', e.target.value)} placeholder="SWE Intern" />
            <Input label="Start Date" value={exp.startDate} onChange={(e) => update(exp.id, 'startDate', e.target.value)} placeholder="May 2024" />
            <Input label="End Date" value={exp.endDate} onChange={(e) => update(exp.id, 'endDate', e.target.value)} placeholder="Jul 2024" />
          </div>
          <div>
            <p className="text-xs font-semibold text-text-primary mb-2">Description Bullets</p>
            <div className="space-y-1.5 mb-2">
              {exp.description.map((d, i) => (
                <div key={i} className="flex items-start gap-2 p-2 bg-surface rounded-[6px] border border-border group">
                  <span className="text-primary-DEFAULT mt-0.5">•</span>
                  <span className="text-xs text-text-primary flex-1 leading-relaxed">{d}</span>
                  <button onClick={() => removeBullet(exp.id, i)} className="opacity-0 group-hover:opacity-100 transition-opacity text-danger shrink-0">
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                value={bulletInputs[exp.id] ?? ''}
                onChange={(e) => setBulletInputs((b) => ({ ...b, [exp.id]: e.target.value }))}
                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addBullet(exp.id); } }}
                placeholder="Add a bullet point (Enter to add)"
                className="flex-1 text-xs px-3 py-2 border border-border rounded-[8px] focus:outline-none focus:border-primary-DEFAULT"
              />
              <Button variant="secondary" size="sm" onClick={() => addBullet(exp.id)}><Plus className="h-3.5 w-3.5" /></Button>
            </div>
          </div>
        </div>
      ))}
      <div className="flex gap-3">
        <Button variant="secondary" size="sm" onClick={add}><Plus className="h-4 w-4" />Add Experience</Button>
        <Button variant="primary" size="sm" onClick={() => updateExperience(items)}>Save Experience</Button>
      </div>
    </div>
  );
}
