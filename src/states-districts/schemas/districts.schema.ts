import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type DistrictDocument = District & Document

@Schema()
export class District {
  @Prop({ required: true })
  district_id: number

  @Prop({ required: true })
  district_name: string
}

export const DistrictsSchema = SchemaFactory.createForClass(District)
