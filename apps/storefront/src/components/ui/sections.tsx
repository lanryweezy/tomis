'use client';

import { motion } from 'framer-motion';

interface HeroProps {
  eyebrow?: string;
  title: string;
  titleAccent?: string;
  description?: string;
  primaryAction?: { label: string; href: string };
  secondaryAction?: { label: string; href: string };
  variant?: 'dark' | 'light' | 'split' | 'image';
  backgroundImage?: string;
}

export function Hero({
  eyebrow,
  title,
  titleAccent,
  description,
  primaryAction,
  secondaryAction,
  variant = 'dark',
  backgroundImage,
}: HeroProps) {
  const bgStyles = {
    dark: 'bg-[var(--color-neutral-ink)] text-white',
    light: 'bg-[var(--color-neutral-paper)] text-[var(--color-neutral-ink)]',
    split: 'bg-[var(--color-neutral-ink)]',
    image: 'bg-[var(--color-neutral-ink)] text-white',
  };

  return (
    <section className={`relative py-20 md:py-28 ${bgStyles[variant]}`}>
      {variant === 'split' && (
        <div className="absolute inset-0 flex">
          <div className="w-1/2 bg-[var(--color-brand-navy)]" />
          <div className="w-1/2 bg-white" />
        </div>
      )}
      {variant === 'image' && backgroundImage && (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
      )}
      <div className="relative z-10 max-w-[var(--max-wide-width)] mx-auto px-4 md:px-8 text-center">
        {eyebrow && (
          <motion.p
            className="text-[10px] md:text-xs font-medium tracking-[0.3em] uppercase text-current/40 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {eyebrow}
          </motion.p>
        )}
        <motion.h1
          className="font-display text-5xl md:text-6xl lg:text-7xl tracking-tight mb-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {title}
          {titleAccent && (
            <>
              <br />
              <span className="text-[var(--color-brand-blue)]">{titleAccent}</span>
            </>
          )}
        </motion.h1>
        {description && (
          <motion.p
            className="text-sm md:text-base text-current/60 max-w-md mx-auto mb-8 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {description}
          </motion.p>
        )}
        {(primaryAction || secondaryAction) && (
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            {primaryAction && (
              <a href={primaryAction.href} className="inline-flex items-center justify-center h-13 px-8 bg-[var(--color-brand-blue)] text-white text-sm font-medium tracking-wider hover:bg-[var(--color-brand-navy)] transition-colors">
                {primaryAction.label}
              </a>
            )}
            {secondaryAction && (
              <a href={secondaryAction.href} className="inline-flex items-center justify-center h-13 px-8 border border-white/30 text-white text-sm font-medium tracking-wider hover:bg-white hover:text-[var(--color-neutral-ink)] transition-colors">
                {secondaryAction.label}
              </a>
            )}
          </motion.div>
        )}
      </div>
    </section>
  );
}

interface SplitSectionProps {
  left: React.ReactNode;
  right: React.ReactNode;
  reverse?: boolean;
}

export function SplitSection({ left, right, reverse = false }: SplitSectionProps) {
  return (
    <section className="py-16 md:py-24">
      <div className={`max-w-[var(--max-wide-width)] mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${reverse ? '' : ''}`}>
        <div className={reverse ? 'order-2' : ''}>{left}</div>
        <div className={reverse ? 'order-1' : ''}>{right}</div>
      </div>
    </section>
  );
}

interface FeatureGridProps {
  title: string;
  subtitle?: string;
  features: Array<{
    number: string;
    title: string;
    description: string;
  }>;
}

export function FeatureGrid({ title, subtitle, features }: FeatureGridProps) {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-[var(--max-wide-width)] mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          {subtitle && (
            <p className="text-[10px] font-medium tracking-[0.3em] uppercase text-[var(--color-neutral-gray-500)] mb-3">
              {subtitle}
            </p>
          )}
          <h2 className="font-display text-4xl md:text-5xl text-[var(--color-neutral-ink)]">
            {title}
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="w-12 h-12 bg-[var(--color-brand-navy)] text-white flex items-center justify-center mb-4">
                <span className="font-display text-xl">{feature.number}</span>
              </div>
              <h3 className="text-lg font-medium text-[var(--color-neutral-ink)] mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-[var(--color-neutral-gray-600)] leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

interface QuoteSectionProps {
  quote: string;
  attribution?: string;
}

export function QuoteSection({ quote, attribution }: QuoteSectionProps) {
  return (
    <section className="py-24 md:py-32 bg-[var(--color-neutral-paper)]">
      <div className="max-w-3xl mx-auto px-4 text-center">
        <p className="font-serif text-2xl md:text-3xl lg:text-4xl text-[var(--color-neutral-ink)] leading-snug italic">
          &ldquo;{quote}&rdquo;
        </p>
        <div className="mt-6 w-16 h-px bg-[var(--color-brand-blue)] mx-auto" />
        {attribution && (
          <p className="mt-4 text-xs tracking-[0.3em] uppercase text-[var(--color-neutral-gray-500)]">
            {attribution}
          </p>
        )}
      </div>
    </section>
  );
}

interface CTASectionProps {
  title: string;
  description?: string;
  action: { label: string; href: string };
}

export function CTASection({ title, description, action }: CTASectionProps) {
  return (
    <section className="py-24 md:py-32 bg-[var(--color-neutral-ink)] text-white">
      <div className="max-w-2xl mx-auto px-4 text-center">
        <h2 className="font-display text-4xl md:text-5xl mb-4">{title}</h2>
        {description && (
          <p className="text-base text-white/60 mb-8">{description}</p>
        )}
        <a
          href={action.href}
          className="inline-flex items-center justify-center h-13 px-8 bg-[var(--color-brand-blue)] text-white text-sm font-medium tracking-wider hover:bg-white hover:text-[var(--color-neutral-ink)] transition-colors"
        >
          {action.label}
        </a>
      </div>
    </section>
  );
}
