import { useEffect, useState } from 'react';

export default function useLs(key: string) {
  const [lsValue, setLsValue] = useState(localStorage.getItem(key));
  useEffect(() => {
    if (lsValue) localStorage.setItem(key, lsValue);
  }, [key, lsValue]);
  return { lsValue, setLsValue };
}
