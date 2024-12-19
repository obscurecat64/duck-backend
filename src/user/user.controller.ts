import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Request,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { UserService } from './user.service';
import { RegisterDto } from './user.dto';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    await this.userService.register(registerDto);
  }

  @UseGuards(AuthGuard)
  @Get('me')
  async getCurrentUserInfo(@Request() req: unknown) {
    // return info from jwt
    return req['jwt'];
  }
}
