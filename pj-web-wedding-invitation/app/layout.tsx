import '@/styles/globals.css';
import { ReactNode } from 'react';
import { Noto_Serif_JP, Playfair_Display } from 'next/font/google';
import { Great_Vibes } from 'next/font/google';

const notoSerif = Noto_Serif_JP({ subsets: ['latin'], variable: '--font-jp' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-en' });

const greatVibes = Great_Vibes({
  subsets: ['latin'],
  variable: '--font-fancy',
  weight: ['400'], // Great Vibes は 400 のみ
});

export const metadata = {
  title: '結婚式 Web 招待状',
  description: '大切な人たちへ、Webで届ける招待状',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ja" className={`${notoSerif.variable} ${playfair.variable} ${greatVibes.variable}`}>
      <body className="font-jp">{children}</body>
    </html>
  );
}
