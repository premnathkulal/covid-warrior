import { HttpStatus } from '@nestjs/common'
import { Field, ObjectType } from '@nestjs/graphql'
import { ApiProperty } from '@nestjs/swagger'
@ObjectType()
export class Beneficiary {
  @ApiProperty()
  @Field()
  id: string

  @ApiProperty()
  @Field()
  name: string

  @ApiProperty()
  @Field()
  birth_year: string

  @ApiProperty()
  @Field()
  gender_id: number

  @ApiProperty()
  @Field()
  photo_id_type: number

  @ApiProperty()
  @Field()
  photo_id_number: string

  @ApiProperty()
  @Field()
  comorbidity_ind: string

  @ApiProperty()
  @Field()
  consent_version: string

  @ApiProperty()
  @Field()
  scheduled: boolean
}

@ObjectType()
export class Beneficiaries {
  @ApiProperty()
  @Field()
  status: HttpStatus

  @ApiProperty({ type: Beneficiary, isArray: true })
  @Field(() => [Beneficiary])
  beneficiaries: Beneficiary[]
}
