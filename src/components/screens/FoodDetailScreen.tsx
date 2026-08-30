'use client';

import { useState } from 'react';
import Image from 'next/image';
import StatusBar from '@/components/StatusBar';
import HomeIndicator from '@/components/HomeIndicator';
import { MenuItem, CartItem } from '@/types/app';

interface FoodDetailScreenProps {
  item: MenuItem;
  onBack: () => void;
  onAddToCart: (cartItem: CartItem) => void;
}

export default function FoodDetailScreen({ item, onBack, onAddToCart }: FoodDetailScreenProps) {
  const [quantity, setQuantity] = useState(1);
  const [note, setNote] = useState('');
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>(
    Object.fromEntries((item.options ?? []).map((o) => [o.id, o.selected ?? o.choices[0]?.id ?? '']))
  );

  const handleOptionChange = (groupId: string, choiceId: string) => {
    setSelectedOptions((prev) => ({ ...prev, [groupId]: choiceId }));
  };

  const totalPrice = item.price * quantity;

  const handleAdd = () => {
    onAddToCart({
      item,
      quantity,
      selectedOptions,
      note,
    });
    onBack();
  };

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', background: '#F2F2F2', borderRadius: 19, overflow: 'hidden' }}>
      <StatusBar dark />

      {/* Back button */}
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
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M19 12H5M12 5l-7 7 7 7" stroke="#2D2F33" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Food image */}
      <div style={{ position: 'absolute', top: 85, left: 90, width: 260, height: 260 }}>
        <Image
          src={item.image}
          alt={item.name}
          fill
          style={{ objectFit: 'contain' }}
          priority
        />
      </div>

      {/* Bottom white panel */}
      <div
        className="bottom-sheet"
        style={{ top: 369, paddingBottom: 100, overflowY: 'auto' }}
      >
        <div style={{ padding: '19px 16px 0' }}>
          {/* Name & Price */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
            <h2
              style={{
                fontFamily: 'Satoshi, Inter, sans-serif',
                fontWeight: 500,
                fontSize: 28,
                color: '#000000',
                lineHeight: '1.4em',
                flex: 1,
                paddingRight: 12,
              }}
            >
              {item.name}
            </h2>
            <span
              style={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 600,
                fontSize: 19,
                color: '#026F4F',
                lineHeight: '1.4em',
                whiteSpace: 'nowrap',
              }}
            >
              ${item.price.toFixed(2)}
            </span>
          </div>

          {/* Description */}
          <p
            style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 400,
              fontSize: 14,
              color: '#989898',
              lineHeight: '1.63em',
              marginBottom: 24,
            }}
          >
            {item.description}
          </p>

          {/* Options */}
          {(item.options ?? []).map((group) => (
            <div key={group.id} style={{ marginBottom: 24 }}>
              {/* Group header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 19, color: '#2D2F33' }}>
                  {group.label}
                </span>
                <span
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 500,
                    fontSize: 12,
                    color: '#2D2F33',
                    background: '#F2F2F2',
                    borderRadius: 16,
                    padding: '3px 10px',
                  }}
                >
                  Required
                </span>
              </div>

              {/* Choices */}
              {group.choices.map((choice) => {
                const selected = selectedOptions[group.id] === choice.id;
                return (
                  <button
                    key={choice.id}
                    onClick={() => handleOptionChange(group.id, choice.id)}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      width: '100%',
                      padding: '12px 0',
                      background: 'none',
                      border: 'none',
                      borderBottom: '1px solid #F2F2F2',
                      cursor: 'pointer',
                    }}
                  >
                    <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: 16, color: '#2D2F33' }}>
                      {choice.label}
                      {choice.priceModifier ? (
                        <span style={{ color: '#026F4F', marginLeft: 8, fontWeight: 500 }}>
                          +${choice.priceModifier.toFixed(2)}
                        </span>
                      ) : null}
                    </span>
                    {/* Radio circle */}
                    <div
                      style={{
                        width: 22,
                        height: 22,
                        borderRadius: '50%',
                        border: `2px solid ${selected ? '#026F4F' : '#B9B9B9'}`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: selected ? '#026F4F' : 'transparent',
                      }}
                    >
                      {selected && (
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                          <path d="M2 5l2.5 2.5L8 2.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          ))}

          {/* Special instructions */}
          <div style={{ marginBottom: 24 }}>
            <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 19, color: '#2D2F33', marginBottom: 12 }}>
              Special instructions
            </p>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Add note (e.g. no spicy, less salt)"
              style={{
                width: '100%',
                height: 105,
                background: '#F2F2F2',
                border: '1px solid #B9B9B9',
                borderRadius: 9,
                padding: '12px 16px',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 400,
                fontSize: 13,
                color: '#2D2F33',
                resize: 'none',
                outline: 'none',
              }}
            />
          </div>
        </div>
      </div>

      {/* Sticky bottom action bar */}
      <div
        style={{
          position: 'absolute',
          bottom: 34,
          left: 16,
          right: 16,
          display: 'flex',
          gap: 12,
          alignItems: 'center',
        }}
      >
        {/* Qty stepper */}
        <div
          style={{
            width: 110,
            height: 59,
            background: '#F2F2F2',
            borderRadius: 30,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 11,
            flexShrink: 0,
          }}
        >
          <button
            className="qty-btn"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            style={{ fontSize: 24, color: quantity <= 1 ? '#B9B9B9' : '#2D2F33' }}
          >
            −
          </button>
          <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 18, color: '#2D2F33', minWidth: 16, textAlign: 'center' }}>
            {quantity}
          </span>
          <button className="qty-btn" onClick={() => setQuantity(quantity + 1)} style={{ fontSize: 24, color: '#2D2F33' }}>
            +
          </button>
        </div>

        {/* Add to order button */}
        <button
          onClick={handleAdd}
          className="btn-primary"
          style={{ flex: 1, display: 'flex', justifyContent: 'space-between', padding: '0 25px' }}
        >
          <span>Add to Order</span>
          <span>${totalPrice.toFixed(2)}</span>
        </button>
      </div>

      <HomeIndicator />
    </div>
  );
}
