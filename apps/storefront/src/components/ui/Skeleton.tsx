export function SkeletonCard() {
  return (
    <div>
      <div className="skeleton" style={{ aspectRatio: '3/4', marginBottom: '1rem' }} />
      <div className="skeleton" style={{ width: '40%', height: '10px', marginBottom: '8px' }} />
      <div className="skeleton" style={{ width: '70%', height: '14px', marginBottom: '8px' }} />
      <div className="skeleton" style={{ width: '30%', height: '14px' }} />
    </div>
  );
}

export function SkeletonHero() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', padding: '0 2rem' }}>
      <div style={{ maxWidth: '600px' }}>
        <div className="skeleton" style={{ width: '200px', height: '12px', marginBottom: '1.5rem' }} />
        <div className="skeleton" style={{ width: '100%', height: '80px', marginBottom: '1rem' }} />
        <div className="skeleton" style={{ width: '80%', height: '80px', marginBottom: '1.5rem' }} />
        <div className="skeleton" style={{ width: '100%', height: '16px', marginBottom: '8px' }} />
        <div className="skeleton" style={{ width: '70%', height: '16px', marginBottom: '2rem' }} />
        <div style={{ display: 'flex', gap: '1rem' }}>
          <div className="skeleton" style={{ width: '160px', height: '44px' }} />
          <div className="skeleton" style={{ width: '160px', height: '44px' }} />
        </div>
      </div>
    </div>
  );
}
