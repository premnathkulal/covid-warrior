import { Field, InputType, Int, ObjectType } from '@nestjs/graphql'
import { ApiProperty } from '@nestjs/swagger'

@InputType()
@ObjectType()
export class CreateBeneficiary {
  @ApiProperty()
  @Field()
  name: string

  @ApiProperty()
  @Field()
  birth_year: string

  @ApiProperty()
  @Field(() => Int)
  gender_id: number

  @ApiProperty()
  @Field(() => Int)
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
}
