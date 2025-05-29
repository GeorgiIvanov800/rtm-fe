export function formatDate(
  isoDateString: string,
  locale = navigator.language,
  options?: Intl.DateTimeFormatOptions,
): string | undefined {
  // Parse the “YYYY-MM-DD” string into a Date
  const [year, month, day] = isoDateString.split('-').map(Number);
  const date = new Date(year, month - 1, day);

  return new Intl.DateTimeFormat(locale, {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    ...options,
  }).format(date);
}
