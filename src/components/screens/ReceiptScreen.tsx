'use client';

import StatusBar from '@/components/StatusBar';
import HomeIndicator from '@/components/HomeIndicator';
import { Order } from '@/types/app';

interface ReceiptScreenProps {
  order: Order;
  onBack: () => void;
  onDone: () => void;
}

export default function ReceiptScreen({ order, onBack, onDone }: ReceiptScreenProps) {
  const handlePrint = () => {
    alert('Receipt download/print feature coming soon.');
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
        Receipt
      </h2>

      <div style={{ position: 'absolute', top: 140, left: 16, right: 16, bottom: 110, overflowY: 'auto' }}>
        {/* Receipt card */}
        <div
          style={{
            background: '#FFFFFF',
            borderRadius: 16,
            overflow: 'hidden',
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
          }}
        >
          {/* Header */}
          <div style={{ background: '#026F4F', padding: '24px 20px', textAlign: 'center' }}>
            <p style={{ fontFamily: 'Satoshi, Inter, sans-serif', fontWeight: 700, fontSize: 22, color: '#FFFFFF', marginBottom: 4 }}>
              🍜 Ramen-Ya
            </p>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.75)' }}>
              Table {order.tableNumber} · {new Date(order.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
            </p>
          </div>

          {/* Jagged edge */}
          <div style={{ height: 12, background: 'linear-gradient(135deg, #F2F2F2 25%, transparent 25%) -10px 0, linear-gradient(225deg, #F2F2F2 25%, transparent 25%) -10px 0, linear-gradient(315deg, #F2F2F2 25%, transparent 25%), linear-gradient(45deg, #F2F2F2 25%, transparent 25%)', backgroundSize: '20px 12px', backgroundRepeat: 'repeat-x' }} />

          <div style={{ padding: '16px 20px' }}>
            {/* Order ID */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#989898' }}>Order #</span>
              <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 13, color: '#2D2F33' }}>{order.id}</span>
            </div>

            {/* Items */}
            {order.items.map((ci) => (
              <div key={ci.item.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                <div style={{ flex: 1, paddingRight: 8 }}>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: 14, color: '#2D2F33' }}>
                    {ci.item.name}
                  </p>
                  {ci.note ? <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#B9B9B9' }}>{ci.note}</p> : null}
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#686868' }}>×{ci.quantity}</p>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 14, color: '#2D2F33' }}>
                    ${(ci.item.price * ci.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}

            {/* Divider */}
            <div style={{ borderTop: '1px dashed #E9E9E9', margin: '12px 0' }} />

            {/* Subtotals */}
            {[
              { label: 'Subtotal', value: order.subtotal },
              { label: 'Service Charge (10%)', value: order.serviceCharge },
            ].map(({ label, value }) => (
              <div key={label} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#989898' }}>{label}</span>
                <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: 14, color: '#686868' }}>${value.toFixed(2)}</span>
              </div>
            ))}

            {/* Divider */}
            <div style={{ borderTop: '2px solid #2D2F33', margin: '12px 0' }} />

            {/* Total */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 18, color: '#2D2F33' }}>TOTAL</span>
              <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 18, color: '#026F4F' }}>${order.total.toFixed(2)}</span>
            </div>

            {/* Payment method */}
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#989898' }}>Payment</span>
              <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: 13, color: '#2D2F33' }}>
                {order.paymentMethod === 'card' ? '💳 Card' : '💵 Cash'}
              </span>
            </div>
          </div>

          {/* Footer */}
          <div style={{ background: '#F2F2F2', padding: '16px 20px', textAlign: 'center' }}>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#989898' }}>Thank you for dining with us! 🙏</p>
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div style={{ position: 'absolute', bottom: 44, left: 16, right: 16, display: 'flex', gap: 12 }}>
        <button
          onClick={handlePrint}
          className="btn-secondary"
          style={{ flex: 1, fontSize: 15 }}
        >
          Download
        </button>
        <button
          onClick={onDone}
          className="btn-primary"
          style={{ flex: 2, fontSize: 15 }}
        >
          Done
        </button>
      </div>

      <HomeIndicator />
    </div>
  );
}
