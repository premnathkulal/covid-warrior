import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators'
import { BeneficiaryActions, BeneficiaryMutations } from '@/types/types'
import { addBeneficiaryAPI, getBeneficiariesAPI } from '@/utils/api'
import {
  BeneficiaryDetails,
  BeneficiaryDetailsResponse,
} from '@/types/interface'

@Module({ namespaced: true })
class Beneficiary extends VuexModule {
  public beneficiaryList: BeneficiaryDetailsResponse[] = []
  public isLoading = false
  public isSuccess = false
  public errorMessage = ''

  @Mutation
  public [BeneficiaryMutations.LOADING](): void {
    this.isLoading = !this.isLoading
  }

  @Mutation
  public [BeneficiaryMutations.SET_SUCCESS](isSuccess: boolean): void {
    this.isSuccess = isSuccess
  }

  @Mutation
  public [BeneficiaryMutations.SET_ERROR](errorMessage: string): void {
    this.errorMessage = errorMessage
  }

  @Action
  public [BeneficiaryActions.SET_ERROR](errorMessage: string): void {
    this.context.commit(BeneficiaryMutations.SET_ERROR, errorMessage)
  }

  @Action
  public [BeneficiaryActions.ADD_BENEFICIARY](
    beneficiaryDetails: BeneficiaryDetails
  ): void {
    this.context.commit(BeneficiaryMutations.LOADING)
    this.context.commit(BeneficiaryMutations.SET_SUCCESS, false)
    addBeneficiaryAPI(beneficiaryDetails)
      .then(() => {
        this.context.commit(BeneficiaryMutations.SET_SUCCESS, true)
      })
      .catch(error => {
        this.context.commit(
          BeneficiaryMutations.SET_ERROR,
          error.response.data.message
        )
      })
      .finally(() => {
        this.context.commit(BeneficiaryMutations.LOADING)
      })
  }

  @Mutation
  public [BeneficiaryMutations.BENEFICIARIES](data: any): void {
    this.beneficiaryList = data
  }

  @Action
  public [BeneficiaryActions.BENEFICIARIES](): void {
    this.context.commit(BeneficiaryMutations.LOADING)
    getBeneficiariesAPI()
      .then(response => {
        console.log(response.data.beneficiaries)
        this.context.commit(
          BeneficiaryMutations.BENEFICIARIES,
          response.data.beneficiaries
        )
      })
      .catch(() => {
        //
      })
      .finally(() => {
        this.context.commit(BeneficiaryMutations.LOADING)
      })
  }

  get beneficiaryError(): string {
    return this.errorMessage
  }

  get beneficiarySuccess(): boolean {
    return this.isSuccess
  }

  get beneficiaries(): BeneficiaryDetailsResponse[] {
    return this.beneficiaryList
  }
}
export default Beneficiary
