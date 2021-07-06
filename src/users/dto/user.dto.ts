import { Field, ObjectType } from '@nestjs/graphql'
import { ApiProperty } from '@nestjs/swagger'

@ObjectType()
export class UserDetails {
  @ApiProperty()
  @Field()
  public id: string

  @ApiProperty()
  @Field()
  public name: string

  @ApiProperty()
  @Field()
  public username: string
}
