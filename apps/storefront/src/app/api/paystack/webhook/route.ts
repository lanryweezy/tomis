import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY || '';

function signaturesMatch(expected: string, received: string | null) {
  if (!received || !/^[a-f0-9]{128}$/i.test(received)) return false;
  const expectedBuffer = Buffer.from(expected, 'hex');
  const receivedBuffer = Buffer.from(received, 'hex');
  return expectedBuffer.length === receivedBuffer.length && crypto.timingSafeEqual(expectedBuffer, receivedBuffer);
}

export async function POST(request: NextRequest) {
  try {
    if (!PAYSTACK_SECRET_KEY) return NextResponse.json({ error: 'Payment service is not configured.' }, { status: 503 });

    const body = await request.text();
    const signature = request.headers.get('x-paystack-signature');
    const hash = crypto.createHmac('sha512', PAYSTACK_SECRET_KEY).update(body).digest('hex');
    if (!signaturesMatch(hash, signature)) return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });

    let event: { event?: unknown; data?: { reference?: unknown } };
    try {
      event = JSON.parse(body);
    } catch {
      return NextResponse.json({ error: 'Invalid webhook payload.' }, { status: 400 });
    }

    if (typeof event.event !== 'string' || !event.data || typeof event.data.reference !== 'string') {
      return NextResponse.json({ error: 'Incomplete webhook payload.' }, { status: 400 });
    }

    switch (event.event) {
      case 'charge.success':
        console.info('Paystack charge succeeded:', event.data.reference);
        // Production follow-up: persist an idempotent payment/order update, then enqueue fulfillment.
        break;
      case 'charge.failed':
        console.info('Paystack charge failed:', event.data.reference);
        break;
      default:
        console.info('Paystack event received:', event.event, event.data.reference);
    }

    return NextResponse.json({ status: 'ok' });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
