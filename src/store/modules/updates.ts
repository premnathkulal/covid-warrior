import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators'
import { StateWiseUpdates } from '@/types/interface'
import { UpdatesActions, UpdatesMutations } from '@/types/types'
import { getUpdates } from '@/utils/api'
import { AxiosResponse } from 'axios'

@Module({ namespaced: true })
class Updates extends VuexModule {
  public stateWiseData: StateWiseUpdates[] = []
  public isLoading = false

  @Mutation
  public [UpdatesMutations.LOADING](): void {
    this.isLoading = !this.isLoading
  }

  @Mutation
  public [UpdatesMutations.UPDATES](data: StateWiseUpdates[]): void {
    this.stateWiseData = data
  }

  @Action
  public [UpdatesActions.UPDATES](): void {
    this.context.commit(UpdatesMutations.LOADING)
    getUpdates().then((result: AxiosResponse) => {
      this.context.commit(UpdatesMutations.UPDATES, result.data.statewise)

      this.context.commit(UpdatesMutations.LOADING)
    })
  }

  get stateWiseUpdates(): StateWiseUpdates[] {
    return this.stateWiseData
  }
}
export default Updates
