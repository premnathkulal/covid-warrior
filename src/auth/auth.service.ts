import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UserDetailsDto } from 'src/users/dto/user.dto'
import { UsersService } from 'src/users/users.service'

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    username: string,
    password: string,
  ): Promise<UserDetailsDto> {
    const user = await this.userService.findUser(username)
    if (user && user.password === password) {
      const { id, username, name } = user
      return { id, username, name }
    }
    return null
  }

  async login(user: any): Promise<string> {
    const payload = {
      id: user.id,
      username: user.username,
    }
    const access_token = await this.jwtService.sign(payload)
    return access_token
  }
}
