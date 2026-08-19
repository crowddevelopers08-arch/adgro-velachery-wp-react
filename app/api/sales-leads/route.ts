export const runtime = "nodejs";
import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const FORM_NAME = 'Sales Landing Page'

interface SalesLeadData {
  name: string
  phone: string
  email?: string
  procedure?: string // concern
  hairLossStage?: string
  willingToVisit?: boolean
  consent?: boolean
  source?: string
  formName?: string
  pageUrl?: string
  userAgent?: string
}

/**
 * Generate comprehensive form data string with all user details (for system notes)
 */
function generateFormDataString(leadData: SalesLeadData): string {
  const details = [];

  if (leadData.name) details.push(`Name: ${leadData.name}`);
  if (leadData.phone) details.push(`Phone: ${leadData.phone}`);
  if (leadData.email) details.push(`Email: ${leadData.email}`);
  if (leadData.procedure) details.push(`Concern: ${leadData.procedure}`);
  if (leadData.hairLossStage) details.push(`Hair Loss Stage: ${leadData.hairLossStage}`);
  if (typeof leadData.willingToVisit === 'boolean') {
    details.push(`Willing To Visit Adgro Velachery: ${leadData.willingToVisit ? 'Yes' : 'No'}`);
  }
  if (leadData.source) details.push(`Source: ${leadData.source}`);
  if (leadData.pageUrl) details.push(`Page URL: ${leadData.pageUrl}`);
  details.push(`Consent: ${leadData.consent ? 'Yes' : 'No'}`);

  return details.join(' | ');
}

/**
 * Save sales-page lead to database using Prisma
 */
async function saveToDatabase(leadData: SalesLeadData) {
  try {
    const structuredMessage = [
      leadData.hairLossStage ? `Hair Loss Stage: ${leadData.hairLossStage}` : '',
      typeof leadData.willingToVisit === 'boolean'
        ? `Willing To Visit Adgro Velachery: ${leadData.willingToVisit ? 'Yes' : 'No'}`
        : '',
    ]
      .filter(Boolean)
      .join(' | ');

    const lead = await prisma.lead.create({
      data: {
        name: leadData.name,
        phone: leadData.phone,
        email: leadData.email || '',
        procedure: leadData.procedure || '',
        message: structuredMessage,
        city: '',
        consent: leadData.consent ?? true,
        source: leadData.source || 'Adgro Hair Velachery Sales Page',
        formName: FORM_NAME,
        pageUrl: leadData.pageUrl || '',
        userAgent: leadData.userAgent || '',
        status: 'NEW',
        telecrmSynced: false
      }
    });
    return lead;
  } catch (error) {
    console.error('Sales lead database save error:', error);
    throw new Error('Failed to save sales lead to database');
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
    console.error('Update sales lead status error:', error);
  }
}

/**
 * Send sales-page lead data to TeleCRM
 */
async function sendToTeleCRM(leadData: SalesLeadData) {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 15000)

  const endpoint = process.env.TELECRM_API_URL

  if (!endpoint) {
    throw new Error('TELECRM_API_URL environment variable is not set')
  }

  try {
    const formDataString = generateFormDataString(leadData);

    const telecrmPayload = {
      fields: {
        Id: "",
        name: leadData.name,
        email: leadData.email || "",
        phone: leadData.phone.replace(/\D/g, ''),
        city_1: "",
        message: "",
        select_the_procedure: leadData.procedure || 'Not specified',
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
        "Lead Request Type": "sales_page",
        "PageName": leadData.pageUrl || 'https://adgrohairvelachery.in/sales',
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
          "text": `Lead Source: ${leadData.source || 'Adgro Hair Velachery Sales Page'}`
        },
        {
          "type": "SYSTEM_NOTE",
          "text": `Page URL: ${leadData.pageUrl || 'Not captured'}`
        },
        {
          "type": "SYSTEM_NOTE",
          "text": `Concern: ${leadData.procedure || 'Not specified'}`
        },
        {
          "type": "SYSTEM_NOTE",
          "text": `Hair Loss Stage: ${leadData.hairLossStage || 'Not specified'}`
        },
        {
          "type": "SYSTEM_NOTE",
          "text": `Willing To Visit Adgro Velachery: ${typeof leadData.willingToVisit === 'boolean' ? (leadData.willingToVisit ? 'Yes' : 'No') : 'Not specified'}`
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
        'X-Client-ID': 'nextjs-website-sales-page-integration',
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
 * GET: Fetch sales-page leads with filtering, pagination, and search
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)

    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '50')
    const skip = (page - 1) * limit

    const search = searchParams.get('search') || ''
    const status = searchParams.get('status') || ''

    const where: any = {
      formName: FORM_NAME
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { phone: { contains: search } },
        { email: { contains: search, mode: 'insensitive' } },
        { procedure: { contains: search, mode: 'insensitive' } },
      ]
    }

    if (status && status !== 'all') {
      where.status = status === 'error' ? 'ERROR' : status.toUpperCase()
    }

    const totalCount = await prisma.lead.count({ where })

    const leads = await prisma.lead.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip,
      take: limit,
    })

    return NextResponse.json({
      success: true,
      leads: leads.map(lead => ({
        ...lead,
        treatment: lead.procedure,
        createdAt: lead.createdAt.toISOString(),
        updatedAt: lead.updatedAt.toISOString(),
        syncedAt: lead.syncedAt?.toISOString() || null
      })),
      pagination: {
        page,
        limit,
        totalCount,
        totalPages: Math.ceil(totalCount / limit),
      },
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Error fetching sales leads:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch sales leads',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}

/**
 * Handle POST request for sales-page leads
 */
export async function POST(request: Request) {
  let data: SalesLeadData;
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
    data.source = data.source || 'Adgro Hair Velachery Sales Page';
    data.consent = true;

    savedLead = await saveToDatabase(data);
    console.log('Sales lead saved to database:', {
      id: savedLead.id,
      formName: FORM_NAME,
      procedure: data.procedure,
      pageUrl: data.pageUrl
    });

    let telecrmResponse = null;
    let telecrmError = null;

    try {
      telecrmResponse = await sendToTeleCRM(data);
      console.log('Sales lead sent to TeleCRM successfully:', { formName: FORM_NAME });

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
    console.error('Sales lead submission error:', {
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
            email: data.email || '',
            procedure: data.procedure || '',
            message: [
              data.hairLossStage ? `Hair Loss Stage: ${data.hairLossStage}` : '',
              typeof data.willingToVisit === 'boolean'
                ? `Willing To Visit Adgro Velachery: ${data.willingToVisit ? 'Yes' : 'No'}`
                : '',
            ].filter(Boolean).join(' | '),
            city: '',
            source: data.source || 'Adgro Hair Velachery Sales Page',
            formName: FORM_NAME,
            pageUrl: data.pageUrl || '',
            userAgent: data.userAgent || '',
            status: 'ERROR',
            error: error instanceof Error ? error.message : 'Unknown error',
            telecrmSynced: false
          }
        });
        console.log('Sales error lead saved to database:', errorLead.id);
      } catch (dbError) {
        console.error('Failed to save sales error lead to database:', dbError);
      }
    }

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to process sales lead',
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
