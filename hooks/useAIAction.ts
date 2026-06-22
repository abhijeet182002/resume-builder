'use client';
import { useAIStore, type AIAction } from '@/store/aiStore';
import { useUIStore } from '@/store/uiStore';

export function useAIAction() {
  const store = useAIStore();
  const { toggleAIDrawer, isAIDrawerOpen } = useUIStore();

  const triggerAction = (action: AIAction) => {
    store.setAction(action);
    if (!isAIDrawerOpen) toggleAIDrawer();
    store.streamSuggestion(action);
  };

  return {
    activeAction: store.activeAction,
    isStreaming: store.isStreaming,
    currentSuggestion: store.currentSuggestion,
    triggerAction,
    acceptSuggestion: store.acceptSuggestion,
    discardSuggestion: store.discardSuggestion,
  };
}
