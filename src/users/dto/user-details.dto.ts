import { HttpStatus } from '@nestjs/common'
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

@ObjectType()
export class User {
  @ApiProperty()
  @Field()
  public status: HttpStatus

  @ApiProperty({ type: UserDetails })
  @Field(() => UserDetails)
  public userDetails: UserDetails
}
