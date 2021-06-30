import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UsersService } from 'src/users/users.service'

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findUser(username)
    if (user && user.password === password) {
      const { password, username, ...rest } = user
      return { ...rest }
    }
    return null
  }

  async login(user: any): Promise<any> {
    const payload = {
      name: user.name,
      sub: user.id,
    }
    const access_token = await this.jwtService.sign(payload)
    return access_token
  }
}
