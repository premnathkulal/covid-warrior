import { Resolver, Args, Mutation } from '@nestjs/graphql'
import { AppointmentSessionsServices } from './appointmentSession.service'
import {
  AppointmentCenterDto,
  AppointmentCenterInput,
} from './dto/appointment-center.dto'

@Resolver()
export class AppointmentCenterResolver {
  constructor(
    private appointmentSessionsServices: AppointmentSessionsServices,
  ) {}

  @Mutation(() => [AppointmentCenterDto])
  async findCenters(@Args('input') input: AppointmentCenterInput) {
    const states = await this.appointmentSessionsServices.findVaccinationCenter(
      input,
    )
    return states
  }
}
