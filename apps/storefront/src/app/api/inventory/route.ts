import { NextRequest, NextResponse } from 'next/server';

interface InventoryRecord { variantId: string; location: string; quantity: number; reserved: number; lowStockThreshold: number; }
const inventory: InventoryRecord[] = [
  { variantId: 'var-bw-001', location: 'lagos-warehouse', quantity: 48, reserved: 0, lowStockThreshold: 10 },
  { variantId: 'var-nw-001', location: 'lagos-warehouse', quantity: 36, reserved: 0, lowStockThreshold: 10 },
  { variantId: 'var-ok-001', location: 'lagos-warehouse', quantity: 24, reserved: 0, lowStockThreshold: 10 },
  { variantId: 'var-pw-001', location: 'lagos-warehouse', quantity: 30, reserved: 0, lowStockThreshold: 10 },
  { variantId: 'var-bc-001', location: 'lagos-warehouse', quantity: 28, reserved: 0, lowStockThreshold: 10 },
  { variantId: 'var-tc-001', location: 'lagos-warehouse', quantity: 22, reserved: 0, lowStockThreshold: 10 },
  { variantId: 'var-lw-001', location: 'lagos-warehouse', quantity: 26, reserved: 0, lowStockThreshold: 10 },
  { variantId: 'var-sc-001', location: 'lagos-warehouse', quantity: 20, reserved: 0, lowStockThreshold: 10 },
  { variantId: 'var-stc-001', location: 'lagos-warehouse', quantity: 32, reserved: 0, lowStockThreshold: 10 },
  { variantId: 'var-cn-001', location: 'lagos-warehouse', quantity: 18, reserved: 0, lowStockThreshold: 10 },
  { variantId: 'var-sw-001', location: 'lagos-warehouse', quantity: 25, reserved: 0, lowStockThreshold: 10 },
  { variantId: 'var-burg-001', location: 'lagos-warehouse', quantity: 19, reserved: 0, lowStockThreshold: 10 },
  { variantId: 'var-sky-001', location: 'lagos-warehouse', quantity: 27, reserved: 0, lowStockThreshold: 10 },
];

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const variantId = searchParams.get('variantId');
  let filtered = [...inventory];
  if (variantId) filtered = filtered.filter(i => i.variantId === variantId);
  const lowStockItems = inventory.filter(i => i.quantity - i.reserved <= i.lowStockThreshold);
  return NextResponse.json({ inventory: filtered, lowStock: lowStockItems, locations: [...new Set(inventory.map(i => i.location))] });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { variantId, location, quantity, type } = body;
  if (!variantId || !location || !quantity || !type) return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  const existing = inventory.find(i => i.variantId === variantId && i.location === location);
  if (type === 'inbound') { if (existing) existing.quantity += quantity; else inventory.push({ variantId, location, quantity, reserved: 0, lowStockThreshold: 10 }); }
  else if (type === 'outbound') { if (!existing || existing.quantity - existing.reserved < quantity) return NextResponse.json({ error: 'Insufficient stock' }, { status: 400 }); existing.quantity -= quantity; }
  return NextResponse.json({ message: 'Inventory updated', inventory: inventory.filter(i => i.variantId === variantId) });
}
