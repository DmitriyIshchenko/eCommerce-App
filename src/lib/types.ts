import type { ToPathOption } from '@tanstack/react-router';

export interface ProductCardProps {
  value: string;
  name: string;
  description?: string;
  price: string;
  discount?: string;
  image?: string;
}

export interface Link {
  to: ToPathOption;
  text: string;
}
