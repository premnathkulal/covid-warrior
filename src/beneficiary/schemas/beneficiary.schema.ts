import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type BeneficiaryDocument = Beneficiary & Document
@Schema()
export class Beneficiary {
  @Prop({ required: true })
  username: string

  @Prop({ required: true })
  name: string

  @Prop({ required: true })
  birth_year: string

  @Prop({ required: true })
  gender_id: number

  @Prop({ required: true })
  photo_id_type: number

  @Prop({ required: true })
  photo_id_number: string

  @Prop({ required: true })
  comorbidity_ind: string

  @Prop({ required: true })
  consent_version: string

  @Prop()
  scheduled: boolean
}

export const BeneficiarySchema = SchemaFactory.createForClass(Beneficiary)
