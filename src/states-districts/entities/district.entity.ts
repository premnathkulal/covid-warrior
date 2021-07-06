import { ApiProperty } from '@nestjs/swagger'

export class District {
  @ApiProperty({ example: 269 })
  district_id: number

  @ApiProperty({ example: 'Dakshina Kannada' })
  district_name: string
}

export class Districts {
  @ApiProperty({ example: '60d9910be37d6d6ed18bec11' })
  id: string

  @ApiProperty({ example: 16 })
  state_id: number

  @ApiProperty({ type: [District] })
  districts: District[]
}
