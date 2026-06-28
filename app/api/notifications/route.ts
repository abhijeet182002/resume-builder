import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/lib/authGuard'
import { db } from '@/lib/db'

export async function GET(req: NextRequest) {
  const { session, error } = await requireAuth()
  if (error) return error

  try {
    const notifications = await db.notification.findMany({
      where: { userId: session.id },
      orderBy: { createdAt: 'desc' },
      take: 50, // Limit to recent 50 notifications
    })

    return NextResponse.json({ result: notifications })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
