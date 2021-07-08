import { Resolver, Mutation, Args } from '@nestjs/graphql'
import { UsersService } from './users.service'
import { RegisterResponse, RegisterInput } from './dto/register.dto'
@Resolver()
export class UserResolver {
  constructor(private usersService: UsersService) {}

  @Mutation(() => RegisterResponse)
  async register(@Args('input') input: RegisterInput) {
    return await this.usersService.registerUser(input)
  }
}
