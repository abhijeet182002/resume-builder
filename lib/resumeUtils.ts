import type { ResumeData } from '@/types/resume'

export function calculateCompletion(resume: Partial<ResumeData>): number {
  const weights = {
    personal: 20,
    summary: 10,
    experience: 25,
    education: 20,
    skills: 15,
    projects: 10,
  }

  let score = 0

  const p = resume.personal
  if (p?.fullName && p?.email && p?.phone && p?.location) score += weights.personal
  if (resume.summary && resume.summary.length > 50) score += weights.summary
  if (resume.experience && resume.experience.length > 0) score += weights.experience
  if (resume.education && resume.education.length > 0) score += weights.education
  if (resume.skills && resume.skills.length > 0) score += weights.skills
  if (resume.projects && resume.projects.length > 0) score += weights.projects

  return Math.min(100, score)
}

export function formatDate(dateStr: string): string {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

export function isValidUrl(value: string): boolean {
  if (!value) return true
  return /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})/i.test(value)
}

export function normalizePhone(phone: string): string {
  if (!phone) return ''
  const cleaned = phone.replace(/[^\d+]/g, '')
  if (cleaned.startsWith('+91') && cleaned.length === 13) {
    return `+91 ${cleaned.slice(3, 8)} ${cleaned.slice(8)}`
  }
  if (cleaned.length === 10) {
    return `+91 ${cleaned.slice(0, 5)} ${cleaned.slice(5)}`
  }
  return phone
}

