'use client';
import { useState, KeyboardEvent } from 'react';
import { useResumeStore } from '@/store/resumeStore';
import { SUGGESTED_SKILLS } from '@/lib/constants';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { X, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

export function SkillsForm() {
  const { skills, updateSkills } = useResumeStore();
  const [items, setItems] = useState<string[]>(skills);
  const [input, setInput] = useState('');

  const add = (skill: string) => {
    const s = skill.trim();
    if (s && !items.includes(s)) setItems((prev) => [...prev, s]);
    setInput('');
  };

  const remove = (skill: string) => setItems((prev) => prev.filter((s) => s !== skill));

  const handleKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') { e.preventDefault(); add(input); }
  };

  return (
    <div className="space-y-5">
      <div>
        <Input
          label="Add Skill"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKey}
          placeholder="Type a skill and press Enter…"
        />
      </div>
      {items.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {items.map((s) => (
            <span key={s} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 border border-blue-200 text-primary-DEFAULT rounded-full text-xs font-semibold">
              {s}
              <button onClick={() => remove(s)} className="hover:text-danger transition-colors"><X className="h-3 w-3" /></button>
            </span>
          ))}
        </div>
      )}
      <div>
        <p className="text-xs font-semibold text-text-muted mb-2">Suggested Skills</p>
        <div className="flex flex-wrap gap-1.5">
          {SUGGESTED_SKILLS.filter((s) => !items.includes(s)).slice(0, 16).map((s) => (
            <button
              key={s}
              onClick={() => add(s)}
              className="inline-flex items-center gap-1 px-2.5 py-1 border border-border rounded-full text-xs text-text-secondary hover:border-primary-DEFAULT hover:text-primary-DEFAULT hover:bg-blue-50 transition-all"
            >
              <Plus className="h-3 w-3" />{s}
            </button>
          ))}
        </div>
      </div>
      <Button variant="primary" size="sm" onClick={() => updateSkills(items)}>Save Skills</Button>
    </div>
  );
}
