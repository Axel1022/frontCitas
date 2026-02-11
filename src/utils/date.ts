import { addDays, format, isSameDay, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';

export const toIsoDate = (date: Date) => format(date, 'yyyy-MM-dd');

export const humanDate = (date: Date) =>
  format(date, "EEEE, d 'de' MMMM", { locale: es }).replace(/^\w/, (c) => c.toUpperCase());

export const moveDay = (date: Date, direction: -1 | 1) => addDays(date, direction);

export const isToday = (date: Date) => isSameDay(date, new Date());

export const parseDate = (value: string) => parseISO(value);

export const timeToMinutes = (time: string) => {
  const [h, m] = time.split(':').map(Number);
  return h * 60 + m;
};

export const minutesToLabel = (minutes: number) => {
  const h24 = Math.floor(minutes / 60);
  const m = minutes % 60;
  const suffix = h24 >= 12 ? 'PM' : 'AM';
  const h12 = h24 % 12 || 12;
  return `${h12}:${m.toString().padStart(2, '0')} ${suffix}`;
};
