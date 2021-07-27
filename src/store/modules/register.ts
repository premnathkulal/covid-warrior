import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators'
import { registerAPI } from '@/utils/api'
import { RegisterActions, RegisterMutations } from '@/types/types'
import {
  PasswordErrorMessages,
  UserNameErrorMessages,
} from '@/utils/errorMessage'

@Module({ namespaced: true })
class Register extends VuexModule {
  isLoading = false
  nameError = ''
  userNameError = ''
  passwordError = ''
  registerSuccess = false
  token = ''

  @Mutation
  public [RegisterMutations.LOADING](): void {
    this.isLoading = !this.isLoading
  }

  @Mutation
  public [RegisterMutations.REGISTER](): void {
    this.registerSuccess = true
  }

  @Mutation
  public [RegisterMutations.SET_ERROR](error: string): void {
    if (error) {
      if (UserNameErrorMessages.includes(error)) {
        this.userNameError = error
      }
      if (PasswordErrorMessages.includes(error)) {
        this.passwordError = error
      }
      return
    }
    this.userNameError = ''
    this.passwordError = ''
  }

  @Action
  [RegisterActions.SET_ERROR](errMsg: string): void {
    this.context.commit(RegisterMutations.SET_ERROR, errMsg)
  }

  @Action
  [RegisterActions.REGISTER](userDetails: any): Promise<void> {
    this.context.commit(RegisterMutations.LOADING)
    return registerAPI(userDetails)
      .then(response => {
        console.log(response)
        this.context.commit(RegisterMutations.REGISTER)
        this.context.commit(RegisterMutations.SET_ERROR, '')
      })
      .catch((error: any) => {
        this.context.commit(
          RegisterMutations.SET_ERROR,
          error.response.data.message
        )
      })
      .finally(() => {
        this.context.commit(RegisterMutations.LOADING)
      })
  }

  get userNameErrorMsg(): any {
    return this.userNameError
  }

  get passwordErrorMsg(): any {
    return this.passwordError
  }

  get isRegisterSuccess(): boolean {
    return this.registerSuccess
  }
}
export default Register
