import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { ApiProperty } from '@nestjs/swagger'
import { Document } from 'mongoose'

export type StateDocument = State & Document
@Schema()
export class State {
  @Prop({ required: true })
  state_id: number

  @ApiProperty({ example: 'Karnataka' })
  state_name: string
}

export const StatesSchema = SchemaFactory.createForClass(State)
