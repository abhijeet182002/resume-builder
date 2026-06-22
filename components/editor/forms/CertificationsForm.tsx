'use client';
import { useState } from 'react';
import { useResumeStore } from '@/store/resumeStore';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Trash2, Plus } from 'lucide-react';
import type { Certification } from '@/types/resume';

export function CertificationsForm() {
  const { certifications, updateCertifications } = useResumeStore();
  const [items, setItems] = useState<Certification[]>(certifications);

  const update = (id: string, field: keyof Certification, value: string) =>
    setItems((prev) => prev.map((c) => c.id === id ? { ...c, [field]: value } : c));

  const add = () => setItems((prev) => [...prev, {
    id: `cert-${Date.now()}`, name: '', issuer: '', date: '', credentialLink: '',
  }]);

  const remove = (id: string) => setItems((prev) => prev.filter((c) => c.id !== id));

  return (
    <div className="space-y-4">
      {items.map((cert) => (
        <div key={cert.id} className="border border-border rounded-[10px] p-4 space-y-3 bg-white">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-text-primary">Certification</p>
            <button onClick={() => remove(cert.id)} className="text-danger hover:opacity-70 transition-opacity"><Trash2 className="h-4 w-4" /></button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input label="Certificate Name" value={cert.name} onChange={(e) => update(cert.id, 'name', e.target.value)} placeholder="AWS Cloud Practitioner" className="sm:col-span-2" />
            <Input label="Issuing Organization" value={cert.issuer} onChange={(e) => update(cert.id, 'issuer', e.target.value)} placeholder="Amazon Web Services" />
            <Input label="Date" value={cert.date} onChange={(e) => update(cert.id, 'date', e.target.value)} placeholder="March 2024" />
            <Input label="Credential Link" value={cert.credentialLink} onChange={(e) => update(cert.id, 'credentialLink', e.target.value)} placeholder="https://verify.aws..." className="sm:col-span-2" />
          </div>
        </div>
      ))}
      <div className="flex gap-3">
        <Button variant="secondary" size="sm" onClick={add}><Plus className="h-4 w-4" />Add Certification</Button>
        <Button variant="primary" size="sm" onClick={() => updateCertifications(items)}>Save Certifications</Button>
      </div>
    </div>
  );
}
