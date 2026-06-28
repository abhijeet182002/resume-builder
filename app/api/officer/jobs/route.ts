import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/lib/authGuard'
import { db } from '@/lib/db'
import { z } from 'zod'

export async function GET(req: NextRequest) {
  const { session, error: authError } = await requireAuth()
  if (authError) return authError

  try {
    const jobs = await db.jobRequirement.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        officer: {
          select: { name: true }
        }
      }
    })
    return NextResponse.json({ data: jobs })
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Failed to fetch jobs' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const { session, error: authError } = await requireAuth('OFFICER')
  if (authError) return authError

  try {
    const body = await req.json()
    const createJobSchema = z.object({
      title: z.string().min(2),
      company: z.string().min(2),
      description: z.string().min(10),
      requiredSkills: z.array(z.string()).default([]),
      deadline: z.string().optional().nullable(),
    })

    const parsed = createJobSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })
    }

    const { title, company, description, requiredSkills, deadline } = parsed.data

    const job = await db.jobRequirement.create({
      data: {
        officerId: session.id,
        title,
        company,
        description,
        requiredSkills,
        deadline: deadline ? new Date(deadline) : null,
      }
    })

    return NextResponse.json({ data: job }, { status: 201 })
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Failed to create job' }, { status: 500 })
  }
}
