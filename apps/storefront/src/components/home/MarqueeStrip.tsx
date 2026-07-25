'use client';
import { Text } from '@astryxdesign/core/Text';
import { marqueeItems } from '@/data/constants';

export default function MarqueeStrip() {
  return (
    <div style={{ overflow: 'hidden', padding: '1.5rem 0', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
      <div className="marquee">
        <div className="marquee-content">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <Text key={i} type="label" color="secondary" style={{ padding: '0 2rem', display: 'flex', alignItems: 'center', gap: '0.5rem', whiteSpace: 'nowrap' }}>
              <span style={{ width: '4px', height: '4px', backgroundColor: 'var(--accent)', borderRadius: '50%', display: 'inline-block' }} />
              {item}
            </Text>
          ))}
        </div>
      </div>
    </div>
  );
}
