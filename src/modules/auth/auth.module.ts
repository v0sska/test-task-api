import { Module } from '@nestjs/common';

import { UserModule } from '../user/user.module';
import { TokenModule } from '../token/token.module';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
  imports: [UserModule, TokenModule],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [],
})
export class AuthModule {}
