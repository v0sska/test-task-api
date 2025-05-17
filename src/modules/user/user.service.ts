import { BadRequestException, Injectable } from '@nestjs/common';

import { UserRepository } from './user.repository';

import { HolidayEvent, Prisma, User } from '@prisma/client';

import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';

import { EXCEPTION } from '@/common/constants/exception.constants';
import { CreateHolidayDto } from './dtos/create-holiday.dto';
import { CountriesInfoService } from '../countries-info/countries-info.service';

@Injectable()
export class UserService {
  public constructor(
    private readonly userRepository: UserRepository,
    private readonly countryInfoService: CountriesInfoService,
  ) {}

  public async create(dto: CreateUserDto): Promise<User> {
    return await this.userRepository.create(dto);
  }

  public async find(): Promise<User[]> {
    return await this.userRepository.find();
  }

  public async findById(id: string): Promise<User> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new BadRequestException(EXCEPTION.USER_NOT_FOUND);
    }

    return user;
  }

  public async creeateManyHolidayEvents(
    dto: CreateHolidayDto,
    userId: string,
  ): Promise<Prisma.BatchPayload> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new BadRequestException(EXCEPTION.USER_NOT_FOUND);
    }

    const holidayEvents = await this.countryInfoService.getPublicHolidays(
      dto.countryCode,
      dto.year,
    );

    const filteredHolidayEvents = holidayEvents.filter((event) =>
      dto.holidays.includes(event.name),
    );

    if (filteredHolidayEvents.length === 0) {
      throw new BadRequestException(EXCEPTION.HOLIDAY_NOT_FOUND);
    }

    const data = filteredHolidayEvents.map((event) => ({
      name: event.name,
      date: new Date(event.date),
      countryCode: dto.countryCode,
      userId,
    }));

    return await this.userRepository.createManyHolidayEvents(data);
  }

  public async findHolidayEventsByUserId(
    userId: string,
  ): Promise<HolidayEvent[]> {
    const holidayEvents =
      await this.userRepository.findHolidayEventsByUserId(userId);

    if (!holidayEvents) {
      throw new BadRequestException(EXCEPTION.USER_NOT_FOUND);
    }

    return holidayEvents;
  }

  public async findByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findByEmail(email);
  }

  public async update(id: string, updates: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.update(id, updates);

    if (!user) {
      throw new BadRequestException(EXCEPTION.USER_NOT_FOUND);
    }

    return user;
  }

  public async delete(id: string): Promise<User> {
    const user = await this.userRepository.delete(id);

    if (!user) {
      throw new BadRequestException(EXCEPTION.USER_NOT_FOUND);
    }

    return user;
  }
}
