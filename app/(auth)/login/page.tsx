'use client';

import { useState } from 'react';
import Image from "next/image";
import { motion } from 'framer-motion';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  GraduationCap,
  ArrowRight,
} from 'lucide-react';

export default function PlacementLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    alert('Welcome to Placement Portal 🚀');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050816] text-white relative overflow-hidden">

      {/* 🔵 Background Glow */}
      <div className="absolute w-[700px] h-[700px] bg-gradient-to-r from-blue-600/20 via-cyan-400/20 to-blue-400/20 blur-[140px] rounded-full" />

      {/* 🎓 Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full max-w-md"
      >
        {/* Glow Border */}
        <div className="absolute -inset-[1px] rounded-[30px] bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-400 blur opacity-60" />

        <div className="relative p-8 rounded-[30px] bg-black/60 backdrop-blur-xl border border-white/10">

          {/* Logo */}
          <div className="flex justify-center mb-6">
            <div className="h-16 w-16 rounded-2xl flex items-center justify-center bg-gradient-to-br from-blue-600 to-cyan-400 shadow-lg overflow-hidden">
              <Image
                src="/images/logo/ifda-logo.jfif"   // 👈 public folder me image rakho
                alt="Logo"
                width={70}
                height={40}
                className="object-contain"
              />
            </div>
          </div>

          <h1 className="text-3xl font-bold text-center">
            Placement Portal
          </h1>

          <p className="text-center text-slate-400 mt-2">
            Login to view placement opportunities
          </p>

          <form className="mt-8 space-y-5" onSubmit={handleLogin}>

            {/* Email */}
            <div>
              <label className="text-sm text-slate-300">College Email</label>
              <div className="mt-2 flex items-center h-14 px-4 rounded-2xl bg-white/5 border border-white/10 focus-within:border-blue-500">
                <Mail className="text-blue-400" />
                <input
                  type="email"
                  placeholder="you@college.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="ml-3 w-full bg-transparent outline-none"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="text-sm text-slate-300">Password</label>
              <div className="mt-2 flex items-center h-14 px-4 rounded-2xl bg-white/5 border border-white/10 focus-within:border-cyan-400">
                <Lock className="text-cyan-400" />
                <input
                  type={show ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="ml-3 w-full bg-transparent outline-none"
                />
                <button type="button" onClick={() => setShow(!show)}>
                  {show ? <EyeOff /> : <Eye />}
                </button>
              </div>
            </div>

            {/* Options */}
            <div className="flex justify-between text-sm text-slate-400">
              <label className="flex items-center gap-2">
                <input type="checkbox" />
                Remember me
              </label>
              <button type="button" className="text-blue-400 hover:underline">
                Forgot password?
              </button>
            </div>

            {/* Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full h-14 rounded-2xl bg-gradient-to-r from-blue-600 via-cyan-400 to-blue-500 font-semibold flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  Login <ArrowRight size={18} />
                </>
              )}
            </motion.button>
          </form>

          {/* Footer */}
          <p className="text-center text-xs text-slate-500 mt-6">
            © 2026 Placement Cell • Secure Login
          </p>

        </div>
      </motion.div>
    </div>
  );
}