import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators'
import { LocationActions, LocationMutations } from '@/types/types'
import { getAddressDetails } from '@/utils/api'
import { AxiosResponse } from 'axios'
import { Address, FullAddress, Position } from '@/types/interface'

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
  }
  public isLoading = false
  public latitude = 0
  public longitude = 0

  @Mutation
  public [LocationMutations.LOADING](): void {
    this.isLoading = !this.isLoading
  }

  @Mutation
  public [LocationMutations.SET_LAT_LON](position: Position): void {
    this.latitude = Math.floor(position.lat)
    this.longitude = Math.floor(position.lon)
  }

  @Mutation
  public [LocationMutations.ADDRESS](location: FullAddress): void {
    this.address = location.address
    this.address.position = location.position
  }

  @Action
  public [LocationActions.ADDRESS](position: Position): void {
    this.context.commit(LocationMutations.LOADING)
    this.context.commit(LocationMutations.SET_LAT_LON, position)
    getAddressDetails(position.lat, position.lon).then(
      (result: AxiosResponse) => {
        const data = result.data.addresses[0]
        this.context.commit(LocationMutations.LOADING)
        this.context.commit(LocationMutations.ADDRESS, data)
      }
    )
  }

  get getAddress(): Address {
    return this.address
  }

  get getLatitude(): number {
    return this.latitude
  }

  get getLongitude(): number {
    return this.longitude
  }
}
export default Location
