import { Field, Int, ObjectType } from '@nestjs/graphql'
import { ApiProperty } from '@nestjs/swagger'

@ObjectType()
export class District {
  @ApiProperty({ example: 269 })
  @Field(() => Int)
  district_id: number

  @ApiProperty({ example: 'Dakshina Kannada' })
  district_name: string
}

@ObjectType()
export class Districts {
  @ApiProperty({ example: '60d9910be37d6d6ed18bec11' })
  id: string

  @ApiProperty({ example: 16 })
  @Field(() => Int)
  state_id: number

  @ApiProperty({ type: [District] })
  districts: District[]
}
