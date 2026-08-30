'use client';

import React from 'react';

interface StatusBarProps {
  dark?: boolean;
}

export default function StatusBar({ dark = false }: StatusBarProps) {
  const color = dark ? '#1E1E1E' : '#FFFFFF';
  return (
    <div className="status-bar" style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10 }}>
      <span
        style={{
          fontFamily: 'Montserrat, sans-serif',
          fontWeight: 600,
          fontSize: 15,
          letterSpacing: '-0.02em',
          color,
        }}
      >
        9:41
      </span>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        {/* Cellular */}
        <svg width="16" height="10" viewBox="0 0 17 12" fill="none">
          <rect x="0" y="6" width="3" height="6" rx="1" fill={color} />
          <rect x="4.5" y="4" width="3" height="8" rx="1" fill={color} />
          <rect x="9" y="2" width="3" height="10" rx="1" fill={color} />
          <rect x="13.5" y="0" width="3" height="12" rx="1" fill={color} />
        </svg>
        {/* Wifi */}
        <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
          <path d="M8 10.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" fill={color} />
          <path d="M5 7.5C5.9 6.6 6.9 6 8 6s2.1.6 3 1.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
          <path d="M2.5 5C4.1 3.4 5.9 2.5 8 2.5s3.9.9 5.5 2.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
          <path d="M0.5 2.5C2.5 0.9 5.1 0 8 0s5.5.9 7.5 2.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        {/* Battery */}
        <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
          <rect x="0.5" y="0.5" width="21" height="11" rx="3.5" stroke={color} />
          <rect x="2" y="2" width="16" height="8" rx="2" fill={color} />
          <path d="M22.5 4.5v3c.8-.4 1.3-1 1.3-1.5s-.5-1.1-1.3-1.5Z" fill={color} />
        </svg>
      </div>
    </div>
  );
}
