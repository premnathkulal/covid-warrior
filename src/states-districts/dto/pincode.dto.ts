import { HttpStatus } from '@nestjs/common'
import { Field, Int, ObjectType } from '@nestjs/graphql'
import { ApiProperty } from '@nestjs/swagger'

@ObjectType()
export class PinCode {
  @ApiProperty()
  @Field(() => Int)
  name: string

  @ApiProperty()
  @Field()
  pincode: string
}

@ObjectType()
export class PinCodes {
  @ApiProperty()
  @Field()
  status: HttpStatus

  @ApiProperty()
  @Field(() => Int)
  district_id: number

  @ApiProperty({ type: PinCode, isArray: true })
  @Field(() => [PinCode])
  pincodes: PinCode[]
}
