import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common'
import { AuthService } from '../auth/auth.service'
import { LocalAuthGuard } from 'src/auth/guards/local-auth.guard'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'
import { LoginUserDto, UserDto } from './dto/user.dto'
import { UsersService } from './users.service'
import { RegisterResponse } from './interfaces/user.interface'

@Controller('auth')
export class UserController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req): Promise<LoginUserDto> {
    return {
      userDetails: req.user,
      token: await this.authService.login(req.user),
    }
  }

  @Post('register')
  async register(@Body() userDetails: UserDto): Promise<RegisterResponse> {
    return await this.userService.registerUser(userDetails)
  }

  @UseGuards(JwtAuthGuard)
  @Get('protected')
  async info(@Request() req): Promise<any> {
    return req.user
  }
}
