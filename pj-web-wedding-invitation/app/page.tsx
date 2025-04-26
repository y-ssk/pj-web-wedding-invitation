'use client';

import Link from 'next/link';
import ImageCarousel from '../components/ImageCarousel';
import WeddingInfo from '../components/WeddingInfo';

export default function HomePage() {
  return (
    <main
      className="relative z-10 flex min-h-screen flex-col items-center justify-start p-4 bg-cover bg-center"
      style={{ backgroundImage: "url('/images/wedding-bg.jpg')" }}
    >
      {/* カルーセルに余白＆レスポンシブ比率 */}
      {/* <div className="mt-12 w-full max-w-3xl aspect-[16/9]">
        <ImageCarousel />
      </div> */}
<div className="relative z-0 mt-12 w-full max-w-4xl mx-auto px-4">
  <div className="w-full max-w-[70%] mx-auto">
    <ImageCarousel />
  </div>
</div>
      {/* 見出しと本文 */}
      <h1 className="text-4xl font-fancy font-bold text-white mt-12 mb-4 text-center drop-shadow-md">
        Our Wedding Invitation
      </h1>
      <h2 className="text-xl text-white font-jp">結婚式へのご招待</h2>
      <p className="mb-8 text-center text-white text-lg drop-shadow font-jp leading-relaxed">
        この度、私たちは結婚することとなりました。
        <br />
        ささやかではございますが、挙式・披露宴を執り行います。
        <br />
        ぜひご出席いただきたく、ご案内申し上げます。
      </p>

      <WeddingInfo className="relative z-10"/>

      {/* CTA ボタン */}
      <Link
        href="/register"
        className="relative z-10 rounded-xl bg-white text-gray-800 px-6 py-3 shadow-lg hover:bg-gray-100 transition-all mt-6 font-semibold"
      >
        ご出席の登録へ進む
      </Link>

      {/* <Link
        href="/register"
        className="rounded bg-white/80 text-gray-800 px-6 py-3 shadow-md hover:bg-white transition-all mt-6"
      >
        ご出席の登録へ進む
      </Link> */}
    </main>
  );
}
