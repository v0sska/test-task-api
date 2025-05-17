export const ENDPOINTS = {
  AVAILEBLE_COURSES: '/AvailableCountries',
  COUNTRY_INFO: (countryCode: string) => `CountryInfo/${countryCode}`,
  COUNTRIES_POPULATION: '/countries/population',
  COUNTRIES_FLAGS: '/countries/flag/images',
  PUBLIC_HOLIDAY: (countryCode: string, year: number) =>
    `PublicHolidays/${year}/${countryCode}`,
};
