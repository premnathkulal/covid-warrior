import { ApiProperty } from '@nestjs/swagger'

export class District {
  @ApiProperty()
  district_id: number

  @ApiProperty()
  district_name: string
}

export class Districts {
  @ApiProperty()
  id: string

  @ApiProperty()
  state_id: number

  @ApiProperty({ type: [District] })
  districts: District[]
}
