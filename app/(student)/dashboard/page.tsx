'use client';

import { ActivityFeed } from '@/components/dashboard/ActivityFeed';
import { MetricCard } from '@/components/dashboard/MetricCard';
import { PrimaryActions } from '@/components/dashboard/PrimaryActions';
import { Clock, Target } from 'lucide-react';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

export default function DashboardPage() {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        visible: {
          transition: {
            staggerChildren: 0.15,
          },
        },
      }}
      className="mx-auto max-w-7xl space-y-6 p-4 sm:p-6"
    >
      {/* Hero Section */}
      <motion.section
        variants={fadeUp}
        whileHover={{ scale: 1.01 }}
        className="relative isolate overflow-hidden rounded-[12px] border border-[#BFD7FF] bg-[#EAF3FF] p-6 shadow-[0_1px_2px_rgba(15,23,42,0.06),0_18px_42px_rgba(37,99,235,0.12)]"
      >
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.35, 0.2],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
          }}
          className="absolute right-5 top-5 h-28 w-28 rounded-full bg-primary-DEFAULT/15 blur-2xl"
        />

        <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-primary-DEFAULT to-accent-cyan" />
        <div className="absolute bottom-0 right-0 h-20 w-64 bg-gradient-to-l from-cyan-200/35 to-transparent blur-xl" />

        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="relative text-2xl font-extrabold tracking-[-0.03em] text-[#10233F]"
        >
          Good morning, Arjun
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
          className="relative mt-1 text-sm font-medium text-[#45607F]"
        >
          Your resume is 72% complete. Keep going!
        </motion.p>
      </motion.section>

      {/* Metrics */}
      <motion.section
        variants={fadeUp}
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
      >
        {[
          <MetricCard
            key="1"
            title="Resume Completion"
            value={72}
            type="ring"
            subtitle="8 sections started"
          />,
          <MetricCard
            key="2"
            title="ATS Score"
            value={74}
            type="ring"
            color="#06B6D4"
            subtitle="Good match"
          />,
          <MetricCard
            key="3"
            title="Placement Readiness"
            value="Getting There"
            type="badge"
            badgeVariant="amber"
            icon={<Target className="h-5 w-5 text-warning" />}
            subtitle="3 actions pending"
          />,
          <MetricCard
            key="4"
            title="Last Updated"
            value="2 days ago"
            type="text"
            badgeVariant="gray"
            icon={<Clock className="h-5 w-5 text-text-muted" />}
            subtitle="Draft auto-saved"
          />,
        ].map((card, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.2 + index * 0.1,
              duration: 0.5,
            }}
            whileHover={{
              y: -5,
              transition: { duration: 0.2 },
            }}
          >
            {card}
          </motion.div>
        ))}
      </motion.section>

      {/* Actions */}
      <motion.div variants={fadeUp}>
        <PrimaryActions />
      </motion.div>

      {/* Activity Feed */}
      <motion.div
        variants={fadeUp}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <ActivityFeed />
      </motion.div>
    </motion.div>
  );
}