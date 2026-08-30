'use client';

import StatusBar from '@/components/StatusBar';
import HomeIndicator from '@/components/HomeIndicator';

interface DetectedScreenProps {
  tableNumber: string;
  onConfirm: () => void;
}

export default function DetectedScreen({ tableNumber, onConfirm }: DetectedScreenProps) {
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
          gap: 32,
          padding: '0 32px',
          paddingTop: 60,
        }}
      >
        {/* QR Detected pulse icon */}
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div
            className="pulse-ring"
            style={{
              position: 'absolute',
              width: 110,
              height: 110,
              borderRadius: '50%',
              background: 'rgba(2, 111, 79, 0.2)',
            }}
          />
          <div
            style={{
              width: 90,
              height: 90,
              borderRadius: '50%',
              background: '#026F4F',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg width="42" height="42" viewBox="0 0 24 24" fill="none">
              <path d="M20 6L9 17L4 12" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>

        {/* Title */}
        <div style={{ textAlign: 'center' }}>
          <h2
            style={{
              fontFamily: 'Satoshi, Inter, sans-serif',
              fontWeight: 700,
              fontSize: 28,
              color: '#2D2F33',
              lineHeight: '1.4em',
              marginBottom: 8,
            }}
          >
            Table Confirmed!
          </h2>
          <p
            style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 400,
              fontSize: 16,
              color: '#888888',
              lineHeight: '1.4em',
            }}
          >
            QR code detected — you are seated at
          </p>
          <p
            style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 700,
              fontSize: 48,
              color: '#026F4F',
              lineHeight: '1.4em',
              marginTop: 4,
            }}
          >
            Table {tableNumber}
          </p>
        </div>

        {/* Confirm button */}
        <button
          className="btn-primary"
          onClick={onConfirm}
          style={{ width: '100%' }}
        >
          Browse Menu
        </button>
      </div>

      <HomeIndicator />
    </div>
  );
}
