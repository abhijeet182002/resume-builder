'use client';
import { useUIStore } from '@/store/uiStore';
import { useAIAction } from '@/hooks/useAIAction';
import { useResumeStore } from '@/store/resumeStore';
import { Drawer } from '@/components/ui/Drawer';
import { Button } from '@/components/ui/Button';
import { Loader2, Check, X, Edit3 } from 'lucide-react';

export function AIDrawer() {
  const { isAIDrawerOpen, toggleAIDrawer } = useUIStore();
  const { activeAction, isStreaming, currentSuggestion, acceptSuggestion, discardSuggestion } = useAIAction();
  const updateSummary = useResumeStore((s) => s.updateSummary);

  const handleAccept = () => {
    if (activeAction === 'Generate Summary' && currentSuggestion) {
      updateSummary(currentSuggestion);
    }
    acceptSuggestion();
    toggleAIDrawer();
  };

  const handleDiscard = () => {
    discardSuggestion();
    toggleAIDrawer();
  };

  return (
    <Drawer
      open={isAIDrawerOpen}
      onClose={toggleAIDrawer}
      title={activeAction ?? 'AI Assistant'}
      side="bottom"
    >
      <div className="flex flex-col h-full">
        {/* Body */}
        <div className="flex-1 p-5 overflow-y-auto">
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-100 rounded-[10px] p-4 min-h-[200px] relative">
            {isStreaming && (
              <div className="flex items-center gap-2 mb-3">
                <Loader2 className="h-3.5 w-3.5 animate-spin text-primary-DEFAULT" />
                <span className="text-xs text-primary-DEFAULT font-semibold">AI is writing...</span>
              </div>
            )}
            <p className="text-sm text-text-primary leading-relaxed whitespace-pre-wrap">
              {currentSuggestion}
              {isStreaming && (
                <span className="inline-block w-0.5 h-4 bg-primary-DEFAULT ml-0.5 animate-pulse" />
              )}
            </p>
            {!isStreaming && !currentSuggestion && (
              <p className="text-sm text-text-muted italic">Waiting for AI to generate content...</p>
            )}
          </div>

          {!isStreaming && currentSuggestion && (
            <div className="mt-4 p-3 bg-amber-50 border border-amber-100 rounded-[8px]">
              <p className="text-xs text-amber-700 font-medium">
                ⚠️ Review before accepting — AI suggestions may need minor edits.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-5 border-t border-border flex gap-2">
          <Button
            variant="primary"
            size="md"
            className="flex-1"
            disabled={isStreaming || !currentSuggestion}
            onClick={handleAccept}
          >
            <Check className="h-4 w-4" />
            Accept
          </Button>
          <Button
            variant="secondary"
            size="md"
            disabled={isStreaming}
            onClick={() => {}}
          >
            <Edit3 className="h-4 w-4" />
            Edit
          </Button>
          <Button
            variant="ghost"
            size="md"
            onClick={handleDiscard}
          >
            <X className="h-4 w-4" />
            Discard
          </Button>
        </div>
      </div>
    </Drawer>
  );
}
