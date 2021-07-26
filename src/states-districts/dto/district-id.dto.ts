import { Field, Int, ObjectType } from '@nestjs/graphql'
import { ApiProperty } from '@nestjs/swagger'
import { MaxLength } from 'class-validator'

@ObjectType()
export class DistrictId {
  @ApiProperty()
  @MaxLength(3)
  @Field(() => Int)
  districtId: number
}
