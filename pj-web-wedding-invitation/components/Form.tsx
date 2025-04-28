'use client';

import { useState } from 'react';
import { GroupFormData, Participant } from '../types/group';
import { validateGroupForm } from '../utils/validation';
import { useRouter } from 'next/navigation';
import { PostalCodeInput } from './PostalCodeInput';

export default function Form() {
  const [form, setForm] = useState<GroupFormData>({
    postcode: '',
    address: '',
    participants: [
      {
        firstName: '',
        familyName: '',
        firstNameKana: '',
        familyNameKana: '',
        sex: 1,
        age: 0,
        isJoin: true,
        message: '',
        allergyComment: '',
      },
    ],
  });

  // ▼ パターンB: 分けた住所
  const [prefecture, setPrefecture] = useState('');
  const [city, setCity] = useState('');
  const [town, setTown] = useState('');

  const [errors, setErrors] = useState<string[]>([]);
  const router = useRouter();

  const handleParticipantChange = (
    index: number,
    field: keyof Participant,
    value: string | number | boolean
  ) => {
    const newParticipants = [...form.participants];
    const participant = newParticipants[index];

    if (!participant) return;

    newParticipants[index] = {
      ...participant,
      [field]: value,
    };

    setForm({ ...form, participants: newParticipants });
  };

  const addParticipant = () => {
    setForm({
      ...form,
      participants: [
        ...form.participants,
        {
          firstName: '',
          familyName: '',
          firstNameKana: '',
          familyNameKana: '',
          sex: 1,
          age: 0,
          isJoin: true,
          message: '',
          allergyComment: '',
        },
      ],
    });
  };

  const removeParticipant = (index: number) => {
    const newParticipants = [...form.participants];
    newParticipants.splice(index, 1);
    setForm({ ...form, participants: newParticipants });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateGroupForm(form);
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    const res = await fetch('/api/group', {
      method: 'POST',
      body: JSON.stringify(form),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (res.ok) {
      router.push('/thanks');
    } else {
      const result = await res.json();
      setErrors([result.error ?? '送信に失敗しました']);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-8 bg-white p-8 rounded-lg shadow-lg max-w-2xl mx-auto"
    >
      <h2 className="text-2xl font-bold text-center mb-6 font-jp">出席登録フォーム</h2>

      {form.participants.map((p, index) => (
        <div key={index} className="space-y-4 border-b pb-6 mb-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-bold">姓</label>
              <input
                type="text"
                className="border p-2 w-full"
                value={p.familyName}
                onChange={(e) => handleParticipantChange(index, 'familyName', e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-bold">名</label>
              <input
                type="text"
                className="border p-2 w-full"
                value={p.firstName}
                onChange={(e) => handleParticipantChange(index, 'firstName', e.target.value)}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-bold">姓（カナ）</label>
              <input
                type="text"
                className="border p-2 w-full"
                value={p.familyNameKana}
                onChange={(e) => handleParticipantChange(index, 'familyNameKana', e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-bold">名（カナ）</label>
              <input
                type="text"
                className="border p-2 w-full"
                value={p.firstNameKana}
                onChange={(e) => handleParticipantChange(index, 'firstNameKana', e.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <label className="block mb-1 font-bold">性別</label>
            <div className="flex gap-4">
              <label>
                <input
                  type="radio"
                  name={`sex-${index}`}
                  value={1}
                  checked={p.sex === 1}
                  onChange={() => handleParticipantChange(index, 'sex', 1)}
                />{' '}
                男性
              </label>
              <label>
                <input
                  type="radio"
                  name={`sex-${index}`}
                  value={2}
                  checked={p.sex === 2}
                  onChange={() => handleParticipantChange(index, 'sex', 2)}
                />{' '}
                女性
              </label>
              <label>
                <input
                  type="radio"
                  name={`sex-${index}`}
                  value={9}
                  checked={p.sex === 9}
                  onChange={() => handleParticipantChange(index, 'sex', 9)}
                />{' '}
                その他
              </label>
            </div>
          </div>

          <div>
            <label className="block mb-1 font-bold">年齢</label>
            <input
              type="number"
              className="border p-2 w-full"
              value={p.age}
              onChange={(e) => handleParticipantChange(index, 'age', Number(e.target.value))}
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-bold">出欠</label>
            <div className="flex gap-4">
              <label>
                <input
                  type="radio"
                  name={`isJoin-${index}`}
                  checked={p.isJoin}
                  onChange={() => handleParticipantChange(index, 'isJoin', true)}
                />{' '}
                出席
              </label>
              <label>
                <input
                  type="radio"
                  name={`isJoin-${index}`}
                  checked={!p.isJoin}
                  onChange={() => handleParticipantChange(index, 'isJoin', false)}
                />{' '}
                欠席
              </label>
            </div>
          </div>

          <div>
            <label className="block mb-1 font-bold">メッセージ（任意）</label>
            <textarea
              className="border p-2 w-full"
              value={p.message ?? ''}
              onChange={(e) => handleParticipantChange(index, 'message', e.target.value)}
            />
          </div>

          <div>
            <label className="block mb-1 font-bold">アレルギー（任意）</label>
            <textarea
              className="border p-2 w-full"
              value={p.allergyComment ?? ''}
              onChange={(e) => handleParticipantChange(index, 'allergyComment', e.target.value)}
            />
          </div>

          {index > 0 && (
            <div className="text-right">
              <button
                type="button"
                className="text-red-500"
                onClick={() => removeParticipant(index)}
              >
                同行者を削除
              </button>
            </div>
          )}
        </div>
      ))}

      <div className="text-center">
        <button
          type="button"
          className="bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white px-6 py-2 rounded-full shadow-sm transition"
          onClick={addParticipant}
        >
          ➕ 同行者を追加
        </button>
      </div>
      {/* 郵便番号フィールド */}
      <div>
        <label className="block text-sm font-medium mb-1">郵便番号</label>
        <PostalCodeInput
          onAddressFetched={(address) => {
            if (address) {
              setPrefecture(address.prefecture);
              setCity(address.city);
              setTown(address.town);
            } else {
              setPrefecture('');
              setCity('');
              setTown('');
            }
          }}
        />
      </div>

      {/* 個別の住所入力フィールド */}
      <div>
        <label className="block text-sm font-medium">都道府県</label>
        <input
          type="text"
          value={prefecture}
          onChange={(e) => setPrefecture(e.target.value)}
          className="border rounded p-2 w-full"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">市区町村</label>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="border rounded p-2 w-full"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">町名以降</label>
        <input
          type="text"
          value={town}
          onChange={(e) => setTown(e.target.value)}
          className="border rounded p-2 w-full"
        />
      </div>

      {errors.length > 0 && (
        <div className="bg-red-100 text-red-700 p-4 rounded">
          {errors.map((e, i) => (
            <div key={i}>{e}</div>
          ))}
        </div>
      )}

      <div className="text-center mt-8">
        <button className="bg-[#FFF8F0] hover:bg-[#FFEBCD] text-gray-700 font-semibold px-8 py-3 rounded-full shadow-md hover:shadow-lg transition-all duration-200">
          🎀 登録する 🎀
        </button>
      </div>
    </form>
  );
}
