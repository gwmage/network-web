import { Controller, Post, Req, Res, Body, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Req() req: Request, @Res() res: Response, @Body() loginDto: LoginDto) {
    try {
      this.logger.log(`Login request received: ${JSON.stringify(loginDto)}`);
      this.logger.log(`Request Headers: ${JSON.stringify(req.headers)}`); // Log incoming request headers
      const { accessToken, refreshToken } = await this.authService.login(loginDto);
      res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true });
      return res.json({ accessToken });
    } catch (error) {
      this.logger.error(`Login failed: ${error.message}`, error.stack);
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new HttpException('Login failed', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }
}