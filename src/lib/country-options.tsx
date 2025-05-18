import getUnicodeFlagIcon from 'country-flag-icons/unicode';

export const countries: Record<
  string,
  {
    country: string;
    zipRegex: string;
    zipFormat: string;
    code: string;
  }
> = {
  AD: {
    country: 'Andorra',
    zipRegex: '^AD(\\d{3})$',
    zipFormat: 'AD###',
    code: 'AD',
  },
  AT: {
    country: 'Austria',
    zipRegex: '^\\d{4}$',
    zipFormat: '####',
    code: 'AT',
  },
  BE: {
    country: 'Belgium',
    zipRegex: '^\\d{4}$',
    zipFormat: '####',
    code: 'BE',
  },
  BR: {
    country: 'Brazil',
    zipRegex: '^\\d{5}-\\d{3}$',
    zipFormat: '#####-###',
    code: 'BR',
  },
  BG: {
    country: 'Bulgaria',
    zipRegex: '^(\\d{4})$',
    zipFormat: '####',
    code: 'BG',
  },
  CA: {
    country: 'Canada',
    zipRegex: '^[ABCEGHJKLMNPRSTVXY]\\d[ABCEGHJ-NPRSTV-Z] ?\\d[ABCEGHJ-NPRSTV-Z]\\d$',
    zipFormat: 'A#A #A#',
    code: 'CA',
  },
  HR: {
    country: 'Croatia',
    zipRegex: 'HR\\-(\\d{5})',
    zipFormat: 'HR-#####',
    code: 'HR',
  },
  CU: {
    country: 'Cuba',
    zipRegex: 'CP\\s(\\d{5})',
    zipFormat: 'CP #####',
    code: 'CU',
  },
  CY: {
    country: 'Cyprus',
    zipRegex: '^(\\d{4})$',
    zipFormat: '####',
    code: 'CY',
  },
  DK: {
    country: 'Denmark',
    zipRegex: '^\\d{4}$',
    zipFormat: '####',
    code: 'DK',
  },
  FR: {
    country: 'France',
    zipRegex: '^\\d{5}$',
    zipFormat: '#####',
    code: 'FR',
  },
  DE: {
    country: 'Germany',
    zipRegex: '^\\d{5}$',
    zipFormat: '#####',
    code: 'DE',
  },
  GR: {
    country: 'Greece',
    zipRegex: '^\\d{5}$',
    zipFormat: '#####',
    code: 'GR',
  },
  IS: {
    country: 'Iceland',
    zipRegex: '^\\d{3}$',
    zipFormat: '###',
    code: 'IS',
  },
  IT: {
    country: 'Italy',
    zipRegex: '^\\d{5}$',
    zipFormat: '#####',
    code: 'IT',
  },
  JP: {
    country: 'Japan',
    zipRegex: '^(\\d{3})-(\\d{4})$',
    zipFormat: '###-####',
    code: 'JP',
  },
  LV: {
    country: 'Latvia',
    zipRegex: '^LV-(\\d{4})$',
    zipFormat: 'LV-####',
    code: 'LV',
  },
  LT: {
    country: 'Lithuania',
    zipRegex: 'LT-(\\d{5})',
    zipFormat: 'LT-#####',
    code: 'LT',
  },
  MX: {
    country: 'Mexico',
    zipRegex: '^\\d{5}$',
    zipFormat: '#####',
    code: 'MX',
  },
  MC: {
    country: 'Monaco',
    zipRegex: '^\\d{5}$',
    zipFormat: '#####',
    code: 'MC',
  },
  LI: {
    country: 'Liechtenstein',
    zipRegex: '^\\d{4}$',
    zipFormat: '####',
    code: 'LI',
  },
  LU: {
    country: 'Luxembourg',
    zipRegex: '^\\d{4}$',
    zipFormat: '####',
    code: 'LU',
  },
  NL: {
    country: 'Netherlands',
    zipRegex: '^\\d{4} ?[A-Z]{2}$',
    zipFormat: '#### AA',
    code: 'NL',
  },
  NO: {
    country: 'Norway',
    zipRegex: '^\\d{4}$',
    zipFormat: '####',
    code: 'NO',
  },
  PL: {
    country: 'Poland',
    zipRegex: '^\\d{2}-\\d{3}$',
    zipFormat: '##-###',
    code: 'PL',
  },
  PT: {
    country: 'Portugal',
    zipRegex: '^\\d{4}-\\d{3}$',
    zipFormat: '####-###',
    code: 'PT',
  },
  RO: {
    country: 'Romania',
    zipRegex: '^(\\d{6})$',
    zipFormat: '######',
    code: 'RO',
  },
  SM: {
    country: 'San Marino',
    zipRegex: '^(4789\\d)$',
    zipFormat: '4789#',
    code: 'SM',
  },
  RS: {
    country: 'Serbia',
    zipRegex: '^(\\d{6})$',
    zipFormat: '######',
    code: 'RS',
  },
  SK: {
    country: 'Slovakia',
    zipRegex: '^(\\d{5})$',
    zipFormat: '#####',
    code: 'SK',
  },
  SI: {
    country: 'Slovenia',
    zipRegex: '^SI-(\\d{4})$',
    zipFormat: 'SI-####',
    code: 'SI',
  },
  ES: {
    country: 'Spain',
    zipRegex: '^\\d{5}$',
    zipFormat: '#####',
    code: 'ES',
  },
  SE: {
    country: 'Sweden',
    zipRegex: '^SE-(\\d{3})\\s(\\d{2})$',
    zipFormat: 'SE-### ##',
    code: 'SE',
  },
  CH: {
    country: 'Switzerland',
    zipRegex: '^\\d{4}$',
    zipFormat: '####',
    code: 'CH',
  },
  TR: {
    country: 'Turkey',
    zipRegex: '^\\d{5}$',
    zipFormat: '#####',
    code: 'TR',
  },
  US: {
    country: 'USA',
    zipRegex: '^\\d{5}-(\\d{4})$',
    zipFormat: '#####-####',
    code: 'US',
  },
};

export const countryOptions = Object.values(countries).map((option) => ({
  children: (
    <option
      style={{ display: 'flex', columnGap: 8, marginLeft: 3 }}
      key={option.code}
      value={option.code}
    >
      {`${getUnicodeFlagIcon(option.code)} ${option.country}`}
    </option>
  ),

  value: option.code,
}));
