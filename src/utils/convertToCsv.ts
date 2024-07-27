import { DetailedCardData } from '../interfaces/interfaces';

export default function convertToCSV(data: DetailedCardData[]): string {
  if (data.length === 0) {
    return '';
  }

  const headers = Object.keys(data[0]);
  const rows = data.map((item) => {
    return headers
      .map((header) => {
        const value = item[header as keyof DetailedCardData];
        const stringValue = value
          ? `"${value.toString().replace(/"/g, '""')}"`
          : '';
        return stringValue;
      })
      .join(',');
  });

  return [headers.join(',')].concat(rows).join('\n');
}
