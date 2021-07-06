import { ApiProperty } from '@nestjs/swagger'

export class State {
  @ApiProperty({ example: '60d9910be37d6d6ed18bec11' })
  id: string

  @ApiProperty({ example: '16' })
  state_id: number

  @ApiProperty({ example: 'Karnataka' })
  state_name: string
}
