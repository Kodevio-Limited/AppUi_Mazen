'use client';

import { useState } from 'react';
import Image from 'next/image';
import StatusBar from '@/components/StatusBar';
import HomeIndicator from '@/components/HomeIndicator';
import { MenuItem, CartItem } from '@/types/app';
import { menuItems, menuCategories, ACTIVE_TABLE } from '@/data/menuData';

interface MenuScreenProps {
  cartItems: CartItem[];
  onViewItem: (item: MenuItem) => void;
  onViewCart: () => void;
  onCallWaiter: () => void;
}

const popularItems = menuItems.filter((m) => m.isPopular);

export default function MenuScreen({ cartItems, onViewItem, onViewCart, onCallWaiter }: MenuScreenProps) {
  const [activeCategory, setActiveCategory] = useState('popular');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilter, setShowFilter] = useState(false);

  const cartCount = cartItems.reduce((acc, c) => acc + c.quantity, 0);

  const filteredItems = menuItems.filter((item) => {
    const matchesSearch =
      !searchQuery ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      activeCategory === 'popular' ? item.isPopular : activeCategory === 'all' ? true : item.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const noResults = searchQuery && filteredItems.length === 0;

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        background: '#E6F1ED',
        borderRadius: 19,
        overflow: 'hidden',
      }}
    >
      <StatusBar dark />

      {/* Header area */}
      <div style={{ position: 'absolute', top: 52, left: 17, right: 17 }}>
        {/* Logo */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <div
            style={{
              fontFamily: 'Satoshi, Inter, sans-serif',
              fontWeight: 700,
              fontSize: 22,
              color: '#026F4F',
              letterSpacing: '-0.5px',
            }}
          >
            🍜 Ramen-Ya
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {/* Language */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                background: '#FFFFFF',
                borderRadius: 35,
                padding: '4px 13px',
                height: 51,
              }}
            >
              <svg width="23" height="23" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="#026F4F" strokeWidth="1.5" />
                <path d="M12 2C12 2 8 7 8 12s4 10 4 10M12 2c0 0 4 5 4 10s-4 10-4 10M2 12h20" stroke="#026F4F" strokeWidth="1.5" />
              </svg>
              <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: 16, color: '#026F4F' }}>EN</span>
            </div>
            {/* Cart */}
            <button
              onClick={onViewCart}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 9,
                background: '#026F4F',
                borderRadius: 46,
                padding: '14px 19px',
                border: 'none',
                cursor: 'pointer',
                position: 'relative',
              }}
            >
              <svg width="23" height="23" viewBox="0 0 24 24" fill="none">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <line x1="3" y1="6" x2="21" y2="6" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M16 10a4 4 0 0 1-8 0" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: 16, color: '#FFFFFF' }}>
                My Order
              </span>
              {cartCount > 0 && (
                <span
                  style={{
                    position: 'absolute',
                    top: -6,
                    right: -6,
                    background: '#E52B2B',
                    color: '#fff',
                    borderRadius: '50%',
                    width: 20,
                    height: 20,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 11,
                    fontWeight: 700,
                  }}
                >
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Table info */}
        <div style={{ marginBottom: 16 }}>
          <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: 15, color: '#686868', lineHeight: '1.4em' }}>
            You&apos;re seated at table
          </p>
          <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 60, color: '#026F4F', lineHeight: '1.2em' }}>
            {ACTIVE_TABLE}
          </p>
        </div>

        {/* Search bar */}
        <div
          style={{
            background: '#FFFFFF',
            border: '1px solid #B1D2C8',
            borderRadius: 27,
            height: 52,
            display: 'flex',
            alignItems: 'center',
            padding: '0 16px',
            gap: 12,
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="11" cy="11" r="8" stroke="#989898" strokeWidth="1.5" />
            <path d="M21 21l-4.35-4.35" stroke="#989898" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search ramen, gyoza, drinks..."
            style={{
              border: 'none',
              outline: 'none',
              background: 'transparent',
              fontFamily: 'Inter, sans-serif',
              fontWeight: 400,
              fontSize: 16,
              color: '#2D2F33',
              flex: 1,
            }}
          />
          {/* Filter icon */}
          <button
            onClick={() => setShowFilter(true)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
          >
            <svg width="43" height="43" viewBox="0 0 43 43" fill="none">
              <rect width="43" height="43" rx="21.5" fill="#026F4F" />
              <path d="M13 16h17M16 21.5h11M19 27h5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>

      {/* White panel sliding up */}
      <div
        className="bottom-sheet"
        style={{
          top: 361,
          borderRadius: '30px 30px 0 0',
          overflowY: 'auto',
          paddingBottom: 40,
        }}
      >
        <div style={{ padding: '16px 16px 0' }}>
          {/* Category pills */}
          <div style={{ display: 'flex', gap: 9, overflowX: 'auto', paddingBottom: 4, marginBottom: 18 }}>
            {[
              { id: 'popular', label: '🔥 Popular' },
              { id: 'ramen', label: 'Ramen' },
              { id: 'gyoza', label: 'Gyoza' },
              { id: 'rice', label: 'Rice' },
              { id: 'drinks', label: 'Drinks' },
              { id: 'all', label: 'All Items' },
            ].map((cat) => (
              <button
                key={cat.id}
                className={`category-pill ${activeCategory === cat.id ? 'active' : 'inactive'}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Popular Now section */}
          {activeCategory === 'popular' && !searchQuery && (
            <div style={{ marginBottom: 22 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 14 }}>
                <span style={{ fontSize: 18 }}>🔥</span>
                <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: 19, color: '#2D2F33' }}>
                  Popular Now
                </span>
              </div>
              <div style={{ display: 'flex', gap: 16, overflowX: 'auto', paddingBottom: 4 }}>
                {popularItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => onViewItem(item)}
                    style={{
                      flexShrink: 0,
                      width: 196,
                      height: 238,
                      background: '#FFFFFF',
                      border: '1px solid #E9E9E9',
                      borderRadius: 13,
                      cursor: 'pointer',
                      textAlign: 'left',
                      padding: 0,
                      overflow: 'hidden',
                    }}
                  >
                    <div style={{ width: '100%', height: 130, position: 'relative', background: '#F2F2F2' }}>
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        style={{ objectFit: 'cover', borderRadius: '13px 13px 0 0' }}
                      />
                    </div>
                    <div style={{ padding: '8px 10px' }}>
                      <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 13, color: '#2D2F33', lineHeight: '1.4em' }}>
                        {item.name}
                      </p>
                      <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 13, color: '#026F4F', marginTop: 4 }}>
                        ${item.price.toFixed(2)}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* All items list */}
          <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: 19, color: '#2D2F33', marginBottom: 14 }}>
            {searchQuery ? 'Search Results' : 'All Items'}
          </p>

          {noResults ? (
            <div style={{ textAlign: 'center', padding: '48px 0' }}>
              <p style={{ fontSize: 40, marginBottom: 12 }}>🍽️</p>
              <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 18, color: '#2D2F33' }}>No Match Found</p>
              <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: 14, color: '#989898', marginTop: 8 }}>
                Try searching for something else.
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, paddingBottom: 80 }}>
              {filteredItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onViewItem(item)}
                  style={{
                    background: '#FFFFFF',
                    border: '1px solid #E9E9E9',
                    borderRadius: 13,
                    height: 112,
                    display: 'flex',
                    alignItems: 'center',
                    cursor: 'pointer',
                    textAlign: 'left',
                    padding: 0,
                    overflow: 'hidden',
                  }}
                >
                  {/* Thumbnail */}
                  <div style={{ width: 94, height: 112, flexShrink: 0, position: 'relative', background: '#F2F2F2' }}>
                    <Image src={item.image} alt={item.name} fill style={{ objectFit: 'cover' }} />
                  </div>
                  {/* Details */}
                  <div style={{ flex: 1, padding: '9px 10px' }}>
                    <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 15, color: '#2D2F33', lineHeight: '1.4em', marginBottom: 4 }}>
                      {item.name}
                    </p>
                    <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: 12, color: '#989898', lineHeight: '1.4em', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {item.description}
                    </p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 }}>
                      <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 15, color: '#026F4F' }}>
                        ${item.price.toFixed(2)}
                      </p>
                      <div
                        style={{
                          width: 28,
                          height: 28,
                          borderRadius: '50%',
                          background: '#026F4F',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <path d="M7 1v12M1 7h12" stroke="white" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Call a Waiter FAB */}
      <div style={{ position: 'absolute', bottom: 48, right: 16, zIndex: 20 }}>
        <button
          onClick={onCallWaiter}
          style={{
            background: '#2D2F33',
            color: '#FFFFFF',
            border: 'none',
            borderRadius: 13,
            padding: '10px 14px',
            fontFamily: 'Inter, sans-serif',
            fontWeight: 500,
            fontSize: 13,
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 4,
            boxShadow: '0 4px 20px rgba(0,0,0,0.25)',
          }}
        >
          <span>🛎️</span>
          <span>Call a Waiter</span>
        </button>
      </div>

      {/* Filter Drawer overlay */}
      {showFilter && (
        <div className="overlay" onClick={() => setShowFilter(false)}>
          <div
            className="slide-up"
            onClick={(e) => e.stopPropagation()}
            style={{
              background: '#FFFFFF',
              borderRadius: '24px 24px 0 0',
              padding: 24,
              width: '100%',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <h3 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 20, color: '#2D2F33' }}>
                Filter Menu
              </h3>
              <button onClick={() => setShowFilter(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#989898' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M18 6L6 18M6 6l12 12" stroke="#989898" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            </div>
            {/* Price Range */}
            <div style={{ marginBottom: 20 }}>
              <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: 16, color: '#2D2F33', marginBottom: 12 }}>
                Price Range
              </p>
              {['Under $10', '$10 – $15', '$15 – $20', 'Over $20'].map((r) => (
                <label key={r} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '8px 0', cursor: 'pointer' }}>
                  <input type="checkbox" style={{ accentColor: '#026F4F', width: 18, height: 18 }} />
                  <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: 15, color: '#2D2F33' }}>{r}</span>
                </label>
              ))}
            </div>
            <button
              className="btn-primary"
              onClick={() => setShowFilter(false)}
            >
              Apply Filters
            </button>
            <div className="home-indicator" style={{ marginTop: 16 }} />
          </div>
        </div>
      )}

      <HomeIndicator />
    </div>
  );
}
