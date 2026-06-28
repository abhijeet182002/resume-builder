'use client'
import { useEffect } from 'react'
import { useParams } from 'next/navigation'
import { EditorLayout } from '@/components/editor/EditorLayout'
import { useResumeStore } from '@/store/resumeStore'
import { useResumeSync } from '@/hooks/useResumeSync'
import { useATSStore } from '@/store/atsStore'
import { LoadingState } from '@/components/ui/LoadingState'
import { useState } from 'react'

export default function ResumeEditorPage() {
  const { resumeId } = useParams<{ resumeId: string }>()
  const setResume = useResumeStore(s => s.setResume)
  const setATSResult = useATSStore(s => s.setResult)
  const setATSJobDescription = useATSStore(s => s.setJobDescription)
  const [loading, setLoading] = useState(true)
  useResumeSync(resumeId)

  useEffect(() => {
    fetch(`/api/resume/${resumeId}`)
      .then(r => r.json())
      .then(({ resume }) => {
        if (resume) {
          setResume({
            id: resume.id,
            title: resume.title,
            personal: (resume.personal as any) ?? { fullName: '', email: '', phone: '', location: '' },
            summary: resume.summary ?? '',
            experience: (resume.experience as any[]) ?? [],
            education: (resume.education as any[]) ?? [],
            skills: (resume.skills as any[]) ?? [],
            projects: (resume.projects as any[]) ?? [],
            certifications: (resume.certifications as any[]) ?? [],
            completionScore: resume.completionScore,
            status: resume.status,
          })
          if (resume.atsAnalyses && resume.atsAnalyses[0]) {
            const lastAnalysis = resume.atsAnalyses[0]
            setATSResult({
              overallScore: lastAnalysis.overallScore,
              keywordScore: lastAnalysis.keywordScore,
              formattingScore: lastAnalysis.formattingScore,
              completenessScore: lastAnalysis.completenessScore,
              jobTitle: lastAnalysis.jobTitle,
              keywords: lastAnalysis.keywords,
              suggestions: lastAnalysis.suggestions,
              sections: lastAnalysis.sections,
            } as any)
            setATSJobDescription(lastAnalysis.jobDescription || '')
          }
        }
      })
      .finally(() => setLoading(false))
  }, [resumeId])

  if (loading) return <LoadingState message="Loading resume..." />
  return <EditorLayout resumeId={resumeId} />
}
