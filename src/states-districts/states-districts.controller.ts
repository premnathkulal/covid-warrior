import { Controller, Get, Param, UseGuards } from '@nestjs/common'
import { StateId } from './dto/state-id.dto'
import { StatesDistrictsService } from './states-districts.service'
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiParam,
} from '@nestjs/swagger'
import { Districts } from './dto/district.dto'
import { States } from './dto/state.dto'
import { AuthGuard } from '@nestjs/passport'
@ApiTags('State and Districts APIs')
@Controller('states-districts')
export class StatesDistrictsController {
  constructor(
    private readonly statesDistrictsService: StatesDistrictsService,
  ) {}

  @ApiOkResponse({ type: States })
  @Get('states')
  async getStatesList(): Promise<States> {
    return await this.statesDistrictsService.getStatesList()
  }

  @ApiOkResponse({ type: Districts })
  @ApiParam({ name: 'stateId', required: true })
  @ApiNotFoundResponse({ description: 'State Not Found' })
  @Get('districts/:stateId')
  async getDistrictsList(@Param() paramData: StateId): Promise<Districts> {
    return await this.statesDistrictsService.getDistrictsList(paramData.stateId)
  }
}
