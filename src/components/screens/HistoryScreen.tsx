'use client';

import StatusBar from '@/components/StatusBar';
import HomeIndicator from '@/components/HomeIndicator';
import { Order } from '@/types/app';

interface HistoryScreenProps {
  orders: Order[];
  onBack: () => void;
  onViewOrder: (order: Order) => void;
  onViewOngoing: () => void;
  onViewCart: () => void;
  onViewReceipt: (order: Order) => void;
}

export default function HistoryScreen({ orders, onBack, onViewOrder, onViewOngoing, onViewCart, onViewReceipt }: HistoryScreenProps) {
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
          const isActive = tab === 'History';
          return (
            <button
              key={tab}
              onClick={() => {
                if (tab === 'Ongoing') onViewOngoing();
                if (tab === 'Cart') onViewCart();
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

      <div style={{ position: 'absolute', top: 249, left: 16, right: 16, bottom: 36, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {orders.length === 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: 16, textAlign: 'center' }}>
            <span style={{ fontSize: 52 }}>🗂️</span>
            <h3 style={{ fontFamily: 'Satoshi, Inter, sans-serif', fontWeight: 700, fontSize: 20, color: '#2D2F33' }}>No past orders</h3>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#989898' }}>Your completed orders will appear here.</p>
          </div>
        ) : (
          orders.map((order) => (
            <div key={order.id} style={{ background: '#FFFFFF', borderRadius: 13, padding: '16px 18px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                <div>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 16, color: '#2D2F33' }}>Order #{order.id}</p>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#989898', marginTop: 2 }}>
                    {new Date(order.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
                <span
                  style={{
                    fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: 12,
                    color: order.status === 'served' ? '#16A34A' : '#F97316',
                    background: order.status === 'served' ? '#DCFCE7' : '#FFF7ED',
                    borderRadius: 20, padding: '3px 10px',
                  }}
                >
                  {order.status === 'served' ? 'Completed' : 'In Progress'}
                </span>
              </div>
              <div style={{ borderTop: '1px solid #F2F2F2', paddingTop: 10 }}>
                {order.items.slice(0, 2).map((ci) => (
                  <p key={ci.item.id} style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#686868', marginBottom: 4 }}>
                    {ci.item.name} × {ci.quantity}
                  </p>
                ))}
                {order.items.length > 2 && (
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#B9B9B9' }}>
                    +{order.items.length - 2} more items
                  </p>
                )}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 }}>
                <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 16, color: '#026F4F' }}>
                  ${order.total.toFixed(2)}
                </span>
                <button
                  onClick={() => onViewReceipt(order)}
                  style={{
                    background: 'none', border: '1px solid #026F4F', borderRadius: 20,
                    padding: '4px 14px', fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: 13,
                    color: '#026F4F', cursor: 'pointer',
                  }}
                >
                  View Receipt
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <HomeIndicator />
    </div>
  );
}
