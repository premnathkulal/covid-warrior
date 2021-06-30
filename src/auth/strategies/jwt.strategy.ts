import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'SECRET',
    })
  }

  async validate(payload: any): Promise<any> {
    //   const user = await this.userService.getByTd(payload.sub)
    return {
      id: payload.sub,
      name: payload.name,
      //   ...user
    }
  }
}
