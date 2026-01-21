import { useMemo } from 'react';

const defaultOptions: Intl.DateTimeFormatOptions = {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
};

export const useDateFormatter = (locale: string = 'de-DE') => {
  const formatter = useMemo(() => {
    return new Intl.DateTimeFormat(locale, defaultOptions);
  }, [locale]);

  const formatDate = (date: Date) => {
    return formatter.format(date);
  };

  return { formatDate };
};
