'use client'

import { useState } from 'react'
import { Bell, Menu, LogOut, User, LogIn } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useUIStore } from '@/store/uiStore'

interface TopBarProps {
  title: string
  className?: string
}

export function TopBar({ title, className }: TopBarProps) {
  const { toggleSidebar } = useUIStore()

  const [isLoggedIn, setIsLoggedIn] = useState(true)
  const [openMenu, setOpenMenu] = useState(false)

  return (
    <header
      className={cn(
        'sticky top-0 left-4 z-50 h-16 px-5 flex items-center justify-between',
        'bg-white/70 backdrop-blur-xl border-b border-white/50',
        'shadow-[0_4px_20px_rgba(0,0,0,0.05)]',
        className
      )}
    >
      {/* LEFT */}
      <div className="flex items-center gap-3">
        <button
          onClick={toggleSidebar}
          className="md:hidden p-2 rounded-lg hover:bg-blue-50 transition"
        >
          <Menu className="h-5 w-5" />
        </button>

        <h1 className="text-lg font-bold text-gray-800 tracking-tight">
          {title}
        </h1>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-3">

        {/* NOTIFICATION */}
        <button className="relative p-2 rounded-lg transition-all hover:bg-blue-50 hover:scale-105">
          <Bell className="h-5 w-5 text-gray-600" />
          <span className="absolute top-1 right-1 flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
          </span>
        </button>

        {/* AUTH SECTION */}
        {!isLoggedIn ? (
          <button
            onClick={() => setIsLoggedIn(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-semibold shadow-md hover:scale-105 transition"
          >
            <LogIn size={16} />
            Login
          </button>
        ) : (
          <div className="relative">
            {/* AVATAR */}
            <button
              onClick={() => setOpenMenu(!openMenu)}
              className="flex items-center gap-2 rounded-full px-2 py-1 hover:bg-blue-50 transition"
            >
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-600 to-indigo-500 flex items-center justify-center text-white font-bold shadow-md">
                AS
              </div>
            </button>

            {/* DROPDOWN */}
            {openMenu && (
              <div className="absolute right-0 mt-3 w-44 rounded-xl bg-white shadow-xl border border-gray-100 overflow-hidden animate-in fade-in zoom-in-95">

                <button
                  onClick={() => {
                    setIsLoggedIn(false)
                    setOpenMenu(false)
                  }}
                  className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-500 hover:bg-red-50 transition"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  )
}