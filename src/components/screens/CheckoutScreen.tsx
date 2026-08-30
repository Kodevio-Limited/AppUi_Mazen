'use client';

import { useState } from 'react';
import StatusBar from '@/components/StatusBar';
import HomeIndicator from '@/components/HomeIndicator';
import { CartItem } from '@/types/app';
import { SERVICE_CHARGE_RATE, TIP_OPTIONS } from '@/data/menuData';

interface CheckoutScreenProps {
  cartItems: CartItem[];
  onBack: () => void;
  onPayCard: () => void;
  onPayCash: () => void;
}

export default function CheckoutScreen({ cartItems, onBack, onPayCard, onPayCash }: CheckoutScreenProps) {
  const [promoCode, setPromoCode] = useState('');
  const [promoState, setPromoState] = useState<'idle' | 'applied' | 'denied'>('idle');
  const [selectedTip, setSelectedTip] = useState<number>(0);
  const [splitBill, setSplitBill] = useState(false);
  const [splitCount, setSplitCount] = useState(2);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'cash'>('card');

  const subtotal = cartItems.reduce((s, ci) => s + ci.item.price * ci.quantity, 0);
  const serviceCharge = subtotal * SERVICE_CHARGE_RATE;
  const discount = promoState === 'applied' ? subtotal * 0.1 : 0;
  const tipAmount = (subtotal * selectedTip) / 100;
  const total = subtotal + serviceCharge - discount + tipAmount;
  const splitAmount = splitBill ? total / splitCount : total;

  const handleApplyPromo = () => {
    if (promoCode.toLowerCase() === 'save10') {
      setPromoState('applied');
    } else if (promoCode) {
      setPromoState('denied');
    }
  };

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', background: '#F2F2F2', borderRadius: 19, overflow: 'hidden' }}>
      <StatusBar dark />

      {/* Back */}
      <button
        onClick={onBack}
        style={{
          position: 'absolute',
          top: 72,
          left: 16,
          zIndex: 10,
          width: 50,
          height: 50,
          borderRadius: '50%',
          background: '#FFFFFF',
          border: '1px solid #E9E9E9',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M19 12H5M12 5l-7 7 7 7" stroke="#2D2F33" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <h2
        style={{
          position: 'absolute',
          top: 77,
          left: 0,
          right: 0,
          textAlign: 'center',
          fontFamily: 'Satoshi, Inter, sans-serif',
          fontWeight: 500,
          fontSize: 28,
          color: '#2D2F33',
        }}
      >
        Checkout
      </h2>

      {/* Scrollable content */}
      <div style={{ position: 'absolute', top: 140, left: 16, right: 16, bottom: 110, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 12 }}>

        {/* Bill summary */}
        <div style={{ background: '#FFFFFF', borderRadius: 13, padding: '16px 18px' }}>
          <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 17, color: '#2D2F33', marginBottom: 12 }}>
            Bill Summary
          </p>
          {cartItems.map((ci) => (
            <div key={ci.item.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#686868' }}>
                {ci.item.name} × {ci.quantity}
              </span>
              <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: 14, color: '#2D2F33' }}>
                ${(ci.item.price * ci.quantity).toFixed(2)}
              </span>
            </div>
          ))}
          <div style={{ borderTop: '1px dashed #E9E9E9', paddingTop: 10, marginTop: 4 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#989898' }}>Service Charge (10%)</span>
              <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: 14, color: '#686868' }}>${serviceCharge.toFixed(2)}</span>
            </div>
            {discount > 0 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#16A34A' }}>Promo (SAVE10 -10%)</span>
                <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: 14, color: '#16A34A' }}>-${discount.toFixed(2)}</span>
              </div>
            )}
            {tipAmount > 0 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#989898' }}>Tip ({selectedTip}%)</span>
                <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: 14, color: '#686868' }}>${tipAmount.toFixed(2)}</span>
              </div>
            )}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
              <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 17, color: '#000' }}>Total</span>
              <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 17, color: '#026F4F' }}>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Tip selection */}
        <div style={{ background: '#FFFFFF', borderRadius: 13, padding: '16px 18px' }}>
          <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 17, color: '#2D2F33', marginBottom: 12 }}>
            Add a Tip
          </p>
          <div style={{ display: 'flex', gap: 8 }}>
            {TIP_OPTIONS.map((tip) => (
              <button
                key={tip}
                onClick={() => setSelectedTip(tip)}
                style={{
                  flex: 1,
                  height: 42,
                  borderRadius: 10,
                  border: `1.5px solid ${selectedTip === tip ? '#026F4F' : '#E9E9E9'}`,
                  background: selectedTip === tip ? '#026F4F' : '#FFFFFF',
                  color: selectedTip === tip ? '#FFFFFF' : '#2D2F33',
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 600,
                  fontSize: 14,
                  cursor: 'pointer',
                }}
              >
                {tip === 0 ? 'No tip' : `${tip}%`}
              </button>
            ))}
          </div>
        </div>

        {/* Promo code */}
        <div style={{ background: '#FFFFFF', borderRadius: 13, padding: '16px 18px' }}>
          <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 17, color: '#2D2F33', marginBottom: 12 }}>
            Promo Code
          </p>
          <div style={{ display: 'flex', gap: 8 }}>
            <input
              value={promoCode}
              onChange={(e) => { setPromoCode(e.target.value); setPromoState('idle'); }}
              placeholder="Enter promo code"
              style={{
                flex: 1,
                height: 48,
                borderRadius: 10,
                border: `1.5px solid ${promoState === 'applied' ? '#16A34A' : promoState === 'denied' ? '#E52B2B' : '#E9E9E9'}`,
                padding: '0 14px',
                fontFamily: 'Inter, sans-serif',
                fontSize: 15,
                color: '#2D2F33',
                outline: 'none',
                background: '#FFFFFF',
              }}
            />
            <button
              onClick={handleApplyPromo}
              style={{
                height: 48,
                padding: '0 16px',
                background: '#026F4F',
                color: '#fff',
                border: 'none',
                borderRadius: 10,
                fontFamily: 'Inter, sans-serif',
                fontWeight: 500,
                fontSize: 14,
                cursor: 'pointer',
              }}
            >
              Apply
            </button>
          </div>
          {promoState === 'applied' && (
            <p style={{ marginTop: 8, fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#16A34A' }}>
              ✓ Promo applied! 10% off your order.
            </p>
          )}
          {promoState === 'denied' && (
            <p style={{ marginTop: 8, fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#E52B2B' }}>
              ✗ Invalid promo code. Try &quot;SAVE10&quot;.
            </p>
          )}
        </div>

        {/* Split bill */}
        <div style={{ background: '#FFFFFF', borderRadius: 13, padding: '16px 18px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: splitBill ? 12 : 0 }}>
            <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 17, color: '#2D2F33' }}>Split Bill</p>
            <button
              onClick={() => setSplitBill(!splitBill)}
              style={{
                width: 48,
                height: 26,
                borderRadius: 13,
                background: splitBill ? '#026F4F' : '#E9E9E9',
                border: 'none',
                cursor: 'pointer',
                position: 'relative',
                transition: 'background 0.2s',
              }}
            >
              <div
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: '50%',
                  background: '#FFFFFF',
                  position: 'absolute',
                  top: 3,
                  left: splitBill ? 25 : 3,
                  transition: 'left 0.2s',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.2)',
                }}
              />
            </button>
          </div>
          {splitBill && (
            <div>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#989898', marginBottom: 12 }}>
                Split between how many people?
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <button onClick={() => setSplitCount(Math.max(2, splitCount - 1))} style={{ width: 36, height: 36, borderRadius: '50%', background: '#F2F2F2', border: 'none', cursor: 'pointer', fontSize: 20, color: '#2D2F33' }}>−</button>
                <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 24, color: '#2D2F33', minWidth: 24, textAlign: 'center' }}>{splitCount}</span>
                <button onClick={() => setSplitCount(splitCount + 1)} style={{ width: 36, height: 36, borderRadius: '50%', background: '#026F4F', border: 'none', cursor: 'pointer', fontSize: 20, color: '#fff' }}>+</button>
                <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#989898' }}>Each person pays</p>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 20, color: '#026F4F' }}>${splitAmount.toFixed(2)}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Payment method */}
        <div style={{ background: '#FFFFFF', borderRadius: 13, padding: '16px 18px' }}>
          <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 17, color: '#2D2F33', marginBottom: 12 }}>
            Payment Method
          </p>
          <div style={{ display: 'flex', gap: 10 }}>
            {(['card', 'cash'] as const).map((m) => (
              <button
                key={m}
                onClick={() => setPaymentMethod(m)}
                style={{
                  flex: 1,
                  height: 52,
                  borderRadius: 10,
                  border: `1.5px solid ${paymentMethod === m ? '#026F4F' : '#E9E9E9'}`,
                  background: paymentMethod === m ? '#E6F1ED' : '#FFFFFF',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                }}
              >
                {m === 'card' ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <rect x="2" y="5" width="20" height="14" rx="2" stroke={paymentMethod === 'card' ? '#026F4F' : '#989898'} strokeWidth="1.5" />
                    <path d="M2 10h20" stroke={paymentMethod === 'card' ? '#026F4F' : '#989898'} strokeWidth="1.5" />
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" stroke={paymentMethod === 'cash' ? '#026F4F' : '#989898'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
                <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: 15, color: paymentMethod === m ? '#026F4F' : '#686868' }}>
                  {m === 'card' ? 'Card' : 'Cash'}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Place Order button */}
      <div style={{ position: 'absolute', bottom: 44, left: 16, right: 16 }}>
        <button
          className="btn-primary"
          onClick={() => paymentMethod === 'card' ? onPayCard() : onPayCash()}
          style={{ justifyContent: 'space-between', padding: '0 33px' }}
        >
          <span>{paymentMethod === 'card' ? 'Pay with Card' : 'Pay with Cash'}</span>
          <span style={{ fontWeight: 700 }}>${total.toFixed(2)}</span>
        </button>
      </div>

      <HomeIndicator />
    </div>
  );
}
