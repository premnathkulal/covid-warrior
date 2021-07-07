import { HttpStatus } from '@nestjs/common'
import { Field, InputType, ObjectType } from '@nestjs/graphql'
import { ApiProperty } from '@nestjs/swagger'

@InputType()
@ObjectType()
export class ScheduleResponse {
  @ApiProperty()
  @Field()
  status: HttpStatus

  @ApiProperty()
  @Field()
  message: string
}
