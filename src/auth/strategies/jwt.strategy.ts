import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { UserDetailsDto } from 'src/users/dto/user.dto'
import { UsersService } from 'src/users/users.service'
import { jwtConstants } from '../auth.constants'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    })
  }

  async validate(payload: any): Promise<UserDetailsDto> {
    const user = await this.userService.findUser(payload.username)
    return {
      id: user.id,
      name: user.name,
      username: user.username,
    }
  }
}
