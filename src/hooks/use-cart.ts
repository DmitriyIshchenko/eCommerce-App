import { useContext } from 'react';
import { CartContext } from '../components/contexts/cart/context';

export function useCart() {
  const value = useContext(CartContext);
  if (!value) throw new Error('Must be within a user provider');
  return value;
}
