<template>
  <div class="login">
    <h3 class="title">Retgister</h3>
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
    />
    <custom-button
      btnText="Login"
      btnType="cancel"
      btnName="normal-btn"
      @btnAction="$emit('toggleAuthScreen')"
    />
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
    resetFormError(property, this.userDetails)
  }
}
</script>

<style lang="scss">
.login {
  .title {
    text-align: center;
    padding: 2rem;
    font-weight: bold;
  }
  .social {
    display: flex;
    align-items: center;
    justify-content: center;

    .prem {
      display: flex;
      justify-content: space-between;

      width: 40%;
      @media only screen and (max-width: 900px) {
        width: 80%;
      }

      .social-buttons {
        width: 48%;
      }
    }
  }
}
</style>
