'use client';
import { useState } from 'react';
import { useResumeStore } from '@/store/resumeStore';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Trash2, Plus } from 'lucide-react';
import type { Education } from '@/types/resume';

export function EducationForm() {
  const { education, updateEducation } = useResumeStore();
  const [items, setItems] = useState<Education[]>(education);

  const update = (id: string, field: keyof Education, value: string) =>
    setItems((prev) => prev.map((e) => e.id === id ? { ...e, [field]: value } : e));

  const add = () => setItems((prev) => [...prev, {
    id: `edu-${Date.now()}`, institution: '', degree: '', branch: '', startYear: '', endYear: '', type: 'college',
  }]);

  const remove = (id: string) => setItems((prev) => prev.filter((e) => e.id !== id));

  return (
    <div className="space-y-5">
      {items.map((edu, idx) => (
        <div key={edu.id} className="border border-border rounded-[10px] p-4 space-y-3 bg-white">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-text-primary">
              {idx === 0 ? 'College / University' : 'School / Board'}
            </p>
            <button onClick={() => remove(edu.id)} className="text-danger hover:opacity-70 transition-opacity">
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input label="Institution" value={edu.institution} onChange={(e) => update(edu.id, 'institution', e.target.value)} placeholder="IIT Delhi" className="sm:col-span-2" />
            <Input label="Degree / Class" value={edu.degree} onChange={(e) => update(edu.id, 'degree', e.target.value)} placeholder="B.Tech" />
            <Input label="Branch / Stream" value={edu.branch} onChange={(e) => update(edu.id, 'branch', e.target.value)} placeholder="Computer Science" />
            <Input label="Start Year" value={edu.startYear} onChange={(e) => update(edu.id, 'startYear', e.target.value)} placeholder="2022" />
            <Input label="End Year" value={edu.endYear} onChange={(e) => update(edu.id, 'endYear', e.target.value)} placeholder="2026" />
            <Input label="CGPA" value={edu.cgpa ?? ''} onChange={(e) => update(edu.id, 'cgpa', e.target.value)} placeholder="8.4" />
            <Input label="Percentage %" value={edu.percentage ?? ''} onChange={(e) => update(edu.id, 'percentage', e.target.value)} placeholder="94.2" />
          </div>
        </div>
      ))}
      <div className="flex gap-3">
        <Button variant="secondary" size="sm" onClick={add}><Plus className="h-4 w-4" />Add Education</Button>
        <Button variant="primary" size="sm" onClick={() => updateEducation(items)}>Save Changes</Button>
      </div>
    </div>
  );
}
