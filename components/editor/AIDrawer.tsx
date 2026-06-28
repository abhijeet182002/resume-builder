'use client';
import { useState, useRef, useEffect } from 'react';
import { useAIStore, type ChatMessage } from '@/store/aiStore';
import { useResumeStore } from '@/store/resumeStore';
import { useAIAction } from '@/hooks/useAIAction';
import { Drawer } from '@/components/ui/Drawer';
import { Button } from '@/components/ui/Button';
import { Loader2, Check, X, Send, Sparkles } from 'lucide-react';
import { useUIStore } from '@/store/uiStore';

export function AIDrawer() {
  const { messages, isOpen, context, close, addMessage, updateLastMessage, suggestion } = useAIStore();
  const { accept, discard } = useAIAction();
  const resume = useResumeStore((s) => s.resume);
  const showToast = useUIStore((s) => s.showToast);

  const [inputMessage, setInputMessage] = useState('');
  const [chatLoading, setChatLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, chatLoading]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    const query = inputMessage.trim();
    if (!query) return;

    setInputMessage('');
    // 1. Add User Message
    addMessage({ sender: 'user', text: query });
    setChatLoading(true);

    // 2. Add empty AI reply bubble placeholder to stream into
    addMessage({ sender: 'ai', text: '' });

    try {
      const res = await fetch('/api/ai/enhance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'chat',
          input: query,
          context: {
            name: resume.personal?.fullName || 'Candidate',
            role: resume.experience?.[0]?.role || 'Software Engineer',
            skills: Array.isArray(resume.skills) ? resume.skills.join(', ') : '',
          },
        }),
      });

      if (!res.ok) throw new Error('Failed to stream chat');

      const reader = res.body?.getReader();
      if (!reader) throw new Error('No stream reader');

      const decoder = new TextDecoder();
      let done = false;
      let streamText = '';

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        if (value) {
          const chunk = decoder.decode(value, { stream: !done });
          streamText += chunk;
          // Update last AI bubble text in store
          updateLastMessage(streamText);
          // Set suggestion compatibility field in case user clicks Accept/Apply
          useAIStore.setState({ suggestion: streamText });
        }
      }
    } catch {
      showToast('Failed to get reply from AI assistant.', 'error');
    } finally {
      setChatLoading(false);
    }
  };

  return (
    <Drawer
      open={isOpen}
      onClose={close}
      title={context ? `AI Assistant — ${context.replace('_', ' ').toUpperCase()}` : 'AI Assistant'}
      side="right"
    >
      <div className="flex flex-col h-full bg-slate-50">
        {/* Messages List Area */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center p-6 bg-white border border-slate-100 rounded-2xl shadow-sm">
              <Sparkles className="h-10 w-10 text-primary-DEFAULT/40 animate-pulse mb-3" />
              <p className="text-sm font-bold text-slate-800">Ask the AI Resume Assistant</p>
              <p className="text-xs text-text-muted mt-1 max-w-[240px] leading-relaxed">
                Type instructions to rewrite, format, or suggest key points for this section of your resume.
              </p>
            </div>
          ) : (
            messages.map((msg, index) => (
              <div
                key={index}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm shadow-sm ${
                    msg.sender === 'user'
                      ? 'bg-primary-DEFAULT text-white rounded-tr-none'
                      : 'bg-white text-slate-800 border border-slate-150 rounded-tl-none leading-relaxed whitespace-pre-wrap'
                  }`}
                >
                  {msg.text === '' && chatLoading && index === messages.length - 1 ? (
                    <div className="flex items-center gap-1.5 py-1">
                      <Loader2 className="h-3.5 w-3.5 animate-spin text-primary-DEFAULT" />
                      <span className="text-xs text-slate-400 font-semibold">AI is typing...</span>
                    </div>
                  ) : (
                    msg.text
                  )}
                </div>
                <span className="text-[9px] text-slate-400 mt-1 uppercase font-bold tracking-wider px-1">
                  {msg.sender === 'user' ? 'You' : 'AI Assistant'}
                </span>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Action Panel (Review & Apply suggestion) */}
        {suggestion && (
          <div className="bg-white border-t border-slate-150 p-4 shadow-lg flex flex-col gap-2">
            <div className="flex items-start gap-2 bg-amber-50 border border-amber-100 p-2.5 rounded-xl text-xs text-amber-700 leading-normal">
              <span>💡 Review the latest suggestion. Click <strong>Apply</strong> to place it directly into your resume form.</span>
            </div>
            <div className="flex gap-2">
              <Button
                variant="primary"
                size="sm"
                className="flex-1 shadow-sm flex items-center justify-center gap-1"
                onClick={accept}
              >
                <Check className="h-4 w-4" />
                Apply to Resume
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="border border-slate-200 text-slate-700"
                onClick={discard}
              >
                <X className="h-4 w-4" />
                Discard
              </Button>
            </div>
          </div>
        )}

        {/* Input Box Form */}
        <form onSubmit={handleSendMessage} className="p-4 border-t border-slate-200 bg-white flex gap-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Rewrite this section to highlight Python..."
            className="flex-1 text-xs px-3.5 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:border-primary-DEFAULT"
            disabled={chatLoading}
          />
          <button
            type="submit"
            disabled={chatLoading || !inputMessage.trim()}
            className="h-10 w-10 flex items-center justify-center bg-primary-DEFAULT hover:bg-primary-dark text-white rounded-xl shadow-md transition disabled:opacity-50"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
      </div>
    </Drawer>
  );
}
