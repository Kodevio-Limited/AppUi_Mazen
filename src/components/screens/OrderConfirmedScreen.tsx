'use client';

import StatusBar from '@/components/StatusBar';
import HomeIndicator from '@/components/HomeIndicator';

interface OrderConfirmedScreenProps {
  orderId: string;
  total: number;
  onViewStatus: () => void;
}

export default function OrderConfirmedScreen({ orderId, total, onViewStatus }: OrderConfirmedScreenProps) {
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', background: '#F2F2F2', borderRadius: 19, overflow: 'hidden' }}>
      <StatusBar dark />

      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 28, padding: '0 32px', paddingTop: 60 }}>

        {/* Success animation */}
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div
            className="pulse-ring"
            style={{ position: 'absolute', width: 140, height: 140, borderRadius: '50%', background: 'rgba(2, 111, 79, 0.15)' }}
          />
          <div style={{ width: 110, height: 110, borderRadius: '50%', background: '#026F4F', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 32px rgba(2,111,79,0.35)' }}>
            <svg width="52" height="52" viewBox="0 0 24 24" fill="none">
              <path d="M20 6L9 17L4 12" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'Satoshi, Inter, sans-serif', fontWeight: 700, fontSize: 30, color: '#2D2F33', lineHeight: '1.4em', marginBottom: 8 }}>
            Payment Complete!
          </h2>
          <p style={{ fontFamily: 'Satoshi, Inter, sans-serif', fontWeight: 700, fontSize: 22, color: '#026F4F', marginBottom: 8 }}>
            Order Confirmed!
          </p>
          <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: 16, color: '#888888', lineHeight: '1.5em' }}>
            Your order has been sent to the kitchen. We'll notify you when it's ready.
          </p>
        </div>

        {/* Order details card */}
        <div style={{ background: '#FFFFFF', borderRadius: 16, padding: '20px 24px', width: '100%', boxShadow: '0 4px 16px rgba(0,0,0,0.06)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: 15, color: '#989898' }}>Order ID</span>
            <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 15, color: '#2D2F33' }}>#{orderId}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: 15, color: '#989898' }}>Amount Paid</span>
            <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 18, color: '#026F4F' }}>${total.toFixed(2)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: 15, color: '#989898' }}>Est. Prep Time</span>
            <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 15, color: '#2D2F33' }}>~15–20 min</span>
          </div>
        </div>

        <button className="btn-primary" onClick={onViewStatus} style={{ width: '100%' }}>
          Track My Order
        </button>
      </div>

      <HomeIndicator />
    </div>
  );
}
