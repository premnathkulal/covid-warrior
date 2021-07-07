import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import { ApiProperty } from '@nestjs/swagger'

export type DistrictDocument = Schedule & Document

@Schema()
export class Schedule {
  @ApiProperty()
  @Prop()
  username: string

  @ApiProperty()
  @Prop()
  beneficiaryId: string

  @ApiProperty()
  @Prop()
  centerID: string

  @ApiProperty()
  @Prop()
  slot: string

  @ApiProperty()
  @Prop()
  date: string

  @ApiProperty()
  @Prop()
  vaccine: string
}

export const ScheduleSchema = SchemaFactory.createForClass(Schedule)
