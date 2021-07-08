import { HttpStatus } from '@nestjs/common'
import { Field, Int, ObjectType } from '@nestjs/graphql'
import { ApiProperty } from '@nestjs/swagger'
@ObjectType()
export class VaccinationCenter {
  @ApiProperty()
  @Field(() => Int)
  public center_id: number

  @ApiProperty()
  @Field()
  public name: string

  @ApiProperty()
  @Field()
  public address: string

  @ApiProperty()
  @Field()
  public state_name: string

  @ApiProperty()
  @Field()
  public district_name: string

  @ApiProperty()
  @Field()
  public block_name: string

  @ApiProperty()
  @Field(() => Int)
  public pincode: number

  @ApiProperty()
  @Field()
  public from: string

  @ApiProperty()
  @Field()
  public to: string

  @ApiProperty()
  @Field(() => Int)
  public lat: number

  @ApiProperty()
  @Field(() => Int)
  public long: number

  @ApiProperty()
  @Field()
  public fee_type: string

  @ApiProperty()
  @Field()
  public session_id: string

  @ApiProperty()
  @Field()
  public date: string

  @ApiProperty()
  @Field(() => Int)
  public available_capacity: number

  @ApiProperty()
  @Field(() => Int)
  public available_capacity_dose1: number

  @ApiProperty()
  @Field(() => Int)
  public available_capacity_dose2: number

  @ApiProperty()
  @Field()
  public fee: string

  @ApiProperty()
  @Field()
  public allow_all_age: boolean

  @ApiProperty()
  @Field(() => Int)
  public min_age_limit: number

  @ApiProperty()
  @Field()
  public vaccine: string

  @ApiProperty({ type: String, isArray: true })
  @Field(() => [String])
  public slots: string[]
}

@ObjectType()
export class VaccinationCenters {
  @ApiProperty()
  @Field()
  public status: HttpStatus

  @ApiProperty({ type: VaccinationCenter, isArray: true })
  @Field(() => [VaccinationCenter])
  public data: VaccinationCenter[]
}
