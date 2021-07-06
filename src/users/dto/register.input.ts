import { Field, InputType } from '@nestjs/graphql'
import { ApiProperty } from '@nestjs/swagger'
import { MinLength } from 'class-validator'

@InputType()
export class RegisterInput {
  @ApiProperty()
  @Field()
  public name: string

  @ApiProperty()
  @Field()
  public username: string

  @ApiProperty()
  @Field()
  public password: string
}
