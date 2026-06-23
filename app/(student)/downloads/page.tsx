"use client";

import { useState } from "react";
import {
  User,
  Image as ImageIcon,
  Code,
  Calculator,
  Megaphone,
  Layers,
  Mail,
  Phone,
  Github,
  Linkedin,
  Briefcase,
  Folder,
  Star,
} from "lucide-react";

/* ---------------- CATEGORY CONFIG ---------------- */
const categoryConfig: any = {
  Accounting: {
    color: "emerald",
    icon: Calculator,
  },
  Web: {
    color: "blue",
    icon: Code,
  },
  Marketing: {
    color: "orange",
    icon: Megaphone,
  },
  Multimedia: {
    color: "pink",
    icon: ImageIcon,
  },
  Others: {
    color: "gray",
    icon: Layers,
  },
};

export default function ResumeBuilder() {
  const [category, setCategory] = useState("Web");
  const [template, setTemplate] = useState("Modern");

  const [form, setForm] = useState({
    name: "Aarav Mehta",
    role: "Frontend Developer",
    email: "aarav@email.com",
    phone: "+91 90000 00000",
    bio: "Passionate developer creating scalable and modern web apps.",
    skills: "React, Next.js, Tailwind, Node.js",
    github: "github.com/aarav",
    linkedin: "linkedin.com/in/aarav",
    experience: "Frontend Dev at XYZ Company",
    project: "E-commerce Website",
    image: "",
  });

  const skillsArray = form.skills.split(",").map((s) => s.trim());

  const current = categoryConfig[category];
  const Icon = current.icon;

  /* ---------------- DYNAMIC COLOR CLASSES ---------------- */
  const colorMap: any = {
    blue: {
      text: "text-blue-600",
      bg: "bg-blue-50",
      border: "border-blue-500",
    },
    emerald: {
      text: "text-emerald-600",
      bg: "bg-emerald-50",
      border: "border-emerald-500",
    },
    orange: {
      text: "text-orange-600",
      bg: "bg-orange-50",
      border: "border-orange-500",
    },
    pink: {
      text: "text-pink-600",
      bg: "bg-pink-50",
      border: "border-pink-500",
    },
    gray: {
      text: "text-gray-600",
      bg: "bg-gray-100",
      border: "border-gray-500",
    },
  };

  const theme = colorMap[current.color];

  const categories = Object.keys(categoryConfig);
  const templates = ["Modern", "Classic", "Minimal"];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold">Smart Resume Builder</h1>
      <p className="text-gray-500 mb-6">
        Category based dynamic resume generator
      </p>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* LEFT PANEL */}
        <div className="space-y-6">
          {/* CATEGORY */}
          <div className="bg-white p-5 rounded-xl shadow">
            <h2 className="font-semibold mb-3">Category</h2>

            <div className="flex flex-wrap gap-3">
              {categories.map((cat) => {
                const CatIcon = categoryConfig[cat].icon;

                return (
                  <button
                    key={cat}
                    onClick={() => setCategory(cat)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${category === cat
                        ? `${theme.border} ${theme.text}`
                        : "border-gray-300"
                      }`}
                  >
                    <CatIcon size={16} />
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          {/* TEMPLATE */}
          <div className="bg-white p-5 rounded-xl shadow">
            <h2 className="font-semibold mb-3">Template</h2>

            <div className="flex gap-3">
              {templates.map((t) => (
                <button
                  key={t}
                  onClick={() => setTemplate(t)}
                  className={`px-4 py-2 rounded-lg border ${template === t
                      ? `${theme.border} ${theme.text}`
                      : "border-gray-300"
                    }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* FORM */}
          <div className="bg-white p-5 rounded-xl shadow space-y-3">
            <h2 className="font-semibold flex items-center gap-2">
              <User size={16} /> Personal Info
            </h2>

            {["name", "role", "email", "phone"].map((field) => (
              <input
                key={field}
                value={(form as any)[field]}
                onChange={(e) =>
                  setForm({ ...form, [field]: e.target.value })
                }
                className="w-full border rounded-lg p-2"
                placeholder={field}
              />
            ))}

            <input
              type="file"
              onChange={(e: any) => {
                const file = e.target.files[0];
                if (file) {
                  setForm({
                    ...form,
                    image: URL.createObjectURL(file),
                  });
                }
              }}
              className="w-full"
            />

            <input
              placeholder="GitHub"
              value={form.github}
              onChange={(e) => setForm({ ...form, github: e.target.value })}
              className="w-full border p-2 rounded"
            />

            <input
              placeholder="LinkedIn"
              value={form.linkedin}
              onChange={(e) => setForm({ ...form, linkedin: e.target.value })}
              className="w-full border p-2 rounded"
            />

            <input
              placeholder="Experience"
              value={form.experience}
              onChange={(e) => setForm({ ...form, experience: e.target.value })}
              className="w-full border p-2 rounded"
            />

            <input
              placeholder="Project"
              value={form.project}
              onChange={(e) => setForm({ ...form, project: e.target.value })}
              className="w-full border p-2 rounded"
            />

            <textarea
              value={form.bio}
              onChange={(e) =>
                setForm({ ...form, bio: e.target.value })
              }
              className="w-full border rounded-lg p-2"
            />

            <input
              value={form.skills}
              onChange={(e) =>
                setForm({ ...form, skills: e.target.value })
              }
              className="w-full border rounded-lg p-2"
            />
          </div>
        </div>

        {/* RIGHT PREVIEW */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <p className="text-sm text-gray-400 mb-2">LIVE PREVIEW</p>

          {/* TEMPLATE SWITCH */}
          {template === "Modern" && (
            <div className="border rounded-xl p-6 space-y-4">

              {/* HEADER */}
              <div className="flex items-center gap-4">
                {form.image ? (
                  <img src={form.image} className="h-16 w-16 rounded-xl object-cover" />
                ) : (
                  <div className={`h-16 w-16 rounded-xl flex items-center justify-center ${theme.bg}`}>
                    <Icon className={theme.text} />
                  </div>
                )}

                <div>
                  <h1 className="text-xl font-semibold">{form.name}</h1>
                  <p className={`${theme.text} text-sm`}>{form.role}</p>
                </div>
              </div>

              {/* CONTACT */}
              <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                <span className="flex items-center gap-1">
                  <Mail size={14} /> {form.email}
                </span>
                <span className="flex items-center gap-1">
                  <Phone size={14} /> {form.phone}
                </span>
              </div>

              {/* SOCIAL */}
              <div className="flex gap-4 text-sm">
                <span className="flex items-center gap-1">
                  <Github size={14} /> {form.github}
                </span>
                <span className="flex items-center gap-1">
                  <Linkedin size={14} /> {form.linkedin}
                </span>
              </div>

              {/* BIO */}
              <p className="text-gray-600 text-sm">{form.bio}</p>

              {/* SKILLS WITH LEVEL */}
              <div>
                <h3 className="text-xs text-gray-400 mb-2">SKILLS</h3>
                {skillsArray.map((skill, i) => (
                  <div key={i} className="mb-2">
                    <div className="flex justify-between text-xs">
                      <span>{skill}</span>
                      <Star size={12} />
                    </div>
                    <div className="h-1 bg-gray-200 rounded">
                      <div className={`h-1 rounded ${theme.bg}`} style={{ width: `${70 + i * 5}%` }} />
                    </div>
                  </div>
                ))}
              </div>

              {/* EXPERIENCE */}
              <div>
                <h3 className="text-xs text-gray-400 mb-1 flex items-center gap-1">
                  <Briefcase size={12} /> EXPERIENCE
                </h3>
                <p className="text-sm">{form.experience}</p>
              </div>

              {/* PROJECT */}
              <div>
                <h3 className="text-xs text-gray-400 mb-1 flex items-center gap-1">
                  <Folder size={12} /> PROJECT
                </h3>
                <p className="text-sm">{form.project}</p>
              </div>

            </div>
          )}

          {/* CLASSIC TEMPLATE */}
          {template === "Classic" && (
            <div className="border rounded-xl p-6 font-serif">
              <h1 className="text-2xl font-bold border-b pb-2">{form.name}</h1>
              <p className="text-sm text-gray-500 mt-1">{form.role}</p>

              <p className="mt-2 text-sm">
                {form.email} | {form.phone}
              </p>

              <div className="mt-4">
                <h3 className="font-semibold">Profile</h3>
                <p className="text-sm text-gray-600">{form.bio}</p>
              </div>

              <div className="mt-4">
                <h3 className="font-semibold">Skills</h3>
                <ul className="list-disc ml-5 text-sm">
                  {skillsArray.map((skill, i) => (
                    <li key={i}>{skill}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* MINIMAL TEMPLATE */}
          {template === "Minimal" && (
            <div className="border rounded-xl p-6">
              <h1 className="text-lg font-medium">{form.name}</h1>
              <p className="text-xs text-gray-400">{form.role}</p>

              <div className="mt-4 text-sm text-gray-600">
                <p>{form.bio}</p>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {skillsArray.map((skill, i) => (
                  <span key={i} className="border px-2 py-1 text-xs rounded">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}