import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  Request,
  Res,
  UseGuards,
  UsePipes,
} from '@nestjs/common'
import { AuthService } from '../auth/auth.service'
import { LocalAuthGuard } from 'src/auth/guards/local-auth.guard'
import { UsersService } from './users.service'
import { RegisterResponse } from './dto/register.dto'
import {
  ApiBearerAuth,
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotImplementedResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger'
import { RegisterInput } from './dto/register.dto'
import { LoginUserResponse, LoginInput } from './dto/login.dto'
import { ValidationPipe } from './pipes/validation.pipe'
import { AuthGuard } from '@nestjs/passport'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'
import { User, UserDetails } from './dto/user-details.dto'

@ApiTags('Authentication APIs')
@Controller('auth')
export class UserController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}

  @ApiOkResponse({ type: LoginUserResponse })
  @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
  @ApiBody({ type: LoginInput })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req, @Res() response): Promise<void> {
    const authToken = await this.authService.login(req.user)
    response.cookie('authToken', authToken)
    const userDetails = {
      status: HttpStatus.OK,
      token: authToken,
    }
    response.send(userDetails)
  }

  @ApiCreatedResponse({ type: RegisterResponse })
  @ApiConflictResponse({ description: 'User name already exists' })
  @ApiNotImplementedResponse({ description: 'Invalid password pattern' })
  @Post('register')
  @UsePipes()
  async register(
    @Body(new ValidationPipe()) userDetails: RegisterInput,
  ): Promise<RegisterResponse> {
    return await this.userService.registerUser(userDetails)
  }

  @ApiOkResponse({ type: UserDetails })
  @ApiBearerAuth()
  @Get('profile')
  @UseGuards(JwtAuthGuard)
  async getUserInfo(@Req() req): Promise<User> {
    return {
      status: HttpStatus.OK,
      userDetails: req.user,
    }
  }

  @ApiOkResponse({ type: LoginUserResponse })
  @Get('facebook')
  @UseGuards(AuthGuard('facebook'))
  async facebookLogin(@Req() req, @Res() response): Promise<void> {
    response.cookie('authToken', req.user)
    const userDetails = {
      status: HttpStatus.OK,
      token: req.user,
    }
    response.send(userDetails)
  }

  @ApiOkResponse({ type: LoginUserResponse })
  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleLogin(@Req() req, @Res() response): Promise<void> {
    response.cookie('authToken', req.user)
    const userDetails = {
      status: HttpStatus.OK,
      token: req.user,
    }
    response.send(userDetails)
  }
}
