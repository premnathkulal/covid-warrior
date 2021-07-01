import { Field, InputType, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class RegisterResponseDto {
  @Field()
  public response: string

  @Field(() => Int)
  public statusCode: number
}
