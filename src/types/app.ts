// App types mirroring Figma App UI screens

export type OrderStatus = 'preparing' | 'ready' | 'served';
export type PaymentMethod = 'card' | 'cash';
export type AppScreen =
  | 'scanning'
  | 'loading'
  | 'detected'
  | 'menu'
  | 'filter'
  | 'no-match'
  | 'food-detail'
  | 'cart'
  | 'empty-cart'
  | 'checkout'
  | 'checkout-split'
  | 'promo-applied'
  | 'promo-denied'
  | 'payment-card'
  | 'payment-cash'
  | 'payment-complete'
  | 'place-order'
  | 'my-orders'
  | 'preparing'
  | 'order-ready'
  | 'served'
  | 'history'
  | 'receipt'
  | 'call-waiter'
  | 'waiter-notifying'
  | 'waiter-success'
  | 'cash-confirmation';

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  isPopular?: boolean;
  options?: OptionGroup[];
}

export interface OptionGroup {
  id: string;
  label: string;
  choices: { id: string; label: string; priceModifier?: number }[];
  selected?: string;
}

export interface CartItem {
  item: MenuItem;
  quantity: number;
  selectedOptions: Record<string, string>;
  note: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  tableNumber: string;
  status: OrderStatus;
  createdAt: Date;
  subtotal: number;
  serviceCharge: number;
  total: number;
  paymentMethod?: PaymentMethod;
  tip?: number;
}
