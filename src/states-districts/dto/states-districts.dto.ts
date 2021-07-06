import { Field, InputType, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class StateDistrictDto {
  @Field(() => Int)
  stateId: number
}
@ObjectType()
export class StatesDto {
  @Field(() => Int)
  public state_id: number

  @Field()
  public state_name: string
}

@ObjectType()
export class DistrictDto {
  @Field(() => Int)
  public district_id: number

  @Field()
  public district_name: string
}
@ObjectType()
export class DistrictsDto {
  @Field(() => Int)
  public state_id: number

  @Field(() => [DistrictDto])
  public districts: DistrictDto[]
}
