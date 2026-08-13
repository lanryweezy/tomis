import { NextRequest, NextResponse } from 'next/server';
import { products } from '@/data/products';

interface OrderItem {
  variantId: string;
  productName: string;
  color: string;
  size: string;
  quantity: number;
  price: number;
  total: number;
}

interface Order {
  id: string;
  orderNumber: string;
  email: string;
  phone?: string;
  status: 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled';
  items: OrderItem[];
  subtotal: number;
  shippingCost: number;
  discount: number;
  total: number;
  currency: 'NGN';
  shippingAddress: Record<string, string>;
  createdAt: string;
  updatedAt: string;
}

const orders: Order[] = [];
const validStatuses = new Set<Order['status']>(['pending', 'paid', 'shipped', 'delivered', 'cancelled']);

function generateOrderNumber(): string {
  return `TOM-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
}

function buildOrderItems(input: unknown): { items: OrderItem[] } | { error: string } {
  if (!Array.isArray(input) || input.length === 0 || input.length > 50) return { error: 'At least one valid item is required.' };
  const items: OrderItem[] = [];

  for (const rawItem of input) {
    if (!rawItem || typeof rawItem !== 'object') return { error: 'Invalid order item.' };
    const { variantId, size, quantity } = rawItem as Record<string, unknown>;
    if (typeof variantId !== 'string' || typeof size !== 'string' || !Number.isInteger(quantity) || Number(quantity) < 1 || Number(quantity) > 20) {
      return { error: 'Invalid order item details.' };
    }

    const product = products.find(candidate => candidate.variants.some(variant => variant.id === variantId));
    const variant = product?.variants.find(candidate => candidate.id === variantId);
    const sizeOption = product?.sizes.find(candidate => candidate.value === size && candidate.inStock);
    if (!product || !variant || !sizeOption || !variant.inStock) return { error: 'One or more selected items are unavailable.' };

    items.push({
      variantId,
      productName: product.name,
      color: variant.color,
      size,
      quantity: Number(quantity),
      price: variant.price,
      total: variant.price * Number(quantity),
    });
  }

  return { items };
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get('status');
  const email = searchParams.get('email');
  let filtered = [...orders];
  if (status && validStatuses.has(status as Order['status'])) filtered = filtered.filter(order => order.status === status);
  if (email) filtered = filtered.filter(order => order.email === email);
  return NextResponse.json({ orders: filtered, stats: { total: orders.length, pending: orders.filter(o => o.status === 'pending').length, paid: orders.filter(o => o.status === 'paid').length, shipped: orders.filter(o => o.status === 'shipped').length, delivered: orders.filter(o => o.status === 'delivered').length } });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, phone, items: inputItems, shippingAddress, discount = 0 } = body;
    if (typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !shippingAddress || typeof shippingAddress !== 'object') {
      return NextResponse.json({ error: 'A valid email, items, and shipping address are required.' }, { status: 400 });
    }

    const built = buildOrderItems(inputItems);
    if ('error' in built) return NextResponse.json({ error: built.error }, { status: 400 });
    const subtotal = built.items.reduce((sum, item) => sum + item.total, 0);
    const normalizedDiscount = typeof discount === 'number' && Number.isFinite(discount) && discount >= 0 ? Math.min(Math.round(discount), subtotal) : 0;
    const shippingCost = subtotal >= 50000 ? 0 : 2500;
    const total = subtotal + shippingCost - normalizedDiscount;
    const now = new Date().toISOString();
    const order: Order = {
      id: `order-${Date.now()}`,
      orderNumber: generateOrderNumber(),
      email,
      phone: typeof phone === 'string' ? phone : undefined,
      status: 'pending',
      items: built.items,
      subtotal,
      shippingCost,
      discount: normalizedDiscount,
      total,
      currency: 'NGN',
      shippingAddress: shippingAddress as Record<string, string>,
      createdAt: now,
      updatedAt: now,
    };
    orders.push(order);
    return NextResponse.json({ message: 'Order created', order }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Invalid order payload.' }, { status: 400 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { orderId, status } = body;
    if (typeof orderId !== 'string' || typeof status !== 'string' || !validStatuses.has(status as Order['status'])) {
      return NextResponse.json({ error: 'A valid order ID and status are required.' }, { status: 400 });
    }
    const order = orders.find(candidate => candidate.id === orderId);
    if (!order) return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    order.status = status as Order['status'];
    order.updatedAt = new Date().toISOString();
    return NextResponse.json({ message: 'Order updated', order });
  } catch {
    return NextResponse.json({ error: 'Invalid order update payload.' }, { status: 400 });
  }
}
