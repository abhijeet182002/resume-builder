'use client'

import { useState } from 'react'
import { Bell, GraduationCap, Mail, Save, Shield, User } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { samplePersonal } from '@/lib/sampleData'

const preferenceItems = [
  {
    label: 'Resume score alerts',
    description: 'Notify when ATS score changes',
  },
  {
    label: 'Placement reminders',
    description: 'Weekly readiness checklist',
  },
  {
    label: 'Officer visibility',
    description: 'Allow placement team to view resume status',
  },
]

export default function SettingsPage() {
  const [loading, setLoading] = useState(false)
  const [toggles, setToggles] = useState(
    preferenceItems.reduce((acc, item) => {
      acc[item.label] = true
      return acc
    }, {} as Record<string, boolean>)
  )

  const handleSave = () => {
    setLoading(true)
    setTimeout(() => setLoading(false), 1500)
  }

  return (
    <div className="mx-auto max-w-6xl space-y-6 p-4 sm:p-6">

      {/* HEADER */}
      <section className="relative overflow-hidden rounded-2xl border bg-gradient-to-br from-blue-50 to-indigo-100 p-6 shadow-lg backdrop-blur-xl">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-500 text-white text-xl font-bold shadow-lg animate-pulse">
              AS
            </div>

            <div>
              <Badge variant="blue" className="mb-1">Student profile</Badge>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-800">
                {samplePersonal.fullName}
              </h1>
              <p className="text-sm text-gray-600">
                {samplePersonal.email}
              </p>
            </div>
          </div>

          <div className="rounded-xl bg-white/70 backdrop-blur-md px-5 py-3 shadow-inner">
            <p className="text-xs uppercase text-gray-500 font-bold">
              Profile Status
            </p>
            <p className="text-2xl font-bold text-green-600">
              Good
            </p>
          </div>
        </div>
      </section>

      {/* GRID */}
      <div className="grid gap-6 lg:grid-cols-2">

        {/* PROFILE */}
        <section className="card">
          <Header icon={<User />} title="Profile details" subtitle="Account" />

          <div className="grid gap-4 sm:grid-cols-2">
            <Input label="Full name" defaultValue={samplePersonal.fullName} />
            <Input label="Email" defaultValue={samplePersonal.email} />
            <Input label="Phone" defaultValue={samplePersonal.phone} />
            <Input label="City" defaultValue={samplePersonal.city} />
            <Input label="LinkedIn" defaultValue={samplePersonal.linkedin} />
            <Input label="GitHub" defaultValue={samplePersonal.github} />
          </div>
        </section>

        {/* ACADEMICS */}
        <section className="card">
          <Header icon={<GraduationCap />} title="Institute details" subtitle="Academics" />

          <div className="space-y-4">
            <Input label="College" defaultValue="IIT Delhi" />

            <Select
              label="Branch"
              defaultValue="CSE"
              options={[
                { value: 'CSE', label: 'Computer Science Engineering' },
                { value: 'ECE', label: 'Electronics and Communication' },
                { value: 'ME', label: 'Mechanical Engineering' },
                { value: 'Civil', label: 'Civil Engineering' },
              ]}
            />

            <Select
              label="Year"
              defaultValue="3rd"
              options={[
                { value: '1st', label: '1st Year' },
                { value: '2nd', label: '2nd Year' },
                { value: '3rd', label: '3rd Year' },
                { value: '4th', label: '4th Year' },
              ]}
            />

            <Input label="Target role" defaultValue={samplePersonal.targetRole} />
          </div>
        </section>
      </div>

      {/* PREFERENCES */}
      <section className="card bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="text-xs uppercase text-gray-500 font-bold">
              Preferences
            </p>
            <h2 className="text-lg font-bold text-gray-800">
              Notifications & Privacy
            </h2>
          </div>

          <Badge variant="green">Active</Badge>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {preferenceItems.map((item) => (
            <div
              key={item.label}
              className="group rounded-xl border bg-white/70 backdrop-blur-md p-4 shadow-sm hover:shadow-md transition-all hover:-translate-y-1"
            >
              <div className="flex justify-between items-center mb-3">
                <span className="iconBox">
                  {item.label.includes('visibility') ? (
                    <Shield size={16} />
                  ) : item.label.includes('alerts') ? (
                    <Bell size={16} />
                  ) : (
                    <Mail size={16} />
                  )}
                </span>

                {/* TOGGLE */}
                <button
                  onClick={() =>
                    setToggles((prev) => ({
                      ...prev,
                      [item.label]: !prev[item.label],
                    }))
                  }
                  className={`toggle ${toggles[item.label] ? 'active' : ''}`}
                >
                  <span />
                </button>
              </div>

              <p className="font-semibold text-gray-800">
                {item.label}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* SAVE BUTTON */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="relative overflow-hidden rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3 text-white font-bold shadow-lg transition-all hover:scale-[1.03] active:scale-95"
        >
          <span className="flex items-center gap-2">
            {loading ? 'Saving...' : 'Save Settings'}
            <Save size={16} />
          </span>
        </button>
      </div>

      {/* STYLES */}
      <style jsx>{`
        .card {
          border-radius: 16px;
          padding: 20px;
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(10px);
          border: 1px solid #e5e7eb;
          box-shadow: 0 10px 30px rgba(0,0,0,0.05);
          transition: 0.3s;
        }

        .card:hover {
          transform: translateY(-4px);
        }

        .iconBox {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 36px;
          width: 36px;
          border-radius: 10px;
          background: #e0ecff;
          color: #2563eb;
        }

        .toggle {
          width: 42px;
          height: 22px;
          background: #ddd;
          border-radius: 999px;
          position: relative;
          transition: 0.3s;
        }

        .toggle span {
          position: absolute;
          top: 3px;
          left: 4px;
          width: 16px;
          height: 16px;
          background: white;
          border-radius: 50%;
          transition: 0.3s;
        }

        .toggle.active {
          background: #22c55e;
        }

        .toggle.active span {
          left: 22px;
        }
      `}</style>
    </div>
  )
}

function Header({ icon, title, subtitle }: any) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <div className="iconBox">{icon}</div>
      <div>
        <p className="text-xs uppercase text-gray-500 font-bold">
          {subtitle}
        </p>
        <h2 className="text-lg font-bold text-gray-800">
          {title}
        </h2>
      </div>
    </div>
  )
}