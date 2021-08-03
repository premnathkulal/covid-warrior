<template>
  <div class="register">
    <h3 class="title">Retgister</h3>

    <div class="form">
      <div class="form-input">
        <custom-input
          id="name"
          v-model="userDetails.name.value"
          placeHolder="Full Name"
          inputType="text"
          :errorMessage="userDetails.name.error"
          @keyDownAction="keyDownAction('name')"
          @blurAction="validate('name')"
        />
        <custom-input
          id="username"
          v-model="userDetails.username.value"
          placeHolder="Username"
          inputType="text"
          :errorMessage="userDetails.username.error"
          @keyDownAction="keyDownAction('username')"
          @blurAction="validate('username')"
        />
        <custom-input
          id="password"
          v-model="userDetails.password.value"
          placeHolder="Password"
          inputType="password"
          :errorMessage="userDetails.password.error"
          @keyDownAction="keyDownAction('password')"
          @blurAction="validate('password')"
        />
        <custom-button
          :isDisabled="!disableButton()"
          btnText="Register"
          btnName="normal-btn"
          @btnAction="register"
        />
        <custom-button
          btnText="Login"
          btnType="cancel"
          btnName="normal-btn"
          @btnAction="toggleAuthScreen()"
        />
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
import { RegisterActions } from '@/types/types'
import { RegisterDetails } from '@/types/interface'

const register = namespace('Register')

@Component({
  components: {
    CustomInput,
    CustomButton,
  },
})
export default class Register extends Vue {
  userDetails = {
    name: {
      value: '',
      error: '',
    },
    username: {
      value: '',
      error: '',
    },
    password: {
      value: '',
      error: '',
    },
  }

  @register.Getter
  userNameErrorMsg!: string

  @register.Getter
  passwordErrorMsg!: string

  @register.Getter
  isRegisterSuccess!: boolean

  @register.Action(RegisterActions.REGISTER)
  // eslint-disable-next-line no-unused-vars
  public userRegister!: (userDetails: RegisterDetails) => void

  @register.Action(RegisterActions.SET_ERROR)
  // eslint-disable-next-line no-unused-vars
  public setError!: (errMsg: string) => void

  @Watch('userNameErrorMsg')
  userNameError(): void {
    this.userDetails.username.error = this.userNameErrorMsg
  }

  @Watch('passwordErrorMsg')
  passwordError(): void {
    this.userDetails.password.error = this.passwordErrorMsg
  }

  @Watch('isRegisterSuccess')
  registrationSuccess(): void {
    this.toggleAuthScreen()
  }

  disableButton(): boolean {
    return (
      this.userDetails.name.value.length >= 4 &&
      this.userDetails.username.value.length >= 4 &&
      this.userDetails.password.value.length >= 8 &&
      this.userDetails.password.error.length === 0
    )
  }

  validate(property: string): void {
    formValidator(property, this.userDetails)
  }

  keyDownAction(property: string): void {
    this.setError('')
    resetFormError(property, this.userDetails)
  }

  toggleAuthScreen(): void {
    this.userDetails.name.value = ''
    this.userDetails.username.value = ''
    this.userDetails.password.value = ''
    this.$emit('toggleAuthScreen')
  }

  register(): void {
    this.userRegister(this.userDetails)
  }
}
</script>

<style lang="scss">
.register {
  @include form-style();
}
</style>
