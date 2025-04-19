import '../styles/globals.css';
import { ReactNode } from 'react';
import { Noto_Serif_JP, Playfair_Display } from 'next/font/google';

const notoSerif = Noto_Serif_JP({ subsets: ['latin'], variable: '--font-jp' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-en' });

export const metadata = {
  title: '結婚式 Web 招待状',
  description: '大切な人たちへ、Webで届ける招待状',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ja" className={`${notoSerif.variable} ${playfair.variable}`}>
      <body className="font-jp">{children}</body>
    </html>
  );
}
