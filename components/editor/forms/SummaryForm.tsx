'use client';
import { useResumeStore } from '@/store/resumeStore';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';
import { useAIAction } from '@/hooks/useAIAction';
import { Sparkles } from 'lucide-react';

export function SummaryForm() {
  const { summary, updateSummary } = useResumeStore();
  const { triggerAction } = useAIAction();

  return (
    <div className="space-y-4">
      <Textarea
        label="Professional Summary"
        value={summary}
        onChange={(e) => updateSummary(e.target.value)}
        rows={6}
        placeholder="Write a compelling 2-3 sentence summary that highlights your skills, experience, and career goals..."
      />
      <div className="flex gap-3">
        <Button variant="primary" size="sm" onClick={() => updateSummary(summary)}>Save Summary</Button>
        <Button variant="secondary" size="sm" onClick={() => triggerAction('Generate Summary')}>
          <Sparkles className="h-4 w-4" /> Generate with AI
        </Button>
      </div>
    </div>
  );
}
