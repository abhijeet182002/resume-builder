"use client";

import { useState } from "react";
import { User, Image as ImageIcon, Code, Calculator } from "lucide-react";

export default function ResumeBuilder() {
  const [category, setCategory] = useState("Multimedia");
  const [template, setTemplate] = useState("Minimal");

  const [form, setForm] = useState({
    name: "Aarav Mehta",
    role: "Visual Designer & Video Editor",
    email: "aarav.creates@email.com",
    phone: "+91 90909 12345",
    bio: "Creative storyteller blending design, motion and music to craft brand-defining visuals.",
    skills: "Photoshop, Illustrator, Premiere, Design, Camera",
  });

  const skillsArray = form.skills.split(",").map((s) => s.trim());

  const categories = [
    { name: "Programming", icon: Code },
    { name: "Accounting", icon: Calculator },
    { name: "Multimedia", icon: ImageIcon },
  ];

  const templates = ["Modern", "Classic", "Minimal"];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-1">Resume Builder</h1>
      <p className="text-gray-500 mb-6">
        Pick a category, edit your info, and export a polished PDF.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* LEFT PANEL */}
        <div className="space-y-6">

          {/* Category */}
          <div className="bg-white p-5 rounded-xl shadow-sm">
            <h2 className="font-semibold mb-3">Category</h2>
            <div className="flex gap-3">
              {categories.map((cat) => {
                const Icon = cat.icon;
                return (
                  <button
                    key={cat.name}
                    onClick={() => setCategory(cat.name)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${
                      category === cat.name
                        ? "border-pink-500 text-pink-500"
                        : "border-gray-300"
                    }`}
                  >
                    <Icon size={16} />
                    {cat.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Template */}
          <div className="bg-white p-5 rounded-xl shadow-sm">
            <h2 className="font-semibold mb-3">Template</h2>
            <div className="flex gap-3">
              {templates.map((t) => (
                <button
                  key={t}
                  onClick={() => setTemplate(t)}
                  className={`px-4 py-2 rounded-lg border ${
                    template === t
                      ? "border-pink-500 text-pink-500"
                      : "border-gray-300"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Personal Info */}
          <div className="bg-white p-5 rounded-xl shadow-sm space-y-3">
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

            <textarea
              value={form.bio}
              onChange={(e) =>
                setForm({ ...form, bio: e.target.value })
              }
              className="w-full border rounded-lg p-2"
            />
          </div>

          {/* Skills */}
          <div className="bg-white p-5 rounded-xl shadow-sm">
            <h2 className="font-semibold mb-2">Skills</h2>
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
        <div className="bg-white p-6 rounded-xl shadow-md">
          <p className="text-sm text-gray-400 mb-2">LIVE PREVIEW</p>

          <div className="border rounded-xl p-6 text-center">
            <h1 className="text-2xl font-semibold">{form.name}</h1>

            <p className="text-pink-500 tracking-widest text-sm mt-1">
              {form.role.toUpperCase()}
            </p>

            <p className="text-gray-500 text-sm mt-2">
              {form.email} • {form.phone}
            </p>

            <p className="mt-4 text-gray-600 text-sm">{form.bio}</p>

            {/* Skills */}
            <div className="mt-6">
              <h3 className="text-xs tracking-widest text-gray-400 mb-3">
                SKILLS
              </h3>

              <div className="grid grid-cols-2 gap-3">
                {skillsArray.map((skill, i) => (
                  <div
                    key={i}
                    className="bg-pink-50 text-pink-600 py-2 rounded-lg text-sm"
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </div>

            {/* Experience */}
            <div className="mt-6">
              <h3 className="text-xs tracking-widest text-gray-400 mb-2">
                EXPERIENCE
              </h3>
              <p className="font-medium">Lead Designer</p>
              <p className="text-gray-500 text-sm">
                Studio Pixel • 2023 - Present
              </p>
              <p className="text-gray-500 text-xs">
                Directed visual identity for 20+ brands.
              </p>
            </div>

            {/* Projects */}
            <div className="mt-6">
              <h3 className="text-xs tracking-widest text-gray-400 mb-2">
                PROJECTS
              </h3>
              <p className="font-medium">Brand Film - Verdant</p>
              <p className="text-gray-500 text-xs">
                Concept-to-edit 60s brand film, 2M+ views.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}