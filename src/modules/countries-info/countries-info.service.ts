import { Injectable } from '@nestjs/common';

import { AxiosUtil } from 'src/common/utils/axios.util';

import { ENDPOINTS } from 'src/common/constants/endpoint.constants';

import { BorderCountriesResponse } from './responses/border-countries.response';
import { PopulationResponse } from './responses/population.response';
import { FlagResponse } from './responses/flags.response';
import { PublicHolidaysResponse } from './responses/public-holidays.response';

@Injectable()
export class CountriesInfoService {
  public constructor(private readonly axiosUtil: AxiosUtil) {}

  public async getAvailableCountries(): Promise<any> {
    const response = await this.axiosUtil.get(ENDPOINTS.AVAILEBLE_COURSES, {
      baseUrlKey: 'API1',
    });
    return response.data;
  }

  public async getCountryInfo(countryCode: string): Promise<any> {
    const borderCountriesResponse = await this.axiosUtil.get(
      ENDPOINTS.COUNTRY_INFO(countryCode),
      {
        baseUrlKey: 'API1',
      },
    );

    const borderCountries =
      borderCountriesResponse.data as BorderCountriesResponse;

    const population = await this.axiosUtil.get(
      ENDPOINTS.COUNTRIES_POPULATION,
      {
        baseUrlKey: 'API2',
      },
    );

    const populationData = (population.data as { data: PopulationResponse[] })
      .data as PopulationResponse[];

    console.log('populationData', populationData);

    const filteredPopulation = populationData.filter(
      (item) => item.country === borderCountries.commonName,
    );

    console.log('filteredPopulation', filteredPopulation);

    const flags = await this.axiosUtil.get(ENDPOINTS.COUNTRIES_FLAGS, {
      baseUrlKey: 'API2',
    });

    const flagsData = (flags.data as { data: FlagResponse[] })
      .data as FlagResponse[];

    const filteredFlags = flagsData.filter(
      (item) => item.name === borderCountries.commonName,
    );

    const result = {
      ...borderCountries,
      population: filteredPopulation,
      flags: filteredFlags[0].flag,
    };

    return result;
  }

  public async getPublicHolidays(
    countryCode: string,
    year: number,
  ): Promise<any> {
    const response = await this.axiosUtil.get(
      ENDPOINTS.PUBLIC_HOLIDAY(countryCode, year),
      {
        baseUrlKey: 'API1',
      },
    );
    return response.data as PublicHolidaysResponse[];
  }
}
