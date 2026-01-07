import {
  Body,
  Controller,
  Post,
} from '@nestjs/common';

import { AuthService, LoginDto } from './utils';
import { Public } from '../shared/decorators';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Public()
  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }
}
