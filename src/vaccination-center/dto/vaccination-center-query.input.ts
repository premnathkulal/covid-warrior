import { Field, InputType, Int, ObjectType } from '@nestjs/graphql'
import { ApiProperty } from '@nestjs/swagger'

@InputType()
export class VaccinationCenterInput {
  @ApiProperty()
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
