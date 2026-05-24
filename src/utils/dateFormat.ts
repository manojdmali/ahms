export function formatDisplayDate(value: string | Date | null | undefined) {
  if (!value) return '';

  if (value instanceof Date) {
    return [
      String(value.getDate()).padStart(2, '0'),
      String(value.getMonth() + 1).padStart(2, '0'),
      value.getFullYear(),
    ].join('-');
  }

  const match = value.match(/^(\d{4})-(\d{2})-(\d{2})(.*)$/);
  if (!match) return value;

  return `${match[3]}-${match[2]}-${match[1]}${match[4].replace(/^T/, ' ')}`;
}
