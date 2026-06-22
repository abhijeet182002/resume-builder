'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { ATSScoreOverview } from '@/components/ats/ATSScoreOverview';
import { FormattingCard } from '@/components/ats/FormattingCard';
import { KeywordMatchCard } from '@/components/ats/KeywordMatchCard';
import { SectionCompletenessCard } from '@/components/ats/SectionCompletenessCard';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { SAMPLE_RESUME_ID } from '@/lib/constants';
import { useATSStore } from '@/store/atsStore';

export default function ATSPage() {
  const router = useRouter();
  const suggestions = useATSStore((state) => state.suggestions);

  return (
    <div className="relative mx-auto max-w-7xl px-4 py-6 sm:px-6">
      
      {/* 🌈 Background Glow */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-50 via-white to-indigo-50 blur-2xl opacity-70" />

      {/* 🧠 Score Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <ATSScoreOverview />
      </motion.div>

      {/* 📊 Cards Grid */}
      <div className="mt-6 grid gap-5 lg:grid-cols-3">
        
        {[KeywordMatchCard, SectionCompletenessCard, FormattingCard].map((Card, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.15 }}
            whileHover={{ y: -8, scale: 1.02 }}
            className="rounded-2xl border border-white/40 bg-white/60 backdrop-blur-xl shadow-lg p-4"
          >
            <Card />
          </motion.div>
        ))}

      </div>

      {/* 🚀 Suggestions Section */}
      <motion.section
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-8 rounded-3xl border border-blue-100 bg-gradient-to-br from-blue-50 to-indigo-100 p-6 shadow-xl"
      >
        {/* Header */}
        <div className="mb-5 flex items-center justify-between flex-wrap gap-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-gray-500">
              Action Plan
            </p>
            <h2 className="text-xl font-extrabold text-gray-800">
              Improvement Suggestions
            </h2>
          </div>

          <Badge variant="blue" className="text-sm px-3 py-1">
            {suggestions.length} fixes
          </Badge>
        </div>

        {/* Suggestions Grid */}
        <div className="grid gap-4 sm:grid-cols-2">
          {suggestions.map((suggestion, index) => (
            <motion.div
              key={suggestion.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.08 }}
              whileHover={{ scale: 1.03 }}
              className="group rounded-2xl border border-white/50 bg-white/70 backdrop-blur-lg p-5 shadow-md transition-all"
            >
              {/* Title */}
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-sm font-bold text-gray-800">
                  {suggestion.title}
                </h3>

                <Badge
                  variant={
                    suggestion.priority === 'High'
                      ? 'amber'
                      : suggestion.priority === 'Medium'
                      ? 'blue'
                      : 'gray'
                  }
                >
                  {suggestion.priority}
                </Badge>
              </div>

              {/* Description */}
              <p className="text-xs text-gray-600 leading-relaxed mb-4">
                {suggestion.description}
              </p>

              {/* Button */}
              <Button
                size="sm"
                onClick={() =>
                  router.push(`/resume/${SAMPLE_RESUME_ID}/editor`)
                }
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:opacity-90 transition-all"
              >
                Fix Now →
              </Button>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  );
}