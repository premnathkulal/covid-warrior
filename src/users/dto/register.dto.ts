import { Field, InputType, Int, ObjectType } from '@nestjs/graphql'
import { ApiProperty } from '@nestjs/swagger'

@ObjectType()
export class RegisterResponse {
  @ApiProperty()
  @Field()
  public response: string

  @ApiProperty()
  @Field(() => Int)
  public statusCode: number
}

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
