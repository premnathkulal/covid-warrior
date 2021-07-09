import { Field, InputType, Int, ObjectType } from '@nestjs/graphql'
import { ApiProperty } from '@nestjs/swagger'
import { IsAlpha, IsNotEmpty, Matches, MaxLength } from 'class-validator'

@InputType()
export class CreateBeneficiary {
  @ApiProperty({ example: 'Yudhistira' })
  @IsNotEmpty()
  @Field()
  @IsAlpha()
  name: string

  @ApiProperty({ example: '02-07-2021' })
  @Matches(/^([0-9]{2}-){2}[0-9]{4}$/, {
    message: 'Date formate missing',
  })
  @Field()
  birth_year: string

  @ApiProperty({ example: '1' })
  @IsNotEmpty()
  @MaxLength(1)
  @Field()
  gender_id: string

  @ApiProperty({ example: '0' })
  @IsNotEmpty()
  @MaxLength(1)
  @Field()
  photo_id_type: string

  @ApiProperty({ example: '000000000000' })
  @IsNotEmpty()
  @Field()
  photo_id_number: string

  @ApiProperty({ default: 'N' })
  @IsNotEmpty()
  @MaxLength(1)
  @Field()
  comorbidity_ind: string

  @ApiProperty({ example: '1' })
  @IsNotEmpty()
  @MaxLength(1)
  @Field()
  consent_version: string
}
