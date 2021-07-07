import { Field, InputType, Int, ObjectType } from '@nestjs/graphql'
import { ApiProperty } from '@nestjs/swagger'
import { IsAlpha, IsNotEmpty, Matches, MaxLength } from 'class-validator'

@InputType()
@ObjectType()
export class CreateBeneficiary {
  @ApiProperty()
  @IsNotEmpty()
  @Field()
  @IsAlpha()
  name: string

  @ApiProperty({ example: 'DD-MM-YYYY' })
  @Matches(/^([0-9]{2}-){2}[0-9]{4}$/, {
    message: 'Date formate missing',
  })
  @Field()
  birth_year: string

  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(1)
  @Field()
  gender_id: string

  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(1)
  @Field()
  photo_id_type: string

  @ApiProperty()
  @IsNotEmpty()
  @Field()
  photo_id_number: string

  @ApiProperty({ default: 'N' })
  @IsNotEmpty()
  @MaxLength(1)
  @Field()
  comorbidity_ind: string

  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(1)
  @Field()
  consent_version: string
}
