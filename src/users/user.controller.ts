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
import { UsersService } from './users.service'
import { RegisterResponse } from './dto/register.dto'
import {
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger'
import { RegisterInput } from './dto/register.input'
import { LoginInput } from './dto/login.input'
import { LoginUserResponse } from './dto/login.dto'

@ApiTags('Authentication')
@Controller('auth')
export class UserController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}

  @ApiOkResponse({ type: LoginUserResponse })
  @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @Request() req,
    @Body() loginInput: LoginInput,
    @Res() response,
  ): Promise<any> {
    const authToken = await this.authService.login(req.user)
    response.cookie('authToken', authToken)
    const userDetails = {
      userDetails: req.user,
      token: authToken,
    }
    response.send(userDetails)
  }

  @ApiCreatedResponse({ type: RegisterResponse })
  @ApiConflictResponse({ description: 'User name already exists' })
  @Post('register')
  async register(
    @Body() userDetails: RegisterInput,
  ): Promise<RegisterResponse> {
    return await this.userService.registerUser(userDetails)
  }

  // @UseGuards(JwtAuthGuard)
  // @Get('protected')
  // async info(@Request() req): Promise<any> {
  //   return req.user
  // }
}
