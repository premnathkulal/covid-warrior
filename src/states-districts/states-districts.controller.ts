import { Controller, Get, Param } from '@nestjs/common'
import { StateDistrictDto } from './dto/states-districts.dto'
import { StatesDistrictsService } from './states-districts.service'
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
  ApiParam,
} from '@nestjs/swagger'
import { State } from './entities/state.entity'
import { Districts } from './entities/district.entity'
@ApiTags('State and Districts')
@Controller('states-districts')
export class StatesDistrictsController {
  constructor(
    private readonly statesDistrictsService: StatesDistrictsService,
  ) {}

  @ApiOkResponse({ type: State, isArray: true })
  @Get('states')
  async getStatesList(): Promise<State[]> {
    return await this.statesDistrictsService.getStatesList()
  }

  @ApiOkResponse({ type: Districts })
  @ApiParam({ name: 'stateId', required: true })
  @ApiNotFoundResponse({ description: 'State Not Found' })
  @Get('districts/:stateId')
  async getDistrictsList(
    @Param() paramData: StateDistrictDto,
  ): Promise<Districts> {
    return await this.statesDistrictsService.getDistrictsList(paramData.stateId)
  }
}
