import { Injectable, InternalServerErrorException } from '@nestjs/common';

import { PrismaService } from '@/database/prisma.service';

import { BaseRepository } from '@/common/types/base-repository.type';

import { User, HolidayEvent, Prisma } from '@prisma/client';

import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';

@Injectable()
export class UserRepository extends BaseRepository<
  User | null,
  CreateUserDto,
  UpdateUserDto
> {
  public constructor(private readonly prismaService: PrismaService) {
    super();
  }

  public async create(dto: CreateUserDto): Promise<User> {
    return await this.prismaService.user
      .create({
        data: dto,
      })
      .catch((error) => {
        throw new InternalServerErrorException(error.message);
      });
  }

  public async createManyHolidayEvents(
    data: Array<{
      name: string;
      date: Date;
      countryCode: string;
      userId: string;
    }>,
  ): Promise<Prisma.BatchPayload> {
    return await this.prismaService.holidayEvent
      .createMany({ data })
      .catch((error) => {
        throw new InternalServerErrorException(error.message);
      });
  }

  public async findHolidayEventsByUserId(
    userId: string,
  ): Promise<HolidayEvent[]> {
    return await this.prismaService.holidayEvent
      .findMany({
        where: {
          userId,
        },
        orderBy: {
          date: 'asc',
        },
      })
      .catch((error) => {
        throw new InternalServerErrorException(error.message);
      });
  }

  public async find(): Promise<User[]> {
    return await this.prismaService.user.findMany().catch((error) => {
      throw new InternalServerErrorException(error.message);
    });
  }

  public async findById(id: string): Promise<User | null> {
    return await this.prismaService.user
      .findUnique({
        where: {
          id,
        },
      })
      .catch((error) => {
        throw new InternalServerErrorException(error.message);
      });
  }

  public async findByEmail(email: string): Promise<User | null> {
    return await this.prismaService.user
      .findUnique({
        where: {
          email,
        },
      })
      .catch((error) => {
        throw new InternalServerErrorException(error.message);
      });
  }

  public async update(id: string, updates: UpdateUserDto): Promise<User> {
    return await this.prismaService.user
      .update({
        where: {
          id,
        },
        data: updates,
      })
      .catch((error) => {
        throw new InternalServerErrorException(error.message);
      });
  }

  public async delete(id: string): Promise<User> {
    return await this.prismaService.user
      .delete({
        where: {
          id,
        },
      })
      .catch((error) => {
        throw new InternalServerErrorException(error.message);
      });
  }
}
