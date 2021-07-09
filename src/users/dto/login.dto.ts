import { HttpStatus } from '@nestjs/common'
import { Field, InputType, ObjectType } from '@nestjs/graphql'
import { ApiProperty } from '@nestjs/swagger'
import { UserDetails } from '../dto/user-details.dto'

@ObjectType()
export class LoginUserResponse {
  @ApiProperty()
  @Field()
  public status: HttpStatus

  @ApiProperty()
  @Field()
  public token: string
}

@InputType()
export class LoginInput {
  @ApiProperty()
  @Field()
  public username: string

  @ApiProperty()
  @Field()
  public password: string
}
