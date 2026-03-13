/**
 * Hàm format số tiền sang chuẩn Việt Nam (VD: 100000 -> 100.000 đ)
 */
export const formatCurrency = (amount: number | undefined | null): string => {
  if (amount === undefined || amount === null) return '0 đ';

  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(amount);
};

/**
 * Hàm format ngày tháng (Tùy chọn, sau này có dùng thì viết thêm)
 */
export const formatDate = (dateString: string | Date): string => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('vi-VN').format(date);
};