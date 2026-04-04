export interface ProductAttribute {
  name: string;
  value: string;
}

export function formatVND(price: number): string {
  return new Intl.NumberFormat('vi-VN').format(price);
}

export function calculateTime(targetDate: Date, now: Date = new Date()): {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
} {
  const difference = targetDate.getTime() - now.getTime();

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((difference % (1000 * 60)) / 1000)
  };
}

export function formatDate(date: string | Date, locale: string = 'vi-VN'): string {
  const parsed = typeof date === 'string' ? new Date(date) : date;
  return parsed.toLocaleDateString(locale, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  });
}
