import type { ProductVariant } from '@commercetools/platform-sdk';
import type { ToPathOption } from '@tanstack/react-router';

export interface ProductCardProps {
  id: string;
  value: string;
  name: string;
  category: string;
  subCategory: string;
  description?: string;
  price: string;
  discount?: string;
  image?: string;
  onCartClick?: (id: string, category: string, subCategory: string) => void;
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
  inCart?: number;
  sizes?: string[];
  materials?: string[];
  colors?: string[];
  variants?: ProductVariant[];
}

export interface MiniProductCardProps extends ProductCardProps {
  onClick: () => void;
}

export interface Link {
  to: ToPathOption;
  text: string;
}

export type ClientType = 'customer' | 'anonymous';
export type PreloadOptions = false | 'intent' | 'viewport' | 'render' | undefined;
