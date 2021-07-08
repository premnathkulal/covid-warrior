import { HttpStatus } from '@nestjs/common'
import { Field, Int, ObjectType } from '@nestjs/graphql'
import { ApiProperty } from '@nestjs/swagger'

@ObjectType()
export class District {
  @ApiProperty()
  @Field(() => Int)
  district_id: number

  @ApiProperty()
  @Field()
  district_name: string
}

@ObjectType()
export class Districts {
  @ApiProperty()
  @Field()
  status: HttpStatus

  @ApiProperty()
  @Field()
  id: string

  @ApiProperty()
  @Field(() => Int)
  state_id: number

  @ApiProperty({ type: District, isArray: true })
  @Field(() => [District])
  districts: District[]
}
