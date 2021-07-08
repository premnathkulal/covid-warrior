import { Field, ObjectType } from '@nestjs/graphql'
import { ApiProperty } from '@nestjs/swagger'
import { UserDetails } from './user-details.dto'

@ObjectType()
export class User extends UserDetails {
  @ApiProperty()
  @Field()
  public password: string
}
