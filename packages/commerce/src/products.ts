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
    id: 'tomis-half-collar-black-white',
    name: 'Half-Collar Shirt',
    slug: 'half-collar-shirt-black-white',
    description: 'The signature Tomis half-collar shirt in Black / White. Designed for everyday confidence.',
    shortDescription: 'Signature half-collar. Black / White.',
    longDescription: 'The shirt that started it all. Our signature half-collar design divides two worlds — bold black meets crisp white in a silhouette that moves effortlessly between work, leisure and everything in between. Crafted from premium cotton with a modern relaxed fit.',
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
        color: 'Black / White',
        colorCode: '#101114',
        colorSlug: 'black-white',
        sku: 'TOM-HC-BW-001',
        price: 35000,
        inStock: true,
        stockLevel: 48,
        images: [
          { id: 'img-bw-1', src: '/images/products/black-white-front.jpg', alt: 'Tomis Half-Collar Shirt Black White Front', type: 'product' },
          { id: 'img-bw-2', src: '/images/products/black-white-model.jpg', alt: 'Model wearing Tomis Half-Collar Shirt Black White', type: 'model' },
          { id: 'img-bw-3', src: '/images/products/black-white-detail.jpg', alt: 'Tomis Half-Collar Shirt collar detail', type: 'detail' },
          { id: 'img-bw-4', src: '/images/products/black-white-lifestyle.jpg', alt: 'Tomis Half-Collar Shirt lifestyle', type: 'lifestyle' },
        ],
      },
    ],
    relatedProductIds: ['tomis-half-collar-navy-white', 'tomis-half-collar-olive-khaki'],
    completeTheLookIds: ['tomis-half-collar-brown-cream'],
    tags: ['half-collar', 'black', 'white', 'signature', 'best-seller'],
    seoTitle: 'Tomis Half-Collar Shirt — Black / White | ₦35,000',
    seoDescription: 'The signature Tomis half-collar shirt in Black / White. Premium cotton. Designed for everyday confidence. Shop now.',
    seoKeywords: ['tomis', 'half-collar', 'shirt', 'black', 'white', 'nigerian fashion'],
  },
  {
    id: 'tomis-half-collar-navy-white',
    name: 'Half-Collar Shirt',
    slug: 'half-collar-shirt-navy-white',
    description: 'The signature Tomis half-collar shirt in Navy / White. Classic meets contemporary.',
    shortDescription: 'Signature half-collar. Navy / White.',
    longDescription: 'Our Navy / White half-collar is the Tomis classic. Deep navy meets clean white in a combination that works from the boardroom to brunch. Premium cotton construction with our signature collar design.',
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
        color: 'Navy / White',
        colorCode: '#0B1F5E',
        colorSlug: 'navy-white',
        sku: 'TOM-HC-NW-001',
        price: 35000,
        inStock: true,
        stockLevel: 36,
        images: [
          { id: 'img-nw-1', src: '/images/products/navy-white-front.jpg', alt: 'Tomis Half-Collar Shirt Navy White Front', type: 'product' },
          { id: 'img-nw-2', src: '/images/products/navy-white-model.jpg', alt: 'Model wearing Tomis Half-Collar Shirt Navy White', type: 'model' },
          { id: 'img-nw-3', src: '/images/products/navy-white-detail.jpg', alt: 'Tomis Half-Collar Shirt Navy collar detail', type: 'detail' },
        ],
      },
    ],
    relatedProductIds: ['tomis-half-collar-black-white', 'tomis-half-collar-olive-khaki'],
    completeTheLookIds: ['tomis-half-collar-stone-cream'],
    tags: ['half-collar', 'navy', 'white', 'signature', 'classic'],
    seoTitle: 'Tomis Half-Collar Shirt — Navy / White | ₦35,000',
    seoDescription: 'The signature Tomis half-collar shirt in Navy / White. Classic meets contemporary. Shop now.',
    seoKeywords: ['tomis', 'half-collar', 'shirt', 'navy', 'white'],
  },
  {
    id: 'tomis-half-collar-olive-khaki',
    name: 'Half-Collar Shirt',
    slug: 'half-collar-shirt-olive-khaki',
    description: 'The signature Tomis half-collar shirt in Olive / Khaki. Natural tones, confident style.',
    shortDescription: 'Signature half-collar. Olive / Khaki.',
    longDescription: 'Earthy and refined. Our Olive / Khaki half-collar brings natural warmth to the signature silhouette. Perfect for weekend outings and casual office days.',
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
        color: 'Olive / Khaki',
        colorCode: '#7A8065',
        colorSlug: 'olive-khaki',
        sku: 'TOM-HC-OK-001',
        price: 35000,
        inStock: true,
        stockLevel: 24,
        images: [
          { id: 'img-ok-1', src: '/images/products/olive-khaki-front.jpg', alt: 'Tomis Half-Collar Shirt Olive Khaki Front', type: 'product' },
          { id: 'img-ok-2', src: '/images/products/olive-khaki-model.jpg', alt: 'Model wearing Tomis Half-Collar Shirt Olive Khaki', type: 'model' },
        ],
      },
    ],
    relatedProductIds: ['tomis-half-collar-sage-cream', 'tomis-half-collar-stone-white'],
    completeTheLookIds: ['tomis-half-collar-stone-cream'],
    tags: ['half-collar', 'olive', 'khaki', 'natural', 'earth-tones'],
    seoTitle: 'Tomis Half-Collar Shirt — Olive / Khaki | ₦35,000',
    seoDescription: 'The signature Tomis half-collar shirt in Olive / Khaki. Natural tones, confident style.',
    seoKeywords: ['tomis', 'half-collar', 'shirt', 'olive', 'khaki'],
  },
  {
    id: 'tomis-half-collar-pink-white',
    name: 'Half-Collar Shirt',
    slug: 'half-collar-shirt-pink-white',
    description: 'The signature Tomis half-collar shirt in Dusty Pink / White. The unexpected choice.',
    shortDescription: 'Signature half-collar. Dusty Pink / White.',
    longDescription: 'Bold without shouting. Our Dusty Pink / White half-collar is for the man who knows that softness is strength. A statement piece that pairs with everything.',
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
        color: 'Dusty Pink / White',
        colorCode: '#D4A5A5',
        colorSlug: 'pink-white',
        sku: 'TOM-HC-PW-001',
        price: 35000,
        inStock: true,
        stockLevel: 30,
        images: [
          { id: 'img-pw-1', src: '/images/products/pink-white-front.jpg', alt: 'Tomis Half-Collar Shirt Pink White Front', type: 'product' },
          { id: 'img-pw-2', src: '/images/products/pink-white-model.jpg', alt: 'Model wearing Tomis Half-Collar Shirt Pink White', type: 'model' },
        ],
      },
    ],
    relatedProductIds: ['tomis-half-collar-lavender-white', 'tomis-half-collar-black-white'],
    completeTheLookIds: ['tomis-half-collar-stone-cream'],
    tags: ['half-collar', 'pink', 'white', 'unexpected', 'bold'],
    seoTitle: 'Tomis Half-Collar Shirt — Dusty Pink / White | ₦35,000',
    seoDescription: 'The signature Tomis half-collar shirt in Dusty Pink / White. The unexpected choice.',
    seoKeywords: ['tomis', 'half-collar', 'shirt', 'pink', 'white'],
  },
  {
    id: 'tomis-half-collar-brown-cream',
    name: 'Half-Collar Shirt',
    slug: 'half-collar-shirt-brown-cream',
    description: 'The signature Tomis half-collar shirt in Brown / Cream. Warmth meets sophistication.',
    shortDescription: 'Signature half-collar. Brown / Cream.',
    longDescription: 'Rich brown meets warm cream in a combination that feels like golden hour. Our Brown / Cream half-collar brings depth and warmth to any wardrobe.',
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
        color: 'Brown / Cream',
        colorCode: '#8B6F47',
        colorSlug: 'brown-cream',
        sku: 'TOM-HC-BC-001',
        price: 35000,
        inStock: true,
        stockLevel: 28,
        images: [
          { id: 'img-bc-1', src: '/images/products/brown-cream-front.jpg', alt: 'Tomis Half-Collar Shirt Brown Cream Front', type: 'product' },
          { id: 'img-bc-2', src: '/images/products/brown-cream-model.jpg', alt: 'Model wearing Tomis Half-Collar Shirt Brown Cream', type: 'model' },
        ],
      },
    ],
    relatedProductIds: ['tomis-half-collar-terracotta-cream', 'tomis-half-collar-stone-white'],
    completeTheLookIds: ['tomis-half-collar-navy-white'],
    tags: ['half-collar', 'brown', 'cream', 'warmth', 'earth-tones'],
    seoTitle: 'Tomis Half-Collar Shirt — Brown / Cream | ₦35,000',
    seoDescription: 'The signature Tomis half-collar shirt in Brown / Cream. Warmth meets sophistication.',
    seoKeywords: ['tomis', 'half-collar', 'shirt', 'brown', 'cream'],
  },
  {
    id: 'tomis-half-collar-terracotta-cream',
    name: 'Half-Collar Shirt',
    slug: 'half-collar-shirt-terracotta-cream',
    description: 'The signature Tomis half-collar shirt in Terracotta / Cream. Bold earth energy.',
    shortDescription: 'Signature half-collar. Terracotta / Cream.',
    longDescription: 'Terracotta is the colour of Lagos sunsets. Our Terracotta / Cream half-collar brings that warm, bold energy to the signature silhouette.',
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
        color: 'Terracotta / Cream',
        colorCode: '#C67B5C',
        colorSlug: 'terracotta-cream',
        sku: 'TOM-HC-TC-001',
        price: 35000,
        inStock: true,
        stockLevel: 22,
        images: [
          { id: 'img-tc-1', src: '/images/products/terracotta-cream-front.jpg', alt: 'Tomis Half-Collar Shirt Terracotta Cream Front', type: 'product' },
          { id: 'img-tc-2', src: '/images/products/terracotta-cream-model.jpg', alt: 'Model wearing Tomis Half-Collar Shirt Terracotta Cream', type: 'model' },
        ],
      },
    ],
    relatedProductIds: ['tomis-half-collar-brown-cream', 'tomis-half-collar-sand-cream'],
    completeTheLookIds: ['tomis-half-collar-stone-cream'],
    tags: ['half-collar', 'terracotta', 'cream', 'bold', 'sunset'],
    seoTitle: 'Tomis Half-Collar Shirt — Terracotta / Cream | ₦35,000',
    seoDescription: 'The signature Tomis half-collar shirt in Terracotta / Cream. Bold earth energy.',
    seoKeywords: ['tomis', 'half-collar', 'shirt', 'terracotta', 'cream'],
  },
  {
    id: 'tomis-half-collar-lavender-white',
    name: 'Half-Collar Shirt',
    slug: 'half-collar-shirt-lavender-white',
    description: 'The signature Tomis half-collar shirt in Lavender / White. Quiet luxury.',
    shortDescription: 'Signature half-collar. Lavender / White.',
    longDescription: 'Lavender speaks quietly but says everything. Our Lavender / White half-collar is the quiet luxury piece — understated elegance for the modern gentleman.',
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
        color: 'Lavender / White',
        colorCode: '#B8A9C9',
        colorSlug: 'lavender-white',
        sku: 'TOM-HC-LW-001',
        price: 35000,
        inStock: true,
        stockLevel: 26,
        images: [
          { id: 'img-lw-1', src: '/images/products/lavender-white-front.jpg', alt: 'Tomis Half-Collar Shirt Lavender White Front', type: 'product' },
          { id: 'img-lw-2', src: '/images/products/lavender-white-model.jpg', alt: 'Model wearing Tomis Half-Collar Shirt Lavender White', type: 'model' },
        ],
      },
    ],
    relatedProductIds: ['tomis-half-collar-pink-white', 'tomis-half-collar-black-white'],
    completeTheLookIds: ['tomis-half-collar-stone-cream'],
    tags: ['half-collar', 'lavender', 'white', 'quiet-luxury', 'elegant'],
    seoTitle: 'Tomis Half-Collar Shirt — Lavender / White | ₦35,000',
    seoDescription: 'The signature Tomis half-collar shirt in Lavender / White. Quiet luxury.',
    seoKeywords: ['tomis', 'half-collar', 'shirt', 'lavender', 'white'],
  },
  {
    id: 'tomis-half-collar-sage-cream',
    name: 'Half-Collar Shirt',
    slug: 'half-collar-shirt-sage-cream',
    description: 'The signature Tomis half-collar shirt in Sage / Cream. Calm confidence.',
    shortDescription: 'Signature half-collar. Sage / Cream.',
    longDescription: 'Sage green is the colour of composure. Our Sage / Cream half-collar brings a calm, collected energy to the signature silhouette.',
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
        color: 'Sage / Cream',
        colorCode: '#9CAF88',
        colorSlug: 'sage-cream',
        sku: 'TOM-HC-SC-001',
        price: 35000,
        inStock: true,
        stockLevel: 20,
        images: [
          { id: 'img-sc-1', src: '/images/products/sage-cream-front.jpg', alt: 'Tomis Half-Collar Shirt Sage Cream Front', type: 'product' },
          { id: 'img-sc-2', src: '/images/products/sage-cream-model.jpg', alt: 'Model wearing Tomis Half-Collar Shirt Sage Cream', type: 'model' },
        ],
      },
    ],
    relatedProductIds: ['tomis-half-collar-olive-khaki', 'tomis-half-collar-stone-white'],
    completeTheLookIds: ['tomis-half-collar-stone-cream'],
    tags: ['half-collar', 'sage', 'cream', 'calm', 'natural'],
    seoTitle: 'Tomis Half-Collar Shirt — Sage / Cream | ₦35,000',
    seoDescription: 'The signature Tomis half-collar shirt in Sage / Cream. Calm confidence.',
    seoKeywords: ['tomis', 'half-collar', 'shirt', 'sage', 'cream'],
  },
  {
    id: 'tomis-half-collar-stone-cream',
    name: 'Half-Collar Shirt',
    slug: 'half-collar-shirt-stone-cream',
    description: 'The signature Tomis half-collar shirt in Stone / Cream. Timeless neutrality.',
    shortDescription: 'Signature half-collar. Stone / Cream.',
    longDescription: 'Stone is the ultimate neutral. Our Stone / Cream half-collar goes with everything and elevates anything. The wardrobe essential.',
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
        color: 'Stone / Cream',
        colorCode: '#C4B8A8',
        colorSlug: 'stone-cream',
        sku: 'TOM-HC-STC-001',
        price: 35000,
        inStock: true,
        stockLevel: 32,
        images: [
          { id: 'img-stc-1', src: '/images/products/stone-cream-front.jpg', alt: 'Tomis Half-Collar Shirt Stone Cream Front', type: 'product' },
          { id: 'img-stc-2', src: '/images/products/stone-cream-model.jpg', alt: 'Model wearing Tomis Half-Collar Shirt Stone Cream', type: 'model' },
        ],
      },
    ],
    relatedProductIds: ['tomis-half-collar-brown-cream', 'tomis-half-collar-sage-cream'],
    completeTheLookIds: ['tomis-half-collar-navy-white'],
    tags: ['half-collar', 'stone', 'cream', 'timeless', 'essential'],
    seoTitle: 'Tomis Half-Collar Shirt — Stone / Cream | ₦35,000',
    seoDescription: 'The signature Tomis half-collar shirt in Stone / Cream. Timeless neutrality.',
    seoKeywords: ['tomis', 'half-collar', 'shirt', 'stone', 'cream'],
  },
  {
    id: 'tomis-half-collar-cream-navy',
    name: 'Half-Collar Shirt',
    slug: 'half-collar-shirt-cream-navy',
    description: 'The signature Tomis half-collar shirt in Cream / Navy. Inverted classic.',
    shortDescription: 'Signature half-collar. Cream / Navy.',
    longDescription: 'The reverse of our classic. Cream leads, navy follows. A fresh take on the Tomis signature that feels both familiar and new.',
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
        color: 'Cream / Navy',
        colorCode: '#F5F0E8',
        colorSlug: 'cream-navy',
        sku: 'TOM-HC-CN-001',
        price: 35000,
        inStock: true,
        stockLevel: 18,
        images: [
          { id: 'img-cn-1', src: '/images/products/cream-navy-front.jpg', alt: 'Tomis Half-Collar Shirt Cream Navy Front', type: 'product' },
          { id: 'img-cn-2', src: '/images/products/cream-navy-model.jpg', alt: 'Model wearing Tomis Half-Collar Shirt Cream Navy', type: 'model' },
        ],
      },
    ],
    relatedProductIds: ['tomis-half-collar-navy-white', 'tomis-half-collar-stone-cream'],
    completeTheLookIds: ['tomis-half-collar-brown-cream'],
    tags: ['half-collar', 'cream', 'navy', 'inverted', 'classic'],
    seoTitle: 'Tomis Half-Collar Shirt — Cream / Navy | ₦35,000',
    seoDescription: 'The signature Tomis half-collar shirt in Cream / Navy. Inverted classic.',
    seoKeywords: ['tomis', 'half-collar', 'shirt', 'cream', 'navy'],
  },
  {
    id: 'tomis-half-collar-sand-white',
    name: 'Half-Collar Shirt',
    slug: 'half-collar-shirt-sand-white',
    description: 'The signature Tomis half-collar shirt in Sand / White. Coastal ease.',
    shortDescription: 'Signature half-collar. Sand / White.',
    longDescription: 'Sand is the colour of weekend mornings. Our Sand / White half-collar brings that relaxed coastal energy to the Tomis silhouette.',
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
        color: 'Sand / White',
        colorCode: '#D8C7AF',
        colorSlug: 'sand-white',
        sku: 'TOM-HC-SW-001',
        price: 35000,
        inStock: true,
        stockLevel: 25,
        images: [
          { id: 'img-sw-1', src: '/images/products/sand-white-front.jpg', alt: 'Tomis Half-Collar Shirt Sand White Front', type: 'product' },
          { id: 'img-sw-2', src: '/images/products/sand-white-model.jpg', alt: 'Model wearing Tomis Half-Collar Shirt Sand White', type: 'model' },
        ],
      },
    ],
    relatedProductIds: ['tomis-half-collar-stone-cream', 'tomis-half-collar-terracotta-cream'],
    completeTheLookIds: ['tomis-half-collar-navy-white'],
    tags: ['half-collar', 'sand', 'white', 'coastal', 'relaxed'],
    seoTitle: 'Tomis Half-Collar Shirt — Sand / White | ₦35,000',
    seoDescription: 'The signature Tomis half-collar shirt in Sand / White. Coastal ease.',
    seoKeywords: ['tomis', 'half-collar', 'shirt', 'sand', 'white'],
  },
  {
    id: 'tomis-half-collar-burgundy-cream',
    name: 'Half-Collar Shirt',
    slug: 'half-collar-shirt-burgundy-cream',
    description: 'The signature Tomis half-collar shirt in Burgundy / Cream. Evening elegance.',
    shortDescription: 'Signature half-collar. Burgundy / Cream.',
    longDescription: 'Burgundy is the colour of Lagos evenings. Our Burgundy / Cream half-collar brings depth, richness and sophistication to the signature silhouette.',
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
        color: 'Burgundy / Cream',
        colorCode: '#642C35',
        colorSlug: 'burgundy-cream',
        sku: 'TOM-HC-BURG-001',
        price: 35000,
        inStock: true,
        stockLevel: 19,
        images: [
          { id: 'img-burg-1', src: '/images/products/burgundy-cream-front.jpg', alt: 'Tomis Half-Collar Shirt Burgundy Cream Front', type: 'product' },
          { id: 'img-burg-2', src: '/images/products/burgundy-cream-model.jpg', alt: 'Model wearing Tomis Half-Collar Shirt Burgundy Cream', type: 'model' },
        ],
      },
    ],
    relatedProductIds: ['tomis-half-collar-black-white', 'tomis-half-collar-brown-cream'],
    completeTheLookIds: ['tomis-half-collar-stone-cream'],
    tags: ['half-collar', 'burgundy', 'cream', 'evening', 'elegant'],
    seoTitle: 'Tomis Half-Collar Shirt — Burgundy / Cream | ₦35,000',
    seoDescription: 'The signature Tomis half-collar shirt in Burgundy / Cream. Evening elegance.',
    seoKeywords: ['tomis', 'half-collar', 'shirt', 'burgundy', 'cream'],
  },
  {
    id: 'tomis-half-collar-sky-white',
    name: 'Half-Collar Shirt',
    slug: 'half-collar-shirt-sky-white',
    description: 'The signature Tomis half-collar shirt in Sky Blue / White. Fresh perspective.',
    shortDescription: 'Signature half-collar. Sky Blue / White.',
    longDescription: 'Sky blue is the colour of possibilities. Our Sky Blue / White half-collar brings freshness and optimism to the Tomis signature.',
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
        color: 'Sky Blue / White',
        colorCode: '#87CEEB',
        colorSlug: 'sky-white',
        sku: 'TOM-HC-SKY-001',
        price: 35000,
        inStock: true,
        stockLevel: 27,
        images: [
          { id: 'img-sky-1', src: '/images/products/sky-white-front.jpg', alt: 'Tomis Half-Collar Shirt Sky Blue White Front', type: 'product' },
          { id: 'img-sky-2', src: '/images/products/sky-white-model.jpg', alt: 'Model wearing Tomis Half-Collar Shirt Sky Blue White', type: 'model' },
        ],
      },
    ],
    relatedProductIds: ['tomis-half-collar-navy-white', 'tomis-half-collar-cream-navy'],
    completeTheLookIds: ['tomis-half-collar-stone-cream'],
    tags: ['half-collar', 'sky', 'white', 'fresh', 'optimistic'],
    seoTitle: 'Tomis Half-Collar Shirt — Sky Blue / White | ₦35,000',
    seoDescription: 'The signature Tomis half-collar shirt in Sky Blue / White. Fresh perspective.',
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
