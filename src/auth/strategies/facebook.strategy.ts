import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Profile, Strategy } from 'passport-facebook'
import { AuthService } from '../auth.service'

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
  constructor(private readonly authService: AuthService) {
    super({
      clientID: process.env.APP_ID,
      clientSecret: process.env.APP_SECRET,
      callbackURL: 'http://localhost:3000/auth/facebook/',
      scope: 'email',
      profileFields: ['id', 'name'],
    })
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: (err: any, user: any, info?: any) => void,
  ): Promise<any> {
    const { name, id } = profile
    const userDetails = {
      username: `${name.givenName}${id}`,
      name: `${name.givenName} ${name.familyName}`,
      oAuthId: id,
    }
    const user = await this.authService.manageOAuth(userDetails)
    done(null, user)
  }
}
