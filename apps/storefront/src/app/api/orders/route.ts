import { NextRequest, NextResponse } from 'next/server';
import { db, orders, orderItems, productVariants } from '@tomis/database';
import { eq, inArray } from 'drizzle-orm';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { items, email, phone, shippingAddress, billingAddress, shippingCost = 0 } = body;

    if (!items || !items.length || !email || !shippingAddress) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // 1. Authoritative price calculation
    const variantIds = items.map((item: { variantId: string, size?: string, quantity: number }) => item.variantId);

    const dbVariants = await db.query.productVariants.findMany({
      where: inArray(productVariants.id, variantIds),
      with: {
        product: true
      }
    });

    let calculatedSubtotal = 0;
    const validatedItems = [];

    for (const item of items) {
      const dbVariant = dbVariants.find((v: { id: string }) => v.id === item.variantId);
      if (!dbVariant) {
        return NextResponse.json({ error: `Variant ${item.variantId} not found` }, { status: 404 });
      }

      if (!dbVariant.inStock || (dbVariant.stockLevel !== null && dbVariant.stockLevel < item.quantity)) {
        return NextResponse.json({ error: `Insufficient stock for ${dbVariant.sku}` }, { status: 400 });
      }

      const activePrice = dbVariant.salePrice || dbVariant.price;
      const totalItemPrice = activePrice * item.quantity;
      calculatedSubtotal += totalItemPrice;

      validatedItems.push({
        variantId: dbVariant.id,
        productName: 'Unknown Product',
        variantColor: dbVariant.color,
        size: item.size || 'OS',
        quantity: item.quantity,
        price: activePrice,
        total: totalItemPrice,
      });
    }

    const calculatedTotal = calculatedSubtotal + shippingCost;
    const orderNumber = `TOM-${Date.now().toString(36).toUpperCase()}`;

    // 2. Create the order
    const [newOrder] = await db.insert(orders).values({
      orderNumber,
      email,
      phone,
      status: 'pending',
      subtotal: calculatedSubtotal,
      shippingCost,
      discount: 0,
      total: calculatedTotal,
      currency: 'NGN',
      shippingAddress,
      billingAddress: billingAddress || shippingAddress,
    }).returning();

    // 3. Insert order items
    const orderItemsToInsert = validatedItems.map(vi => ({
      orderId: newOrder.id,
      ...vi
    }));

    await db.insert(orderItems).values(orderItemsToInsert);

    // Note: Stock decrementing should ideally happen after payment verification (or reserved here and released if payment fails)
    // For now we rely on the check above.

    return NextResponse.json({
      message: 'Order created successfully',
      orderId: newOrder.id,
      orderNumber: newOrder.orderNumber,
      total: newOrder.total
    }, { status: 201 });

  } catch (err: unknown) {
    console.error('Order Creation Error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
