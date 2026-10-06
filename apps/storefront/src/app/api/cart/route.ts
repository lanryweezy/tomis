import { NextRequest, NextResponse } from 'next/server';

interface CartItem { id: string; variantId: string; productId: string; name: string; color: string; colorCode: string; size: string; price: number; quantity: number; image: string; }
let cart: CartItem[] = [];

// ⚡ Bolt Optimization: Helper function to calculate cart summary
// Impact: Standardizes calculation and avoids redundant operations (like recalculating itemCount inline).
function getCartSummary() {
  let subtotal = 0;
  let itemCount = 0;
  for (const item of cart) {
    subtotal += item.price * item.quantity;
    itemCount += item.quantity;
  }
  const shipping = subtotal >= 50000 ? 0 : 2500;
  return { itemCount, subtotal, shipping, total: subtotal + shipping, currency: 'NGN' };
}

export async function GET() {
  return NextResponse.json({ items: cart, summary: getCartSummary() });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { variantId, productId, name, color, colorCode, size, price, quantity = 1, image } = body;
  if (!variantId || !size || !price) return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  const existingIndex = cart.findIndex(item => item.variantId === variantId && item.size === size);
  if (existingIndex >= 0) { cart[existingIndex].quantity += quantity; }
  else { cart.push({ id: `cart-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`, variantId, productId, name, color, colorCode, size, price, quantity, image }); }
  return NextResponse.json({ message: 'Item added to cart', items: cart, summary: getCartSummary() });
}

export async function PUT(request: NextRequest) {
  const body = await request.json();
  const { itemId, quantity } = body;
  if (!itemId || quantity === undefined) return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  if (quantity <= 0) { cart = cart.filter(item => item.id !== itemId); }
  else { const item = cart.find(item => item.id === itemId); if (item) item.quantity = quantity; }
  return NextResponse.json({ message: 'Cart updated', items: cart, summary: getCartSummary() });
}

export async function DELETE(request: NextRequest) {
  const body = await request.json();
  const { itemId } = body;
  if (!itemId) return NextResponse.json({ error: 'Missing item ID' }, { status: 400 });
  cart = cart.filter(item => item.id !== itemId);
  return NextResponse.json({ message: 'Item removed', items: cart, summary: getCartSummary() });
}
