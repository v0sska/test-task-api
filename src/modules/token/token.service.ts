import { Injectable } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenService {
  public constructor(private readonly jwtService: JwtService) {}

  public async generateToken(userId: string): Promise<string> {
    const payload = { userId };
    return this.jwtService.signAsync(payload);
  }

  public async verifyToken(token: string): Promise<any> {
    try {
      return await this.jwtService.verifyAsync(token);
    } catch (error) {
      throw new Error('Invalid token');
    }
  }
}
