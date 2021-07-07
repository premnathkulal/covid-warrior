import { Field, ObjectType } from '@nestjs/graphql'
import { ApiProperty } from '@nestjs/swagger'
import * as mongoose from 'mongoose'
@ObjectType()
export class Schedule {
  @ApiProperty()
  @Field()
  beneficiaryId: string

  @ApiProperty()
  @Field()
  centerID: string

  @ApiProperty()
  @Field()
  slot: string

  @ApiProperty()
  @Field()
  date: string

  @ApiProperty()
  @Field()
  vaccine: string
}
