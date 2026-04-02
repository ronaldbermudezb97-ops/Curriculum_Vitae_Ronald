import emailjs from '@emailjs/browser'
import type { ContactFormData } from '@/types'

export async function sendContactEmail(data: ContactFormData): Promise<void> {
  await emailjs.send(
    import.meta.env.PUBLIC_EMAILJS_SERVICE_ID,
    import.meta.env.PUBLIC_EMAILJS_TEMPLATE_ID,
    {
      from_name: data.name,
      from_email: data.email,
      subject: data.subject,
      message: data.message,
    },
    import.meta.env.PUBLIC_EMAILJS_PUBLIC_KEY
  )
}