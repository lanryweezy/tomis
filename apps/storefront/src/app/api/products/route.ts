import { NextRequest, NextResponse } from 'next/server';
import { products, getUniqueColors } from '@/data/products';
import { Product } from '@/data/products';

// ⚡ Bolt Optimization: Memoize static filter categories
// Impact: Prevents iterating over the entire static products array (O(N) operation)
// and re-allocating new Sets and arrays on every single API request.
let cachedFilters: { categories: string[], collections: string[], colors: { name: string, slug: string, code: string }[] } | null = null;

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const collection = searchParams.get('collection');
  const color = searchParams.get('color');
  const search = searchParams.get('search');
  const sort = searchParams.get('sort') || 'featured';
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '12');

  // ⚡ Bolt Optimization: Combine multiple filters into a single pass
  // Impact: Reduces complexity from O(N * M) (where M is number of applied filters)
  // down to O(N) by traversing the products array only once and avoiding intermediate array allocations.
  const filtered: Product[] = [];
  const q = search ? search.toLowerCase() : null;

  for (let i = 0; i < products.length; i++) {
    const p = products[i] as Product;

    if (category && p.category !== category) continue;
    if (collection && p.collection !== collection) continue;
    if (color && !p.variants.some(v => v.colorSlug === color)) continue;
    if (q && !(p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q) || p.tags.some(t => t.toLowerCase().includes(q)))) continue;

    filtered.push(p);
  }

  if (sort === 'price-asc') filtered.sort((a, b) => a.variants[0].price - b.variants[0].price);
  else if (sort === 'price-desc') filtered.sort((a, b) => b.variants[0].price - a.variants[0].price);
  else if (sort === 'newest') filtered.reverse();

  const total = filtered.length;
  const offset = (page - 1) * limit;
  const items = filtered.slice(offset, offset + limit);

  if (!cachedFilters) {
    cachedFilters = {
      categories: [...new Set(products.map(p => p.category))],
      collections: [...new Set(products.map(p => p.collection))],
      colors: getUniqueColors()
    };
  }

  return NextResponse.json({
    products: items,
    pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    filters: cachedFilters,
  });
}
