import { LoginDetails, RegisterDetails } from '@/types/interface'

const formValidator = (
  value: string,
  formDetails: RegisterDetails | LoginDetails
): void => {
  if (value === 'name') {
    if ((formDetails as RegisterDetails).name.value.length < 4) {
      ;(formDetails as RegisterDetails).name.error =
        'Name must be atleast 4 letters'
    } else {
      formDetails.username.error = ''
    }
  }
  if (value === 'username') {
    if (formDetails.username.value.length < 4) {
      formDetails.username.error = 'Username must be atleast 4 letters'
    } else {
      formDetails.username.error = ''
    }
  }
  if (value === 'password') {
    if (formDetails.password.value.length < 8) {
      formDetails.password.error = 'Password must be atleast 8 letters'
    } else {
      formDetails.password.error = ''
    }
  }
}

const resetFormError = (
  property: string,
  formDetails: RegisterDetails | LoginDetails
): void => {
  if (property === 'name') {
    ;(formDetails as RegisterDetails).name.error = ''
  }
  if (property === 'username') {
    formDetails.username.error = ''
  }
  if (property === 'password') {
    formDetails.password.error = ''
  }
}

export { formValidator, resetFormError }
