import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators'
import { vaccinationCentersAPI } from '@/utils/api'
import {
  VaccinationCenterMutations,
  VaccinationCenterActions,
} from '@/types/types'
import { VaccinationCenterFilter } from '@/types/interface'

@Module({ namespaced: true })
class VaccinationCenter extends VuexModule {
  isLoading = false
  vaccinationCenters: VaccinationCenter[] = []

  @Mutation
  public [VaccinationCenterMutations.LOADING](): void {
    this.isLoading = !this.isLoading
  }

  @Mutation
  public [VaccinationCenterMutations.VACCINATION_CENTER](
    data: VaccinationCenter[]
  ): void {
    this.vaccinationCenters = data
  }

  @Action
  async [VaccinationCenterActions.VACCINATION_CENTER](
    filterData: VaccinationCenterFilter
  ): Promise<void> {
    this.context.commit(VaccinationCenterMutations.LOADING)
    let queryParam = `date=${filterData.date}`
    if (filterData.pincode) {
      queryParam += `&pincode=${filterData.pincode}`
    }
    if (filterData.lat && filterData.lon) {
      queryParam += `&latitude=${filterData.lat}&longitude=${filterData.lon}`
    }
    if (filterData.state) {
      queryParam += `&state_name=${filterData.state}`
    }
    if (filterData.district) {
      queryParam += `&district_name=${filterData.district}`
    }
    return vaccinationCentersAPI(queryParam)
      .then(response => {
        this.context.commit(
          VaccinationCenterMutations.VACCINATION_CENTER,
          response.data.data
        )
      })
      .finally(() => {
        this.context.commit(VaccinationCenterMutations.LOADING)
      })
  }

  get vaccinationCentersList(): VaccinationCenter[] {
    return this.vaccinationCenters
  }
}
export default VaccinationCenter
