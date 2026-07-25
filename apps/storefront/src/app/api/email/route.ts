import { NextRequest, NextResponse } from 'next/server';

const RESEND_API_KEY = process.env.RESEND_API_KEY || '';
const RESEND_BASE_URL = 'https://api.resend.com';

interface EmailPayload {
  to: string;
  subject: string;
  html: string;
  from?: string;
}

async function sendEmail(payload: EmailPayload) {
  const response = await fetch(`${RESEND_BASE_URL}/emails`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: payload.from || 'Tomis <noreply@tomis.fit>',
      to: [payload.to],
      subject: payload.subject,
      html: payload.html,
    }),
  });

  const data = await response.json();
  return data;
}

// Email templates
export function orderConfirmationEmail(orderNumber: string, customerName: string, items: Array<{ name: string; color: string; quantity: number; price: number }>, total: number) {
  const itemRows = items.map(item => `
    <tr>
      <td style="padding: 12px 0; border-bottom: 1px solid #E7E5E4;">
        <div style="display: flex; justify-content: space-between;">
          <div>
            <strong>${item.name}</strong>
            <p style="color: #78716C; font-size: 14px; margin: 4px 0 0;">${item.color} × ${item.quantity}</p>
          </div>
          <span>₦${(item.price * item.quantity).toLocaleString('en-NG')}</span>
        </div>
      </td>
    </tr>
  `).join('');

  return `
    <!DOCTYPE html>
    <html>
    <head><meta charset="utf-8"></head>
    <body style="font-family: 'Inter', system-ui, sans-serif; background: #FAFAF9; padding: 40px; color: #101114;">
      <div style="max-width: 600px; margin: 0 auto; background: white; padding: 40px;">
        <div style="text-align: center; margin-bottom: 32px;">
          <h1 style="font-family: Georgia, serif; font-style: italic; font-size: 24px; margin: 0;">Tomis</h1>
        </div>
        <div style="background: #059669; color: white; padding: 16px; text-align: center; margin-bottom: 32px;">
          <strong>Order Confirmed!</strong>
        </div>
        <p>Hi ${customerName},</p>
        <p>Thank you for your order. We're getting it ready for you.</p>
        <div style="background: #F5F5F4; padding: 16px; margin: 24px 0;">
          <p style="margin: 0;"><strong>Order Number:</strong> ${orderNumber}</p>
        </div>
        <table style="width: 100%; border-collapse: collapse;">
          ${itemRows}
        </table>
        <div style="border-top: 2px solid #101114; margin-top: 16px; padding-top: 16px; display: flex; justify-content: space-between; font-weight: 600;">
          <span>Total</span>
          <span>₦${total.toLocaleString('en-NG')}</span>
        </div>
        <div style="margin-top: 32px; padding: 16px; background: #F5F5F4; text-align: center;">
          <p style="margin: 0; font-size: 14px; color: #78716C;">We'll send you a shipping notification when your order is on its way.</p>
        </div>
        <div style="margin-top: 32px; text-align: center; color: #78716C; font-size: 12px;">
          <p>Tomis — The Half-Collar Shirt</p>
          <p>Lagos, Nigeria</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

export function shippingNotificationEmail(orderNumber: string, customerName: string, trackingNumber: string, carrier: string, estimatedDelivery: string) {
  return `
    <!DOCTYPE html>
    <html>
    <head><meta charset="utf-8"></head>
    <body style="font-family: 'Inter', system-ui, sans-serif; background: #FAFAF9; padding: 40px; color: #101114;">
      <div style="max-width: 600px; margin: 0 auto; background: white; padding: 40px;">
        <div style="text-align: center; margin-bottom: 32px;">
          <h1 style="font-family: Georgia, serif; font-style: italic; font-size: 24px; margin: 0;">Tomis</h1>
        </div>
        <div style="background: #1647B8; color: white; padding: 16px; text-align: center; margin-bottom: 32px;">
          <strong>Your Order Has Shipped!</strong>
        </div>
        <p>Hi ${customerName},</p>
        <p>Great news! Your order is on its way.</p>
        <div style="background: #F5F5F4; padding: 16px; margin: 24px 0;">
          <p style="margin: 0 0 8px;"><strong>Order:</strong> ${orderNumber}</p>
          <p style="margin: 0 0 8px;"><strong>Carrier:</strong> ${carrier}</p>
          <p style="margin: 0 0 8px;"><strong>Tracking:</strong> ${trackingNumber}</p>
          <p style="margin: 0;"><strong>Estimated Delivery:</strong> ${estimatedDelivery}</p>
        </div>
        <div style="margin-top: 32px; text-align: center;">
          <a href="https://track.${carrier.toLowerCase()}.com/${trackingNumber}" style="display: inline-block; padding: 12px 24px; background: #1647B8; color: white; text-decoration: none; font-weight: 600;">TRACK YOUR ORDER</a>
        </div>
        <div style="margin-top: 32px; text-align: center; color: #78716C; font-size: 12px;">
          <p>Tomis — The Half-Collar Shirt</p>
          <p>Lagos, Nigeria</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, to, orderNumber, customerName, items, total, trackingNumber, carrier, estimatedDelivery } = body;

    let subject = '';
    let html = '';

    switch (type) {
      case 'order_confirmation':
        subject = `Order Confirmed — ${orderNumber}`;
        html = orderConfirmationEmail(orderNumber, customerName, items, total);
        break;
      case 'shipping_notification':
        subject = `Your Order Has Shipped — ${orderNumber}`;
        html = shippingNotificationEmail(orderNumber, customerName, trackingNumber, carrier, estimatedDelivery);
        break;
      default:
        return NextResponse.json({ error: 'Invalid email type' }, { status: 400 });
    }

    if (!RESEND_API_KEY) {
      console.log('Email would be sent:', { type, to, subject });
      return NextResponse.json({ status: 'demo', message: 'Email sent (demo mode)' });
    }

    const result = await sendEmail({ to, subject, html });
    return NextResponse.json({ status: 'sent', data: result });
  } catch (error) {
    console.error('Email error:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
