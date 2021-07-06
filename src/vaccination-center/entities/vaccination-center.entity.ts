import { ApiProperty } from '@nestjs/swagger'
import * as mongoose from 'mongoose'

export class VaccinationCenter extends mongoose.Document {
  @ApiProperty()
  center_id: number

  @ApiProperty()
  name: string

  @ApiProperty()
  address: string

  @ApiProperty()
  state_name: string

  @ApiProperty()
  district_name: string

  @ApiProperty()
  block_name: string

  @ApiProperty()
  pincode: number

  @ApiProperty()
  from: string

  @ApiProperty()
  to: string

  @ApiProperty()
  lat: number

  @ApiProperty()
  long: number

  @ApiProperty()
  fee_type: string

  @ApiProperty()
  session_id: string

  @ApiProperty()
  date: string

  @ApiProperty()
  available_capacity: number

  @ApiProperty()
  available_capacity_dose1: number

  @ApiProperty()
  available_capacity_dose2: number

  @ApiProperty()
  fee: string

  @ApiProperty()
  allow_all_age: boolean

  @ApiProperty()
  min_age_limit: number

  @ApiProperty()
  vaccine: string

  @ApiProperty({ type: String, isArray: true })
  slots: string[]
}
