import { Resolver, Args, Mutation } from '@nestjs/graphql'
import { VaccinationCenterServices } from './vaccination-center.service'
import {
  VaccinationCenterDto,
  AppointmentCenterInput,
} from './dto/vaccination-center.dto'

@Resolver()
export class VaccinationCenterResolver {
  constructor(private vaccinationCenterServices: VaccinationCenterServices) {}

  @Mutation(() => [VaccinationCenterDto])
  async findCenters(@Args('input') input: AppointmentCenterInput) {
    const vaccinationCenters =
      await this.vaccinationCenterServices.findVaccinationCenter(input)
    return vaccinationCenters
  }
}
