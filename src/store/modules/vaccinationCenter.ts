import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators'
import { districtsAPI, vaccinationCentersAPI } from '@/utils/api'
import {
  VaccinationCenterMutations,
  VaccinationCenterActions,
} from '@/types/types'

@Module({ namespaced: true })
class VaccinationCenter extends VuexModule {
  isLoading = false
  vaccinationCenters: any[] = [{}]

  @Mutation
  public [VaccinationCenterMutations.LOADING](): void {
    this.isLoading = !this.isLoading
  }

  @Mutation
  public [VaccinationCenterMutations.VACCINATION_CENTER](data: any[]): void {
    this.vaccinationCenters = data
  }

  @Action
  async [VaccinationCenterActions.VACCINATION_CENTER](
    filterData: any
  ): Promise<void> {
    this.context.commit(VaccinationCenterMutations.LOADING)
    let queryParam = `date=${filterData.date}`
    if (filterData.pincode) {
      queryParam += `&pincode=${filterData.pincode}`
    }
    if (filterData.lan && filterData.lon) {
      queryParam += `&lat=${filterData.lat}&longitude=${filterData.lon}`
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

  get vaccinationCentersList(): any[] {
    return this.vaccinationCenters
  }
}
export default VaccinationCenter
