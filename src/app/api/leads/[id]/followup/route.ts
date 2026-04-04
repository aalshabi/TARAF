import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { note, type } = body

    if (!note || !type) {
      return NextResponse.json(
        { error: 'Missing required fields: note, type' },
        { status: 400 }
      )
    }

    const lead = await prisma.lead.findUnique({ where: { id } })

    if (!lead) {
      return NextResponse.json(
        { error: 'Lead not found' },
        { status: 404 }
      )
    }

    const followUp = await prisma.followUp.create({
      data: {
        leadId: id,
        note,
        type,
      },
    })

    return NextResponse.json(followUp, { status: 201 })
  } catch (error) {
    console.error('Error creating follow-up:', error)
    return NextResponse.json(
      { error: 'Failed to create follow-up' },
      { status: 500 }
    )
  }
}
