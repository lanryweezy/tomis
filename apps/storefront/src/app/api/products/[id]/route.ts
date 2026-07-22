import { NextRequest, NextResponse } from 'next/server';
import { getProductBySlug, getRelatedProducts } from '@/data/products';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const product = getProductBySlug(id);

  if (!product) {
    return NextResponse.json({ error: 'Product not found' }, { status: 404 });
  }

  const related = getRelatedProducts(product.id);

  return NextResponse.json({
    product,
    related,
  });
}
