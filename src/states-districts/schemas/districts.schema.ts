import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import { ApiProperty } from '@nestjs/swagger'

export type DistrictDocument = Districts & Document
@Schema()
export class Districts {
  @ApiProperty()
  @Prop()
  state_id: number

  @ApiProperty()
  @Prop()
  districts: District[]
}
@Schema()
export class District {
  @ApiProperty()
  district_id: number

  @ApiProperty()
  district_name: string
}

export const DistrictsSchema = SchemaFactory.createForClass(Districts)
