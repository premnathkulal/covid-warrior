import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type AppointmentCenterDocument = AppointmentCenter & Document

@Schema()
export class AppointmentCenter {
  @Prop()
  center_id: number

  @Prop()
  name: string

  @Prop()
  address: string

  @Prop()
  state_name: string

  @Prop()
  district_name: string

  @Prop()
  block_name: string

  @Prop()
  pincode: number

  @Prop()
  from: string

  @Prop()
  to: string

  @Prop()
  lat: number

  @Prop()
  long: number

  @Prop()
  fee_type: string

  @Prop()
  session_id: string

  @Prop()
  date: string

  @Prop()
  available_capacity: number

  @Prop()
  available_capacity_dose1: number

  @Prop()
  available_capacity_dose2: number

  @Prop()
  fee: string

  @Prop()
  allow_all_age: boolean

  @Prop()
  min_age_limit: number

  @Prop()
  vaccine: string

  @Prop()
  slots: string[]
}

export const AppointmentCenterSchema =
  SchemaFactory.createForClass(AppointmentCenter)
