'use client';

import { useState } from 'react';
import { CloudUpload, FileText, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { samplePersonal } from '@/lib/sampleData';

export default function UploadResumePage() {
  const [phase, setPhase] = useState<'upload' | 'processing' | 'review'>('upload');
  const [fileName, setFileName] = useState('');

  const startProcessing = (name: string) => {
    setFileName(name);
    setPhase('processing');
    setTimeout(() => setPhase('review'), 2000);
  };

  if (phase === 'processing') {
    return (
      <div className="flex min-h-[calc(100vh-56px)] items-center justify-center p-4">
        <Card className="w-full max-w-md text-center">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-2 border-primary-DEFAULT border-t-transparent" />
          <h2 className="text-lg font-bold text-text-primary">Analyzing your resume...</h2>
          <p className="mt-1 text-sm text-text-muted">{fileName}</p>
          <ProgressBar value={78} color="blue" className="mt-5 animate-pulse-bar" />
        </Card>
      </div>
    );
  }

  if (phase === 'review') {
    return (
      <div className="mx-auto max-w-6xl p-4 sm:p-6">
        <div className="grid gap-5 lg:grid-cols-2">
          <Card header={<h2 className="text-sm font-bold">Extracted Information</h2>}>
            <dl className="space-y-3 text-sm">
              {Object.entries(samplePersonal).map(([key, value]) => (
                <div key={key} className="flex justify-between gap-4 border-b border-border pb-2">
                  <dt className="capitalize text-text-muted">{key}</dt>
                  <dd className="font-semibold text-text-primary">{value}</dd>
                </div>
              ))}
            </dl>
          </Card>
          <Card header={<h2 className="text-sm font-bold">Edit before saving</h2>}>
            <div className="grid gap-4 sm:grid-cols-2">
              <Input label="Full Name" defaultValue={samplePersonal.fullName} />
              <Input label="Email" defaultValue={samplePersonal.email} />
              <Input label="Phone" defaultValue={samplePersonal.phone} />
              <Input label="City" defaultValue={samplePersonal.city} />
            </div>
            <div className="mt-5 flex gap-3">
              <Button>Save to Resume</Button>
              <Button variant="ghost" onClick={() => setPhase('upload')}>Re-upload</Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-[calc(100vh-56px)] items-center justify-center p-4">
      <div className="w-full max-w-xl rounded-[12px] border-2 border-dashed border-border bg-white p-8 text-center shadow-card transition-colors hover:border-primary-DEFAULT hover:bg-blue-50/40">
        <CloudUpload className="mx-auto h-12 w-12 text-primary-DEFAULT" />
        <h2 className="mt-4 text-xl font-bold text-text-primary">Upload your resume</h2>
        <p className="mt-2 text-sm text-text-muted">Drop a PDF or DOCX file here, or browse from your device.</p>
        <div className="mt-4 flex justify-center gap-2"><Badge>PDF</Badge><Badge variant="gray">DOCX</Badge></div>
        {fileName && (
          <div className="mt-5 flex items-center justify-between rounded-lg border border-border p-3 text-sm">
            <span className="flex items-center gap-2"><FileText className="h-4 w-4" />{fileName}</span>
            <button onClick={() => setFileName('')}><X className="h-4 w-4" /></button>
          </div>
        )}
        <Button className="mt-6" onClick={() => startProcessing('arjun-sharma-resume.pdf')}>Browse File</Button>
      </div>
    </div>
  );
}
