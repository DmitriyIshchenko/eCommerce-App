import type { ToPathOption } from '@tanstack/react-router';

export interface ProductCardProps {
  id: string;
  value: string;
  name: string;
  description?: string;
  price: string;
  discount?: string;
  image?: string;
  onCartClick?: (id: string) => void;
  cartGoods?: number;
}

export interface ProductInfoProps extends ProductCardProps {
  images?: { url: string }[];
}

export interface MiniProductCardProps extends ProductCardProps {
  onClick: () => void;
}

export interface Link {
  to: ToPathOption;
  text: string;
}

export type ClientType = 'customer' | 'anonymous';
