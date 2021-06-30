import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common'
import { AuthService } from '../auth/auth.service'
import { LocalAuthGuard } from 'src/auth/guards/local-auth.guard'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'

@Controller('auth')
export class UserController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req): Promise<any> {
    return {
      user: req.user,
      token: await this.authService.login(req.user),
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('infoo')
  async info(@Request() req): Promise<any> {
    return { user: req.user }
  }
}
