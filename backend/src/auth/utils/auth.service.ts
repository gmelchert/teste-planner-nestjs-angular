import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { LoginDto } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) { }

  async login(dto: LoginDto) {
    // buscar usuário no banco

    const hashedPassword = await bcrypt.hash('senha123', 10);
    const isValid = (dto.email === 'admin@mail.com' && await bcrypt.compare(dto.password, hashedPassword));

    if (!isValid) {
      throw new UnauthorizedException();
    }

    return {
      accessToken: this.jwtService.sign({
        sub: 1,
        email: dto.email,
      }),
    };
  }
}
