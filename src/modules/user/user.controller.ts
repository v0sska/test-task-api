import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';

import { UserService } from './user.service';

import { HolidayEvent, User } from '@prisma/client';

import { DataResponse } from '@/common/types/data-response.type';

import { ApiTags } from '@nestjs/swagger';

import { RESPONSE_MESSAGE } from '@/common/constants/response.constants';
import { CreateHolidayDto } from './dtos/create-holiday.dto';

import { AuthGuard } from '@/common/guards/auth.guard';

@ApiTags('users')
@Controller('users')
@UseGuards(AuthGuard)
export class UserController {
  public constructor(private readonly userService: UserService) {}

  @Post(':userId/calendar/holidays')
  public async createManyHolidayEvents(
    @Param('userId') userId: string,
    @Body() dto: CreateHolidayDto,
  ): Promise<DataResponse<any>> {
    const holidayEvents = await this.userService.creeateManyHolidayEvents(
      dto,
      userId,
    );

    return {
      message: RESPONSE_MESSAGE.CREATED,
      data: holidayEvents,
      status: HttpStatus.CREATED,
    };
  }

  @Get(':userId/calendar/holidays')
  public async findHolidayEventsByUserId(
    @Param('userId') userId: string,
  ): Promise<DataResponse<HolidayEvent[]>> {
    const holidayEvents =
      await this.userService.findHolidayEventsByUserId(userId);

    return {
      message: RESPONSE_MESSAGE.FETCHED,
      data: holidayEvents,
      status: HttpStatus.OK,
    };
  }

  @Get(':id')
  public async findById(@Param('id') id: string): Promise<DataResponse<User>> {
    const user = await this.userService.findById(id);

    return {
      message: RESPONSE_MESSAGE.FETCHED,
      data: user,
      status: HttpStatus.OK,
    };
  }
}
