import { format, parseISO } from "date-fns";

export function formatDate(dateString: string): string {
  const date = parseISO(dateString);
  return format(date, "dd-MM-yyyy");
}

export function formatTimeRange(
  startDateString: string,
  endDateString: string
): string {
  const startDate = parseISO(startDateString);
  const endDate = parseISO(endDateString);
  return `${format(startDate, "HH:mm")} - ${format(endDate, "HH:mm")}`;
}

export function formatFullDateTime(dateString: string): string {
  const date = parseISO(dateString);
  return format(date, "HH:mm dd-MM-yyyy");
}
