import { Field, InputType, Int, ObjectType } from '@nestjs/graphql'
import { UserDetailsDto } from './user.dto'

@ObjectType()
export class LoginUserResponseDto {
  @Field(() => UserDetailsDto)
  public userDetails: UserDetailsDto

  @Field()
  public token: string
}

@InputType()
export class LoginInput {
  @Field()
  public username: string

  @Field()
  public password: string
}
