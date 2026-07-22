import { NextRequest, NextResponse } from 'next/server';

interface Subscriber { id: string; email: string; firstName?: string; status: string; subscribedAt: string; unsubscribedAt?: string; }
let subscribers: Subscriber[] = [];

export async function GET() {
  return NextResponse.json({ subscribers: subscribers.filter(s => s.status === 'active'), stats: { total: subscribers.length, active: subscribers.filter(s => s.status === 'active').length, unsubscribed: subscribers.filter(s => s.status === 'unsubscribed').length } });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { email, firstName } = body;
  if (!email) return NextResponse.json({ error: 'Email is required' }, { status: 400 });
  const existing = subscribers.find(s => s.email === email);
  if (existing) { if (existing.status === 'active') return NextResponse.json({ error: 'Already subscribed' }, { status: 409 }); existing.status = 'active'; return NextResponse.json({ message: 'Re-subscribed' }); }
  const subscriber: Subscriber = { id: `sub-${Date.now()}`, email, firstName, status: 'active', subscribedAt: new Date().toISOString() };
  subscribers.push(subscriber);
  return NextResponse.json({ message: 'Subscribed successfully', subscriber }, { status: 201 });
}

export async function DELETE(request: NextRequest) {
  const body = await request.json();
  const { email } = body;
  if (!email) return NextResponse.json({ error: 'Email is required' }, { status: 400 });
  const subscriber = subscribers.find(s => s.email === email);
  if (subscriber) { subscriber.status = 'unsubscribed'; subscriber.unsubscribedAt = new Date().toISOString(); }
  return NextResponse.json({ message: 'Unsubscribed successfully' });
}
