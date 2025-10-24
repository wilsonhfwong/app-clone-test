import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Providers from '@/components/Providers';
import './globals.css';

export const metadata: Metadata = {
  title: 'Storyboard Studio',
  description: 'Collaborative storyboard ideation with AI assistance.'
};

export default function RootLayout({
  children
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
