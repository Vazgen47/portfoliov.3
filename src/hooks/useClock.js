import { useEffect, useState } from 'react';

/** Returns the current HH:MM in the given IANA time zone, refreshed every 20 seconds. */
export default function useClock(timeZone) {
  const format = () => {
    try {
      return new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone }).format(new Date());
    } catch {
      return '';
    }
  };
  const [time, setTime] = useState(format);

  useEffect(() => {
    setTime(format());
    const id = window.setInterval(() => setTime(format()), 20000);
    return () => window.clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeZone]);

  return time;
}
