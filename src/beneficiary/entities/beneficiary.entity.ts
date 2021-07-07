import { ApiProperty } from '@nestjs/swagger'
import * as mongoose from 'mongoose'

export class Beneficiary extends mongoose.Document {
  @ApiProperty()
  id: string

  @ApiProperty()
  name: string

  @ApiProperty()
  birth_year: string

  @ApiProperty()
  gender_id: number

  @ApiProperty()
  photo_id_type: number

  @ApiProperty()
  photo_id_number: string

  @ApiProperty()
  comorbidity_ind: string

  @ApiProperty()
  consent_version: string
}
