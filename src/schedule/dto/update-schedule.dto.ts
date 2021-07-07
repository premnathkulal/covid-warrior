import { Field, ObjectType } from '@nestjs/graphql'
import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, Matches } from 'class-validator'

@ObjectType()
export class UpdateSchedule {
  @ApiProperty()
  @IsNotEmpty()
  @Field()
  centerID: string

  @ApiProperty()
  @IsNotEmpty()
  @Field()
  slot: string

  @ApiProperty()
  @IsNotEmpty()
  @Matches(/^([0-9]{2}-){2}[0-9]{4}$/, {
    message: 'Date formate missing',
  })
  @Field()
  date: string

  @ApiProperty()
  @IsNotEmpty()
  @Field()
  vaccine: string
}
