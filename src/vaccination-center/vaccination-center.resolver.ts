import { Resolver, Args, Mutation } from '@nestjs/graphql'
import { VaccinationCenterServices } from './vaccination-center.service'
import { VaccinationCenterDto } from './dto/vaccination-center.dto'
import { VaccinationCenterInput } from './dto/vaccination-center-query.input'

@Resolver()
export class VaccinationCenterResolver {
  constructor(private vaccinationCenterServices: VaccinationCenterServices) {}

  @Mutation(() => [VaccinationCenterDto])
  async findCenters(@Args('input') input: VaccinationCenterInput) {
    const vaccinationCenters =
      await this.vaccinationCenterServices.findVaccinationCenter(input)
    return vaccinationCenters
  }
}
