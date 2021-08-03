import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators'
import { facebookAuthAPI, googleAuthAPI, loginAPI } from '@/utils/api'
import { LoginActions, LoginMutations } from '@/types/types'
import Cookies from 'js-cookie'
import { LoginDetails } from '@/types/interface'

@Module({ namespaced: true })
class Login extends VuexModule {
  isLoading = false
  loginError = ''
  loginSuccess = false
  token = ''

  @Mutation
  public [LoginMutations.LOADING](): void {
    this.isLoading = !this.isLoading
  }

  @Mutation
  public [LoginMutations.LOGIN](token: string): void {
    this.loginSuccess = true
    Cookies.set('jwtToken', token, { expires: 0.00069444 })
    this.token = token
  }

  @Mutation
  public [LoginMutations.SET_ERROR](isError: boolean): void {
    this.loginError = isError ? 'User Name and Password not matching' : ''
  }

  @Action
  [LoginActions.SET_ERROR](isError: boolean): void {
    this.context.commit(LoginMutations.SET_ERROR, isError)
  }

  @Action
  [LoginActions.LOGIN](authCredentials: LoginDetails): Promise<void> {
    this.context.commit(LoginMutations.LOADING)
    return loginAPI(authCredentials)
      .then(response => {
        this.context.commit(LoginMutations.LOGIN, response.data.token)
        this.context.commit(LoginMutations.SET_ERROR, false)
      })
      .catch(() => {
        this.context.commit(LoginMutations.SET_ERROR, true)
      })
      .finally(() => {
        this.context.commit(LoginMutations.LOADING)
      })
  }

  @Action
  [LoginActions.GOOGLE_LOGIN](
    googleAuthCode: string | (string | null)[]
  ): Promise<void> {
    return googleAuthAPI(googleAuthCode)
      .then(response => {
        this.context.commit(LoginMutations.LOGIN, response.data.token)
        this.context.commit(LoginMutations.SET_ERROR, false)
      })
      .catch(() => {
        //
      })
      .finally(() => {
        this.context.commit(LoginMutations.LOADING)
      })
  }

  @Action
  [LoginActions.FACEBOOK_LOGIN](
    facebookAuthCode: string | (string | null)[]
  ): Promise<void> {
    console.log('KOO')
    return facebookAuthAPI(facebookAuthCode)
      .then(response => {
        this.context.commit(LoginMutations.LOGIN, response.data.token)
        this.context.commit(LoginMutations.SET_ERROR, false)
      })
      .catch(() => {
        //
      })
      .finally(() => {
        this.context.commit(LoginMutations.LOADING)
      })
  }

  @Mutation
  public [LoginMutations.LOGOUT](): void {
    this.loginSuccess = false
    Cookies.remove('jwtToken')
    Cookies.remove('authToken')
    this.token = ''
  }

  @Action
  [LoginActions.LOGOUT](): void {
    this.context.commit(LoginMutations.LOGOUT)
  }

  @Action
  public [LoginActions.IS_LOGGED_IN](): void {
    const token = Cookies.get('jwtToken')
    if (token) {
      this.context.commit(LoginMutations.LOGIN, token)
      return
    }
    this.context.commit(LoginMutations.LOGOUT)
  }

  get errorMessage(): string {
    return this.loginError
  }

  get isLoginSuccess(): boolean {
    return this.loginSuccess
  }

  get userToken(): string {
    return this.token
  }
}
export default Login
