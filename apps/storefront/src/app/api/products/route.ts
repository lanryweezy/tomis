import { NextRequest, NextResponse } from 'next/server';
import { products, getUniqueColors } from '@/data/products';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const collection = searchParams.get('collection');
  const color = searchParams.get('color');
  const search = searchParams.get('search');
  const sort = searchParams.get('sort') || 'featured';
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '12');

  let filtered = [...products];
  if (category) filtered = filtered.filter(p => p.category === category);
  if (collection) filtered = filtered.filter(p => p.collection === collection);
  if (color) filtered = filtered.filter(p => p.variants.some(v => v.colorSlug === color));
  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter(p => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q) || p.tags.some(t => t.toLowerCase().includes(q)));
  }
  if (sort === 'price-asc') filtered.sort((a, b) => a.variants[0].price - b.variants[0].price);
  else if (sort === 'price-desc') filtered.sort((a, b) => b.variants[0].price - a.variants[0].price);
  else if (sort === 'newest') filtered.reverse();

  const total = filtered.length;
  const offset = (page - 1) * limit;
  const items = filtered.slice(offset, offset + limit);

  return NextResponse.json({
    products: items,
    pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    filters: { categories: [...new Set(products.map(p => p.category))], collections: [...new Set(products.map(p => p.collection))], colors: getUniqueColors() },
  });
}
