import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

function assignTeam(service: string): string {
  const teamAServices = ['عاملة منزلية', 'سائق خاص', 'ممرض', 'طباخ']
  const teamBServices = ['استقدام منشآت', 'شركات', 'تأجير شهري']

  if (teamAServices.includes(service)) return 'team_a'
  if (teamBServices.includes(service)) return 'team_b'
  return 'team_a'
}

function assignPriority(service: string): string {
  const highPriorityServices = ['تأجير شهري', 'الخدمات المميزة']
  return highPriorityServices.includes(service) ? 'high' : 'normal'
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const service = searchParams.get('service')
    const priority = searchParams.get('priority')
    const search = searchParams.get('search')

    const where: Record<string, unknown> = {}

    if (status) {
      where.status = status
    }
    if (service) {
      where.service = service
    }
    if (priority) {
      where.priority = priority
    }
    if (search) {
      where.OR = [
        { name: { contains: search } },
        { phone: { contains: search } },
      ]
    }

    const leads = await prisma.lead.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(leads)
  } catch (error) {
    console.error('Error fetching leads:', error)
    return NextResponse.json(
      { error: 'Failed to fetch leads' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, phone, service, notes, source } = body

    if (!name || !phone || !service || !source) {
      return NextResponse.json(
        { error: 'Missing required fields: name, phone, service, source' },
        { status: 400 }
      )
    }

    const team = assignTeam(service)
    const priority = assignPriority(service)

    const lead = await prisma.lead.create({
      data: {
        name,
        phone,
        service,
        notes: notes || '',
        source,
        team,
        priority,
      },
    })

    return NextResponse.json(lead, { status: 201 })
  } catch (error) {
    console.error('Error creating lead:', error)
    return NextResponse.json(
      { error: 'Failed to create lead' },
      { status: 500 }
    )
  }
}
