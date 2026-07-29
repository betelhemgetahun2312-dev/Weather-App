'use client';

import { useState, useEffect } from 'react';
import { formatLiveDate, formatLiveTime } from '@/utils/formatters';

interface LiveClockProps {
  className?: string;
  dateClassName?: string;
  timeClassName?: string;
}

export default function LiveClock({ className, dateClassName, timeClassName }: LiveClockProps) {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  if (!now) return null;

  return (
    <div className={className}>
      <p className={dateClassName}>{formatLiveDate(now)}</p>
      <p className={timeClassName}>{formatLiveTime(now)}</p>
    </div>
  );
}
