'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Bell, Menu, LogOut, LogIn } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useUIStore } from '@/store/uiStore'
import { useResumeSync } from '@/hooks/useResumeSync'
import { useNotificationStore } from '@/store/notificationStore'

interface TopBarProps {
  title?: string
  resumeId?: string
  className?: string
}

export function TopBar({ title, resumeId, className }: TopBarProps) {
  const router = useRouter()
  const { toggleSidebar } = useUIStore()
  const [isLoggedIn, setIsLoggedIn] = useState(true)
  const [userName, setUserName] = useState('')
  const [openMenu, setOpenMenu] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const sync = useResumeSync(resumeId)
  const { isDownloading, setIsDownloading, showToast } = useUIStore()

  const { notifications, fetchNotifications, markAsRead, markAllAsRead } = useNotificationStore()

  useEffect(() => {
    fetchNotifications()
    const interval = setInterval(fetchNotifications, 30000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    fetch('/api/user/me')
      .then(res => res.json())
      .then(data => {
        if (data?.user) {
          setUserName(data.user.name || '')
        }
      })
      .catch(() => {})
  }, [])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowNotifications(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const unreadCount = notifications.filter(n => !n.isRead).length

  const handleDownload = async () => {
    setIsDownloading(true)
    try {
      const html2pdf = (await import('html2pdf.js')).default
      const element = document.getElementById('resume-preview-content')
      if (!element) throw new Error('Preview not found')
      
      const fileName = `resume-${Date.now()}.pdf`
      await html2pdf().set({
        margin: 0,
        filename: fileName,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      }).from(element).save()

      await fetch(`/api/resume/${resumeId}/download`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fileName }),
      })
      showToast('PDF downloaded!', 'success')
      fetchNotifications() // Refresh notifications list
    } catch {
      showToast('Download failed', 'error')
    } finally {
      setIsDownloading(false)
    }
  }

  if (resumeId) {
    return (
      <header className={cn("h-14 border-b bg-white flex items-center justify-between px-4 shrink-0", className)}>
        <span className="text-sm text-gray-500 font-medium">
          {sync.isSaving ? 'Saving...' : sync.isDirty ? 'Unsaved changes' : 'All changes saved'}
        </span>
        <div className="flex items-center gap-3">
          {/* Notifications Bell for Editor Mode */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => {
                setShowNotifications(!showNotifications)
                if (!showNotifications) fetchNotifications()
              }}
              className="relative p-2 rounded-lg transition-all hover:bg-blue-50 hover:scale-105"
            >
              <Bell className="h-5 w-5 text-gray-600" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                </span>
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 rounded-2xl bg-white shadow-2xl border border-slate-100 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                  <span className="text-xs font-bold text-slate-800">Notifications</span>
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllAsRead}
                      className="text-[10px] font-semibold text-primary-DEFAULT hover:underline"
                    >
                      Mark all as read
                    </button>
                  )}
                </div>

                <div className="max-h-64 overflow-y-auto divide-y divide-slate-50">
                  {notifications.length > 0 ? (
                    notifications.map((n) => (
                      <div
                        key={n.id}
                        onClick={() => {
                          if (!n.isRead) markAsRead(n.id)
                        }}
                        className={cn(
                          "p-3.5 flex items-start gap-2.5 transition cursor-pointer text-left",
                          n.isRead ? "bg-white hover:bg-slate-50" : "bg-blue-50/40 hover:bg-blue-50/70"
                        )}
                      >
                        <div className={cn(
                          "w-2 h-2 rounded-full mt-1.5 shrink-0",
                          n.isRead ? "bg-slate-200" : "bg-primary-DEFAULT"
                        )} />
                        <div className="min-w-0 flex-1">
                          <p className={cn("text-xs leading-snug text-slate-800", !n.isRead && "font-bold")}>
                            {n.type ? n.type.toUpperCase() : 'NOTIFICATION'}
                          </p>
                          <p className="text-[10px] text-slate-500 mt-0.5 leading-relaxed">
                            {n.message}
                          </p>
                          <span className="text-[9px] text-slate-400 mt-1 block">
                            {formatTimeAgo(n.createdAt)}
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-8 text-center text-slate-400 text-xs italic">
                      No notifications yet.
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="h-6 w-px bg-slate-200" />

          <button 
            onClick={sync.save} 
            disabled={sync.isSaving || !sync.isDirty} 
            className="px-4 py-2 border border-slate-200 rounded-lg hover:bg-slate-50 transition text-sm font-semibold disabled:opacity-50"
          >
            Save
          </button>
          <button 
            onClick={handleDownload} 
            disabled={isDownloading} 
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm font-semibold disabled:opacity-50"
          >
            {isDownloading ? 'Downloading...' : 'Download PDF'}
          </button>
        </div>
      </header>
    )
  }

  return (
    <header
      className={cn(
        'sticky top-0 left-4 z-50 h-16 px-5 flex items-center justify-between',
        'bg-white/70 backdrop-blur-xl border-b border-white/50',
        'shadow-[0_4px_20px_rgba(0,0,0,0.05)]',
        className
      )}
    >
      <div className="flex items-center gap-3">
        <button
          onClick={() => {}}
          className="md:hidden p-2 rounded-lg hover:bg-blue-50 transition"
        >
          <Menu className="h-5 w-5" />
        </button>

        <h1 className="text-lg font-bold text-gray-800 tracking-tight">
          {title}
        </h1>
      </div>

      <div className="flex items-center gap-3">
        {/* Notifications Bell for Regular Pages */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => {
              setShowNotifications(!showNotifications)
              if (!showNotifications) fetchNotifications()
            }}
            className="relative p-2 rounded-lg transition-all hover:bg-blue-50 hover:scale-105"
          >
            <Bell className="h-5 w-5 text-gray-600" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 rounded-2xl bg-white shadow-2xl border border-slate-100 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                <span className="text-xs font-bold text-slate-800">Notifications</span>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="text-[10px] font-semibold text-primary-DEFAULT hover:underline"
                  >
                    Mark all as read
                  </button>
                )}
              </div>

              <div className="max-h-64 overflow-y-auto divide-y divide-slate-50">
                {notifications.length > 0 ? (
                  notifications.map((n) => (
                    <div
                      key={n.id}
                      onClick={() => {
                        if (!n.isRead) markAsRead(n.id)
                      }}
                      className={cn(
                        "p-3.5 flex items-start gap-2.5 transition cursor-pointer text-left",
                        n.isRead ? "bg-white hover:bg-slate-50" : "bg-blue-50/40 hover:bg-blue-50/70"
                      )}
                    >
                      <div className={cn(
                        "w-2 h-2 rounded-full mt-1.5 shrink-0",
                        n.isRead ? "bg-slate-200" : "bg-primary-DEFAULT"
                      )} />
                      <div className="min-w-0 flex-1">
                        <p className={cn("text-xs leading-snug text-slate-800", !n.isRead && "font-bold")}>
                          {n.type ? n.type.toUpperCase() : 'NOTIFICATION'}
                        </p>
                        <p className="text-[10px] text-slate-500 mt-0.5 leading-relaxed">
                          {n.message}
                        </p>
                        <span className="text-[9px] text-slate-400 mt-1 block">
                          {formatTimeAgo(n.createdAt)}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-8 text-center text-slate-400 text-xs italic">
                    No notifications yet.
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

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
            <button
              onClick={() => setOpenMenu(!openMenu)}
              className="flex items-center gap-2 rounded-full px-2 py-1 hover:bg-blue-50 transition"
            >
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-600 to-indigo-500 flex items-center justify-center text-white font-bold shadow-md">
                {userName ? userName.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase() : 'U'}
              </div>
            </button>

            {openMenu && (
              <div className="absolute right-0 mt-3 w-44 rounded-xl bg-white shadow-xl border border-gray-100 overflow-hidden animate-in fade-in zoom-in-95">
                <button
                  onClick={async () => {
                    try {
                      await fetch('/api/auth/logout', { method: 'POST' })
                    } catch {}
                    setIsLoggedIn(false)
                    setOpenMenu(false)
                    router.push('/login')
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

function formatTimeAgo(dateStr: string) {
  try {
    const date = new Date(dateStr)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    if (diffMins < 1) return 'Just now'
    if (diffMins < 60) return `${diffMins}m ago`
    const diffHours = Math.floor(diffMins / 60)
    if (diffHours < 24) return `${diffHours}h ago`
    const diffDays = Math.floor(diffHours / 24)
    return `${diffDays}d ago`
  } catch {
    return ''
  }
}