import { Field, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class VaccinationCenterDto {
  @Field(() => Int)
  public center_id: number

  @Field()
  public name: string

  @Field()
  public address: string

  @Field()
  public state_name: string

  @Field()
  public district_name: string

  @Field()
  public block_name: string

  @Field(() => Int)
  public pincode: number

  @Field()
  public from: string

  @Field()
  public to: string

  @Field(() => Int)
  public lat: number

  @Field(() => Int)
  public long: number

  @Field()
  public fee_type: string

  @Field()
  public session_id: string

  @Field()
  public date: string

  @Field(() => Int)
  public available_capacity: number

  @Field(() => Int)
  public available_capacity_dose1: number

  @Field(() => Int)
  public available_capacity_dose2: number

  @Field()
  public fee: string

  @Field()
  public allow_all_age: boolean

  @Field(() => Int)
  public min_age_limit: number

  @Field()
  public vaccine: string

  @Field(() => [String])
  public slots: string[]
}
