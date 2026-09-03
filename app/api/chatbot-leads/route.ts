export const runtime = "nodejs";
import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const FORM_NAME = 'Adgro Chatbot'

interface ChatbotLeadData {
  name: string
  phone: string
  concerns?: string[]
  hairLossStage?: string
  city?: string // PIN code
  willingToVisit?: string
  consent?: boolean
  source?: string
  formName?: string
  pageUrl?: string
  userAgent?: string
}

/**
 * Generate comprehensive form data string with all user details (for system notes)
 */
function generateFormDataString(leadData: ChatbotLeadData): string {
  const details = [];

  if (leadData.name) details.push(`Name: ${leadData.name}`);
  if (leadData.phone) details.push(`Phone: ${leadData.phone}`);

  if (leadData.concerns && leadData.concerns.length > 0) {
    details.push(`Concerns: ${leadData.concerns.join(', ')}`);
  }

  if (leadData.hairLossStage) details.push(`Hair Loss Stage: ${leadData.hairLossStage}`);
  if (leadData.willingToVisit) details.push(`Willing To Visit Adgro Velachery: ${leadData.willingToVisit}`);

  if (leadData.city) details.push(`PIN Code: ${leadData.city}`);
  if (leadData.source) details.push(`Source: ${leadData.source}`);
  if (leadData.pageUrl) details.push(`Page URL: ${leadData.pageUrl}`);

  details.push(`Consent: ${leadData.consent ? 'Yes' : 'No'}`);

  return details.join(' | ');
}

/**
 * Save chatbot lead to database using Prisma
 */
async function saveToDatabase(leadData: ChatbotLeadData) {
  try {
    const structuredMessage = [
      leadData.hairLossStage ? `Hair Loss Stage: ${leadData.hairLossStage}` : '',
      leadData.willingToVisit ? `Willing To Visit Adgro Velachery: ${leadData.willingToVisit}` : '',
    ]
      .filter(Boolean)
      .join(' | ');

    const lead = await prisma.lead.create({
      data: {
        name: leadData.name,
        phone: leadData.phone,
        email: '',
        procedure: leadData.concerns?.join(', ') || '',
        message: structuredMessage,
        city: leadData.city || '',
        consent: leadData.consent ?? true,
        source: leadData.source || 'Adgro Hair Velachery Chatbot',
        formName: FORM_NAME,
        pageUrl: leadData.pageUrl || '',
        userAgent: leadData.userAgent || '',
        status: 'NEW',
        telecrmSynced: false
      }
    });
    return lead;
  } catch (error) {
    console.error('Chatbot database save error:', error);
    throw new Error('Failed to save chatbot lead to database');
  }
}

/**
 * Update lead with TeleCRM sync status
 */
async function updateLeadTelecrmStatus(leadId: string, telecrmId?: string, error?: string) {
  try {
    await prisma.lead.update({
      where: { id: leadId },
      data: {
        telecrmSynced: !error,
        telecrmId: telecrmId || null,
        syncedAt: new Date(),
        error: error || null,
        status: error ? 'ERROR' : 'NEW'
      }
    });
  } catch (error) {
    console.error('Update chatbot lead status error:', error);
  }
}

/**
 * Send chatbot lead data to TeleCRM
 */
async function sendToTeleCRM(leadData: ChatbotLeadData) {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 15000)

  const endpoint = process.env.TELECRM_API_URL

  if (!endpoint) {
    throw new Error('TELECRM_API_URL environment variable is not set')
  }

  try {
    const concernsText = leadData.concerns && leadData.concerns.length > 0
      ? leadData.concerns.join(', ')
      : 'Not specified';

    const formDataString = generateFormDataString(leadData);

    const telecrmPayload = {
      fields: {
        Id: "",
        name: leadData.name,
        email: "",
        phone: leadData.phone.replace(/\D/g, ''),
        city_1: leadData.city || "",
        message: "",
        select_the_procedure: concernsText,
        Country: "",
        LeadID: "",
        "CreatedOn": new Date().toLocaleString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
          hour: 'numeric',
          minute: '2-digit',
          hour12: true
        }),
        "Lead Stage": "",
        "Lead Status": "new",
        "Lead Request Type": "chatbot",
        "PageName": leadData.pageUrl || 'https://adgrohairvelachery.in/chatbot',
        "State": "",
        "Age": "",
        "FormName": FORM_NAME
      },
      actions: [
        {
          "type": "SYSTEM_NOTE",
          "text": `Form Name: ${FORM_NAME}`
        },
        {
          "type": "SYSTEM_NOTE",
          "text": `Complete Form Data: ${formDataString}`
        },
        {
          "type": "SYSTEM_NOTE",
          "text": `Lead Source: ${leadData.source || 'Adgro Hair Velachery Chatbot'}`
        },
        {
          "type": "SYSTEM_NOTE",
          "text": `Page URL: ${leadData.pageUrl || 'Not captured'}`
        },
        {
          "type": "SYSTEM_NOTE",
          "text": `Concerns: ${concernsText}`
        },
        {
          "type": "SYSTEM_NOTE",
          "text": `Hair Loss Stage: ${leadData.hairLossStage || 'Not specified'}`
        },
        {
          "type": "SYSTEM_NOTE",
          "text": `Willing To Visit Adgro Velachery: ${leadData.willingToVisit || 'Not specified'}`
        },
        {
          "type": "SYSTEM_NOTE",
          "text": `PIN Code: ${leadData.city || 'Not specified'}`
        },
        {
          "type": "SYSTEM_NOTE",
          "text": `Consent Given: ${leadData.consent ? 'Yes' : 'No'}`
        }
      ]
    }

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.TELECRM_API_KEY}`,
        'X-Client-ID': 'nextjs-website-chatbot-integration',
        'Accept': 'application/json',
      },
      body: JSON.stringify(telecrmPayload),
      signal: controller.signal,
    })

    if (response.status === 204) {
      clearTimeout(timeout)
      return {
        status: 'success',
        message: 'Lead created (204 No Content)',
        synced: true
      }
    }

    const responseText = await response.text()

    if (
      responseText.trim().startsWith('<!DOCTYPE') ||
      responseText.trim().startsWith('<html') ||
      responseText.includes('<!DOCTYPE html>')
    ) {
      console.warn(`HTML response from ${endpoint}`, {
        status: response.status,
        bodyPreview: responseText.slice(0, 200),
      })
      throw new Error('TeleCRM returned HTML response instead of JSON')
    }

    try {
      const data = responseText ? JSON.parse(responseText) : {}
      if (!response.ok) {
        throw new Error(data.message || `HTTP ${response.status} from ${endpoint}`)
      }
      clearTimeout(timeout)
      return {
        ...data,
        synced: true
      }
    } catch {
      throw new Error(`Invalid JSON from ${endpoint}: ${responseText.slice(0, 100)}...`)
    }
  } catch (error) {
    clearTimeout(timeout)
    throw error instanceof Error ? error : new Error(String(error))
  }
}

/**
 * GET: Fetch chatbot leads with filtering, pagination, and search
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)

    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '50')
    const skip = (page - 1) * limit

    const search = searchParams.get('search') || ''
    const status = searchParams.get('status') || ''
    const treatment = searchParams.get('treatment') || ''
    const syncStatus = searchParams.get('sync') || ''
    const dateRange = searchParams.get('date') || ''
    const sortBy = searchParams.get('sortBy') || 'createdAt'
    const sortOrder = searchParams.get('sortOrder') || 'desc'

    const where: any = {
      formName: FORM_NAME
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { phone: { contains: search } },
        { email: { contains: search, mode: 'insensitive' } },
        { procedure: { contains: search, mode: 'insensitive' } },
        { city: { contains: search } }
      ]
    }

    if (status && status !== 'all') {
      where.status = status === 'error' ? 'ERROR' : status.toUpperCase()
    }

    if (treatment && treatment !== 'all') {
      where.procedure = { contains: treatment, mode: 'insensitive' }
    }

    if (syncStatus === 'synced') {
      where.telecrmSynced = true
      where.error = null
    } else if (syncStatus === 'unsynced') {
      where.OR = [
        { telecrmSynced: false },
        { error: { not: null } }
      ]
    }

    if (dateRange) {
      const now = new Date()
      const startDate = new Date()

      switch (dateRange) {
        case 'today':
          startDate.setHours(0, 0, 0, 0)
          where.createdAt = { gte: startDate }
          break
        case 'week':
          startDate.setDate(now.getDate() - 7)
          where.createdAt = { gte: startDate }
          break
        case 'month':
          startDate.setMonth(now.getMonth() - 1)
          where.createdAt = { gte: startDate }
          break
      }
    }

    const totalCount = await prisma.lead.count({ where })

    const leads = await prisma.lead.findMany({
      where,
      orderBy: {
        [sortBy]: sortOrder
      },
      skip,
      take: limit,
      select: {
        id: true,
        name: true,
        phone: true,
        email: true,
        procedure: true,
        city: true,
        consent: true,
        source: true,
        formName: true,
        pageUrl: true,
        userAgent: true,
        status: true,
        telecrmSynced: true,
        telecrmId: true,
        error: true,
        syncedAt: true,
        createdAt: true,
        updatedAt: true
      }
    })

    const [
      totalLeads,
      todayLeads,
      weekLeads,
      monthLeads,
      syncedLeads,
      errorLeads,
      statusCounts,
      treatmentStats
    ] = await Promise.all([
      prisma.lead.count({ where: { formName: FORM_NAME } }),
      prisma.lead.count({
        where: {
          formName: FORM_NAME,
          createdAt: { gte: new Date(new Date().setHours(0, 0, 0, 0)) }
        }
      }),
      prisma.lead.count({
        where: {
          formName: FORM_NAME,
          createdAt: { gte: new Date(new Date().setDate(new Date().getDate() - 7)) }
        }
      }),
      prisma.lead.count({
        where: {
          formName: FORM_NAME,
          createdAt: { gte: new Date(new Date().setMonth(new Date().getMonth() - 1)) }
        }
      }),
      prisma.lead.count({
        where: { formName: FORM_NAME, telecrmSynced: true, error: null }
      }),
      prisma.lead.count({
        where: { formName: FORM_NAME, error: { not: null } }
      }),
      prisma.lead.groupBy({
        by: ['status'],
        where: { formName: FORM_NAME },
        _count: true
      }),
      prisma.lead.groupBy({
        by: ['procedure'],
        where: { formName: FORM_NAME, procedure: { not: '' } },
        _count: true
      })
    ])

    const transformedLeads = leads.map(lead => ({
      ...lead,
      treatment: lead.procedure,
      createdAt: lead.createdAt.toISOString(),
      updatedAt: lead.updatedAt.toISOString(),
      syncedAt: lead.syncedAt?.toISOString() || null
    }))

    return NextResponse.json({
      success: true,
      leads: transformedLeads,
      pagination: {
        page,
        limit,
        totalCount,
        totalPages: Math.ceil(totalCount / limit),
        hasNextPage: page < Math.ceil(totalCount / limit),
        hasPrevPage: page > 1
      },
      filters: { search, status, treatment, syncStatus, dateRange, sortBy, sortOrder },
      stats: {
        total: totalLeads,
        today: todayLeads,
        week: weekLeads,
        month: monthLeads,
        synced: syncedLeads,
        errors: errorLeads,
        pending: totalLeads - syncedLeads - errorLeads,
        byStatus: statusCounts.reduce((acc: any, curr) => {
          acc[curr.status.toLowerCase()] = curr._count
          return acc
        }, {}),
        byTreatment: treatmentStats
          .filter(t => t.procedure)
          .map(t => ({ treatment: t.procedure, count: t._count }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 5)
      },
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('Error fetching chatbot leads:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch chatbot leads',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}

/**
 * Handle POST request for chatbot leads
 */
export async function POST(request: Request) {
  let data: ChatbotLeadData;
  let savedLead: any = null;

  try {
    data = await request.json()

    if (!data.name || !data.phone) {
      return NextResponse.json(
        { error: 'Missing required fields: name, phone' },
        { status: 400 }
      )
    }

    data.formName = FORM_NAME;
    data.source = data.source || 'Adgro Hair Velachery Chatbot';
    data.consent = true;

    savedLead = await saveToDatabase(data);
    console.log('Chatbot lead saved to database:', {
      id: savedLead.id,
      formName: FORM_NAME,
      concerns: data.concerns,
      pageUrl: data.pageUrl
    });

    let telecrmResponse = null;
    let telecrmError = null;

    try {
      telecrmResponse = await sendToTeleCRM(data);
      console.log('Chatbot lead sent to TeleCRM successfully:', { formName: FORM_NAME });

      if (savedLead) {
        await updateLeadTelecrmStatus(savedLead.id, telecrmResponse?.id);
      }
    } catch (error) {
      telecrmError = error;
      console.error('TeleCRM submission failed:', {
        formName: FORM_NAME,
        error: error instanceof Error ? error.message : String(error)
      });

      if (savedLead) {
        await updateLeadTelecrmStatus(
          savedLead.id,
          undefined,
          error instanceof Error ? error.message : String(error)
        );
      }
    }

    return NextResponse.json(
      {
        success: true,
        lead: savedLead,
        databaseId: savedLead.id,
        telecrmSynced: !telecrmError,
        telecrmResponse: telecrmResponse,
        telecrmError: telecrmError ? (telecrmError instanceof Error ? telecrmError.message : String(telecrmError)) : null,
        timestamp: new Date().toISOString(),
        formName: FORM_NAME,
        message: telecrmError
          ? 'Lead saved to database but TeleCRM sync failed'
          : 'Lead saved successfully and synced with TeleCRM'
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Chatbot lead submission error:', {
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString(),
      formName: FORM_NAME,
      databaseSaved: !!savedLead
    })

    if (!savedLead && data!) {
      try {
        const errorLead = await prisma.lead.create({
          data: {
            name: data.name,
            phone: data.phone,
            email: '',
            procedure: data.concerns?.join(', ') || '',
            message: [
              data.hairLossStage ? `Hair Loss Stage: ${data.hairLossStage}` : '',
              data.willingToVisit ? `Willing To Visit Adgro Velachery: ${data.willingToVisit}` : '',
            ].filter(Boolean).join(' | '),
            city: data.city || '',
            source: data.source || 'Adgro Hair Velachery Chatbot',
            formName: FORM_NAME,
            pageUrl: data.pageUrl || '',
            userAgent: data.userAgent || '',
            status: 'ERROR',
            error: error instanceof Error ? error.message : 'Unknown error',
            telecrmSynced: false
          }
        });
        console.log('Chatbot error lead saved to database:', errorLead.id);
      } catch (dbError) {
        console.error('Failed to save chatbot error lead to database:', dbError);
      }
    }

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to process chatbot lead',
        details: error instanceof Error ? error.message : 'Unknown error',
        databaseSaved: !!savedLead,
        referenceId: `ERR-${Date.now()}`,
        formName: FORM_NAME
      },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect();
  }
}
