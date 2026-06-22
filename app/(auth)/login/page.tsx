'use client';

import { useRouter } from 'next/navigation';
import { Zap } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';

export default function LoginPage() {
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-[400px]">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary-DEFAULT text-white"><Zap className="h-5 w-5" /></div>
          <h1 className="text-xl font-bold text-text-primary">Sign in to PlacementAI</h1>
        </div>
        <div className="space-y-4">
          <Input label="Email" type="email" placeholder="arjun.sharma@iitd.ac.in" />
          <Input label="Password" type="password" placeholder="••••••••" />
          <Button variant="secondary" className="w-full">
            <span className="font-bold text-blue-600">G</span>
            Continue with Google
          </Button>
          <Button className="w-full" onClick={() => router.push('/dashboard')}>Sign In</Button>
          <button onClick={() => router.push('/admin/dashboard')} className="w-full text-center text-xs font-semibold text-primary-DEFAULT hover:underline">
            Are you a placement officer? Sign in here
          </button>
        </div>
      </Card>
    </div>
  );
}
