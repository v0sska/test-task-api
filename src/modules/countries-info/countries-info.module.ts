import { Module } from '@nestjs/common';

import { CountriesInfoController } from './countries-info.controller';

import { CountriesInfoService } from './countries-info.service';

import { AxiosUtil } from 'src/common/utils/axios.util';

@Module({
  controllers: [CountriesInfoController],
  providers: [CountriesInfoService, AxiosUtil],
  exports: [CountriesInfoService, AxiosUtil],
})
export class CountriesInfoModule {}
