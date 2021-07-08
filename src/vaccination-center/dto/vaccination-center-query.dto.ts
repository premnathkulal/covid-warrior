import { Field, InputType, Int, ObjectType } from '@nestjs/graphql'
import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, Matches } from 'class-validator'

@InputType()
export class VaccinationCenterInput {
  @ApiProperty()
  @IsNotEmpty()
  @Matches(/^([0-9]{2}-){2}[0-9]{4}$/, {
    message: 'Date formate missing',
  })
  @Field()
  public date: string

  @ApiProperty({ required: false })
  @Field(() => Int, { nullable: true })
  public pincode: number

  @ApiProperty({ required: false })
  @Field({ nullable: true })
  public district_name: string

  @ApiProperty({ required: false })
  @Field(() => Int, { nullable: true })
  public latitude: number

  @ApiProperty({ required: false })
  @Field(() => Int, { nullable: true })
  public longitude: number
}
