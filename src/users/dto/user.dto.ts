import { Field, InputType, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class UserDetailsDto {
  @Field()
  public id: string

  @Field()
  public name: string

  @Field()
  public username: string
}

@ObjectType()
@InputType()
export class UserDto {
  @Field()
  public name: string

  @Field()
  public username: string

  @Field()
  public password: string
}
