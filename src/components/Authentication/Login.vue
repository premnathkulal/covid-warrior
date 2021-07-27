<template>
  <div class="login">
    <h3 class="title">Login</h3>
    <div class="form">
      <div class="form-input">
        <custom-input
          id="login-username"
          v-model="userDetails.username.value"
          placeHolder="Username"
          inputType="text"
          :errorMessage="userDetails.username.error"
          @keyDownAction="keyDownAction('username')"
          @blurAction="validate('username')"
        />
        <custom-input
          id="login-password"
          v-model="userDetails.password.value"
          placeHolder="Password"
          inputType="password"
          :errorMessage="userDetails.password.error"
          @keyDownAction="keyDownAction('password')"
          @blurAction="validate('password')"
        />
        <custom-button
          :isDisabled="!disableButton()"
          btnText="Login"
          btnName="normal-btn"
          @btnAction="login()"
        />
        <custom-button
          btnText="Register"
          btnType="cancel"
          btnName="normal-btn"
          @btnAction="toggleAuthScreen()"
        />
      </div>
    </div>
    <h5 class="text-center pb-1">Or</h5>
    <div class="social">
      <div class="social-btn-field">
        <div class="social-btn">
          <custom-button
            @btnAction="googleLogin()"
            icon="mdi-google"
            btnName="google-btn"
          />
        </div>
        <div class="social-btn">
          <custom-button icon="mdi-facebook" btnName="facebook-btn" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'
import CustomInput from '@/components/shared/CustomInput.vue'
import CustomButton from '@/components/shared/CustomButton.vue'
import { formValidator, resetFormError } from '@/utils/formValidator'
import { namespace } from 'vuex-class'
import { LoginActions } from '@/types/types'

const login = namespace('Login')

@Component({
  components: {
    CustomInput,
    CustomButton,
  },
})
export default class Login extends Vue {
  @login.Getter
  errorMessage!: string

  @login.Getter
  isLoginSuccess!: string

  @login.Action(LoginActions.LOGIN)
  // eslint-disable-next-line no-unused-vars
  public userLogin!: (authCredentials: any) => void

  @login.Action(LoginActions.SET_ERROR)
  // eslint-disable-next-line no-unused-vars
  public resetError!: (isError: boolean) => void

  @login.Action('LoginActions.GOOGLE_LOGIN')
  public googleAuthLogin!: () => void

  userDetails = {
    username: {
      value: '',
      error: '',
    },
    password: {
      value: '',
      error: '',
    },
  }

  @Watch('errorMessage')
  setErrorMessage(): void {
    this.userDetails.password.error = this.errorMessage
    console.log(this.errorMessage, this.userDetails)
  }

  @Watch('isLoginSuccess')
  loginSuccess(): void {
    if (this.isLoginSuccess) {
      this.userDetails.username.value = ''
      this.userDetails.password.value = ''
      this.$emit('hideAuthScreen')
    }
  }

  disableButton(): boolean {
    return (
      this.userDetails.password.value.length >= 8 &&
      this.userDetails.username.value.length >= 4
    )
  }

  validate(property: string): void {
    formValidator(property, this.userDetails)
  }

  keyDownAction(property: string): void {
    this.resetError(false)
    resetFormError(property, this.userDetails)
  }

  toggleAuthScreen(): void {
    this.userDetails.username.value = ''
    this.userDetails.password.value = ''
    this.$emit('toggleAuthScreen')
  }

  login(): void {
    this.userLogin({
      username: this.userDetails.username.value,
      password: this.userDetails.password.value,
    })
  }

  googleLogin(): void {
    this.googleAuthLogin()
  }
}
</script>

<style lang="scss">
@include form-style();
</style>
