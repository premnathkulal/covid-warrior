import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators'
import { ScheduleActions, ScheduleMutations } from '@/types/types'
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
      .then(response => {
        this.context.commit(ScheduleMutations.SET_SUCCESS, true)
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
      .then(response => {
        this.context.commit(ScheduleMutations.SET_SUCCESS, true)
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
        this.context.commit(ScheduleMutations.SCHEDULE_BY_ID, response.data)
      })
      .catch(error => {
        console.log(error)
      })
      .finally(() => {
        this.context.commit(ScheduleMutations.LOADING)
      })
  }

  get beneficiaryError(): string {
    return this.errorMessage
  }

  get beneficiarySuccess(): boolean {
    return this.isSuccess
  }

  get getScheduleInfo(): any {
    return this.scheduleInfo
  }
}
export default Schedule
