import { Controller, Get, HttpStatus, Param } from '@nestjs/common';

import { CountriesInfoService } from './countries-info.service';

import { DataResponse } from 'src/common/types/data-response.type';

import { RESPONSE_MESSAGE } from 'src/common/constants/response.constants';

@Controller('countries-info')
export class CountriesInfoController {
  public constructor(
    private readonly countriesInfoService: CountriesInfoService,
  ) {}

  @Get('available-countries')
  public async getAvailableCountries(): Promise<DataResponse<any>> {
    const countries = await this.countriesInfoService.getAvailableCountries();

    return {
      data: countries,
      message: RESPONSE_MESSAGE.FETCHED,
      status: HttpStatus.OK,
    };
  }

  @Get('country-info/:countryCode')
  public async getCountryInfo(
    @Param('countryCode') countryCode: string,
  ): Promise<DataResponse<any>> {
    const countryInfo =
      await this.countriesInfoService.getCountryInfo(countryCode);

    return {
      data: countryInfo,
      message: RESPONSE_MESSAGE.FETCHED,
      status: HttpStatus.OK,
    };
  }
}
