import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators'
import { loginAPI, topStoriesAPI } from '@/utils/api'
import { LoginActions, LoginMutations } from '@/types/types'
import Cookies from 'js-cookie'

@Module({ namespaced: true })
class Login extends VuexModule {
  isLoading = false
  loginError = ''
  loginSuccess = false
  token = ''
  topNews: any[] = [
    {
      section: '',
      title: '',
      url: '',
      byline: '',
      published_date: '',
      multimedia: [{ url: '' }],
    },
  ]

  @Mutation
  public [LoginMutations.LOADING](): void {
    this.isLoading = !this.isLoading
  }

  //   @Mutation
  //   public [LoginMutations.IS_LOGGED_IN](): void {

  //   }

  @Mutation
  public [LoginMutations.LOGIN](token: string): void {
    this.loginSuccess = true
    Cookies.set('jwtToken', token)
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
  [LoginActions.LOGIN](authCredentials: any): Promise<void> {
    this.context.commit(LoginMutations.LOADING)
    return loginAPI(authCredentials)
      .then(response => {
        this.context.commit(LoginMutations.LOGIN, response.data.token)
        this.context.commit(LoginMutations.SET_ERROR, false)
      })
      .catch((error: any) => {
        this.context.commit(LoginMutations.SET_ERROR, true)
        console.log(error)
      })
      .finally(() => {
        this.context.commit(LoginMutations.LOADING)
      })
  }

  @Mutation
  public [LoginMutations.LOGOUT](): void {
    this.loginSuccess = false
    Cookies.remove('jwtToken')
    this.token = ''
  }

  @Action
  [LoginActions.LOGOUT](): void {
    this.context.commit(LoginMutations.LOGOUT)
  }

  @Action
  public [LoginActions.IS_LOGGED_IN](): void {
    const token = Cookies.get('jwtToken')
    console.log(token)
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
