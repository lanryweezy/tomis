export interface ProductImage {
  id: string;
  src: string;
  alt: string;
  type: 'product' | 'model' | 'lifestyle' | 'detail' | 'editorial';
}

export interface ProductVariant {
  id: string;
  color: string;
  colorCode: string;
  colorSlug: string;
  sku: string;
  price: number;
  salePrice?: number;
  inStock: boolean;
  stockLevel: number;
  images: ProductImage[];
}

export interface ProductSize {
  label: string;
  value: string;
  inStock: boolean;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  longDescription: string;
  category: string;
  collection: string;
  material: string;
  fabricWeight: string;
  countryOfManufacture: string;
  sizes: ProductSize[];
  fitDescription: string;
  careInstructions: string[];
  shippingInfo: string;
  returnPolicy: string;
  variants: ProductVariant[];
  relatedProductIds: string[];
  completeTheLookIds: string[];
  tags: string[];
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string[];
}

export const products: Product[] = [
  {
    id: 'tomis-half-collar-black',
    name: 'Half-Collar Shirt',
    slug: 'half-collar-shirt-black',
    description: 'The signature Tomis half-collar shirt in Black. Designed for everyday confidence.',
    shortDescription: 'Signature half-collar. Black.',
    longDescription: 'The shirt that started it all. Our signature half-collar (mandarin collar) design delivers a clean, modern silhouette that moves effortlessly between work, leisure and everything in between. Crafted from premium cotton with a relaxed fit.',
    category: 'Half-Collar Shirts',
    collection: 'Signature',
    material: '100% Premium Cotton',
    fabricWeight: '140 GSM',
    countryOfManufacture: 'Lagos, Nigeria',
    sizes: [
      { label: 'S', value: 'S', inStock: true },
      { label: 'M', value: 'M', inStock: true },
      { label: 'L', value: 'L', inStock: true },
      { label: 'XL', value: 'XL', inStock: true },
      { label: 'XXL', value: 'XXL', inStock: true },
    ],
    fitDescription: 'Relaxed fit. True to size.',
    careInstructions: [
      'Machine wash cold with like colours',
      'Do not bleach',
      'Tumble dry low',
      'Iron on medium heat',
      'Do not dry clean',
    ],
    shippingInfo: 'Lagos delivery 1–2 working days. Nationwide 2–5 working days.',
    returnPolicy: 'Free returns within 14 days of delivery.',
    variants: [
      {
        id: 'var-bw-001',
        color: 'Black',
        colorCode: '#101114',
        colorSlug: 'black',
        sku: 'TOM-HC-BW-001',
        price: 35000,
        inStock: true,
        stockLevel: 48,
        images: [
          { id: 'img-bw-1', src: '/images/products/black-front.jpg', alt: 'Tomis Half-Collar Shirt Black Front', type: 'product' },
          { id: 'img-bw-2', src: '/images/lifestyle/black-office.jpg', alt: 'Model wearing Tomis Half-Collar Shirt Black in office', type: 'model' },
          { id: 'img-bw-3', src: '/images/hero/hero-black-rooftop.jpg', alt: 'Tomis Half-Collar Shirt Black on Lagos rooftop', type: 'lifestyle' },
        ],
      },
    ],
    relatedProductIds: ['tomis-half-collar-navy', 'tomis-half-collar-olive'],
    completeTheLookIds: ['tomis-half-collar-brown'],
    tags: ['half-collar', 'black', 'white', 'signature', 'best-seller'],
    seoTitle: 'Tomis Half-Collar Shirt — Black | ₦35,000',
    seoDescription: 'The signature Tomis half-collar shirt in Black. Premium cotton. Designed for everyday confidence. Shop now.',
    seoKeywords: ['tomis', 'half-collar', 'shirt', 'black', 'white', 'nigerian fashion'],
  },
  {
    id: 'tomis-half-collar-navy',
    name: 'Half-Collar Shirt',
    slug: 'half-collar-shirt-navy',
    description: 'The signature Tomis half-collar shirt in Navy. Classic meets contemporary.',
    shortDescription: 'Signature half-collar. Navy.',
    longDescription: 'Our Navy half-collar is the Tomis classic. Deep navy meets clean white in a combination that works from the boardroom to brunch. Premium cotton construction with our signature collar design.',
    category: 'Half-Collar Shirts',
    collection: 'Signature',
    material: '100% Premium Cotton',
    fabricWeight: '140 GSM',
    countryOfManufacture: 'Lagos, Nigeria',
    sizes: [
      { label: 'S', value: 'S', inStock: true },
      { label: 'M', value: 'M', inStock: true },
      { label: 'L', value: 'L', inStock: true },
      { label: 'XL', value: 'XL', inStock: true },
      { label: 'XXL', value: 'XXL', inStock: true },
    ],
    fitDescription: 'Relaxed fit. True to size.',
    careInstructions: [
      'Machine wash cold with like colours',
      'Do not bleach',
      'Tumble dry low',
      'Iron on medium heat',
      'Do not dry clean',
    ],
    shippingInfo: 'Lagos delivery 1–2 working days. Nationwide 2–5 working days.',
    returnPolicy: 'Free returns within 14 days of delivery.',
    variants: [
      {
        id: 'var-nw-001',
        color: 'Navy',
        colorCode: '#0B1F5E',
        colorSlug: 'navy',
        sku: 'TOM-HC-NW-001',
        price: 35000,
        inStock: true,
        stockLevel: 36,
        images: [
          { id: 'img-nw-1', src: '/images/products/blue-stripe-front.jpg', alt: 'Tomis Half-Collar Shirt Blue Stripe Front', type: 'product' },
          { id: 'img-nw-2', src: '/images/lifestyle/white-architecture.jpg', alt: 'Model wearing Tomis Half-Collar Shirt White with architecture', type: 'model' },
        ],
      },
    ],
    relatedProductIds: ['tomis-half-collar-black', 'tomis-half-collar-olive'],
    completeTheLookIds: ['tomis-half-collar-stone'],
    tags: ['half-collar', 'navy', 'white', 'signature', 'classic'],
    seoTitle: 'Tomis Half-Collar Shirt — Navy | ₦35,000',
    seoDescription: 'The signature Tomis half-collar shirt in Navy. Classic meets contemporary. Shop now.',
    seoKeywords: ['tomis', 'half-collar', 'shirt', 'navy', 'white'],
  },
  {
    id: 'tomis-half-collar-olive',
    name: 'Half-Collar Shirt',
    slug: 'half-collar-shirt-olive',
    description: 'The signature Tomis half-collar shirt in Olive. Natural tones, confident style.',
    shortDescription: 'Signature half-collar. Olive.',
    longDescription: 'Earthy and refined. Our Olive half-collar brings natural warmth to the signature silhouette. Perfect for weekend outings and casual office days.',
    category: 'Half-Collar Shirts',
    collection: 'Signature',
    material: '100% Premium Cotton',
    fabricWeight: '140 GSM',
    countryOfManufacture: 'Lagos, Nigeria',
    sizes: [
      { label: 'S', value: 'S', inStock: true },
      { label: 'M', value: 'M', inStock: true },
      { label: 'L', value: 'L', inStock: true },
      { label: 'XL', value: 'XL', inStock: true },
      { label: 'XXL', value: 'XXL', inStock: false },
    ],
    fitDescription: 'Relaxed fit. True to size.',
    careInstructions: [
      'Machine wash cold with like colours',
      'Do not bleach',
      'Tumble dry low',
      'Iron on medium heat',
      'Do not dry clean',
    ],
    shippingInfo: 'Lagos delivery 1–2 working days. Nationwide 2–5 working days.',
    returnPolicy: 'Free returns within 14 days of delivery.',
    variants: [
      {
        id: 'var-ok-001',
        color: 'Olive',
        colorCode: '#7A8065',
        colorSlug: 'olive',
        sku: 'TOM-HC-OK-001',
        price: 35000,
        inStock: true,
        stockLevel: 24,
        images: [
          { id: 'img-ok-1', src: '/images/products/olive-front.jpg', alt: 'Tomis Half-Collar Shirt Olive Front', type: 'product' },
          { id: 'img-ok-2', src: '/images/lifestyle/olive-cafe.jpg', alt: 'Model wearing Tomis Half-Collar Shirt Olive in cafe', type: 'model' },
          { id: 'img-ok-3', src: '/images/lifestyle/olive-interior.jpg', alt: 'Model wearing Tomis Half-Collar Shirt Olive in interior', type: 'lifestyle' },
        ],
      },
    ],
    relatedProductIds: ['tomis-half-collar-sage', 'tomis-half-collar-stone-white'],
    completeTheLookIds: ['tomis-half-collar-stone'],
    tags: ['half-collar', 'olive', 'khaki', 'natural', 'earth-tones'],
    seoTitle: 'Tomis Half-Collar Shirt — Olive | ₦35,000',
    seoDescription: 'The signature Tomis half-collar shirt in Olive. Natural tones, confident style.',
    seoKeywords: ['tomis', 'half-collar', 'shirt', 'olive', 'khaki'],
  },
  {
    id: 'tomis-half-collar-pink',
    name: 'Half-Collar Shirt',
    slug: 'half-collar-shirt-pink',
    description: 'The signature Tomis half-collar shirt in Dusty Pink. The unexpected choice.',
    shortDescription: 'Signature half-collar. Dusty Pink.',
    longDescription: 'Bold without shouting. Our Dusty Pink half-collar is for the man who knows that softness is strength. A statement piece that pairs with everything.',
    category: 'Half-Collar Shirts',
    collection: 'Signature',
    material: '100% Premium Cotton',
    fabricWeight: '140 GSM',
    countryOfManufacture: 'Lagos, Nigeria',
    sizes: [
      { label: 'S', value: 'S', inStock: true },
      { label: 'M', value: 'M', inStock: true },
      { label: 'L', value: 'L', inStock: true },
      { label: 'XL', value: 'XL', inStock: true },
      { label: 'XXL', value: 'XXL', inStock: true },
    ],
    fitDescription: 'Relaxed fit. True to size.',
    careInstructions: [
      'Machine wash cold with like colours',
      'Do not bleach',
      'Tumble dry low',
      'Iron on medium heat',
      'Do not dry clean',
    ],
    shippingInfo: 'Lagos delivery 1–2 working days. Nationwide 2–5 working days.',
    returnPolicy: 'Free returns within 14 days of delivery.',
    variants: [
      {
        id: 'var-pw-001',
        color: 'Dusty Pink',
        colorCode: '#D4A5A5',
        colorSlug: 'pink',
        sku: 'TOM-HC-PW-001',
        price: 35000,
        inStock: true,
        stockLevel: 30,
        images: [
          { id: 'img-pw-1', src: '/images/products/pink-front.jpg', alt: 'Tomis Half-Collar Shirt Pink Front', type: 'product' },
          { id: 'img-pw-2', src: '/images/lifestyle/pink-interior.jpg', alt: 'Model wearing Tomis Half-Collar Shirt Pink in interior', type: 'model' },
        ],
      },
    ],
    relatedProductIds: ['tomis-half-collar-lavender', 'tomis-half-collar-black'],
    completeTheLookIds: ['tomis-half-collar-stone'],
    tags: ['half-collar', 'pink', 'white', 'unexpected', 'bold'],
    seoTitle: 'Tomis Half-Collar Shirt — Dusty Pink | ₦35,000',
    seoDescription: 'The signature Tomis half-collar shirt in Dusty Pink. The unexpected choice.',
    seoKeywords: ['tomis', 'half-collar', 'shirt', 'pink', 'white'],
  },
  {
    id: 'tomis-half-collar-brown',
    name: 'Half-Collar Shirt',
    slug: 'half-collar-shirt-brown',
    description: 'The signature Tomis half-collar shirt in Brown. Warmth meets sophistication.',
    shortDescription: 'Signature half-collar. Brown.',
    longDescription: 'Rich brown meets warm cream in a combination that feels like golden hour. Our Brown half-collar brings depth and warmth to any wardrobe.',
    category: 'Half-Collar Shirts',
    collection: 'Signature',
    material: '100% Premium Cotton',
    fabricWeight: '140 GSM',
    countryOfManufacture: 'Lagos, Nigeria',
    sizes: [
      { label: 'S', value: 'S', inStock: true },
      { label: 'M', value: 'M', inStock: true },
      { label: 'L', value: 'L', inStock: true },
      { label: 'XL', value: 'XL', inStock: true },
      { label: 'XXL', value: 'XXL', inStock: true },
    ],
    fitDescription: 'Relaxed fit. True to size.',
    careInstructions: [
      'Machine wash cold with like colours',
      'Do not bleach',
      'Tumble dry low',
      'Iron on medium heat',
      'Do not dry clean',
    ],
    shippingInfo: 'Lagos delivery 1–2 working days. Nationwide 2–5 working days.',
    returnPolicy: 'Free returns within 14 days of delivery.',
    variants: [
      {
        id: 'var-bc-001',
        color: 'Brown',
        colorCode: '#8B6F47',
        colorSlug: 'brown',
        sku: 'TOM-HC-BC-001',
        price: 35000,
        inStock: true,
        stockLevel: 28,
        images: [
          { id: 'img-bc-1', src: '/images/products/brown-front.jpg', alt: 'Tomis Half-Collar Shirt Brown Front', type: 'product' },
          { id: 'img-bc-2', src: '/images/lifestyle/tan-waterfront.jpg', alt: 'Model wearing Tomis Half-Collar Shirt Tan at waterfront', type: 'model' },
        ],
      },
    ],
    relatedProductIds: ['tomis-half-collar-terracotta', 'tomis-half-collar-stone-white'],
    completeTheLookIds: ['tomis-half-collar-navy'],
    tags: ['half-collar', 'brown', 'cream', 'warmth', 'earth-tones'],
    seoTitle: 'Tomis Half-Collar Shirt — Brown | ₦35,000',
    seoDescription: 'The signature Tomis half-collar shirt in Brown. Warmth meets sophistication.',
    seoKeywords: ['tomis', 'half-collar', 'shirt', 'brown', 'cream'],
  },
  {
    id: 'tomis-half-collar-terracotta',
    name: 'Half-Collar Shirt',
    slug: 'half-collar-shirt-terracotta',
    description: 'The signature Tomis half-collar shirt in Terracotta. Bold earth energy.',
    shortDescription: 'Signature half-collar. Terracotta.',
    longDescription: 'Terracotta is the colour of Lagos sunsets. Our Terracotta half-collar brings that warm, bold energy to the signature silhouette.',
    category: 'Half-Collar Shirts',
    collection: 'Signature',
    material: '100% Premium Cotton',
    fabricWeight: '140 GSM',
    countryOfManufacture: 'Lagos, Nigeria',
    sizes: [
      { label: 'S', value: 'S', inStock: true },
      { label: 'M', value: 'M', inStock: true },
      { label: 'L', value: 'L', inStock: true },
      { label: 'XL', value: 'XL', inStock: true },
      { label: 'XXL', value: 'XXL', inStock: true },
    ],
    fitDescription: 'Relaxed fit. True to size.',
    careInstructions: [
      'Machine wash cold with like colours',
      'Do not bleach',
      'Tumble dry low',
      'Iron on medium heat',
      'Do not dry clean',
    ],
    shippingInfo: 'Lagos delivery 1–2 working days. Nationwide 2–5 working days.',
    returnPolicy: 'Free returns within 14 days of delivery.',
    variants: [
      {
        id: 'var-tc-001',
        color: 'Terracotta',
        colorCode: '#C67B5C',
        colorSlug: 'terracotta',
        sku: 'TOM-HC-TC-001',
        price: 35000,
        inStock: true,
        stockLevel: 22,
        images: [
          { id: 'img-tc-1', src: '/images/products/brown-front.jpg', alt: 'Tomis Half-Collar Shirt Terracotta Cream Front', type: 'product' },
          { id: 'img-tc-2', src: '/images/lifestyle/tan-waterfront.jpg', alt: 'Model wearing Tomis Half-Collar Shirt Terracotta Cream', type: 'model' },
        ],
      },
    ],
    relatedProductIds: ['tomis-half-collar-brown', 'tomis-half-collar-sand'],
    completeTheLookIds: ['tomis-half-collar-stone'],
    tags: ['half-collar', 'terracotta', 'cream', 'bold', 'sunset'],
    seoTitle: 'Tomis Half-Collar Shirt — Terracotta | ₦35,000',
    seoDescription: 'The signature Tomis half-collar shirt in Terracotta. Bold earth energy.',
    seoKeywords: ['tomis', 'half-collar', 'shirt', 'terracotta', 'cream'],
  },
  {
    id: 'tomis-half-collar-lavender',
    name: 'Half-Collar Shirt',
    slug: 'half-collar-shirt-lavender',
    description: 'The signature Tomis half-collar shirt in Lavender. Quiet luxury.',
    shortDescription: 'Signature half-collar. Lavender.',
    longDescription: 'Lavender speaks quietly but says everything. Our Lavender half-collar is the quiet luxury piece — understated elegance for the modern gentleman.',
    category: 'Half-Collar Shirts',
    collection: 'Signature',
    material: '100% Premium Cotton',
    fabricWeight: '140 GSM',
    countryOfManufacture: 'Lagos, Nigeria',
    sizes: [
      { label: 'S', value: 'S', inStock: true },
      { label: 'M', value: 'M', inStock: true },
      { label: 'L', value: 'L', inStock: true },
      { label: 'XL', value: 'XL', inStock: true },
      { label: 'XXL', value: 'XXL', inStock: true },
    ],
    fitDescription: 'Relaxed fit. True to size.',
    careInstructions: [
      'Machine wash cold with like colours',
      'Do not bleach',
      'Tumble dry low',
      'Iron on medium heat',
      'Do not dry clean',
    ],
    shippingInfo: 'Lagos delivery 1–2 working days. Nationwide 2–5 working days.',
    returnPolicy: 'Free returns within 14 days of delivery.',
    variants: [
      {
        id: 'var-lw-001',
        color: 'Lavender',
        colorCode: '#B8A9C9',
        colorSlug: 'lavender',
        sku: 'TOM-HC-LW-001',
        price: 35000,
        inStock: true,
        stockLevel: 26,
        images: [
          { id: 'img-lw-1', src: '/images/products/lavender-front.jpg', alt: 'Tomis Half-Collar Shirt Lavender Front', type: 'product' },
          { id: 'img-lw-2', src: '/images/lifestyle/lavender-product.jpg', alt: 'Model wearing Tomis Half-Collar Shirt Lavender with product details', type: 'model' },
        ],
      },
    ],
    relatedProductIds: ['tomis-half-collar-pink', 'tomis-half-collar-black'],
    completeTheLookIds: ['tomis-half-collar-stone'],
    tags: ['half-collar', 'lavender', 'white', 'quiet-luxury', 'elegant'],
    seoTitle: 'Tomis Half-Collar Shirt — Lavender | ₦35,000',
    seoDescription: 'The signature Tomis half-collar shirt in Lavender. Quiet luxury.',
    seoKeywords: ['tomis', 'half-collar', 'shirt', 'lavender', 'white'],
  },
  {
    id: 'tomis-half-collar-sage',
    name: 'Half-Collar Shirt',
    slug: 'half-collar-shirt-sage',
    description: 'The signature Tomis half-collar shirt in Sage. Calm confidence.',
    shortDescription: 'Signature half-collar. Sage.',
    longDescription: 'Sage green is the colour of composure. Our Sage half-collar brings a calm, collected energy to the signature silhouette.',
    category: 'Half-Collar Shirts',
    collection: 'Signature',
    material: '100% Premium Cotton',
    fabricWeight: '140 GSM',
    countryOfManufacture: 'Lagos, Nigeria',
    sizes: [
      { label: 'S', value: 'S', inStock: true },
      { label: 'M', value: 'M', inStock: true },
      { label: 'L', value: 'L', inStock: true },
      { label: 'XL', value: 'XL', inStock: true },
      { label: 'XXL', value: 'XXL', inStock: true },
    ],
    fitDescription: 'Relaxed fit. True to size.',
    careInstructions: [
      'Machine wash cold with like colours',
      'Do not bleach',
      'Tumble dry low',
      'Iron on medium heat',
      'Do not dry clean',
    ],
    shippingInfo: 'Lagos delivery 1–2 working days. Nationwide 2–5 working days.',
    returnPolicy: 'Free returns within 14 days of delivery.',
    variants: [
      {
        id: 'var-sc-001',
        color: 'Sage',
        colorCode: '#9CAF88',
        colorSlug: 'sage',
        sku: 'TOM-HC-SC-001',
        price: 35000,
        inStock: true,
        stockLevel: 20,
        images: [
          { id: 'img-sc-1', src: '/images/products/olive-front.jpg', alt: 'Tomis Half-Collar Shirt Sage Cream Front', type: 'product' },
          { id: 'img-sc-2', src: '/images/lifestyle/olive-interior.jpg', alt: 'Model wearing Tomis Half-Collar Shirt Sage Cream', type: 'model' },
        ],
      },
    ],
    relatedProductIds: ['tomis-half-collar-olive', 'tomis-half-collar-stone-white'],
    completeTheLookIds: ['tomis-half-collar-stone'],
    tags: ['half-collar', 'sage', 'cream', 'calm', 'natural'],
    seoTitle: 'Tomis Half-Collar Shirt — Sage | ₦35,000',
    seoDescription: 'The signature Tomis half-collar shirt in Sage. Calm confidence.',
    seoKeywords: ['tomis', 'half-collar', 'shirt', 'sage', 'cream'],
  },
  {
    id: 'tomis-half-collar-stone',
    name: 'Half-Collar Shirt',
    slug: 'half-collar-shirt-stone',
    description: 'The signature Tomis half-collar shirt in Stone. Timeless neutrality.',
    shortDescription: 'Signature half-collar. Stone.',
    longDescription: 'Stone is the ultimate neutral. Our Stone half-collar goes with everything and elevates anything. The wardrobe essential.',
    category: 'Half-Collar Shirts',
    collection: 'Signature',
    material: '100% Premium Cotton',
    fabricWeight: '140 GSM',
    countryOfManufacture: 'Lagos, Nigeria',
    sizes: [
      { label: 'S', value: 'S', inStock: true },
      { label: 'M', value: 'M', inStock: true },
      { label: 'L', value: 'L', inStock: true },
      { label: 'XL', value: 'XL', inStock: true },
      { label: 'XXL', value: 'XXL', inStock: true },
    ],
    fitDescription: 'Relaxed fit. True to size.',
    careInstructions: [
      'Machine wash cold with like colours',
      'Do not bleach',
      'Tumble dry low',
      'Iron on medium heat',
      'Do not dry clean',
    ],
    shippingInfo: 'Lagos delivery 1–2 working days. Nationwide 2–5 working days.',
    returnPolicy: 'Free returns within 14 days of delivery.',
    variants: [
      {
        id: 'var-stc-001',
        color: 'Stone',
        colorCode: '#C4B8A8',
        colorSlug: 'stone',
        sku: 'TOM-HC-STC-001',
        price: 35000,
        inStock: true,
        stockLevel: 32,
        images: [
          { id: 'img-stc-1', src: '/images/products/lavender-front.jpg', alt: 'Tomis Half-Collar Shirt Stone Cream Front', type: 'product' },
          { id: 'img-stc-2', src: '/images/lifestyle/lavender-product.jpg', alt: 'Model wearing Tomis Half-Collar Shirt Stone Cream', type: 'model' },
        ],
      },
    ],
    relatedProductIds: ['tomis-half-collar-brown', 'tomis-half-collar-sage'],
    completeTheLookIds: ['tomis-half-collar-navy'],
    tags: ['half-collar', 'stone', 'cream', 'timeless', 'essential'],
    seoTitle: 'Tomis Half-Collar Shirt — Stone | ₦35,000',
    seoDescription: 'The signature Tomis half-collar shirt in Stone. Timeless neutrality.',
    seoKeywords: ['tomis', 'half-collar', 'shirt', 'stone', 'cream'],
  },
  {
    id: 'tomis-half-collar-cream',
    name: 'Half-Collar Shirt',
    slug: 'half-collar-shirt-cream',
    description: 'The signature Tomis half-collar shirt in Cream. A fresh take on the Tomis signature.',
    shortDescription: 'Signature half-collar. Cream.',
    longDescription: 'A fresh take on the Tomis signature. Clean, versatile, and effortlessly styled. Crafted from premium cotton with a modern relaxed fit.',
    category: 'Half-Collar Shirts',
    collection: 'Signature',
    material: '100% Premium Cotton',
    fabricWeight: '140 GSM',
    countryOfManufacture: 'Lagos, Nigeria',
    sizes: [
      { label: 'S', value: 'S', inStock: true },
      { label: 'M', value: 'M', inStock: true },
      { label: 'L', value: 'L', inStock: true },
      { label: 'XL', value: 'XL', inStock: true },
      { label: 'XXL', value: 'XXL', inStock: true },
    ],
    fitDescription: 'Relaxed fit. True to size.',
    careInstructions: [
      'Machine wash cold with like colours',
      'Do not bleach',
      'Tumble dry low',
      'Iron on medium heat',
      'Do not dry clean',
    ],
    shippingInfo: 'Lagos delivery 1–2 working days. Nationwide 2–5 working days.',
    returnPolicy: 'Free returns within 14 days of delivery.',
    variants: [
      {
        id: 'var-cn-001',
        color: 'Cream',
        colorCode: '#F5F0E8',
        colorSlug: 'cream',
        sku: 'TOM-HC-CN-001',
        price: 35000,
        inStock: true,
        stockLevel: 18,
        images: [
          { id: 'img-cn-1', src: '/images/products/blue-stripe-front.jpg', alt: 'Tomis Half-Collar Shirt Cream Navy Front', type: 'product' },
          { id: 'img-cn-2', src: '/images/lifestyle/white-architecture.jpg', alt: 'Model wearing Tomis Half-Collar Shirt Cream Navy', type: 'model' },
        ],
      },
    ],
    relatedProductIds: ['tomis-half-collar-navy', 'tomis-half-collar-stone'],
    completeTheLookIds: ['tomis-half-collar-brown'],
    tags: ['half-collar', 'cream', 'navy', 'inverted', 'classic'],
    seoTitle: 'Tomis Half-Collar Shirt — Cream Navy | ₦35,000',
    seoDescription: 'The signature Tomis half-collar shirt in Cream Navy. Inverted classic.',
    seoKeywords: ['tomis', 'half-collar', 'shirt', 'cream', 'navy'],
  },
  {
    id: 'tomis-half-collar-sand',
    name: 'Half-Collar Shirt',
    slug: 'half-collar-shirt-sand',
    description: 'The signature Tomis half-collar shirt in Sand. Coastal ease.',
    shortDescription: 'Signature half-collar. Sand.',
    longDescription: 'Sand is the colour of weekend mornings. Our Sand half-collar brings that relaxed coastal energy to the Tomis silhouette.',
    category: 'Half-Collar Shirts',
    collection: 'Signature',
    material: '100% Premium Cotton',
    fabricWeight: '140 GSM',
    countryOfManufacture: 'Lagos, Nigeria',
    sizes: [
      { label: 'S', value: 'S', inStock: true },
      { label: 'M', value: 'M', inStock: true },
      { label: 'L', value: 'L', inStock: true },
      { label: 'XL', value: 'XL', inStock: true },
      { label: 'XXL', value: 'XXL', inStock: true },
    ],
    fitDescription: 'Relaxed fit. True to size.',
    careInstructions: [
      'Machine wash cold with like colours',
      'Do not bleach',
      'Tumble dry low',
      'Iron on medium heat',
      'Do not dry clean',
    ],
    shippingInfo: 'Lagos delivery 1–2 working days. Nationwide 2–5 working days.',
    returnPolicy: 'Free returns within 14 days of delivery.',
    variants: [
      {
        id: 'var-sw-001',
        color: 'Sand',
        colorCode: '#D8C7AF',
        colorSlug: 'sand',
        sku: 'TOM-HC-SW-001',
        price: 35000,
        inStock: true,
        stockLevel: 25,
        images: [
          { id: 'img-sw-1', src: '/images/products/pink-front.jpg', alt: 'Tomis Half-Collar Shirt Sand White Front', type: 'product' },
          { id: 'img-sw-2', src: '/images/lifestyle/pink-interior.jpg', alt: 'Model wearing Tomis Half-Collar Shirt Sand White', type: 'model' },
        ],
      },
    ],
    relatedProductIds: ['tomis-half-collar-stone', 'tomis-half-collar-terracotta'],
    completeTheLookIds: ['tomis-half-collar-navy'],
    tags: ['half-collar', 'sand', 'white', 'coastal', 'relaxed'],
    seoTitle: 'Tomis Half-Collar Shirt — Sand | ₦35,000',
    seoDescription: 'The signature Tomis half-collar shirt in Sand. Coastal ease.',
    seoKeywords: ['tomis', 'half-collar', 'shirt', 'sand', 'white'],
  },
  {
    id: 'tomis-half-collar-burgundy',
    name: 'Half-Collar Shirt',
    slug: 'half-collar-shirt-burgundy',
    description: 'The signature Tomis half-collar shirt in Burgundy. Evening elegance.',
    shortDescription: 'Signature half-collar. Burgundy.',
    longDescription: 'Burgundy is the colour of Lagos evenings. Our Burgundy half-collar brings depth, richness and sophistication to the signature silhouette.',
    category: 'Half-Collar Shirts',
    collection: 'Signature',
    material: '100% Premium Cotton',
    fabricWeight: '140 GSM',
    countryOfManufacture: 'Lagos, Nigeria',
    sizes: [
      { label: 'S', value: 'S', inStock: true },
      { label: 'M', value: 'M', inStock: true },
      { label: 'L', value: 'L', inStock: true },
      { label: 'XL', value: 'XL', inStock: true },
      { label: 'XXL', value: 'XXL', inStock: true },
    ],
    fitDescription: 'Relaxed fit. True to size.',
    careInstructions: [
      'Machine wash cold with like colours',
      'Do not bleach',
      'Tumble dry low',
      'Iron on medium heat',
      'Do not dry clean',
    ],
    shippingInfo: 'Lagos delivery 1–2 working days. Nationwide 2–5 working days.',
    returnPolicy: 'Free returns within 14 days of delivery.',
    variants: [
      {
        id: 'var-burg-001',
        color: 'Burgundy',
        colorCode: '#642C35',
        colorSlug: 'burgundy',
        sku: 'TOM-HC-BURG-001',
        price: 35000,
        inStock: true,
        stockLevel: 19,
        images: [
          { id: 'img-burg-1', src: '/images/products/black-front.jpg', alt: 'Tomis Half-Collar Shirt Burgundy Cream Front', type: 'product' },
          { id: 'img-burg-2', src: '/images/lifestyle/black-office.jpg', alt: 'Model wearing Tomis Half-Collar Shirt Burgundy Cream', type: 'model' },
        ],
      },
    ],
    relatedProductIds: ['tomis-half-collar-black', 'tomis-half-collar-brown'],
    completeTheLookIds: ['tomis-half-collar-stone'],
    tags: ['half-collar', 'burgundy', 'cream', 'evening', 'elegant'],
    seoTitle: 'Tomis Half-Collar Shirt — Burgundy | ₦35,000',
    seoDescription: 'The signature Tomis half-collar shirt in Burgundy. Evening elegance.',
    seoKeywords: ['tomis', 'half-collar', 'shirt', 'burgundy', 'cream'],
  },
  {
    id: 'tomis-half-collar-sky',
    name: 'Half-Collar Shirt',
    slug: 'half-collar-shirt-sky',
    description: 'The signature Tomis half-collar shirt in Sky Blue. Fresh perspective.',
    shortDescription: 'Signature half-collar. Sky Blue.',
    longDescription: 'Sky blue is the colour of possibilities. Our Sky Blue half-collar brings freshness and optimism to the Tomis signature.',
    category: 'Half-Collar Shirts',
    collection: 'Signature',
    material: '100% Premium Cotton',
    fabricWeight: '140 GSM',
    countryOfManufacture: 'Lagos, Nigeria',
    sizes: [
      { label: 'S', value: 'S', inStock: true },
      { label: 'M', value: 'M', inStock: true },
      { label: 'L', value: 'L', inStock: true },
      { label: 'XL', value: 'XL', inStock: true },
      { label: 'XXL', value: 'XXL', inStock: true },
    ],
    fitDescription: 'Relaxed fit. True to size.',
    careInstructions: [
      'Machine wash cold with like colours',
      'Do not bleach',
      'Tumble dry low',
      'Iron on medium heat',
      'Do not dry clean',
    ],
    shippingInfo: 'Lagos delivery 1–2 working days. Nationwide 2–5 working days.',
    returnPolicy: 'Free returns within 14 days of delivery.',
    variants: [
      {
        id: 'var-sky-001',
        color: 'Sky Blue',
        colorCode: '#87CEEB',
        colorSlug: 'sky',
        sku: 'TOM-HC-SKY-001',
        price: 35000,
        inStock: true,
        stockLevel: 27,
        images: [
          { id: 'img-sky-1', src: '/images/products/blue-stripe-front.jpg', alt: 'Tomis Half-Collar Shirt Sky Blue White Front', type: 'product' },
          { id: 'img-sky-2', src: '/images/lifestyle/white-executive.jpg', alt: 'Model wearing Tomis Half-Collar Shirt Sky Blue White', type: 'model' },
        ],
      },
    ],
    relatedProductIds: ['tomis-half-collar-navy', 'tomis-half-collar-cream'],
    completeTheLookIds: ['tomis-half-collar-stone'],
    tags: ['half-collar', 'sky', 'white', 'fresh', 'optimistic'],
    seoTitle: 'Tomis Half-Collar Shirt — Sky Blue | ₦35,000',
    seoDescription: 'The signature Tomis half-collar shirt in Sky Blue. Fresh perspective.',
    seoKeywords: ['tomis', 'half-collar', 'shirt', 'sky-blue', 'white'],
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find(p => p.slug === slug);
}

export function getProductById(id: string): Product | undefined {
  return products.find(p => p.id === id);
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter(p => p.category === category);
}

export function getProductsByCollection(collection: string): Product[] {
  return products.filter(p => p.collection === collection);
}

export function getRelatedProducts(productId: string): Product[] {
  const product = getProductById(productId);
  if (!product) return [];
  return product.relatedProductIds.map(id => getProductById(id)).filter(Boolean) as Product[];
}

export function formatPrice(price: number): string {
  return `₦${price.toLocaleString('en-NG')}`;
}

export function getUniqueColors(): Array<{ name: string; code: string; slug: string }> {
  const colorMap = new Map<string, { name: string; code: string; slug: string }>();
  products.forEach(p => {
    p.variants.forEach(v => {
      if (!colorMap.has(v.colorSlug)) {
        colorMap.set(v.colorSlug, { name: v.color, code: v.colorCode, slug: v.colorSlug });
      }
    });
  });
  return Array.from(colorMap.values());
}
