export interface AddressResult {
  prefecture: string;
  city: string;
  town: string;
}

export async function fetchAddressByPostalCode(postcode: string): Promise<AddressResult | null> {
  const cleanedPostcode = postcode.replace(/[^0-9]/g, '');

  if (cleanedPostcode.length !== 7) {
    throw new Error('郵便番号は7桁で入力してください');
  }

  try {
    const response = await fetch(
      `https://zipcloud.ibsnet.co.jp/api/search?zipcode=${cleanedPostcode}`
    );

    // HTTPレスポンスが成功かどうかの確認
    if (!response.ok) {
      throw new Error('ネットワークエラーが発生しました');
    }

    const data = await response.json();

    // APIレスポンスの確認
    if (data.status !== 200 || !data.results || data.results.length === 0) {
      throw new Error(data.message || '住所情報が取得できませんでした');
    }

    const result = data.results[0];

    return {
      prefecture: result.address1,
      city: result.address2,
      town: result.address3,
    };
  } catch (error) {
    console.error('住所取得エラー:', error);
    throw new Error('住所情報の取得に失敗しました');
  }
}
