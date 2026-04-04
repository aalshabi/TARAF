import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(_request: NextRequest) {
  try {
    const now = new Date()
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate())

    const [total, today, allLeads, recentLeads] = await Promise.all([
      prisma.lead.count(),
      prisma.lead.count({
        where: { createdAt: { gte: startOfDay } },
      }),
      prisma.lead.findMany({
        select: { status: true, service: true },
      }),
      prisma.lead.findMany({
        orderBy: { createdAt: 'desc' },
        take: 5,
      }),
    ])

    const byStatus: Record<string, number> = {}
    const byService: Record<string, number> = {}

    for (const lead of allLeads) {
      byStatus[lead.status] = (byStatus[lead.status] || 0) + 1
      byService[lead.service] = (byService[lead.service] || 0) + 1
    }

    const closed = byStatus['closed'] || 0
    const conversionRate = total > 0 ? Math.round((closed / total) * 100 * 100) / 100 : 0

    return NextResponse.json({
      total,
      today,
      byStatus,
      byService,
      conversionRate,
      recentLeads,
    })
  } catch (error) {
    console.error('Error fetching stats:', error)
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    )
  }
}
