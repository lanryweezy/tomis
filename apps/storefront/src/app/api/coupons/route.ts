import { NextRequest, NextResponse } from 'next/server';

interface CouponRecord { id: string; code: string; description?: string; discountType: string; discountValue: number; minOrderAmount?: number; maxUses?: number; usedCount: number; isActive: boolean; }
const coupons: CouponRecord[] = [
  { id: 'coupon-1', code: 'TOMIS10', description: '10% off your first order', discountType: 'percentage', discountValue: 10, minOrderAmount: 20000, maxUses: 100, usedCount: 0, isActive: true },
  { id: 'coupon-2', code: 'WELCOME5000', description: '₦5,000 off orders over ₦50,000', discountType: 'fixed', discountValue: 5000, minOrderAmount: 50000, maxUses: 50, usedCount: 0, isActive: true },
];

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  if (code) {
    const coupon = coupons.find(c => c.code.toUpperCase() === code.toUpperCase() && c.isActive);
    if (!coupon) return NextResponse.json({ error: 'Invalid coupon code' }, { status: 404 });
    if (coupon.maxUses && coupon.usedCount >= coupon.maxUses) return NextResponse.json({ error: 'Coupon usage limit reached' }, { status: 400 });
    return NextResponse.json({ coupon });
  }
  return NextResponse.json({ coupons: coupons.filter(c => c.isActive) });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { code, orderAmount } = body;
  if (!code) return NextResponse.json({ error: 'Missing coupon code' }, { status: 400 });
  const coupon = coupons.find(c => c.code.toUpperCase() === code.toUpperCase() && c.isActive);
  if (!coupon) return NextResponse.json({ error: 'Invalid coupon code' }, { status: 404 });
  if (coupon.minOrderAmount && orderAmount < coupon.minOrderAmount) return NextResponse.json({ error: `Minimum order amount is ₦${coupon.minOrderAmount.toLocaleString('en-NG')}` }, { status: 400 });
  const discount = coupon.discountType === 'percentage' ? Math.round(orderAmount * (coupon.discountValue / 100)) : coupon.discountValue;
  coupon.usedCount += 1;
  return NextResponse.json({ coupon, discount, finalAmount: orderAmount - discount });
}
