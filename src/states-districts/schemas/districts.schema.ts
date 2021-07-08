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
@Schema()
export class District {
  @Prop()
  district_id: number

  @Prop()
  district_name: string
}

export const DistrictsSchema = SchemaFactory.createForClass(Districts)
