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
  BY: {
    country: 'Belarus',
    zipRegex: '^\\d{6}$',
    zipFormat: '######',
    code: 'BY',
  },
  RU: {
    country: 'Russia',
    zipRegex: '^\\d{6}$',
    zipFormat: '######',
    code: 'RU',
  },
  US: {
    country: 'USA',
    zipRegex: '^\\d{5}(-\\d{4})?$', // Improved to support both 5 and 9-digit formats
    zipFormat: '##### or #####-####',
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
