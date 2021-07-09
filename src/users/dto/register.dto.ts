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
  @ApiProperty({ required: true })
  @Field()
  public name: string

  @ApiProperty({ required: true })
  @Field()
  public username: string

  @ApiProperty({ required: true })
  @Field()
  public password: string
}
