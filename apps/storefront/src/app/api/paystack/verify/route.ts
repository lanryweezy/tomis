import { NextRequest, NextResponse } from 'next/server';

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY || '';
const PAYSTACK_BASE_URL = 'https://api.paystack.co';

// Verify payment
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const reference = searchParams.get('reference');

    if (!reference) {
      return NextResponse.json({ error: 'Reference is required' }, { status: 400 });
    }

    const response = await fetch(`${PAYSTACK_BASE_URL}/transaction/verify/${reference}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
      },
    });

    const data = await response.json();

    if (!data.status) {
      return NextResponse.json({ error: data.message || 'Verification failed' }, { status: 400 });
    }

    const transaction = data.data;

    return NextResponse.json({
      status: true,
      data: {
        reference: transaction.reference,
        amount: transaction.amount / 100, // Convert from kobo
        currency: transaction.currency,
        status: transaction.status,
        paidAt: transaction.paid_at,
        customer: {
          email: transaction.customer.email,
          name: transaction.customer.first_name + ' ' + transaction.customer.last_name,
        },
        metadata: transaction.metadata,
      },
    });
  } catch (error) {
    console.error('Paystack verification error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
