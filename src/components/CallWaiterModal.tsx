'use client';

import Image from 'next/image';
import HomeIndicator from '@/components/HomeIndicator';

interface CallWaiterModalProps {
  state: 'prompt' | 'notifying' | 'success';
  onCancel: () => void;
  onCallNow: () => void;
}

export default function CallWaiterModal({ state, onCancel, onCallNow }: CallWaiterModalProps) {
  if (state === 'notifying') {
    return (
      <div className="overlay" onClick={onCancel}>
        <div
          className="slide-up"
          onClick={(e) => e.stopPropagation()}
          style={{
            background: '#FFFFFF',
            borderRadius: '14px 14px 0 0',
            padding: '42px 16px 34px',
            width: '100%',
            boxShadow: '0px -1px 7.1px 0px rgba(0,0,0,0.25)',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 20,
          }}
        >
          <div className="spinner" style={{ width: 56, height: 56, borderWidth: 4 }} />
          <div>
            <h3 style={{ fontFamily: 'Satoshi, Inter, sans-serif', fontWeight: 700, fontSize: 26, color: '#2D2F33', marginBottom: 8 }}>
              Notifying Staff…
            </h3>
            <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: 16, color: '#888888' }}>
              Please wait, a staff member is being notified.
            </p>
          </div>
          <HomeIndicator />
        </div>
      </div>
    );
  }

  if (state === 'success') {
    return (
      <div className="overlay" onClick={onCancel}>
        <div
          className="slide-up"
          onClick={(e) => e.stopPropagation()}
          style={{
            background: '#FFFFFF',
            borderRadius: '14px 14px 0 0',
            padding: '42px 16px 34px',
            width: '100%',
            boxShadow: '0px -1px 7.1px 0px rgba(0,0,0,0.25)',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 20,
          }}
        >
          <div style={{ width: 72, height: 72, borderRadius: '50%', background: '#026F4F', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 20px rgba(2,111,79,0.3)' }}>
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
              <path d="M20 6L9 17L4 12" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div>
            <h3 style={{ fontFamily: 'Satoshi, Inter, sans-serif', fontWeight: 700, fontSize: 26, color: '#2D2F33', marginBottom: 8 }}>
              Waiter is Coming!
            </h3>
            <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: 16, color: '#888888' }}>
              A staff member will be at your table shortly.
            </p>
          </div>
          <button className="btn-primary" onClick={onCancel} style={{ width: '100%', maxWidth: 360 }}>
            Got it
          </button>
          <HomeIndicator />
        </div>
      </div>
    );
  }

  // Default: prompt state — Figma node 224:549
  return (
    <div className="overlay" onClick={onCancel}>
      <div
        className="slide-up"
        onClick={(e) => e.stopPropagation()}
        style={{
          background: '#FFFFFF',
          borderRadius: '14px 14px 0 0',
          padding: '42px 16px 34px',
          width: '100%',
          boxShadow: '0px -1px 7.1px 0px rgba(0,0,0,0.25)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 50,
        }}
      >
        {/* Illustration */}
        <div style={{ width: '100%', height: 347, position: 'relative', borderRadius: 14, overflow: 'hidden', background: '#F2F2F2' }}>
          <Image
            src="/images/waiter-call.png"
            alt="Call a waiter"
            fill
            style={{ objectFit: 'cover' }}
          />
        </div>

        {/* Text */}
        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 15 }}>
          <h3 style={{ fontFamily: 'Satoshi, Inter, sans-serif', fontWeight: 700, fontSize: 30, color: '#2D2F33', lineHeight: '1.4em' }}>
            Call a Waiter
          </h3>
          <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: 16, color: '#888888', lineHeight: '1.4em', maxWidth: 346 }}>
            Do you need assistance? A staff member will come to your table.
          </p>
        </div>

        {/* Buttons */}
        <div style={{ display: 'flex', gap: 4, width: '100%' }}>
          <button
            onClick={onCancel}
            className="btn-secondary"
            style={{ flex: 1, fontSize: 19, border: '1px solid #B9B9B9' }}
          >
            Cancel
          </button>
          <button
            onClick={onCallNow}
            className="btn-primary"
            style={{ flex: 1, fontSize: 19 }}
          >
            Call Now
          </button>
        </div>

        <HomeIndicator />
      </div>
    </div>
  );
}
