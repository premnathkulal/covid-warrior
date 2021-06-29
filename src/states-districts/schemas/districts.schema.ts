import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type DistrictDocument = Districts & Document
@Schema()
export class Districts {
  @Prop()
  state_id: number

  @Prop()
  districts: District[]
}
export class District {
  district_id: number
  district_name: string
}

export const DistrictsSchema = SchemaFactory.createForClass(Districts)
