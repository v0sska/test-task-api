import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';

import { CountriesInfoModule } from '@/modules/countries-info/countries-info.module';
import { UserModule } from '@/modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '.env.development.local', '.env.test.local'],
    }),
    CountriesInfoModule,
    UserModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
