import { Resolver, Mutation, Args } from '@nestjs/graphql'
import { UsersService } from './users.service'
import { RegisterResponseDto } from './dto/register.dto'
import { UserDto } from './dto/user.dto'
@Resolver()
export class UserResolver {
  constructor(private usersService: UsersService) {}

  @Mutation(() => RegisterResponseDto)
  async register(@Args('input') input: UserDto) {
    return await this.usersService.registerUser(input)
  }
}
