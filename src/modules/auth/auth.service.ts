import { BadRequestException, Injectable } from '@nestjs/common';

import { UserService } from '../user/user.service';
import { TokenService } from '../token/token.service';

import { LoginUserDto } from './dtos/login-user.dto';
import { CreateUserDto } from '../user/dtos/create-user.dto';

import * as bcrypt from 'bcrypt';

import { userMapper } from '@/common/utils/user-mapper.util';

import { EXCEPTION } from '@/common/constants/exception.constants';

@Injectable()
export class AuthService {
  public constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
  ) {}

  public async signUp(dto: CreateUserDto) {
    const user = await this.userService.findByEmail(dto.email);

    if (user) {
      throw new BadRequestException(EXCEPTION.USER_ALREADY_EXISTS);
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const newUser = await this.userService.create({
      ...dto,
      password: hashedPassword,
    });

    const token = await this.tokenService.generateToken(newUser.id);

    return {
      user: userMapper(newUser),
      token,
    };
  }

  public async signIn(dto: LoginUserDto) {
    const user = await this.userService.findByEmail(dto.email);

    if (!user) {
      throw new BadRequestException(EXCEPTION.USER_NOT_FOUND);
    }

    const isPasswordValid = await bcrypt.compare(dto.password, user.password);

    if (!isPasswordValid) {
      throw new BadRequestException(EXCEPTION.INVALID_PASSWORD);
    }

    const token = await this.tokenService.generateToken(user.id);

    return {
      user: userMapper(user),
      token,
    };
  }
}
