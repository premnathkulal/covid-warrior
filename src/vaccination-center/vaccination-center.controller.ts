import { Controller, Get, Query } from '@nestjs/common'
import { VaccinationCenterServices } from './vaccination-center.service'
import { VaccinationCenters } from './dto/vaccination-center.dto'
import { ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { VaccinationCenterInput } from './dto/vaccination-center-query.dto'

@ApiTags('Vaccination Center APIs')
@Controller('vaccinationCenters')
export class VaccinationCenterController {
  constructor(
    private readonly vaccinationCenterServices: VaccinationCenterServices,
  ) {}

  @ApiOkResponse({ type: VaccinationCenters })
  @Get('findVaccinationCenter')
  async findCenters(
    @Query() query: VaccinationCenterInput,
  ): Promise<VaccinationCenters> {
    return await this.vaccinationCenterServices.findVaccinationCenter(query)
  }
}
