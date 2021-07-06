import { Field, InputType } from '@nestjs/graphql'
import { ApiProperty } from '@nestjs/swagger'

@InputType()
export class RegisterInput {
  @ApiProperty()
  @Field()
  public name: string

  @Field()
  @ApiProperty()
  public username: string

  @Field()
  @ApiProperty()
  public password: string
}
