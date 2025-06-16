import {
  ArrowDownFilled,
  ArrowSortDownLinesFilled,
  ArrowSortUpLinesFilled,
  ArrowUpFilled,
} from '@fluentui/react-icons';

export const sortOptions = [
  {
    option: 'Alphabetically, A-Z',
    value: 'name.en-us asc',
    icon: <ArrowDownFilled />,
  },
  {
    option: 'Alphabetically, Z-A',
    value: 'name.en-us desc',
    icon: <ArrowUpFilled />,
  },
  {
    option: 'Price, low to high',
    value: 'price asc',
    icon: <ArrowSortUpLinesFilled />,
  },
  {
    option: 'Price, high to low',
    value: 'price desc',
    icon: <ArrowSortDownLinesFilled />,
  },
];
