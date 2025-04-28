'use client';

import { useState, useRef } from 'react';
import { fetchAddressByPostalCode, AddressResult } from '@/lib/fetchAddressByPostalCode';

interface PostalCodeInputProps {
  onAddressFetched: (address: AddressResult | null) => void;
}

export const PostalCodeInput = ({ onAddressFetched }: PostalCodeInputProps) => {
  const [first, setFirst] = useState('');
  const [second, setSecond] = useState('');
  const [error, setError] = useState('');
  const secondInputRef = useRef<HTMLInputElement>(null);

  const handleFirstChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ''); // 数字以外を除去
    if (value.length <= 3) {
      setFirst(value);
      if (value.length === 3) {
        secondInputRef.current?.focus();
      }
    }
  };

  const handleSecondChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 4) {
      setSecond(value);
    }
  };

  const handleBlur = async () => {
    if (first.length === 3 && second.length === 4) {
      const postalCode = first + second;
      const address = await fetchAddressByPostalCode(postalCode);
      if (address) {
        setError('');
        onAddressFetched(address);
      } else {
        setError('住所が見つかりませんでした');
        onAddressFetched(null);
      }
    } else {
      setError('郵便番号を正しく入力してください');
      onAddressFetched(null);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <input
          type="text"
          inputMode="numeric"
          maxLength={3}
          value={first}
          onChange={handleFirstChange}
          onBlur={handleBlur}
          className="border rounded p-2 w-20 text-center"
          placeholder="123"
        />
        <span>-</span>
        <input
          type="text"
          inputMode="numeric"
          maxLength={4}
          value={second}
          onChange={handleSecondChange}
          onBlur={handleBlur}
          ref={secondInputRef}
          className="border rounded p-2 w-24 text-center"
          placeholder="4567"
        />
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};
