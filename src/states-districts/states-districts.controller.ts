import { Controller, Get, Param } from '@nestjs/common'
import { DISTRICTS, STATES } from 'src/database/data'
import { Districts, States } from './interfaces/states-districts.interface'
import { StatesDistrictsService } from './states-districts.service'

@Controller('states-districts')
export class StatesDistrictsController {
  constructor(
    private readonly statesDistrictsService: StatesDistrictsService,
  ) {}

  @Get('states')
  getStatesList(): States[] {
    return this.statesDistrictsService.getStatesList()
  }

  @Get('districts/:stateId')
  getDistrictsList(@Param() paramData: { stateId: number }): Districts {
    return this.statesDistrictsService.getDistrictsList(paramData.stateId)
  }
}
