import { Field, ObjectType } from '@nestjs/graphql'
import { ApiProperty } from '@nestjs/swagger'
import { UserDetails } from './user-details.entity'

@ObjectType()
export class LoginUserResponse {
  @ApiProperty({ type: UserDetails })
  @Field(() => UserDetails)
  public userDetails: UserDetails

  @ApiProperty()
  @Field()
  public token: string
}
