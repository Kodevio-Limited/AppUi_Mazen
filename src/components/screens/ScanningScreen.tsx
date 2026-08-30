'use client';

import Image from 'next/image';
import StatusBar from '@/components/StatusBar';
import HomeIndicator from '@/components/HomeIndicator';

interface ScanningScreenProps {
  onScanSuccess: () => void;
}

export default function ScanningScreen({ onScanSuccess }: ScanningScreenProps) {
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden', borderRadius: 19, background: '#F2F2F2' }}>
      {/* Blurred background image */}
      <div style={{ position: 'absolute', inset: 0 }}>
        <Image
          src="/images/scan-bg.png"
          alt="Restaurant background"
          fill
          style={{ objectFit: 'cover', filter: 'blur(6.3px)', transform: 'scale(1.05)' }}
          priority
        />
        {/* Dark overlay */}
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)' }} />
      </div>

      <StatusBar dark={false} />

      {/* QR viewfinder frame */}
      <div
        style={{
          position: 'absolute',
          top: 370,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 216,
          height: 216,
        }}
      >
        {/* Corners */}
        <div className="scan-corner" style={{ top: 0, left: 0, borderTopWidth: 3, borderLeftWidth: 3, borderRadius: '6px 0 0 0' }} />
        <div className="scan-corner" style={{ top: 0, right: 0, borderTopWidth: 3, borderRightWidth: 3, borderRadius: '0 6px 0 0' }} />
        <div className="scan-corner" style={{ bottom: 0, left: 0, borderBottomWidth: 3, borderLeftWidth: 3, borderRadius: '0 0 0 6px' }} />
        <div className="scan-corner" style={{ bottom: 0, right: 0, borderBottomWidth: 3, borderRightWidth: 3, borderRadius: '0 0 6px 0' }} />

        {/* Small QR preview */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 100,
            height: 100,
            borderRadius: 8,
            overflow: 'hidden',
          }}
        >
          <Image src="/images/scan-bg.png" alt="QR preview" fill style={{ objectFit: 'cover' }} />
        </div>

        {/* Scan laser line */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: 8,
            right: 8,
            height: 2,
            background: 'linear-gradient(90deg, transparent, rgba(237,49,49,0.9) 50%, transparent)',
          }}
        />
      </div>

      {/* Instruction text */}
      <div
        style={{
          position: 'absolute',
          bottom: 200,
          left: 46,
          right: 46,
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          gap: 20,
        }}
      >
        <p
          style={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 600,
            fontSize: 23,
            lineHeight: '1.4em',
            color: '#FFFFFF',
          }}
        >
          Point camera at the QR code on your table
        </p>
        <p
          style={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 400,
            fontSize: 16,
            lineHeight: '1.4em',
            color: '#B9B9B9',
          }}
        >
          Make sure the QR code is within the frame
        </p>
      </div>

      {/* Demo tap button */}
      <button
        onClick={onScanSuccess}
        style={{
          position: 'absolute',
          bottom: 100,
          left: '50%',
          transform: 'translateX(-50%)',
          background: '#026F4F',
          color: '#fff',
          border: 'none',
          borderRadius: 30,
          padding: '14px 32px',
          fontFamily: 'Inter, sans-serif',
          fontWeight: 500,
          fontSize: 16,
          cursor: 'pointer',
          boxShadow: '0px 4px 16.3px 11px rgba(0,0,0,0.12)',
          whiteSpace: 'nowrap',
        }}
      >
        Simulate Scan ✓
      </button>

      <HomeIndicator dark={false} />
    </div>
  );
}
