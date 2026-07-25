import { Suspense } from 'react';
import { SkeletonCard } from '@/components/ui/Skeleton';

export function SuspenseProducts({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
        {Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)}
      </div>
    }>
      {children}
    </Suspense>
  );
}
