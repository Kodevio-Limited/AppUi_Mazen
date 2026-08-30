'use client';

import StatusBar from '@/components/StatusBar';
import HomeIndicator from '@/components/HomeIndicator';
import { Order } from '@/types/app';

type OrderTab = 'ongoing' | 'cart' | 'history';

interface MyOrdersScreenProps {
  order: Order | null;
  onBack: () => void;
  onViewCart: () => void;
  onViewHistory: () => void;
  onViewReceipt: () => void;
}

function StatusStep({ label, done, active }: { label: string; done: boolean; active: boolean }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: '50%',
          background: done ? '#026F4F' : active ? '#E6F1ED' : '#F2F2F2',
          border: `2px solid ${done || active ? '#026F4F' : '#E9E9E9'}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 6,
        }}
      >
        {done ? (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M20 6L9 17L4 12" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ) : active ? (
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#026F4F' }} />
        ) : (
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#B9B9B9' }} />
        )}
      </div>
      <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: active || done ? 600 : 400, fontSize: 12, color: done || active ? '#026F4F' : '#B9B9B9', textAlign: 'center' }}>
        {label}
      </span>
    </div>
  );
}

export default function MyOrdersScreen({ order, onBack, onViewCart, onViewHistory, onViewReceipt }: MyOrdersScreenProps) {
  const activeTab: OrderTab = 'ongoing';
  const status = order?.status ?? 'preparing';

  const steps = [
    { label: 'Order\nPlaced', done: true, active: false },
    { label: 'Preparing', done: status === 'ready' || status === 'served', active: status === 'preparing' },
    { label: 'Ready', done: status === 'served', active: status === 'ready' },
    { label: 'Served', done: false, active: status === 'served' },
  ];

  const statusMessages: Record<string, { icon: string; title: string; subtitle: string; color: string }> = {
    preparing: {
      icon: '👨‍🍳',
      title: 'Preparing Your Order',
      subtitle: 'The kitchen is working on your meal. Estimated time: 15–20 mins.',
      color: '#F97316',
    },
    ready: {
      icon: '🔔',
      title: 'Your Order is Ready!',
      subtitle: 'Your food is ready! A waiter will bring it to your table shortly.',
      color: '#026F4F',
    },
    served: {
      icon: '✅',
      title: 'Order Served!',
      subtitle: 'Enjoy your meal! Let us know if you need anything.',
      color: '#16A34A',
    },
  };

  const msg = statusMessages[status] ?? statusMessages.preparing;

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
        My Order
      </h2>

      {/* Tab switcher */}
      <div style={{ position: 'absolute', top: 175, left: 16, right: 16, background: '#E9E9E9', borderRadius: 37, height: 52, display: 'flex', padding: 5 }}>
        {(['Ongoing', 'Cart', 'History'] as const).map((tab) => {
          const isActive = tab.toLowerCase() === activeTab;
          return (
            <button
              key={tab}
              onClick={() => {
                if (tab === 'Cart') onViewCart();
                if (tab === 'History') onViewHistory();
              }}
              style={{
                flex: 1, borderRadius: 23,
                background: isActive ? '#FFFFFF' : 'transparent',
                border: 'none', cursor: 'pointer',
                fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: 14,
                color: isActive ? '#026F4F' : '#989898',
              }}
            >
              {tab}
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div style={{ position: 'absolute', top: 249, left: 16, right: 16, bottom: 36, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {!order ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: 16, textAlign: 'center' }}>
            <span style={{ fontSize: 52 }}>📋</span>
            <h3 style={{ fontFamily: 'Satoshi, Inter, sans-serif', fontWeight: 700, fontSize: 20, color: '#2D2F33' }}>No active orders</h3>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#989898' }}>Browse the menu and place an order to track it here.</p>
            <button className="btn-primary" onClick={onBack} style={{ marginTop: 8 }}>Browse Menu</button>
          </div>
        ) : (
          <>
            {/* Status card */}
            <div
              style={{
                background: '#FFFFFF',
                borderRadius: 16,
                padding: '24px 20px',
                textAlign: 'center',
                border: `1px solid ${msg.color}22`,
              }}
            >
              <span style={{ fontSize: 48 }}>{msg.icon}</span>
              <h3 style={{ fontFamily: 'Satoshi, Inter, sans-serif', fontWeight: 700, fontSize: 22, color: '#2D2F33', marginTop: 12, marginBottom: 8 }}>
                {msg.title}
              </h3>
              <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: 15, color: '#888888', lineHeight: '1.5em' }}>
                {msg.subtitle}
              </p>
            </div>

            {/* Progress stepper */}
            <div style={{ background: '#FFFFFF', borderRadius: 16, padding: '20px 16px' }}>
              <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 16, color: '#2D2F33', marginBottom: 16 }}>Order Progress</p>
              <div style={{ display: 'flex', alignItems: 'flex-start', position: 'relative' }}>
                {/* Connector line */}
                <div style={{ position: 'absolute', top: 18, left: '12.5%', right: '12.5%', height: 2, background: '#E9E9E9', zIndex: 0 }} />
                {steps.map((step, i) => (
                  <StatusStep key={i} label={step.label.replace('\\n', '\n')} done={step.done} active={step.active} />
                ))}
              </div>
            </div>

            {/* Order items */}
            <div style={{ background: '#FFFFFF', borderRadius: 16, padding: '16px 18px' }}>
              <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 16, color: '#2D2F33', marginBottom: 12 }}>Order Items</p>
              {order.items.map((ci) => (
                <div key={ci.item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 10, marginBottom: 10, borderBottom: '1px solid #F2F2F2' }}>
                  <div>
                    <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: 15, color: '#2D2F33' }}>{ci.item.name}</p>
                    <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#989898' }}>Qty: {ci.quantity}</p>
                  </div>
                  <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 15, color: '#026F4F' }}>
                    ${(ci.item.price * ci.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
                <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 16, color: '#000' }}>Total</span>
                <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 16, color: '#026F4F' }}>${order.total.toFixed(2)}</span>
              </div>
            </div>

            {/* Receipt button */}
            <button
              onClick={onViewReceipt}
              style={{
                width: '100%', height: 52, borderRadius: 30,
                border: '1.5px solid #026F4F', background: '#FFFFFF',
                fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: 16, color: '#026F4F',
                cursor: 'pointer', marginBottom: 8,
              }}
            >
              View Receipt
            </button>
          </>
        )}
      </div>

      <HomeIndicator />
    </div>
  );
}
