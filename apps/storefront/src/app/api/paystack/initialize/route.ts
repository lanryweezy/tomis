import { NextRequest, NextResponse } from 'next/server';
import { products } from '@/data/products';

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY || '';
const PAYSTACK_BASE_URL = 'https://api.paystack.co';
const deliveryPrices: Record<string, number> = {
  'lagos-standard': 0,
  'lagos-express': 2000,
  nationwide: 2500,
  'nationwide-express': 5000,
};

function getServerTotal(items: unknown, deliveryOption: unknown, promoCode: unknown) {
  if (!Array.isArray(items) || items.length === 0) return { error: 'At least one cart item is required.' } as const;

  let subtotal = 0;
  for (const item of items) {
    if (!item || typeof item !== 'object') return { error: 'Invalid cart item.' } as const;
    const { variantId, size, quantity } = item as Record<string, unknown>;
    if (typeof variantId !== 'string' || typeof size !== 'string' || !Number.isInteger(quantity) || Number(quantity) < 1 || Number(quantity) > 20) {
      return { error: 'Invalid cart item details.' } as const;
    }
    const product = products.find(candidate => candidate.variants.some(variant => variant.id === variantId));
    const variant = product?.variants.find(candidate => candidate.id === variantId);
    const sizeOption = product?.sizes.find(candidate => candidate.value === size && candidate.inStock);
    if (!product || !variant || !sizeOption || !variant.inStock) return { error: 'One or more selected items are unavailable.' } as const;
    subtotal += variant.price * Number(quantity);
  }

  const deliveryKey = typeof deliveryOption === 'string' ? deliveryOption : 'lagos-standard';
  const delivery = deliveryPrices[deliveryKey];
  if (delivery === undefined) return { error: 'Invalid delivery option.' } as const;
  const shipping = subtotal >= 50000 ? 0 : delivery;
  const discount = promoCode === 'TOMIS10' ? Math.round(subtotal * 0.1) : 0;
  return { subtotal, shipping, discount, total: subtotal + shipping - discount } as const;
}

export async function POST(request: NextRequest) {
  try {
    if (!PAYSTACK_SECRET_KEY) {
      return NextResponse.json({ error: 'Payment service is not configured.' }, { status: 503 });
    }

    const body = await request.json();
    const { email, items, deliveryOption, promoCode, metadata, callback_url } = body;
    if (typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'A valid email is required.' }, { status: 400 });
    }

    const totals = getServerTotal(items, deliveryOption, promoCode);
    if ('error' in totals) return NextResponse.json({ error: totals.error }, { status: 400 });

    const orderNumber = typeof metadata?.orderNumber === 'string' ? metadata.orderNumber : `TOM-${Date.now().toString(36).toUpperCase()}`;
    const amountInKobo = totals.total * 100;
    const response = await fetch(`${PAYSTACK_BASE_URL}/transaction/initialize`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        amount: amountInKobo,
        currency: 'NGN',
        metadata: {
          ...metadata,
          orderNumber,
          serverSubtotal: totals.subtotal,
          serverShipping: totals.shipping,
          serverDiscount: totals.discount,
          serverTotal: totals.total,
          custom_fields: [
            { display_name: 'Order Number', variable_name: 'order_number', value: orderNumber },
          ],
        },
        callback_url: callback_url || `${process.env.NEXT_PUBLIC_SITE_URL || 'https://tomis.fit'}/checkout/verify`,
      }),
    });

    const data = await response.json();
    if (!response.ok || !data.status) {
      return NextResponse.json({ error: data.message || 'Payment initialization failed.' }, { status: 502 });
    }

    return NextResponse.json({
      status: true,
      data: {
        authorization_url: data.data.authorization_url,
        access_code: data.data.access_code,
        reference: data.data.reference,
        orderNumber,
        totals,
      },
    });
  } catch (error) {
    console.error('Paystack initialization error:', error);
    return NextResponse.json({ error: 'Payment initialization failed.' }, { status: 500 });
  }
}
