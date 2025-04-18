module.exports = {
  root: true,
  extends: [
    'next/core-web-vitals',
    'plugin:prettier/recommended', // ← Prettierとの連携ポイント
  ],
  plugins: ['prettier'],
  rules: {
    // 任意の上書きルール。以下は例
    'prettier/prettier': 'error', // Prettier違反をエラーとして扱う
    'no-console': 'warn',
    'react/react-in-jsx-scope': 'off', // Next.jsなら不要
  },
};
