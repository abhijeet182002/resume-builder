'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  CheckCircle2,
  Layers3,
  Linkedin,
  Target,
  Wrench,
} from 'lucide-react';

import { Badge } from '@/components/ui/Badge';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { ScoreRing } from '@/components/ui/ScoreRing';
import { SAMPLE_RESUME_ID } from '@/lib/constants';

const nextSteps = [
  { text: 'Add one internship project', icon: Layers3 },
  { text: 'Improve project descriptions with metrics', icon: Wrench },
  { text: 'Add 4 more role-specific keywords', icon: Target },
  { text: 'Complete your LinkedIn URL', icon: Linkedin },
];

const readinessCards = [
  {
    label: 'Resume Completed',
    value: '85%',
    detail: 'Most sections are ready',
    content: <ProgressBar value={85} color="green" className="mt-4" />,
  },
  {
    label: 'ATS Score',
    value: '74/100',
    detail: 'Good baseline score',
    content: (
      <div className="mt-4 flex justify-center">
        <ScoreRing score={74} size={82} color="#2563EB" />
      </div>
    ),
  },
  {
    label: 'Project Quality',
    value: '2 of 3 Strong',
    detail: 'Add measurable impact',
    content: <ProgressBar value={66} color="blue" className="mt-4" />,
  },
  {
    label: 'Skill Coverage',
    value: '8 of 12',
    detail: 'Keyword gaps exist',
    content: <ProgressBar value={67} color="cyan" className="mt-4" />,
  },
  {
    label: 'Profile Strength',
    value: 'Good',
    detail: 'LinkedIn missing',
    content: <Badge variant="amber" className="mt-4">Needs polish</Badge>,
  },
];

export default function PlacementReadinessPage() {
  return (
    <div className="relative mx-auto max-w-7xl px-4 py-6 sm:px-6">

      {/* 🌈 Background Glow */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-indigo-50 via-white to-blue-50 blur-2xl opacity-70" />

      {/* 🧠 HERO */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl border border-white/40 bg-white/60 backdrop-blur-xl p-6 shadow-xl"
      >
        <div className="flex flex-col lg:flex-row justify-between gap-6 items-center">

          <div>
            <Badge variant="amber" className="px-4 py-2 text-sm">
              🚀 62% Ready
            </Badge>

            <h1 className="mt-4 text-3xl font-extrabold text-gray-800">
              You're Almost Placement Ready
            </h1>

            <p className="mt-2 text-sm text-gray-600 max-w-xl">
              Optimize your resume with high-impact improvements to boost ATS score and recruiter trust.
            </p>
          </div>

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <ScoreRing score={62} size={110} color="#F59E0B" />
          </motion.div>
        </div>
      </motion.section>

      {/* 📊 STATS */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {readinessCards.map((card, i) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -8, scale: 1.03 }}
            className="rounded-2xl border border-white/40 bg-white/60 backdrop-blur-xl p-5 shadow-md"
          >
            <p className="text-xs font-semibold text-gray-500 uppercase">
              {card.label}
            </p>

            <p className="mt-2 text-xl font-bold text-gray-800">
              {card.value}
            </p>

            <p className="text-xs text-gray-500">
              {card.detail}
            </p>

            {card.content}
          </motion.div>
        ))}
      </div>

      {/* 🚀 NEXT STEPS */}
      <motion.section
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-8 rounded-3xl border border-blue-100 bg-gradient-to-br from-blue-50 to-indigo-100 p-6 shadow-xl"
      >
        <div className="mb-5 flex justify-between items-center">
          <div>
            <p className="text-xs uppercase text-gray-500 font-bold">
              Action Plan
            </p>
            <h2 className="text-xl font-bold text-gray-800">
              What to do next
            </h2>
          </div>

          <Badge variant="blue">{nextSteps.length} actions</Badge>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {nextSteps.map(({ text, icon: Icon }, i) => (
            <motion.div
              key={text}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="flex justify-between items-center p-4 rounded-xl bg-white/70 backdrop-blur border border-white/50 shadow-sm"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Icon className="w-4 h-4 text-blue-600" />
                </div>

                <div>
                  <p className="text-sm font-semibold text-gray-800">
                    {text}
                  </p>
                  <p className="text-xs text-gray-500">
                    Step {i + 1}
                  </p>
                </div>
              </div>

              <Badge variant="blue">High</Badge>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ✅ CTA */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-4"
      >
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <CheckCircle2 className="w-4 h-4 text-green-500" />
          Resume synced with ATS
        </div>

        <Link
          href={`/resume/${SAMPLE_RESUME_ID}/editor`}
          className="group flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow-lg hover:scale-105 transition"
        >
          Improve Resume
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
        </Link>
      </motion.div>
    </div>
  );
}