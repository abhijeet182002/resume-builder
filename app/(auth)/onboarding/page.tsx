'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [role, setRole] = useState<'Student' | 'Officer'>('Student');
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-xl" header={<h1 className="text-base font-bold">Complete Setup</h1>}>
        {step === 1 && (
          <div className="grid gap-3 sm:grid-cols-2">
            {(['Student', 'Officer'] as const).map((item) => (
              <button key={item} onClick={() => setRole(item)} className={role === item ? 'rounded-lg border border-primary-DEFAULT bg-blue-50 p-5 text-left font-bold text-primary-DEFAULT' : 'rounded-lg border border-border p-5 text-left font-bold text-text-primary'}>
                {item}
              </button>
            ))}
          </div>
        )}
        {step === 2 && <div className="grid gap-4 sm:grid-cols-2"><Input label="Institute" defaultValue="IIT Delhi" /><Input label="Department" defaultValue={role === 'Officer' ? 'Training and Placement' : 'Computer Science'} /></div>}
        {step === 3 && (
          <div className="grid gap-4 sm:grid-cols-2">
            <Input label="Full Name" defaultValue={role === 'Officer' ? 'Placement Officer' : 'Arjun Sharma'} />
            {role === 'Student' ? <><Select label="Branch" options={[{ value: 'CSE', label: 'CSE' }, { value: 'ECE', label: 'ECE' }]} defaultValue="CSE" /><Select label="Year" options={[{ value: '3rd', label: '3rd Year' }, { value: '4th', label: '4th Year' }]} defaultValue="3rd" /></> : <Input label="Designation" defaultValue="Placement Coordinator" />}
          </div>
        )}
        <div className="mt-6 flex justify-end gap-3">
          <Button variant="ghost" onClick={() => setStep((value) => Math.max(1, value - 1))}>Back</Button>
          <Button onClick={() => step < 3 ? setStep((value) => value + 1) : router.push(role === 'Officer' ? '/admin/dashboard' : '/dashboard')}>
            {step < 3 ? 'Next' : 'Complete Setup'}
          </Button>
        </div>
      </Card>
    </div>
  );
}
