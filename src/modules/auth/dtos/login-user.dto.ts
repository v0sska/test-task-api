import { ApiProperty } from '@nestjs/swagger';

import { IsString, IsNotEmpty, IsEmail, MinLength } from 'class-validator';

export class LoginUserDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
