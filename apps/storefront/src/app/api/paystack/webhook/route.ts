import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY || '';

// Paystack webhook handler
export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get('x-paystack-signature');

    // Verify webhook signature
    const hash = crypto
      .createHmac('sha512', PAYSTACK_SECRET_KEY)
      .update(body)
      .digest('hex');

    if (hash !== signature) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    const event = JSON.parse(body);

    // Handle different event types
    switch (event.event) {
      case 'charge.success':
        // Payment successful
        console.log('Payment successful:', event.data.reference);
        // TODO: Update order status in database
        // TODO: Send confirmation email
        // TODO: Update inventory
        break;

      case 'charge.failed':
        // Payment failed
        console.log('Payment failed:', event.data.reference);
        break;

      case 'subscription.create':
        // Subscription created
        console.log('Subscription created:', event.data);
        break;

      case 'invoice.payment_success':
        // Invoice paid
        console.log('Invoice paid:', event.data);
        break;

      default:
        console.log('Unhandled event:', event.event);
    }

    return NextResponse.json({ status: 'ok' });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
