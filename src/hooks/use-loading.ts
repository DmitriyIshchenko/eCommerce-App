import { useContext } from 'react';
import { LoadingContext } from '../components/contexts/loading/context';

export function useLoading() {
  const value = useContext(LoadingContext);
  if (!value) throw new Error('Must be within a user provider');
  return value;
}
