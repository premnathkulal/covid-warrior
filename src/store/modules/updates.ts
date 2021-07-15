import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators'
import { StateWiseUpdates } from '@/types/interface'
import { UpdatesActions, UpdatesMutations } from '@/types/types'
import { getUpdates } from '@/utils/api'

@Module({ namespaced: true })
class Updates extends VuexModule {
  public stateWiseData: StateWiseUpdates[] = []
  public isLoading = false

  @Mutation
  public [UpdatesMutations.UPDATES](data: StateWiseUpdates[]): void {
    this.stateWiseData = data
  }

  @Action
  public [UpdatesActions.UPDATES](): void {
    getUpdates().then(result => {
      this.context.commit(UpdatesMutations.UPDATES, result.data.statewise)
    })
  }

  get stateWiseUpdates(): StateWiseUpdates[] {
    return this.stateWiseData
  }
}
export default Updates
