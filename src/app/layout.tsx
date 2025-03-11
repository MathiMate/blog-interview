import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Blog Inteview',
  description: 'Inteview for Streaver',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
     <html lang="en" suppressHydrationWarning>
      <body style={{ viewTransitionName: "fadeSlide" }}>{children}</body>
    </html>
  );
}
