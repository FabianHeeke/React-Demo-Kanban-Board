import { useMemo } from 'react';

const dateFormatOptions: Intl.DateTimeFormatOptions = {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
};

const timeFormatOptions: Intl.DateTimeFormatOptions = {
  hour: 'numeric',
  minute: 'numeric',
  hour12: false,
};

export const useDateFormatter = (
  withTime: boolean = false,
  locale: string = 'de-DE'
) => {
  const formatter = useMemo(() => {
    const options = withTime
      ? { ...dateFormatOptions, ...timeFormatOptions }
      : dateFormatOptions;

    return new Intl.DateTimeFormat(locale, options);
  }, [locale, withTime]);

  const formatDate = (date: Date) => {
    return formatter.format(date);
  };

  return { formatDate };
};
