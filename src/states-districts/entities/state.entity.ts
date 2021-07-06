import { Field, Int, ObjectType } from '@nestjs/graphql'
import { ApiProperty } from '@nestjs/swagger'

@ObjectType()
export class State {
  @ApiProperty({ example: '60d9910be37d6d6ed18bec11' })
  id: string

  @ApiProperty({ example: '16' })
  @Field(() => Int)
  state_id: number

  @ApiProperty({ example: 'Karnataka' })
  @Field()
  state_name: string
}
