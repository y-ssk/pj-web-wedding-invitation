// utils/validation.ts

import { GroupFormData } from '../types/group';

export function validateGroupForm(form: GroupFormData): string[] {
  const errors: string[] = [];

  if (!form.participants.length) {
    errors.push('参加者が1人以上必要です');
  }

  form.participants.forEach((p, i) => {
    if (!p.familyName.trim()) {
      errors.push(`参加者${i + 1}の「姓」が未入力です`);
    }
    if (!p.firstName.trim()) {
      errors.push(`参加者${i + 1}の「名」が未入力です`);
    }
    if (!p.familyNameKana.trim()) {
      errors.push(`参加者${i + 1}の「姓（カナ）」が未入力です`);
    } else if (!/^[ァ-ヶー　]+$/.test(p.familyNameKana)) {
      errors.push(`参加者${i + 1}の「姓（カナ）」はカタカナで入力してください`);
    }
    if (!p.firstNameKana.trim()) {
      errors.push(`参加者${i + 1}の「名（カナ）」が未入力です`);
    } else if (!/^[ァ-ヶー　]+$/.test(p.firstNameKana)) {
      errors.push(`参加者${i + 1}の「名（カナ）」はカタカナで入力してください`);
    }
    if (!(p.age > 0 && p.age < 120)) {
      errors.push(`参加者${i + 1}の「年齢」が不正です`);
    }
  });

  if (form.postcode && !/^\d{3}-?\d{4}$/.test(form.postcode)) {
    errors.push('郵便番号の形式が正しくありません（例: 123-4567）');
  }

  return errors;
}
