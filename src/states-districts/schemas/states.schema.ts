import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type StateDocument = State & Document

@Schema()
export class State {
  @Prop({ required: true })
  state_id: number

  @Prop({ required: true })
  state_name: string
}

export const StatesSchema = SchemaFactory.createForClass(State)
