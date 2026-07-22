import { NextRequest, NextResponse } from 'next/server';

interface Order { id: string; orderNumber: string; email: string; phone?: string; status: string; items: Array<{ variantId: string; productName: string; color: string; size: string; quantity: number; price: number; total: number }>; subtotal: number; shippingCost: number; discount: number; total: number; currency: string; shippingAddress: Record<string, string>; createdAt: string; updatedAt: string; }
let orders: Order[] = [];

function generateOrderNumber(): string { return `TOM-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substr(2, 4).toUpperCase()}`; }

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get('status');
  const email = searchParams.get('email');
  let filtered = [...orders];
  if (status) filtered = filtered.filter(o => o.status === status);
  if (email) filtered = filtered.filter(o => o.email === email);
  return NextResponse.json({ orders: filtered, stats: { total: orders.length, pending: orders.filter(o => o.status === 'pending').length, paid: orders.filter(o => o.status === 'paid').length, shipped: orders.filter(o => o.status === 'shipped').length, delivered: orders.filter(o => o.status === 'delivered').length } });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { email, phone, items, shippingAddress, discount = 0 } = body;
  if (!email || !items?.length || !shippingAddress) return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  const subtotal = items.reduce((sum: number, item: { price: number; quantity: number }) => sum + item.price * item.quantity, 0);
  const shippingCost = subtotal >= 50000 ? 0 : 2500;
  const total = subtotal + shippingCost - discount;
  const order: Order = { id: `order-${Date.now()}`, orderNumber: generateOrderNumber(), email, phone, status: 'pending', items: items.map((item: { variantId: string; productName: string; color: string; size: string; quantity: number; price: number }) => ({ ...item, total: item.price * item.quantity })), subtotal, shippingCost, discount, total, currency: 'NGN', shippingAddress, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
  orders.push(order);
  return NextResponse.json({ message: 'Order created', order }, { status: 201 });
}

export async function PUT(request: NextRequest) {
  const body = await request.json();
  const { orderId, status } = body;
  if (!orderId || !status) return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  const order = orders.find(o => o.id === orderId);
  if (!order) return NextResponse.json({ error: 'Order not found' }, { status: 404 });
  order.status = status;
  order.updatedAt = new Date().toISOString();
  return NextResponse.json({ message: 'Order updated', order });
}
