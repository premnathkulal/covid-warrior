import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common'
import { AuthService } from '../auth/auth.service'
import { LocalAuthGuard } from 'src/auth/guards/local-auth.guard'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'
import { UserDto } from './dto/user.dto'
import { UsersService } from './users.service'
import { RegisterResponseDto } from './dto/register.dto'

@Controller('auth')
export class UserController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req, @Res() response): Promise<any> {
    const authToken = await this.authService.login(req.user)
    response.cookie('authToken', authToken)
    const userDetails = {
      userDetails: req.user,
      token: authToken,
    }
    response.send(userDetails)
  }

  @Post('register')
  async register(@Body() userDetails: UserDto): Promise<RegisterResponseDto> {
    return await this.userService.registerUser(userDetails)
  }

  @UseGuards(JwtAuthGuard)
  @Get('protected')
  async info(@Request() req): Promise<any> {
    return req.user
  }
}
