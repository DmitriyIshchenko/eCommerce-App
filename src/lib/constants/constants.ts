import canvasLqip from '../../assets/images/material-canvas-lqip.webp';
import canvas from '../../assets/images/material-canvas.png';
import gicleeLqip from '../../assets/images/material-giclee-lqip.webp';
import giclee from '../../assets/images/material-giclee.webp';
import photoragLqip from '../../assets/images/material-photorag-lqip.webp';
import photorag from '../../assets/images/material-photorag.webp';

export interface Color {
  color: string;
  value: string;
  'aria-label': string;
}
export interface SwatchImg {
  swatchSrc: string;
  value: string;
  label: string;
  fullImageSrc: string;
}

export const METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  PATCH: 'PATCH',
  DELETE: 'DELETE',
  OPTIONS: 'OPTIONS',
  HEAD: 'HEAD',
} as const;

export const LOGIN_API_URL = 'https://jsonplaceholder.typicode.com/posts';

export const TOASTER_ID = 'toasterId';

export const DEFAULT_ADDRESS = {
  city: '',
  streetName: '',
  postalCode: '',
  country: 'BY',
};

export const allColors: Color[] = [
  { color: '#E9E9E9', value: 'Original', 'aria-label': 'Original' },
  { color: '#FFFFFF', value: 'White', 'aria-label': 'White' },
  { color: '#3057E1', value: 'Blueprint', 'aria-label': 'Blueprint' },
  { color: '#EEEEE0', value: 'Ivory', 'aria-label': 'Ivory' },
  { color: '#0000FF', value: 'Blue', 'aria-label': 'Blue' },
  { color: '#727B89', value: 'Raven', 'aria-label': 'Raven' },
  { color: '#000080', value: 'Navy', 'aria-label': 'Navy' },
  { color: '#604224', value: 'Sepia', 'aria-label': 'Sepia' },
  { color: '#000000', value: 'Black', 'aria-label': 'Black' },
  { color: '#191970', value: 'Midnight', 'aria-label': 'Midnight' },
  { color: '#DECCA6', value: 'Natural', 'aria-label': 'Natural' },
  { color: '#5F7492', value: 'Tide', 'aria-label': 'Tide' },
];

export const allMaterials: SwatchImg[] = [
  {
    swatchSrc: canvasLqip,
    value: 'canvas',
    label: 'Canvas',
    fullImageSrc: canvas,
  },
  {
    swatchSrc: gicleeLqip,
    value: 'giclee',
    label: 'Giclee',
    fullImageSrc: giclee,
  },
  {
    swatchSrc: photoragLqip,
    value: 'photo-rag',
    label: 'Photo Rag',
    fullImageSrc: photorag,
  },
];
