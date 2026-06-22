'use client';
import { useState } from 'react';
import { useResumeStore } from '@/store/resumeStore';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';
import { Trash2, Plus, X } from 'lucide-react';
import type { Project } from '@/types/resume';

export function ProjectsForm() {
  const { projects, updateProjects } = useResumeStore();
  const [items, setItems] = useState<Project[]>(projects);
  const [techInput, setTechInput] = useState<Record<string, string>>({});

  const update = (id: string, field: keyof Project, value: string) =>
    setItems((prev) => prev.map((p) => p.id === id ? { ...p, [field]: value } : p));

  const addTech = (id: string) => {
    const val = (techInput[id] ?? '').trim();
    if (!val) return;
    setItems((prev) => prev.map((p) => p.id === id ? { ...p, techStack: [...p.techStack, val] } : p));
    setTechInput((t) => ({ ...t, [id]: '' }));
  };

  const removeTech = (id: string, tech: string) =>
    setItems((prev) => prev.map((p) => p.id === id ? { ...p, techStack: p.techStack.filter((t) => t !== tech) } : p));

  const add = () => setItems((prev) => [...prev, {
    id: `proj-${Date.now()}`, name: '', description: '', techStack: [], githubLink: '', liveLink: '',
  }]);

  const remove = (id: string) => setItems((prev) => prev.filter((p) => p.id !== id));

  return (
    <div className="space-y-5">
      {items.map((proj) => (
        <div key={proj.id} className="border border-border rounded-[10px] p-4 space-y-3 bg-white">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-text-primary">Project</p>
            <button onClick={() => remove(proj.id)} className="text-danger hover:opacity-70 transition-opacity"><Trash2 className="h-4 w-4" /></button>
          </div>
          <Input label="Project Name" value={proj.name} onChange={(e) => update(proj.id, 'name', e.target.value)} placeholder="StudySync — AI Planner" />
          <Textarea label="Description" value={proj.description} onChange={(e) => update(proj.id, 'description', e.target.value)} placeholder="Describe what you built, technologies used, and impact..." rows={3} />
          <div>
            <p className="text-xs font-semibold text-text-primary mb-1.5">Tech Stack</p>
            <div className="flex flex-wrap gap-1.5 mb-2">
              {proj.techStack.map((t) => (
                <span key={t} className="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-50 border border-blue-200 text-primary-DEFAULT rounded-full text-xs font-medium">
                  {t}<button onClick={() => removeTech(proj.id, t)}><X className="h-2.5 w-2.5" /></button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                value={techInput[proj.id] ?? ''}
                onChange={(e) => setTechInput((t) => ({ ...t, [proj.id]: e.target.value }))}
                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addTech(proj.id); } }}
                placeholder="Add tech (Enter)"
                className="flex-1 text-xs px-3 py-2 border border-border rounded-[8px] focus:outline-none focus:border-primary-DEFAULT"
              />
              <Button variant="secondary" size="sm" onClick={() => addTech(proj.id)}><Plus className="h-3.5 w-3.5" /></Button>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input label="GitHub Link" value={proj.githubLink} onChange={(e) => update(proj.id, 'githubLink', e.target.value)} placeholder="https://github.com/..." />
            <Input label="Live Link" value={proj.liveLink} onChange={(e) => update(proj.id, 'liveLink', e.target.value)} placeholder="https://..." />
          </div>
        </div>
      ))}
      <div className="flex gap-3">
        {items.length < 4 && <Button variant="secondary" size="sm" onClick={add}><Plus className="h-4 w-4" />Add Project</Button>}
        <Button variant="primary" size="sm" onClick={() => updateProjects(items)}>Save Projects</Button>
      </div>
    </div>
  );
}
