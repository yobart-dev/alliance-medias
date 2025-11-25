import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

// Schéma de validation pour le formulaire de contact
const contactSchema = z.object({
  firstName: z.string().min(1, 'Le prénom est requis'),
  lastName: z.string().min(1, 'Le nom est requis'),
  email: z.string().email('Email invalide'),
  subject: z.string().min(1, 'Le sujet est requis'),
  message: z.string().min(10, 'Le message doit contenir au moins 10 caractères'),
  consent: z.boolean().refine((val) => val === true, {
    message: 'Vous devez accepter le traitement de vos données',
  }),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Valider les données
    const validatedData = contactSchema.parse(body)

    // Ici, vous pouvez intégrer un service d'email comme Resend, SendGrid, etc.
    // Pour l'instant, on simule l'envoi
    const emailService = process.env.EMAIL_SERVICE || 'console'

    if (emailService === 'resend' && process.env.RESEND_API_KEY) {
      // Intégration avec Resend
      const resendResponse = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'contact@alliance-medias.fr',
          to: 'contact@alliance-medias.fr',
          reply_to: validatedData.email,
          subject: `[Contact] ${validatedData.subject} - ${validatedData.firstName} ${validatedData.lastName}`,
          html: `
            <h2>Nouveau message de contact</h2>
            <p><strong>De:</strong> ${validatedData.firstName} ${validatedData.lastName} (${validatedData.email})</p>
            <p><strong>Sujet:</strong> ${validatedData.subject}</p>
            <hr>
            <p>${validatedData.message.replace(/\n/g, '<br>')}</p>
          `,
        }),
      })

      if (!resendResponse.ok) {
        throw new Error('Failed to send email via Resend')
      }
    } else if (emailService === 'sendgrid' && process.env.SENDGRID_API_KEY) {
      // Intégration avec SendGrid
      const sendgridResponse = await fetch('https://api.sendgrid.com/v3/mail/send', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.SENDGRID_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          personalizations: [
            {
              to: [{ email: 'contact@alliance-medias.fr' }],
              subject: `[Contact] ${validatedData.subject} - ${validatedData.firstName} ${validatedData.lastName}`,
            },
          ],
          from: { email: 'contact@alliance-medias.fr' },
          reply_to: { email: validatedData.email },
          content: [
            {
              type: 'text/html',
              value: `
                <h2>Nouveau message de contact</h2>
                <p><strong>De:</strong> ${validatedData.firstName} ${validatedData.lastName} (${validatedData.email})</p>
                <p><strong>Sujet:</strong> ${validatedData.subject}</p>
                <hr>
                <p>${validatedData.message.replace(/\n/g, '<br>')}</p>
              `,
            },
          ],
        }),
      })

      if (!sendgridResponse.ok) {
        throw new Error('Failed to send email via SendGrid')
      }
    } else {
      // Mode développement : logger dans la console
      console.log('=== NOUVEAU MESSAGE DE CONTACT ===')
      console.log('De:', validatedData.firstName, validatedData.lastName)
      console.log('Email:', validatedData.email)
      console.log('Sujet:', validatedData.subject)
      console.log('Message:', validatedData.message)
      console.log('================================')
    }

    return NextResponse.json({
      success: true,
      message: 'Votre message a été envoyé avec succès. Nous vous répondrons dans les plus brefs délais.',
    })
  } catch (error) {
    console.error('Contact form error:', error)

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: 'Erreur de validation',
          details: error.errors,
        },
        { status: 400 }
      )
    }

    return NextResponse.json(
      {
        success: false,
        error: 'Une erreur est survenue lors de l\'envoi de votre message. Veuillez réessayer plus tard.',
      },
      { status: 500 }
    )
  }
}

