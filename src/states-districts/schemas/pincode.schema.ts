import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type PinCodeDocument = PinCodes & Document

@Schema()
export class PinCode {
  @Prop()
  name: string

  @Prop()
  pincode: string
}

@Schema()
export class PinCodes {
  @Prop()
  district_id: number

  @Prop()
  pincodes: PinCode[]
}

export const PincodeSchema = SchemaFactory.createForClass(PinCodes)
