'use client';

export default function HomeIndicator({ dark = true }: { dark?: boolean }) {
  return (
    <div style={{ position: 'absolute', bottom: 8, left: 0, right: 0, display: 'flex', justifyContent: 'center' }}>
      <div
        className="home-indicator"
        style={{ background: dark ? '#2D2F33' : 'rgba(255,255,255,0.5)' }}
      />
    </div>
  );
}
