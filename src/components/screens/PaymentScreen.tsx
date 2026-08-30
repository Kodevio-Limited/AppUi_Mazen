'use client';

import { useState } from 'react';
import StatusBar from '@/components/StatusBar';
import HomeIndicator from '@/components/HomeIndicator';

interface PaymentScreenProps {
  total: number;
  method: 'card' | 'cash';
  onBack: () => void;
  onConfirm: () => void;
}

export default function PaymentScreen({ total, method, onBack, onConfirm }: PaymentScreenProps) {
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardName, setCardName] = useState('');
  const [processing, setProcessing] = useState(false);

  const handlePay = () => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      onConfirm();
    }, 2000);
  };

  const formatCard = (val: string) => {
    const digits = val.replace(/\D/g, '').slice(0, 16);
    return digits.replace(/(.{4})/g, '$1 ').trim();
  };

  const formatExpiry = (val: string) => {
    const digits = val.replace(/\D/g, '').slice(0, 4);
    if (digits.length >= 2) return digits.slice(0, 2) + '/' + digits.slice(2);
    return digits;
  };

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', background: '#F2F2F2', borderRadius: 19, overflow: 'hidden' }}>
      <StatusBar dark />

      <button
        onClick={onBack}
        style={{
          position: 'absolute', top: 72, left: 16, zIndex: 10,
          width: 50, height: 50, borderRadius: '50%',
          background: '#FFFFFF', border: '1px solid #E9E9E9',
          cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M19 12H5M12 5l-7 7 7 7" stroke="#2D2F33" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <h2 style={{ position: 'absolute', top: 77, left: 0, right: 0, textAlign: 'center', fontFamily: 'Satoshi, Inter, sans-serif', fontWeight: 500, fontSize: 28, color: '#2D2F33' }}>
        Payment
      </h2>

      <div style={{ position: 'absolute', top: 140, left: 16, right: 16, bottom: 110, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 16 }}>

        {method === 'card' ? (
          <>
            {/* Card visual */}
            <div
              style={{
                height: 190,
                background: 'linear-gradient(135deg, #026F4F 0%, #01533B 100%)',
                borderRadius: 18,
                padding: '24px 24px 20px',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Decorative circles */}
              <div style={{ position: 'absolute', top: -30, right: -30, width: 140, height: 140, borderRadius: '50%', background: 'rgba(255,255,255,0.08)' }} />
              <div style={{ position: 'absolute', bottom: -20, left: -20, width: 100, height: 100, borderRadius: '50%', background: 'rgba(255,255,255,0.06)' }} />

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 32 }}>
                <span style={{ fontFamily: 'Satoshi, Inter, sans-serif', fontWeight: 700, fontSize: 18, color: '#FFFFFF', letterSpacing: '1px' }}>
                  VISA
                </span>
                <svg width="36" height="24" viewBox="0 0 36 24" fill="none">
                  <circle cx="14" cy="12" r="12" fill="rgba(255,255,255,0.3)" />
                  <circle cx="22" cy="12" r="12" fill="rgba(255,255,255,0.2)" />
                </svg>
              </div>
              <p style={{ fontFamily: 'Montserrat, monospace', fontWeight: 600, fontSize: 18, color: 'rgba(255,255,255,0.9)', letterSpacing: '3px', marginBottom: 16 }}>
                {cardNumber || '•••• •••• •••• ••••'}
              </p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, color: 'rgba(255,255,255,0.6)', marginBottom: 2 }}>CARD HOLDER</p>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: 14, color: '#FFFFFF' }}>
                    {cardName || 'YOUR NAME'}
                  </p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 10, color: 'rgba(255,255,255,0.6)', marginBottom: 2 }}>EXPIRES</p>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: 14, color: '#FFFFFF' }}>
                    {expiry || 'MM/YY'}
                  </p>
                </div>
              </div>
            </div>

            {/* Card form */}
            <div style={{ background: '#FFFFFF', borderRadius: 13, padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[
                { label: 'Card Number', value: cardNumber, onChange: (v: string) => setCardNumber(formatCard(v)), placeholder: '1234 5678 9012 3456' },
                { label: 'Card Holder Name', value: cardName, onChange: setCardName, placeholder: 'John Doe' },
              ].map(({ label, value, onChange, placeholder }) => (
                <div key={label}>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: 13, color: '#989898', marginBottom: 6 }}>{label}</p>
                  <input
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                    style={{
                      width: '100%', height: 48, borderRadius: 10,
                      border: '1.5px solid #E9E9E9', padding: '0 14px',
                      fontFamily: 'Inter, sans-serif', fontSize: 15, color: '#2D2F33', outline: 'none',
                    }}
                  />
                </div>
              ))}
              <div style={{ display: 'flex', gap: 12 }}>
                <div style={{ flex: 1 }}>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: 13, color: '#989898', marginBottom: 6 }}>Expiry Date</p>
                  <input
                    value={expiry}
                    onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                    placeholder="MM/YY"
                    style={{
                      width: '100%', height: 48, borderRadius: 10,
                      border: '1.5px solid #E9E9E9', padding: '0 14px',
                      fontFamily: 'Inter, sans-serif', fontSize: 15, color: '#2D2F33', outline: 'none',
                    }}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: 13, color: '#989898', marginBottom: 6 }}>CVV</p>
                  <input
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 3))}
                    placeholder="•••"
                    type="password"
                    style={{
                      width: '100%', height: 48, borderRadius: 10,
                      border: '1.5px solid #E9E9E9', padding: '0 14px',
                      fontFamily: 'Inter, sans-serif', fontSize: 15, color: '#2D2F33', outline: 'none',
                    }}
                  />
                </div>
              </div>
            </div>
          </>
        ) : (
          /* Cash payment */
          <div style={{ background: '#FFFFFF', borderRadius: 13, padding: '32px 24px', textAlign: 'center' }}>
            <div style={{ fontSize: 64, marginBottom: 16 }}>💵</div>
            <h3 style={{ fontFamily: 'Satoshi, Inter, sans-serif', fontWeight: 700, fontSize: 22, color: '#2D2F33', marginBottom: 8 }}>
              Pay at the Counter
            </h3>
            <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: 15, color: '#989898', lineHeight: '1.5em', marginBottom: 20 }}>
              Please proceed to the counter to complete your payment. A staff member will assist you.
            </p>
            <div style={{ background: '#E6F1ED', borderRadius: 12, padding: '16px 20px', display: 'inline-flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: 15, color: '#026F4F' }}>Amount due:</span>
              <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 22, color: '#026F4F' }}>${total.toFixed(2)}</span>
            </div>
          </div>
        )}
      </div>

      {/* Pay button */}
      <div style={{ position: 'absolute', bottom: 44, left: 16, right: 16 }}>
        <button
          className="btn-primary"
          onClick={handlePay}
          disabled={processing}
          style={{ opacity: processing ? 0.8 : 1 }}
        >
          {processing ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div className="spinner" style={{ width: 20, height: 20, borderWidth: 2 }} />
              Processing…
            </div>
          ) : (
            method === 'card' ? `Pay $${total.toFixed(2)}` : 'Confirm Order'
          )}
        </button>
      </div>

      <HomeIndicator />
    </div>
  );
}
