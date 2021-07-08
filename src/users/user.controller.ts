import {
  Body,
  Controller,
  Get,
  Post,
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

@ApiTags('Authentication APIs')
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
  @ApiNotImplementedResponse({ description: 'Invalid password pattern' })
  @Post('register')
  @UsePipes()
  async register(
    @Body(new ValidationPipe()) userDetails: RegisterInput,
  ): Promise<RegisterResponse> {
    return await this.userService.registerUser(userDetails)
  }

  // @UseGuards(JwtAuthGuard)
  // @Get('protected')
  // async info(@Request() req): Promise<any> {
  //   return req.user
  // }
}
