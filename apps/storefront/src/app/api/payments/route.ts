import { NextRequest, NextResponse } from 'next/server';

interface PaymentRecord { id: string; orderId: string; provider: string; providerReference?: string; amount: number; currency: string; status: string; metadata?: Record<string, unknown>; createdAt: string; updatedAt: string; }
let payments: PaymentRecord[] = [];

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const orderId = searchParams.get('orderId');
  let filtered = [...payments];
  if (orderId) filtered = filtered.filter(p => p.orderId === orderId);
  return NextResponse.json({ payments: filtered });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { orderId, provider, amount, currency = 'NGN', metadata } = body;
  if (!orderId || !provider || !amount) return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  const payment: PaymentRecord = { id: `pay-${Date.now()}`, orderId, provider, amount, currency, status: 'pending', metadata, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
  payments.push(payment);
  const authUrl = provider === 'paystack' ? `https://checkout.paystack.com/${payment.id}` : `https://checkout.flutterwave.com/${payment.id}`;
  return NextResponse.json({ message: 'Payment initialized', payment, authorizationUrl: authUrl }, { status: 201 });
}

export async function PUT(request: NextRequest) {
  const body = await request.json();
  const { paymentId, status, providerReference } = body;
  if (!paymentId || !status) return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  const payment = payments.find(p => p.id === paymentId);
  if (!payment) return NextResponse.json({ error: 'Payment not found' }, { status: 404 });
  payment.status = status;
  if (providerReference) payment.providerReference = providerReference;
  payment.updatedAt = new Date().toISOString();
  return NextResponse.json({ message: 'Payment updated', payment });
}
