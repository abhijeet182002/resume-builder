'use client';
import { useEffect } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export function Modal({ open, onClose, title, children, className }: ModalProps) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    if (open) document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
   <div className="fixed inset-0 z-50 mt-0 flex justify-center">
  {/* Overlay */}
  <div
    className="absolute inset-0 bg-black/40 mt-0 backdrop-blur-sm"
    onClick={onClose}
    aria-hidden="true"
  />

  {/* Modal */}
  <div
    className={cn(
      "relative bg-white rounded-[12px] shadow-panel mt-0  w-full h-[650px] max-w-lg mx-4 animate-fade-scale-in",
      className
    )}
    role="dialog"
    aria-modal="true"
  >
    {/* Header */}
    {title && (
      <div className="flex items-center justify-between px-6 py-4 border-b border-border">
        <h2 className="text-base font-semibold text-text-primary">
          {title}
        </h2>

        <button
          onClick={onClose}
          className="p-1 rounded-lg bg-blue-500 hover:bg-blue-600 text-white transition-colors"
          aria-label="Close modal"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
    )}

    {/* Body */}
    <div className="p-6">{children}</div>
  </div>
</div>
  );
}
