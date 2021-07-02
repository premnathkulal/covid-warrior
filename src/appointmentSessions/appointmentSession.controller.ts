import { Controller, Get, Query } from '@nestjs/common'
import { AppointmentSessionsServices } from './appointmentSession.service'
import { AppointmentCenter } from './interfaces/appointment-center.interface'

@Controller('appointmentSessions')
export class AppointmentSessionsController {
  constructor(
    private readonly appointmentSessionsServices: AppointmentSessionsServices,
  ) {}

  @Get('findVaccinationCenter')
  async findCenters(@Query() query): Promise<AppointmentCenter[]> {
    return await this.appointmentSessionsServices.findVaccinationCenter(query)
  }
}
