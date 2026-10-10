import { NextRequest, NextResponse } from 'next/server';

interface Subscriber { id: string; email: string; firstName?: string; status: string; subscribedAt: string; unsubscribedAt?: string; }
const subscribers: Subscriber[] = [];

export async function GET() {
  // ⚡ Bolt Optimization: Single-pass stats calculation
  // Impact: Prevents iterating over the `subscribers` array multiple times (O(N) instead of O(N * filters)).
  const activeSubscribers: Subscriber[] = [];
  let activeCount = 0;
  let unsubscribedCount = 0;

  for (let i = 0; i < subscribers.length; i++) {
    const sub = subscribers[i];
    if (sub.status === 'active') {
      activeSubscribers.push(sub);
      activeCount++;
    } else if (sub.status === 'unsubscribed') {
      unsubscribedCount++;
    }
  }

  return NextResponse.json({ subscribers: activeSubscribers, stats: { total: subscribers.length, active: activeCount, unsubscribed: unsubscribedCount } });
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
