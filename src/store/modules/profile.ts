import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators'
import { profileAPI } from '@/utils/api'
import { ProfileActions, ProfileMutations } from '@/types/types'
import { ProfileInfo } from '@/types/interface'

@Module({ namespaced: true })
class Profile extends VuexModule {
  isLoading = false
  profileInfo = {} as ProfileInfo

  @Mutation
  public [ProfileMutations.LOADING](): void {
    this.isLoading = !this.isLoading
  }

  @Mutation
  public [ProfileMutations.PROFILE](data: ProfileInfo): void {
    this.profileInfo = data
  }

  @Action
  public [ProfileActions.PROFILE](): Promise<void> {
    this.context.commit(ProfileMutations.LOADING)
    return profileAPI()
      .then(response => {
        this.context.commit(ProfileMutations.PROFILE, response.data.userDetails)
      })
      .catch(() => {
        //
      })
      .finally(() => {
        this.context.commit(ProfileMutations.LOADING)
      })
  }

  get getProfileInfo(): ProfileInfo {
    return this.profileInfo
  }
}
export default Profile
