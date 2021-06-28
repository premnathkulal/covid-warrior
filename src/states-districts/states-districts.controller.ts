import { Controller, Get, Param } from '@nestjs/common'
import { StateDistrictDto } from './dto/states-districts.dto'
import { Districts, States } from './interfaces/states-districts.interface'
import { StatesDistrictsService } from './states-districts.service'

@Controller('states-districts')
export class StatesDistrictsController {
  constructor(
    private readonly statesDistrictsService: StatesDistrictsService,
  ) {}

  @Get('states')
  async getStatesList(): Promise<States[]> {
    return await this.statesDistrictsService.getStatesList()
  }

  @Get('districts/:stateId')
  async getDistrictsList(
    @Param() paramData: StateDistrictDto,
  ): Promise<Districts> {
    return await this.statesDistrictsService.getDistrictsList(paramData.stateId)
  }
}
