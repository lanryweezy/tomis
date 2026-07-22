# TOMIS — The Half-Collar Shirt

A modern Nigerian smart-casual fashion brand built with Next.js, Astryx Design System, and TypeScript.

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Tech Stack

- **Framework:** Next.js 16
- **Language:** TypeScript
- **Styling:** Tailwind CSS + Astryx Design System
- **Animations:** Framer Motion
- **Database:** PostgreSQL + Drizzle ORM
- **Deployment:** Vercel

## Project Structure

```
tomis/
├── apps/
│   └── storefront/          # Next.js storefront
│       └── src/
│           ├── app/          # Pages and API routes
│           ├── components/   # UI components
│           ├── data/         # Product data
│           └── lib/          # Utilities
├── packages/
│   ├── ui/                   # Shared UI components
│   ├── design-system/        # Design tokens
│   ├── commerce/             # Commerce logic
│   ├── database/             # Database schema
│   └── shared/               # Shared utilities
└── .github/
    └── workflows/            # CI/CD
```

## API Endpoints

- `GET /api/products` - List products with filtering
- `GET /api/products/[id]` - Get product details
- `GET/POST/PUT/DELETE /api/cart` - Cart management
- `GET/POST /api/orders` - Order management
- `GET/POST /api/payments` - Payment processing
- `GET/POST /api/inventory` - Inventory tracking
- `GET/POST/DELETE /api/wishlist` - Wishlist
- `GET/POST /api/coupons` - Coupon validation
- `GET/POST/DELETE /api/newsletter` - Newsletter subscription
- `GET/POST /api/shipments` - Shipping tracking

## Environment Variables

Copy `.env.example` to `.env.local` and fill in your values.

## Design System

Built with Astryx Design System. Run `npx astryx component --list` to see all available components.

## License

Proprietary. All rights reserved.
