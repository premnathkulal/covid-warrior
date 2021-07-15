import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators'
import { LocationActions, LocationMutations } from '@/types/types'
import { getAddressDetails } from '@/utils/api'
import { AxiosResponse } from 'axios'
import { Address, FullAddress } from '@/types/interface'

@Module({ namespaced: true })
class Location extends VuexModule {
  public address: Address = {
    countryCode: '',
    countrySubdivision: '',
    countrySecondarySubdivision: '',
    municipality: '',
    postalCode: '',
    country: '',
    countryCodeISO3: '',
    freeformAddress: '',
    localName: '',
    position: '',
  }
  public isLoading = false

  @Mutation
  public [LocationMutations.TOGGLE_LOADING](): void {
    this.isLoading = !this.isLoading
  }

  @Mutation
  public [LocationMutations.ADDRESS](location: FullAddress): void {
    this.address = location.address
    this.address.position = location.position
  }

  @Action
  public [LocationActions.ADDRESS](): void {
    this.context.commit(LocationMutations.TOGGLE_LOADING)
    getAddressDetails(15, 75).then((result: AxiosResponse) => {
      const data = result.data.addresses[0]
      this.context.commit(LocationMutations.TOGGLE_LOADING)
      this.context.commit(LocationMutations.ADDRESS, data)
    })
  }

  get getAddress(): Address {
    return this.address
  }
}
export default Location
