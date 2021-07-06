import { Controller, Get, Query } from '@nestjs/common'
import { VaccinationCenterServices } from './vaccination-center.service'
import { VaccinationCenter } from './entities/vaccination-center.entity'
import { ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger'
import { VaccinationCenterInput } from './dto/vaccination-center-query.input'

@ApiTags('Vaccination Center')
@Controller('vaccinationCenters')
export class VaccinationCenterController {
  constructor(
    private readonly vaccinationCenterServices: VaccinationCenterServices,
  ) {}

  @ApiOkResponse({ type: VaccinationCenter })
  @Get('findVaccinationCenter')
  async findCenters(
    @Query() query: VaccinationCenterInput,
  ): Promise<VaccinationCenter[]> {
    console.log(query)
    return await this.vaccinationCenterServices.findVaccinationCenter(query)
  }
}
