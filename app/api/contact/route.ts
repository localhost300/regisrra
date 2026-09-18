import nodemailer from 'nodemailer';
import {z} from 'zod';
import {advisors} from '@/lib/data';

export const runtime = 'nodejs';

const contactSchema = z.object({
  advisorSlug: z.string().trim().min(1).max(120),
  fullName: z.string().trim().min(1).max(120),
  email: z.email().max(254),
  phone: z.string().trim().min(1).max(40),
  location: z.string().trim().min(1).max(160),
  subject: z.string().trim().min(1).max(160),
  message: z.string().trim().min(20).max(5000),
});

function escapeHtml(value: string) {
  const entities: Record<string, string> = {
    '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;',
  };
  return value.replace(/[&<>'"]/g, (character) => entities[character]);
}

export async function POST(request: Request) {
  const parsed = contactSchema.safeParse(await request.json().catch(() => null));

  if (!parsed.success) {
    return Response.json({error: 'Invalid form submission.'}, {status: 400});
  }

  const advisor = advisors.find(({slug}) => slug === parsed.data.advisorSlug);
  if (!advisor?.contactEnabled) {
    return Response.json({error: 'Contact is not available for this profile.'}, {status: 403});
  }

  const {SMTP_HOST, SMTP_PASSWORD, SMTP_PORT, SMTP_USER, CONTACT_EMAIL} = process.env;
  if (!SMTP_HOST || !SMTP_PASSWORD || !SMTP_USER) {
    return Response.json({error: 'Email service is not configured.'}, {status: 500});
  }

  const port = Number(SMTP_PORT ?? 587);
  const {fullName, email, phone, location, subject, message} = parsed.data;
  const advisorName = advisor.name;
  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure: port === 465,
    auth: {user: SMTP_USER, pass: SMTP_PASSWORD},
  });

  try {
    await transporter.sendMail({
      from: `Advisor Registry <${SMTP_USER}>`,
      to: CONTACT_EMAIL ?? SMTP_USER,
      replyTo: email,
      subject: `Website inquiry: ${subject}`,
      text: [
        `Advisor: ${advisorName}`, `Name: ${fullName}`, `Email: ${email}`,
        `Phone: ${phone}`, `Location: ${location}`, '', message,
      ].join('\n'),
      html: `
        <h2>New website inquiry</h2>
        <p><strong>Advisor:</strong> ${escapeHtml(advisorName)}</p>
        <p><strong>Name:</strong> ${escapeHtml(fullName)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
        <p><strong>Location:</strong> ${escapeHtml(location)}</p>
        <p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>
      `,
    });

    return Response.json({message: 'Message sent'});
  } catch {
    return Response.json({error: 'Unable to send message.'}, {status: 502});
  }
}
