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
  category: string;
  subCategory: string;
  cartGoods?: number;
}

export interface ProductInfoProps {
  id: string;
  name: string;
  description?: string;
  price: string;
  discount?: string;
  image?: string;
  images?: { url: string }[];
  variants?: ProductVariant[];
  inCart?: number;
  sizes?: string[];
  materials?: string[];
  colors?: string[];
}

export interface MiniProductCardProps extends ProductCardProps {
  onClick: () => void;
}

export interface Link {
  to: ToPathOption;
  text: string;
}
