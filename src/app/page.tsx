'use client';

import { useState, useEffect } from 'react';
import ScanningScreen from '@/components/screens/ScanningScreen';
import LoadingScreen from '@/components/screens/LoadingScreen';
import DetectedScreen from '@/components/screens/DetectedScreen';
import MenuScreen from '@/components/screens/MenuScreen';
import FoodDetailScreen from '@/components/screens/FoodDetailScreen';
import CartScreen from '@/components/screens/CartScreen';
import CheckoutScreen from '@/components/screens/CheckoutScreen';
import PaymentScreen from '@/components/screens/PaymentScreen';
import OrderConfirmedScreen from '@/components/screens/OrderConfirmedScreen';
import MyOrdersScreen from '@/components/screens/MyOrdersScreen';
import HistoryScreen from '@/components/screens/HistoryScreen';
import ReceiptScreen from '@/components/screens/ReceiptScreen';
import CallWaiterModal from '@/components/CallWaiterModal';
import { MenuItem, CartItem, Order } from '@/types/app';
import { SERVICE_CHARGE_RATE, ACTIVE_TABLE } from '@/data/menuData';

type Screen =
  | 'scanning'
  | 'loading'
  | 'detected'
  | 'menu'
  | 'food-detail'
  | 'cart'
  | 'checkout'
  | 'payment'
  | 'confirmed'
  | 'orders'
  | 'history'
  | 'receipt';

type WaiterState = 'closed' | 'prompt' | 'notifying' | 'success';
type PaymentMethod = 'card' | 'cash';

function generateOrderId() {
  return String(Math.floor(1000 + Math.random() * 9000));
}

export default function AppPage() {
  const [screen, setScreen] = useState<Screen>('scanning');
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [activeOrder, setActiveOrder] = useState<Order | null>(null);
  const [pastOrders, setPastOrders] = useState<Order[]>([]);
  const [receiptOrder, setReceiptOrder] = useState<Order | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card');
  const [waiterState, setWaiterState] = useState<WaiterState>('closed');

  // auto-advance loading screen
  useEffect(() => {
    if (screen === 'loading') {
      const t = setTimeout(() => setScreen('detected'), 2000);
      return () => clearTimeout(t);
    }
  }, [screen]);

  // auto-advance waiter notifying
  useEffect(() => {
    if (waiterState === 'notifying') {
      const t = setTimeout(() => setWaiterState('success'), 2500);
      return () => clearTimeout(t);
    }
  }, [waiterState]);

  // ── handlers ──────────────────────────────────────────────────

  const handleScanSuccess = () => setScreen('loading');
  const handleConfirmTable = () => setScreen('menu');

  const handleViewItem = (item: MenuItem) => {
    setSelectedItem(item);
    setScreen('food-detail');
  };

  const handleAddToCart = (cartItem: CartItem) => {
    setCartItems((prev) => {
      const existing = prev.find((ci) => ci.item.id === cartItem.item.id);
      if (existing) {
        return prev.map((ci) =>
          ci.item.id === cartItem.item.id
            ? { ...ci, quantity: ci.quantity + cartItem.quantity }
            : ci
        );
      }
      return [...prev, cartItem];
    });
  };

  const handleUpdateQty = (itemId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((ci) => (ci.item.id === itemId ? { ...ci, quantity: ci.quantity + delta } : ci))
        .filter((ci) => ci.quantity > 0)
    );
  };

  const handleCheckout = () => setScreen('checkout');

  const handlePayCard = () => {
    setPaymentMethod('card');
    setScreen('payment');
  };

  const handlePayCash = () => {
    setPaymentMethod('cash');
    setScreen('payment');
  };

  const handlePaymentConfirmed = () => {
    const subtotal = cartItems.reduce((s, ci) => s + ci.item.price * ci.quantity, 0);
    const serviceCharge = subtotal * SERVICE_CHARGE_RATE;
    const total = subtotal + serviceCharge;

    const newOrder: Order = {
      id: generateOrderId(),
      items: [...cartItems],
      tableNumber: ACTIVE_TABLE,
      status: 'preparing',
      createdAt: new Date(),
      subtotal,
      serviceCharge,
      total,
      paymentMethod,
    };
    setActiveOrder(newOrder);
    setCartItems([]);
    setScreen('confirmed');
  };

  const handleViewStatus = () => setScreen('orders');

  const handleViewReceipt = (order?: Order) => {
    setReceiptOrder(order ?? activeOrder);
    setScreen('receipt');
  };

  const handleWaiterCall = () => setWaiterState('prompt');
  const handleWaiterCallNow = () => setWaiterState('notifying');
  const handleWaiterClose = () => setWaiterState('closed');

  // Simulate order status progression for demo
  const handleSimulateStatus = () => {
    if (!activeOrder) return;
    setActiveOrder((prev) => {
      if (!prev) return prev;
      const next: Record<string, Order['status']> = { preparing: 'ready', ready: 'served', served: 'served' };
      const newStatus = next[prev.status] ?? 'served';
      if (newStatus === 'served') {
        setPastOrders((p) => [{ ...prev, status: 'served' }, ...p]);
      }
      return { ...prev, status: newStatus };
    });
  };

  const cartTotal = (() => {
    const sub = cartItems.reduce((s, ci) => s + ci.item.price * ci.quantity, 0);
    return sub + sub * SERVICE_CHARGE_RATE;
  })();

  // ── render ────────────────────────────────────────────────────

  return (
    <div className="phone-wrapper">
      <div className="mobile-screen fade-in">
        {screen === 'scanning' && (
          <ScanningScreen onScanSuccess={handleScanSuccess} />
        )}

        {screen === 'loading' && (
          <LoadingScreen />
        )}

        {screen === 'detected' && (
          <DetectedScreen tableNumber={ACTIVE_TABLE} onConfirm={handleConfirmTable} />
        )}

        {screen === 'menu' && (
          <>
            <MenuScreen
              cartItems={cartItems}
              onViewItem={handleViewItem}
              onViewCart={() => setScreen('cart')}
              onCallWaiter={handleWaiterCall}
            />
            {waiterState !== 'closed' && (
              <CallWaiterModal
                state={waiterState as 'prompt' | 'notifying' | 'success'}
                onCancel={handleWaiterClose}
                onCallNow={handleWaiterCallNow}
              />
            )}
          </>
        )}

        {screen === 'food-detail' && selectedItem && (
          <FoodDetailScreen
            item={selectedItem}
            onBack={() => setScreen('menu')}
            onAddToCart={handleAddToCart}
          />
        )}

        {screen === 'cart' && (
          <CartScreen
            cartItems={cartItems}
            onBack={() => setScreen('menu')}
            onUpdateQty={handleUpdateQty}
            onCheckout={handleCheckout}
            onViewOrders={() => setScreen('orders')}
            onViewHistory={() => setScreen('history')}
          />
        )}

        {screen === 'checkout' && (
          <CheckoutScreen
            cartItems={cartItems}
            onBack={() => setScreen('cart')}
            onPayCard={handlePayCard}
            onPayCash={handlePayCash}
          />
        )}

        {screen === 'payment' && (
          <PaymentScreen
            total={cartTotal}
            method={paymentMethod}
            onBack={() => setScreen('checkout')}
            onConfirm={handlePaymentConfirmed}
          />
        )}

        {screen === 'confirmed' && activeOrder && (
          <OrderConfirmedScreen
            orderId={activeOrder.id}
            total={activeOrder.total}
            onViewStatus={handleViewStatus}
          />
        )}

        {screen === 'orders' && (
          <>
            <MyOrdersScreen
              order={activeOrder}
              onBack={() => setScreen('menu')}
              onViewCart={() => setScreen('cart')}
              onViewHistory={() => setScreen('history')}
              onViewReceipt={() => handleViewReceipt()}
            />
            {/* Demo: Status advance button */}
            {activeOrder && activeOrder.status !== 'served' && (
              <button
                onClick={handleSimulateStatus}
                style={{
                  position: 'absolute',
                  bottom: 50,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  background: 'rgba(2,111,79,0.15)',
                  border: '1px dashed #026F4F',
                  borderRadius: 20,
                  padding: '6px 16px',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: 12,
                  color: '#026F4F',
                  cursor: 'pointer',
                  zIndex: 30,
                  whiteSpace: 'nowrap',
                }}
              >
                Demo: Advance order status →
              </button>
            )}
          </>
        )}

        {screen === 'history' && (
          <HistoryScreen
            orders={pastOrders}
            onBack={() => setScreen('menu')}
            onViewOrder={(o) => {
              setActiveOrder(o);
              setScreen('orders');
            }}
            onViewCart={() => setScreen('cart')}
            onViewReceipt={(o) => handleViewReceipt(o)}
          />
        )}

        {screen === 'receipt' && (receiptOrder ?? activeOrder) && (
          <ReceiptScreen
            order={(receiptOrder ?? activeOrder)!}
            onBack={() => setScreen(screen === 'receipt' ? 'orders' : 'history')}
            onDone={() => setScreen('menu')}
          />
        )}
      </div>

      {/* Navigation breadcrumb below phone (dev helper) */}
      <div
        style={{
          position: 'fixed',
          bottom: 16,
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'rgba(0,0,0,0.7)',
          color: 'rgba(255,255,255,0.7)',
          borderRadius: 20,
          padding: '6px 16px',
          fontFamily: 'monospace',
          fontSize: 12,
          backdropFilter: 'blur(8px)',
          zIndex: 9999,
          whiteSpace: 'nowrap',
        }}
      >
        📱 {screen} {cartItems.length > 0 ? `· 🛒 ${cartItems.reduce((a, c) => a + c.quantity, 0)}` : ''}
      </div>
    </div>
  );
}
