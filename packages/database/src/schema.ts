import {
  pgTable,
  uuid,
  varchar,
  text,
  integer,
  decimal,
  boolean,
  timestamp,
  jsonb,
  pgEnum,
  index,
  uniqueIndex,
} from 'drizzle-orm/pg-core';

export const orderStatusEnum = pgEnum('order_status', [
  'pending',
  'paid',
  'processing',
  'packed',
  'shipped',
  'in_transit',
  'delivered',
  'cancelled',
  'returned',
  'refunded',
]);

export const paymentStatusEnum = pgEnum('payment_status', [
  'pending',
  'completed',
  'failed',
  'cancelled',
  'refunded',
]);

export const productStatusEnum = pgEnum('product_status', [
  'draft',
  'active',
  'archived',
]);

// Users & Auth
export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  passwordHash: varchar('password_hash', { length: 255 }),
  firstName: varchar('first_name', { length: 100 }),
  lastName: varchar('last_name', { length: 100 }),
  phone: varchar('phone', { length: 20 }),
  avatar: text('avatar'),
  emailVerified: boolean('email_verified').default(false),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => [
  uniqueIndex('users_email_idx').on(table.email),
]);

export const addresses = pgTable('addresses', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  label: varchar('label', { length: 50 }),
  firstName: varchar('first_name', { length: 100 }).notNull(),
  lastName: varchar('last_name', { length: 100 }).notNull(),
  phone: varchar('phone', { length: 20 }).notNull(),
  address1: varchar('address1', { length: 255 }).notNull(),
  address2: varchar('address2', { length: 255 }),
  city: varchar('city', { length: 100 }).notNull(),
  state: varchar('state', { length: 100 }).notNull(),
  country: varchar('country', { length: 100 }).notNull().default('Nigeria'),
  postalCode: varchar('postal_code', { length: 20 }),
  isDefault: boolean('is_default').default(false),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Products
export const products = pgTable('products', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  description: text('description'),
  shortDescription: text('short_description'),
  longDescription: text('long_description'),
  category: varchar('category', { length: 100 }),
  collection: varchar('collection', { length: 100 }),
  material: varchar('material', { length: 255 }),
  fabricWeight: varchar('fabric_weight', { length: 50 }),
  countryOfManufacture: varchar('country_of_manufacture', { length: 100 }),
  fitDescription: text('fit_description'),
  careInstructions: jsonb('care_instructions').$type<string[]>().default([]),
  shippingInfo: text('shipping_info'),
  returnPolicy: text('return_policy'),
  status: productStatusEnum('status').default('draft'),
  seoTitle: varchar('seo_title', { length: 255 }),
  seoDescription: text('seo_description'),
  seoKeywords: jsonb('seo_keywords').$type<string[]>().default([]),
  tags: jsonb('tags').$type<string[]>().default([]),
  relatedProductIds: jsonb('related_product_ids').$type<string[]>().default([]),
  completeTheLookIds: jsonb('complete_the_look_ids').$type<string[]>().default([]),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => [
  uniqueIndex('products_slug_idx').on(table.slug),
  index('products_category_idx').on(table.category),
  index('products_collection_idx').on(table.collection),
  index('products_status_idx').on(table.status),
]);

export const productVariants = pgTable('product_variants', {
  id: uuid('id').primaryKey().defaultRandom(),
  productId: uuid('product_id').references(() => products.id, { onDelete: 'cascade' }).notNull(),
  color: varchar('color', { length: 100 }).notNull(),
  colorCode: varchar('color_code', { length: 7 }),
  colorSlug: varchar('color_slug', { length: 100 }),
  sku: varchar('sku', { length: 50 }).notNull().unique(),
  price: integer('price').notNull(),
  salePrice: integer('sale_price'),
  inStock: boolean('in_stock').default(true),
  stockLevel: integer('stock_level').default(0),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => [
  uniqueIndex('variants_sku_idx').on(table.sku),
  index('variants_product_idx').on(table.productId),
]);

export const productImages = pgTable('product_images', {
  id: uuid('id').primaryKey().defaultRandom(),
  variantId: uuid('variant_id').references(() => productVariants.id, { onDelete: 'cascade' }).notNull(),
  src: text('src').notNull(),
  alt: varchar('alt', { length: 255 }),
  type: varchar('type', { length: 50 }),
  sortOrder: integer('sort_order').default(0),
});

export const productSizes = pgTable('product_sizes', {
  id: uuid('id').primaryKey().defaultRandom(),
  variantId: uuid('variant_id').references(() => productVariants.id, { onDelete: 'cascade' }).notNull(),
  label: varchar('label', { length: 10 }).notNull(),
  value: varchar('value', { length: 10 }).notNull(),
  inStock: boolean('in_stock').default(true),
});

// Inventory
export const inventory = pgTable('inventory', {
  id: uuid('id').primaryKey().defaultRandom(),
  variantId: uuid('variant_id').references(() => productVariants.id).notNull(),
  location: varchar('location', { length: 100 }).notNull(),
  quantity: integer('quantity').default(0),
  reserved: integer('reserved').default(0),
  lowStockThreshold: integer('low_stock_threshold').default(10),
});

export const inventoryMovements = pgTable('inventory_movements', {
  id: uuid('id').primaryKey().defaultRandom(),
  variantId: uuid('variant_id').references(() => productVariants.id).notNull(),
  quantity: integer('quantity').notNull(),
  type: varchar('type', { length: 50 }).notNull(),
  reference: varchar('reference', { length: 255 }),
  notes: text('notes'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Cart
export const carts = pgTable('carts', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }),
  sessionId: varchar('session_id', { length: 255 }),
  email: varchar('email', { length: 255 }),
  status: varchar('status', { length: 20 }).default('active'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const cartItems = pgTable('cart_items', {
  id: uuid('id').primaryKey().defaultRandom(),
  cartId: uuid('cart_id').references(() => carts.id, { onDelete: 'cascade' }).notNull(),
  variantId: uuid('variant_id').references(() => productVariants.id).notNull(),
  size: varchar('size', { length: 10 }).notNull(),
  quantity: integer('quantity').default(1),
  price: integer('price').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Orders
export const orders = pgTable('orders', {
  id: uuid('id').primaryKey().defaultRandom(),
  orderNumber: varchar('order_number', { length: 50 }).notNull().unique(),
  userId: uuid('user_id').references(() => users.id),
  email: varchar('email', { length: 255 }).notNull(),
  phone: varchar('phone', { length: 20 }),
  status: orderStatusEnum('status').default('pending'),
  subtotal: integer('subtotal').notNull(),
  shippingCost: integer('shipping_cost').default(0),
  discount: integer('discount').default(0),
  total: integer('total').notNull(),
  currency: varchar('currency', { length: 3 }).default('NGN'),
  shippingAddress: jsonb('shipping_address').$type<{
    firstName: string;
    lastName: string;
    phone: string;
    address1: string;
    address2?: string;
    city: string;
    state: string;
    country: string;
    postalCode?: string;
  }>(),
  billingAddress: jsonb('billing_address').$type<{
    firstName: string;
    lastName: string;
    address1: string;
    city: string;
    state: string;
    country: string;
  }>(),
  notes: text('notes'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => [
  uniqueIndex('orders_number_idx').on(table.orderNumber),
  index('orders_user_idx').on(table.userId),
  index('orders_status_idx').on(table.status),
]);

export const orderItems = pgTable('order_items', {
  id: uuid('id').primaryKey().defaultRandom(),
  orderId: uuid('order_id').references(() => orders.id, { onDelete: 'cascade' }).notNull(),
  variantId: uuid('variant_id').references(() => productVariants.id).notNull(),
  productName: varchar('product_name', { length: 255 }).notNull(),
  variantColor: varchar('variant_color', { length: 100 }),
  size: varchar('size', { length: 10 }),
  quantity: integer('quantity').notNull(),
  price: integer('price').notNull(),
  total: integer('total').notNull(),
});

// Payments
export const payments = pgTable('payments', {
  id: uuid('id').primaryKey().defaultRandom(),
  orderId: uuid('order_id').references(() => orders.id).notNull(),
  provider: varchar('provider', { length: 50 }).notNull(),
  providerReference: varchar('provider_reference', { length: 255 }),
  amount: integer('amount').notNull(),
  currency: varchar('currency', { length: 3 }).default('NGN'),
  status: paymentStatusEnum('status').default('pending'),
  metadata: jsonb('metadata'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => [
  index('payments_order_idx').on(table.orderId),
  index('payments_provider_ref_idx').on(table.providerReference),
]);

export const refunds = pgTable('refunds', {
  id: uuid('id').primaryKey().defaultRandom(),
  paymentId: uuid('payment_id').references(() => payments.id).notNull(),
  orderId: uuid('order_id').references(() => orders.id).notNull(),
  amount: integer('amount').notNull(),
  reason: text('reason'),
  status: varchar('status', { length: 20 }).default('pending'),
  providerReference: varchar('provider_reference', { length: 255 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Shipping
export const shipments = pgTable('shipments', {
  id: uuid('id').primaryKey().defaultRandom(),
  orderId: uuid('order_id').references(() => orders.id).notNull(),
  carrier: varchar('carrier', { length: 100 }),
  trackingNumber: varchar('tracking_number', { length: 255 }),
  trackingUrl: text('tracking_url'),
  status: varchar('status', { length: 50 }),
  estimatedDelivery: timestamp('estimated_delivery'),
  deliveredAt: timestamp('delivered_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Wishlist
export const wishlists = pgTable('wishlists', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  variantId: uuid('variant_id').references(() => productVariants.id).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (table) => [
  uniqueIndex('wishlist_user_variant_idx').on(table.userId, table.variantId),
]);

// Reviews
export const reviews = pgTable('reviews', {
  id: uuid('id').primaryKey().defaultRandom(),
  productId: uuid('product_id').references(() => products.id, { onDelete: 'cascade' }).notNull(),
  userId: uuid('user_id').references(() => users.id).notNull(),
  rating: integer('rating').notNull(),
  title: varchar('title', { length: 255 }),
  content: text('content'),
  isVerified: boolean('is_verified').default(false),
  isApproved: boolean('is_approved').default(false),
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (table) => [
  index('reviews_product_idx').on(table.productId),
]);

// Coupons
export const coupons = pgTable('coupons', {
  id: uuid('id').primaryKey().defaultRandom(),
  code: varchar('code', { length: 50 }).notNull().unique(),
  description: text('description'),
  discountType: varchar('discount_type', { length: 20 }).notNull(),
  discountValue: integer('discount_value').notNull(),
  minOrderAmount: integer('min_order_amount'),
  maxUses: integer('max_uses'),
  usedCount: integer('used_count').default(0),
  startsAt: timestamp('starts_at'),
  expiresAt: timestamp('expires_at'),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Newsletter
export const newsletterSubscribers = pgTable('newsletter_subscribers', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  firstName: varchar('first_name', { length: 100 }),
  status: varchar('status', { length: 20 }).default('active'),
  subscribedAt: timestamp('subscribed_at').defaultNow().notNull(),
  unsubscribedAt: timestamp('unsubscribed_at'),
});

// Admin
export const adminUsers = pgTable('admin_users', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id).notNull(),
  role: varchar('role', { length: 50 }).notNull().default('admin'),
  permissions: jsonb('permissions').$type<string[]>().default([]),
  lastLoginAt: timestamp('last_login_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Audit Log
export const auditLogs = pgTable('audit_logs', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id),
  action: varchar('action', { length: 100 }).notNull(),
  entity: varchar('entity', { length: 100 }).notNull(),
  entityId: varchar('entity_id', { length: 100 }),
  oldValues: jsonb('old_values'),
  newValues: jsonb('new_values'),
  ipAddress: varchar('ip_address', { length: 50 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Journal
export const journalArticles = pgTable('journal_articles', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: varchar('title', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  excerpt: text('excerpt'),
  content: text('content'),
  coverImage: text('cover_image'),
  category: varchar('category', { length: 100 }),
  authorId: uuid('author_id').references(() => users.id),
  isPublished: boolean('is_published').default(false),
  publishedAt: timestamp('published_at'),
  seoTitle: varchar('seo_title', { length: 255 }),
  seoDescription: text('seo_description'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => [
  uniqueIndex('journal_slug_idx').on(table.slug),
]);
