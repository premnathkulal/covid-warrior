import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators'
import {
  topStoriesAPI,
  statesAPI,
  districtsAPI,
  pinCodesAPI,
} from '@/utils/api'
import { StateDistrictsMutations, StateDistrictsActions } from '@/types/types'

@Module({ namespaced: true })
class StateDistricts extends VuexModule {
  isLoading = false
  states: any[] = [{}]
  districts: any[] = [{}]
  pinCodes: any[] = [{}]

  @Mutation
  public [StateDistrictsMutations.LOADING](): void {
    this.isLoading = !this.isLoading
  }

  @Mutation
  public [StateDistrictsMutations.STATES](data: any[]): void {
    this.states = data
  }

  @Action
  async [StateDistrictsActions.STATES](): Promise<void> {
    this.context.commit(StateDistrictsMutations.LOADING)
    return statesAPI()
      .then(response => {
        this.context.commit(StateDistrictsMutations.STATES, response.data.data)
      })
      .finally(() => {
        this.context.commit(StateDistrictsMutations.LOADING)
      })
  }

  @Mutation
  public [StateDistrictsMutations.DISTRICTS](data: any[]): void {
    this.districts = data
  }

  @Action
  async [StateDistrictsActions.DISTRICTS](stateId: string): Promise<void> {
    this.context.commit(StateDistrictsMutations.LOADING)
    return districtsAPI(stateId)
      .then(response => {
        this.context.commit(
          StateDistrictsMutations.DISTRICTS,
          response.data.districts
        )
      })
      .catch(() => {
        this.context.commit(StateDistrictsMutations.DISTRICTS, [])
      })
      .finally(() => {
        this.context.commit(StateDistrictsMutations.LOADING)
      })
  }

  @Mutation
  public [StateDistrictsMutations.PINCODES](data: any[]): void {
    this.pinCodes = data
  }

  @Action
  async [StateDistrictsActions.PINCODES](districtID: string): Promise<void> {
    this.context.commit(StateDistrictsMutations.LOADING)
    return pinCodesAPI(districtID)
      .then(response => {
        this.context.commit(
          StateDistrictsMutations.PINCODES,
          response.data.pincodes
        )
      })
      .catch(() => {
        this.context.commit(StateDistrictsMutations.PINCODES, [])
      })
      .finally(() => {
        this.context.commit(StateDistrictsMutations.LOADING)
      })
  }

  get statesList(): any[] {
    return this.states
  }

  get districtsList(): any[] {
    return this.districts
  }

  get pinCodesList(): any[] {
    return this.pinCodes
  }
}
export default StateDistricts
