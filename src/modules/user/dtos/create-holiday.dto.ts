import { ApiProperty } from '@nestjs/swagger';

import {
  IsString,
  IsArray,
  ArrayNotEmpty,
  ArrayMinSize,
  IsISO31661Alpha2,
  IsNumber,
  IsNotEmpty,
} from 'class-validator';

export class CreateHolidayDto {
  @ApiProperty()
  @IsString()
  @IsISO31661Alpha2()
  @IsNotEmpty()
  countryCode: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  year: number;

  @ApiProperty()
  @IsArray()
  @ArrayNotEmpty()
  @ArrayMinSize(1)
  @IsString({ each: true })
  holidays: string[];
}
