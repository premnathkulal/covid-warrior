import { Field, InputType, Int, ObjectType } from '@nestjs/graphql'
import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, MaxLength } from 'class-validator'

@ObjectType()
export class StateDistrict {
  @ApiProperty()
  @MaxLength(3)
  @Field(() => Int)
  stateId: number
}
