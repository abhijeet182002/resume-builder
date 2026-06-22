'use client';
import { useState } from 'react';
import { useResumeStore } from '@/store/resumeStore';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import type { PersonalDetails } from '@/types/resume';

export function PersonalForm() {
  const { personal, updatePersonal } = useResumeStore();
  const [form, setForm] = useState<PersonalDetails>(personal);
  const [errors, setErrors] = useState<Partial<PersonalDetails>>({});

  const validate = () => {
    const e: Partial<PersonalDetails> = {};
    if (!form.fullName) e.fullName = 'Full name is required';
    if (!form.email) e.email = 'Email is required';
    if (!form.phone) e.phone = 'Phone is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSave = () => {
    if (validate()) updatePersonal(form);
  };

  const set = (field: keyof PersonalDetails) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input label="Full Name" value={form.fullName} onChange={set('fullName')} error={errors.fullName} placeholder="Arjun Sharma" />
        <Input label="Email" type="email" value={form.email} onChange={set('email')} error={errors.email} placeholder="arjun@iitd.ac.in" />
        <Input label="Phone" value={form.phone} onChange={set('phone')} error={errors.phone} placeholder="+91 98765 43210" />
        <Input label="City" value={form.city} onChange={set('city')} placeholder="New Delhi" />
        <Input label="LinkedIn URL" value={form.linkedin} onChange={set('linkedin')} placeholder="linkedin.com/in/arjunsharma" />
        <Input label="GitHub URL" value={form.github} onChange={set('github')} placeholder="github.com/arjunsharma" />
        <Input label="Target Role" value={form.targetRole} onChange={set('targetRole')} placeholder="Software Engineer" className="sm:col-span-2" />
      </div>
      <Button onClick={handleSave} variant="primary" size="md">Save Changes</Button>
    </div>
  );
}
