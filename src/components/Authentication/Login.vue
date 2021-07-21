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
        />
        <custom-button
          btnText="Register"
          btnType="cancel"
          btnName="normal-btn"
          @btnAction="$emit('toggleAuthScreen')"
        />
      </div>
    </div>
    <h5 class="text-center pb-1">Or</h5>
    <div class="social">
      <div class="social-btn-field">
        <div class="social-btn">
          <custom-button icon="mdi-google" btnName="google-btn" />
        </div>
        <div class="social-btn">
          <custom-button icon="mdi-facebook" btnName="facebook-btn" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import CustomInput from '@/components/shared/CustomInput.vue'
import CustomButton from '@/components/shared/CustomButton.vue'
import { formValidator, resetFormError } from '@/utils/formValidator'

@Component({
  components: {
    CustomInput,
    CustomButton,
  },
})
export default class Login extends Vue {
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
    resetFormError(property, this.userDetails)
  }
}
</script>

<style lang="scss">
.login {
  @include form-style();
}
</style>
