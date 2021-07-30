import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators'
import {
  BeneficiaryActions,
  ScheduleActions,
  ScheduleMutations,
} from '@/types/types'
import {
  scheduleAPI,
  updateScheduleAPI,
  loadScheduleByIdAPI,
} from '@/utils/api'

@Module({ namespaced: true })
class Schedule extends VuexModule {
  public isLoading = false
  public isSuccess = false
  public errorMessage = ''
  public scheduleInfo = {}

  @Mutation
  public [ScheduleMutations.LOADING](): void {
    this.isLoading = !this.isLoading
  }

  @Mutation
  public [ScheduleMutations.SET_SUCCESS](isSuccess: boolean): void {
    this.isSuccess = isSuccess
  }

  @Mutation
  public [ScheduleMutations.SET_ERROR](errorMessage: string): void {
    this.errorMessage = errorMessage
  }

  @Action
  public [ScheduleActions.SET_ERROR](errorMessage: string): void {
    this.context.commit(ScheduleMutations.SET_ERROR, errorMessage)
  }

  @Action
  public [ScheduleActions.SCHEDULE](scheduleDetails: any): void {
    this.context.commit(ScheduleMutations.LOADING)
    this.context.commit(ScheduleMutations.SET_SUCCESS, false)

    scheduleAPI(scheduleDetails)
      .then(() => {
        this.context.commit(ScheduleMutations.SET_SUCCESS, true)
        this.context.dispatch(
          `Beneficiary/${BeneficiaryActions.BENEFICIARIES}`,
          null,
          { root: true }
        )
      })
      .catch(error => {
        this.context.commit(
          ScheduleMutations.SET_ERROR,
          error.response.data.message
        )
      })
      .finally(() => {
        this.context.commit(ScheduleMutations.LOADING)
      })
  }

  @Action
  public [ScheduleActions.UPDATE](scheduleDetails: any): void {
    this.context.commit(ScheduleMutations.LOADING)
    this.context.commit(ScheduleMutations.SET_SUCCESS, false)

    updateScheduleAPI(scheduleDetails)
      .then(() => {
        this.context.commit(ScheduleMutations.SET_SUCCESS, true)
        this.context.dispatch(
          ScheduleActions.SCHEDULE_BY_ID,
          scheduleDetails.beneficiaryId
        )
      })
      .catch(error => {
        this.context.commit(
          ScheduleMutations.SET_ERROR,
          error.response.data.message
        )
      })
      .finally(() => {
        this.context.commit(ScheduleMutations.LOADING)
      })
  }

  @Mutation
  public [ScheduleMutations.SCHEDULE_BY_ID](data: any): void {
    this.scheduleInfo = data
  }

  @Action
  public [ScheduleActions.SCHEDULE_BY_ID](idNumber: string): void {
    this.context.commit(ScheduleMutations.LOADING)
    this.context.commit(ScheduleMutations.SCHEDULE_BY_ID, {})
    loadScheduleByIdAPI(idNumber)
      .then(response => {
        this.context.commit(
          ScheduleMutations.SCHEDULE_BY_ID,
          response.data.scheduleData
        )
      })
      .catch(error => {
        console.log(error)
      })
      .finally(() => {
        this.context.commit(ScheduleMutations.LOADING)
      })
  }

  get scheduleError(): string {
    return this.errorMessage
  }

  get scheduleSuccess(): boolean {
    return this.isSuccess
  }

  get getScheduleInfo(): any {
    return this.scheduleInfo
  }
}
export default Schedule
