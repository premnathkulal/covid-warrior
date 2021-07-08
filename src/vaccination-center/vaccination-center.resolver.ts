import { Resolver, Args, Mutation } from '@nestjs/graphql'
import { VaccinationCenterServices } from './vaccination-center.service'
import { VaccinationCenter } from './dto/vaccination-center.dto'
import { VaccinationCenterInput } from './dto/vaccination-center-query.dto'

@Resolver()
export class VaccinationCenterResolver {
  constructor(private vaccinationCenterServices: VaccinationCenterServices) {}

  @Mutation(() => [VaccinationCenter])
  async findCenters(@Args('input') input: VaccinationCenterInput) {
    const vaccinationCenters =
      await this.vaccinationCenterServices.findVaccinationCenter(input)
    return vaccinationCenters
  }
}
