export const runtime = "nodejs";
import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

/**
 * PATCH: Update a chatbot lead's status
 */
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    const body = await request.json()
    const { status } = body

    if (!status) {
      return NextResponse.json(
        { success: false, error: 'Missing required field: status' },
        { status: 400 }
      )
    }

    const lead = await prisma.lead.update({
      where: { id },
      data: { status }
    })

    return NextResponse.json({ success: true, lead })
  } catch (error) {
    console.error('Error updating chatbot lead status:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to update chatbot lead status',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}
