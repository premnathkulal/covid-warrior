import { HttpStatus } from '@nestjs/common'
import { Field, ObjectType } from '@nestjs/graphql'
import { ApiProperty } from '@nestjs/swagger'

@ObjectType()
export class ScheduleResponse {
  @ApiProperty()
  @Field()
  status: HttpStatus

  @ApiProperty()
  @Field()
  message: string
}

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

  @ApiProperty()
  @Field()
  centerName: string

  @ApiProperty()
  @Field()
  centerAddress: string
}
@ObjectType()
export class ScheduleResponseById {
  @ApiProperty()
  @Field()
  status: HttpStatus

  @ApiProperty({ type: Schedule })
  @Field(() => Schedule)
  scheduleData: Schedule
}
