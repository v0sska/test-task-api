import { Body, Controller, HttpStatus, Post } from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';

import { CreateUserDto } from '../user/dtos/create-user.dto';
import { LoginUserDto } from './dtos/login-user.dto';

import { DataResponse } from '@/common/types/data-response.type';

import { RESPONSE_MESSAGE } from '@/common/constants/response.constants';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  public constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  public async signUp(@Body() dto: CreateUserDto): Promise<DataResponse<any>> {
    const user = await this.authService.signUp(dto);

    return {
      message: RESPONSE_MESSAGE.SIGN_IN,
      data: user,
      status: HttpStatus.CREATED,
    };
  }

  @Post('sign-in')
  public async signIn(@Body() dto: LoginUserDto): Promise<DataResponse<any>> {
    const user = await this.authService.signIn(dto);

    return {
      message: RESPONSE_MESSAGE.SIGN_IN,
      data: user,
      status: HttpStatus.OK,
    };
  }
}
