import type { ProductVariant } from '@commercetools/platform-sdk';
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
  category: string;
  subCategory: string;
}

export interface ProductInfoProps {
  id: string;
  name: string;
  description?: string;
  price: string;
  discount?: string;
  image?: string;
  images?: { url: string }[];
  sizes?: string[];
  materials?: string[];
  colors?: string[];
  inCart?: number;
  variants?: ProductVariant[];
}

export interface MiniProductCardProps extends ProductCardProps {
  onClick: () => void;
}

export interface Link {
  to: ToPathOption;
  text: string;
}
