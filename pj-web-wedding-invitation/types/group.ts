// types/group.ts

export type Participant = {
  firstName: string;
  familyName: string;
  firstNameKana: string;
  familyNameKana: string;
  sex: number; // 1: 男性, 2: 女性, 9: その他
  age: number;
  isJoin: boolean;
  message?: string;
  allergyComment?: string;
};

export type GroupFormData = {
  postcode?: string;
  address?: string;
  participants: Participant[];
};
