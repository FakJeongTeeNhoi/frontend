export function DayFormatter(dateString: Date) {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = { weekday: "short" };
  return date.toLocaleDateString("en-US", options).toUpperCase();
}
