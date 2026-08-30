'use client';

import Image from 'next/image';
import StatusBar from '@/components/StatusBar';
import HomeIndicator from '@/components/HomeIndicator';
import { CartItem } from '@/types/app';
import { SERVICE_CHARGE_RATE } from '@/data/menuData';

type CartTab = 'ongoing' | 'cart' | 'history';

interface CartScreenProps {
  cartItems: CartItem[];
  onBack: () => void;
  onUpdateQty: (itemId: string, delta: number) => void;
  onCheckout: () => void;
  onViewOrders: () => void;
  onViewHistory: () => void;
  currentOrderId?: string;
}

export default function CartScreen({
  cartItems,
  onBack,
  onUpdateQty,
  onCheckout,
  onViewOrders,
  onViewHistory,
  currentOrderId,
}: CartScreenProps) {
  const activeTab: CartTab = 'cart';

  const subtotal = cartItems.reduce((sum, ci) => sum + ci.item.price * ci.quantity, 0);
  const serviceCharge = subtotal * SERVICE_CHARGE_RATE;
  const total = subtotal + serviceCharge;

  const isEmpty = cartItems.length === 0;

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

      {/* Title */}
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
          lineHeight: '1.4em',
        }}
      >
        My Order
      </h2>

      {/* Tab switcher */}
      <div
        style={{
          position: 'absolute',
          top: 175,
          left: 16,
          right: 16,
          background: '#E9E9E9',
          borderRadius: 37,
          height: 52,
          display: 'flex',
          padding: 5,
        }}
      >
        {(['Ongoing', 'Cart', 'History'] as const).map((tab) => {
          const tabId = tab.toLowerCase() as CartTab;
          const isActive = tabId === activeTab;
          return (
            <button
              key={tab}
              onClick={() => {
                if (tabId === 'ongoing') onViewOrders();
                else if (tabId === 'history') onViewHistory();
              }}
              style={{
                flex: 1,
                borderRadius: 23,
                background: isActive ? '#FFFFFF' : 'transparent',
                border: 'none',
                cursor: 'pointer',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 400,
                fontSize: 14,
                color: isActive ? '#026F4F' : '#989898',
                transition: 'all 0.2s',
              }}
            >
              {tab}
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div
        style={{
          position: 'absolute',
          top: 249,
          left: 16,
          right: 16,
          bottom: 110,
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: 11,
        }}
      >
        {isEmpty ? (
          /* Empty Cart state — Figma node 107:137 */
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: 20, padding: '0 32px' }}>
            <div style={{ fontSize: 64 }}>🛒</div>
            <h3 style={{ fontFamily: 'Satoshi, Inter, sans-serif', fontWeight: 700, fontSize: 22, color: '#2D2F33', textAlign: 'center' }}>
              Your cart is empty
            </h3>
            <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: 15, color: '#989898', textAlign: 'center', lineHeight: '1.5em' }}>
              Browse the menu and add items to get started.
            </p>
            <button className="btn-primary" onClick={onBack} style={{ marginTop: 8 }}>
              Browse Menu
            </button>
          </div>
        ) : (
          <>
            {/* Order items card */}
            <div style={{ background: '#FFFFFF', border: '1px solid #E9E9E9', borderRadius: 13, padding: '13px 18px' }}>
              <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 19, color: '#2D2F33', marginBottom: 16 }}>
                Order Summary
              </p>
              {cartItems.map((ci) => (
                <div
                  key={ci.item.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    paddingBottom: 16,
                    marginBottom: 16,
                    borderBottom: '1px solid #F2F2F2',
                  }}
                >
                  {/* Image */}
                  <div style={{ width: 60, height: 60, borderRadius: 8, overflow: 'hidden', flexShrink: 0, position: 'relative', background: '#F2F2F2' }}>
                    <Image src={ci.item.image} alt={ci.item.name} fill style={{ objectFit: 'cover' }} />
                  </div>
                  {/* Info */}
                  <div style={{ flex: 1 }}>
                    <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 15, color: '#2D2F33' }}>
                      {ci.item.name}
                    </p>
                    {ci.note ? (
                      <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: 12, color: '#989898', marginTop: 2 }}>
                        {ci.note}
                      </p>
                    ) : null}
                    <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 15, color: '#026F4F', marginTop: 4 }}>
                      ${(ci.item.price * ci.quantity).toFixed(2)}
                    </p>
                  </div>
                  {/* Qty stepper */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <button
                      onClick={() => onUpdateQty(ci.item.id, -1)}
                      style={{
                        width: 28, height: 28, borderRadius: '50%', background: '#F2F2F2',
                        border: 'none', cursor: 'pointer', fontSize: 18, color: '#2D2F33',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}
                    >
                      −
                    </button>
                    <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 15, color: '#2D2F33', minWidth: 16, textAlign: 'center' }}>
                      {ci.quantity}
                    </span>
                    <button
                      onClick={() => onUpdateQty(ci.item.id, 1)}
                      style={{
                        width: 28, height: 28, borderRadius: '50%', background: '#026F4F',
                        border: 'none', cursor: 'pointer', fontSize: 18, color: '#fff',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
              {/* Add more */}
              <button
                onClick={onBack}
                style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 5 }}
              >
                <svg width="19" height="19" viewBox="0 0 19 19" fill="none">
                  <path d="M9.5 1v17M1 9.5h17" stroke="#026F4F" strokeWidth="2" strokeLinecap="round" />
                </svg>
                <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: 13, color: '#026F4F' }}>
                  Add More Items
                </span>
              </button>
            </div>

            {/* Bill summary card */}
            <div style={{ background: '#FFFFFF', border: '1px solid #E9E9E9', borderRadius: 13, padding: '17px 18px' }}>
              <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 19, color: '#2D2F33', marginBottom: 16 }}>
                Bill Summary
              </p>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: 16, color: '#989898' }}>
                  Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)} items)
                </span>
                <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 16, color: '#686868' }}>
                  ${subtotal.toFixed(2)}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
                <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: 16, color: '#989898' }}>
                  Service Charge (10%)
                </span>
                <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 16, color: '#686868' }}>
                  ${serviceCharge.toFixed(2)}
                </span>
              </div>
              <div style={{ borderTop: '1px dashed #989898', paddingTop: 12, display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: 17, color: '#000000' }}>Total</span>
                <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 17, color: '#026F4F' }}>
                  ${total.toFixed(2)}
                </span>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Checkout button */}
      {!isEmpty && (
        <div style={{ position: 'absolute', bottom: 44, left: 16, right: 16 }}>
          <button
            onClick={onCheckout}
            className="btn-primary"
            style={{ justifyContent: 'space-between', padding: '0 33px' }}
          >
            <span>Continue to Checkout</span>
            <span style={{ fontWeight: 700 }}>${total.toFixed(2)}</span>
          </button>
        </div>
      )}

      <HomeIndicator />
    </div>
  );
}
