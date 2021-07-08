import { HttpStatus } from '@nestjs/common'
import { Field, Int, ObjectType } from '@nestjs/graphql'
import { ApiProperty } from '@nestjs/swagger'

@ObjectType()
export class State {
  @ApiProperty()
  @Field()
  id: string

  @ApiProperty()
  @Field(() => Int)
  state_id: number

  @ApiProperty()
  @Field()
  state_name: string
}

@ObjectType()
export class States {
  @ApiProperty()
  @Field()
  status: HttpStatus

  @ApiProperty({ type: State, isArray: true })
  @Field(() => [State])
  data: State[]
}
