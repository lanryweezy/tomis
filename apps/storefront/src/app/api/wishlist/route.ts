import { NextRequest, NextResponse } from 'next/server';

interface WishlistItem { id: string; userId: string; variantId: string; productId: string; createdAt: string; }
let wishlist: WishlistItem[] = [];

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId') || 'anonymous';
  const items = wishlist.filter(w => w.userId === userId);
  return NextResponse.json({ items, count: items.length });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { userId = 'anonymous', variantId, productId } = body;
  if (!variantId || !productId) return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  const existing = wishlist.find(w => w.userId === userId && w.variantId === variantId);
  if (existing) return NextResponse.json({ error: 'Already in wishlist' }, { status: 409 });
  const item: WishlistItem = { id: `wish-${Date.now()}`, userId, variantId, productId, createdAt: new Date().toISOString() };
  wishlist.push(item);
  return NextResponse.json({ message: 'Added to wishlist', item }, { status: 201 });
}

export async function DELETE(request: NextRequest) {
  const body = await request.json();
  const { userId = 'anonymous', variantId } = body;
  if (!variantId) return NextResponse.json({ error: 'Missing variant ID' }, { status: 400 });
  wishlist = wishlist.filter(w => !(w.userId === userId && w.variantId === variantId));
  return NextResponse.json({ message: 'Removed from wishlist' });
}
