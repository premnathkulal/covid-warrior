import { Field, InputType, Int, ObjectType } from '@nestjs/graphql'
import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, Matches } from 'class-validator'

@InputType()
export class VaccinationCenterInput {
  @ApiProperty({ example: '02-07-2021', required: true })
  @IsNotEmpty()
  @Matches(/^([0-9]{2}-){2}[0-9]{4}$/, {
    message: 'Date formate missing',
  })
  @Field()
  public date: string

  @ApiProperty({ example: '574211', required: false })
  @Field(() => Int, { nullable: true })
  public pincode: number

  @ApiProperty({ example: 'Dakshina Kannada', required: false })
  @Field({ nullable: true })
  public district_name: string

  @ApiProperty({ example: 12, required: false })
  @Field(() => Int, { nullable: true })
  public latitude: number

  @ApiProperty({ example: 75, required: false })
  @Field(() => Int, { nullable: true })
  public longitude: number
}
