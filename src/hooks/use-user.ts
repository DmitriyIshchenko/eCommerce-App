import { useContext } from 'react';
import { UserContext } from '../components/contexts/user/context';

export function useUser() {
  const value = useContext(UserContext);
  if (!value) throw new Error('Must be within a user provider');
  return value;
}
