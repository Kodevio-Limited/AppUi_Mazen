import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Dine & Order — Restaurant App',
  description: 'Scan your table QR code, browse the menu, and order right from your phone.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
