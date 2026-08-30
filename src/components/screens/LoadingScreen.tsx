'use client';

import StatusBar from '@/components/StatusBar';
import HomeIndicator from '@/components/HomeIndicator';

interface LoadingScreenProps {
  onDone?: () => void;
}

export default function LoadingScreen({ onDone }: LoadingScreenProps) {
  // Auto-proceed after 2s in demo
  if (typeof window !== 'undefined' && onDone) {
    setTimeout(onDone, 2000);
  }

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', background: '#F2F2F2', borderRadius: 19 }}>
      <StatusBar dark />

      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 24,
        }}
      >
        <div className="spinner" />
        <p
          style={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 500,
            fontSize: 16,
            color: '#686868',
          }}
        >
          Loading your table menu…
        </p>
      </div>

      <HomeIndicator />
    </div>
  );
}
