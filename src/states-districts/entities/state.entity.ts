import { ApiProperty } from '@nestjs/swagger'

export class State {
  @ApiProperty()
  id: string

  @ApiProperty()
  state_id: number

  @ApiProperty()
  state_name: string
}
