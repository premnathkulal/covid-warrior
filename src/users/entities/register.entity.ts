import { Field, Int, ObjectType } from '@nestjs/graphql'
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
