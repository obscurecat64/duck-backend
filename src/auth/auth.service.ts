import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { SignInDto } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(signInDto: SignInDto) {
    const { username, password } = signInDto;
    const user = await this.validateUser(username, password);
    if (!user) throw new UnauthorizedException('Invalid credentials');
    const [refreshToken, accessToken] = await Promise.all([
      this.createRefreshToken(user),
      this.createAccessToken(user),
    ]);
    return { accessToken, refreshToken };
  }

  async createAccessToken(user: { id: number; username: string }) {
    const payload = { sub: user.id, username: user.username };
    return this.jwtService.sign(payload, { expiresIn: '15m' });
  }

  async createRefreshToken(user: { id: number; username: string }) {
    const payload = {
      sub: user.id,
      type: 'refresh',
    };
    return this.jwtService.sign(payload, { expiresIn: '7d' });
  }

  async validateUser(username: string, password: string) {
    const user = await this.userService.findByUsername(username);
    if (!user) return null;
    const arePasswordsMatching = await bcrypt.compare(password, user.password);
    if (!arePasswordsMatching) return null;
    const { password: _, ...rest } = user;
    return rest;
  }

  async refreshToken(refreshToken: string) {
    try {
      const payload = await this.jwtService.verifyAsync(refreshToken);
      if (payload.type !== 'refresh') {
        throw new UnauthorizedException('Invalid token type');
      }
      const user = await this.userService.findById(payload.sub);
      const newAccessToken = await this.createAccessToken(user);
      return { accessToken: newAccessToken };
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
}
