import { Controller, Get, Query } from '@nestjs/common'
import { VaccinationCenterServices } from './vaccination-center.service'
import { VaccinationCenter } from './interfaces/vaccination-center.interface'

@Controller('vaccinationCenters')
export class VaccinationCenterController {
  constructor(
    private readonly vaccinationCenterServices: VaccinationCenterServices,
  ) {}

  @Get('findVaccinationCenter')
  async findCenters(@Query() query): Promise<VaccinationCenter[]> {
    console.log(query)
    return await this.vaccinationCenterServices.findVaccinationCenter(query)
  }
}
