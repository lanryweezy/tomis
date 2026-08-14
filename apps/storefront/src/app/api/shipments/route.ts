import { NextRequest, NextResponse } from 'next/server';

interface ShipmentRecord { id: string; orderId: string; carrier: string; trackingNumber?: string; trackingUrl?: string; status: string; estimatedDelivery?: string; deliveredAt?: string; createdAt: string; updatedAt: string; }
const shipments: ShipmentRecord[] = [];

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const orderId = searchParams.get('orderId');
  let filtered = [...shipments];
  if (orderId) filtered = filtered.filter(s => s.orderId === orderId);
  return NextResponse.json({ shipments: filtered });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { orderId, carrier, trackingNumber, estimatedDelivery } = body;
  if (!orderId || !carrier) return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  const shipment: ShipmentRecord = { id: `ship-${Date.now()}`, orderId, carrier, trackingNumber, trackingUrl: trackingNumber ? `https://track.${carrier.toLowerCase()}.com/${trackingNumber}` : undefined, status: 'pending', estimatedDelivery, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
  shipments.push(shipment);
  return NextResponse.json({ message: 'Shipment created', shipment }, { status: 201 });
}

export async function PUT(request: NextRequest) {
  const body = await request.json();
  const { shipmentId, status, trackingNumber } = body;
  if (!shipmentId || !status) return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  const shipment = shipments.find(s => s.id === shipmentId);
  if (!shipment) return NextResponse.json({ error: 'Shipment not found' }, { status: 404 });
  shipment.status = status;
  if (trackingNumber) shipment.trackingNumber = trackingNumber;
  if (status === 'delivered') shipment.deliveredAt = new Date().toISOString();
  shipment.updatedAt = new Date().toISOString();
  return NextResponse.json({ message: 'Shipment updated', shipment });
}
