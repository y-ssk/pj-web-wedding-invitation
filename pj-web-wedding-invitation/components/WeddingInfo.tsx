type WeddingInfoProps = {
    className?: string;
  };

  export default function WeddingInfo({ className = '' }: WeddingInfoProps) {
    return (
        <section
        className={`bg-white/90 dark:bg-white/30 backdrop-blur-lg p-6 rounded-2xl shadow-xl my-10 text-center max-w-2xl w-full mx-auto ${className}`}
      >
      <h2 className="text-2xl font-semibold mb-2">挙式のご案内</h2>
      <p className="mb-4">
        2025年10月12日（日）
        <br />
        14:00 開式
        <br />
        〇〇チャペル
      </p>

      <h2 className="text-2xl font-semibold mb-2">披露宴のご案内</h2>
      <p>
        15:30 開宴
        <br />
        〇〇レストラン
      </p>
    </section>
  );
}
