'use client';

import { useState } from 'react';
import {
  Check,
  Download,
  FileDown,
  LayoutTemplate,
  Loader2,
} from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils';

// ----------------------
// 🎨 TEMPLATES
// ----------------------

function ClassicTemplate({ data }: any) {
  return (
    <div className="text-sm">
      <h1 className="text-xl font-bold">{data.name}</h1>
      <p className="text-gray-600">{data.email}</p>

      <hr className="my-3" />

      <h2 className="font-semibold">Education</h2>
      <p>{data.education}</p>

      <h2 className="mt-3 font-semibold">Skills</h2>
      <p>{data.skills}</p>
    </div>
  );
}

function ModernTemplate({ data }: any) {
  return (
    <div className="flex text-sm h-full">
      <div className="w-1/3 bg-blue-600 text-white p-4">
        <h1 className="font-bold">{data.name}</h1>
        <p className="text-xs">{data.email}</p>

        <div className="mt-4">
          <h2 className="text-xs font-semibold">Skills</h2>
          <p className="text-xs">{data.skills}</p>
        </div>
      </div>

      <div className="w-2/3 p-4">
        <h2 className="font-semibold">Education</h2>
        <p>{data.education}</p>

        <h2 className="mt-3 font-semibold">Experience</h2>
        <p>{data.experience}</p>
      </div>
    </div>
  );
}

function MinimalTemplate({ data }: any) {
  return (
    <div className="text-sm text-gray-800">
      <h1 className="text-2xl font-light">{data.name}</h1>
      <p className="text-xs text-gray-500">{data.email}</p>

      <div className="mt-4 space-y-3">
        <div>
          <h2 className="text-xs uppercase text-gray-400">Education</h2>
          <p>{data.education}</p>
        </div>

        <div>
          <h2 className="text-xs uppercase text-gray-400">Skills</h2>
          <p>{data.skills}</p>
        </div>
      </div>
    </div>
  );
}

function TemplateRenderer({ template, data }: any) {
  switch (template) {
    case 'Modern':
      return <ModernTemplate data={data} />;
    case 'Minimal':
      return <MinimalTemplate data={data} />;
    default:
      return <ClassicTemplate data={data} />;
  }
}

// ----------------------
// 📄 MAIN PAGE
// ----------------------

const templates = [
  { name: 'Classic', accent: 'bg-blue-600' },
  { name: 'Modern', accent: 'bg-cyan-500' },
  { name: 'Minimal', accent: 'bg-slate-700' },
];

export default function DownloadsPage() {
  const [template, setTemplate] = useState('Classic');
  const [format, setFormat] = useState<'PDF' | 'DOCX'>('PDF');
  const [pageLength, setPageLength] = useState<'fit' | 'flow'>('fit');
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(false);

  // 🔥 Dummy Resume Data (Replace with API later)
  const resumeData = {
    name: 'Neeraj Singh',
    email: 'neeraj@email.com',
    education: 'B.Tech Computer Science',
    skills: 'React, Node.js, MongoDB',
    experience: 'Frontend Developer Intern',
  };

  const showToast = () => {
    setToast(true);
    setTimeout(() => setToast(false), 2500);
  };

  // 🔥 Download Handler
  const handleDownload = async () => {
    try {
      setLoading(true);

      await new Promise((res) => setTimeout(res, 1200));

      const blob = new Blob([JSON.stringify(resumeData, null, 2)], {
        type: 'application/json',
      });

      const url = URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = `${template}-resume.${format.toLowerCase()}`;
      a.click();

      URL.revokeObjectURL(url);

      showToast();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto grid max-w-7xl gap-6 p-4 pb-32 lg:grid-cols-2">
      {/* LEFT */}
      <section className="space-y-6">
        <div className="rounded-2xl border bg-gradient-to-br from-blue-100 to-white p-6 shadow">
          <Badge>Export Center</Badge>
          <h1 className="mt-2 text-2xl font-bold">
            Download your Resume 🚀
          </h1>
        </div>

        {/* TEMPLATE */}
        <div className="rounded-2xl border p-5 bg-white">
          <div className="flex justify-between mb-4">
            <h2 className="font-bold">Templates</h2>
            <Badge>{template}</Badge>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {templates.map((t) => {
              const selected = template === t.name;
              return (
                <button
                  key={t.name}
                  onClick={() => setTemplate(t.name)}
                  className={cn(
                    'p-3 border rounded-xl text-center',
                    selected
                      ? 'border-blue-500 bg-blue-50'
                      : 'hover:bg-gray-50'
                  )}
                >
                  <div
                    className={cn(
                      'h-2 w-8 mx-auto mb-2 rounded',
                      t.accent
                    )}
                  />
                  <p className="text-sm font-semibold">{t.name}</p>
                  {selected && (
                    <Check className="mx-auto mt-1 text-blue-600" size={14} />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* PAGE LENGTH */}
        <div className="rounded-2xl border bg-white p-5">
          <h2 className="font-bold mb-3 flex items-center gap-2">
            <LayoutTemplate size={16} /> Page Length
          </h2>

          <div className="grid grid-cols-2 gap-3">
            {[
              { key: 'fit', label: '1 Page' },
              { key: 'flow', label: 'Multi Page' },
            ].map((opt) => (
              <button
                key={opt.key}
                onClick={() => setPageLength(opt.key as any)}
                className={cn(
                  'p-3 border rounded-lg',
                  pageLength === opt.key
                    ? 'bg-blue-50 border-blue-500'
                    : ''
                )}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* RIGHT PREVIEW */}
      <section>
        <div className="sticky top-20 rounded-2xl border bg-white p-4">
          <div className="flex justify-between mb-3">
            <h3 className="font-bold">Preview</h3>
            <Badge>{template}</Badge>
          </div>

          <div className="bg-gray-100 p-4 rounded-xl">
            <div className="bg-white p-6 max-w-[520px] mx-auto shadow">
              <TemplateRenderer template={template} data={resumeData} />
            </div>
          </div>
        </div>
      </section>

      {/* BOTTOM BAR */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex gap-2">
            {(['PDF', 'DOCX'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFormat(f)}
                className={cn(
                  'px-4 py-2 rounded-md',
                  format === f
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100'
                )}
              >
                {f}
              </button>
            ))}
          </div>

          <button
            onClick={handleDownload}
            disabled={loading}
            className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-lg"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={16} />
                Downloading
              </>
            ) : (
              <>
                <Download size={16} />
                Download
              </>
            )}
          </button>
        </div>
      </div>

      {/* TOAST */}
      {toast && (
        <div className="fixed bottom-20 right-4 bg-black text-white px-4 py-2 rounded-lg flex items-center gap-2">
          <FileDown size={14} />
          Downloaded
        </div>
      )}
    </div>
  );
}