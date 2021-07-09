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
  @ApiProperty({ required: true })
  @Field()
  public username: string

  @ApiProperty({ required: true })
  @Field()
  public password: string
}
