import { Field, ObjectType } from '@nestjs/graphql'
import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, Matches } from 'class-validator'
@ObjectType()
export class CreateSchedule {
  @ApiProperty()
  @IsNotEmpty()
  @Field()
  beneficiaryId: string

  @ApiProperty()
  @IsNotEmpty()
  @Field()
  centerID: string

  @ApiProperty({ example: 'FORENOON' })
  @IsNotEmpty()
  @Field()
  slot: string

  @ApiProperty({ example: '20-02-2021' })
  @IsNotEmpty()
  @Matches(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/, {
    message: 'Date formate missing',
  })
  @Field()
  date: string

  @ApiProperty({ example: 'COVISHIELD' })
  @IsNotEmpty()
  @Field()
  vaccine: string
}
