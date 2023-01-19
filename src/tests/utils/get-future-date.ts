import { setYear, parseISO } from "date-fns";

export function getFutureDate(date: string): Date {
  const parsedDate = parseISO(date);
  return setYear(parsedDate, new Date().getFullYear() + 1);
}
