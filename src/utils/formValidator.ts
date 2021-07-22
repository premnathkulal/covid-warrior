import {
  // BeneficiaryDetails,
  // LoginDetails,
  RegisterDetails,
} from '@/types/interface'

// eslint-disable-next-line
const formValidator = (value: string, formDetails: any): void => {
  if (value === 'name') {
    if ((formDetails as RegisterDetails).name.value.length < 4) {
      ;(formDetails as RegisterDetails).name.error =
        'Name must be atleast 4 letters'
    } else {
      formDetails.name.error = ''
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
  if (value === 'Aadhar Card') {
    if (!(formDetails.idNumber.value.length === 12)) {
      formDetails.idNumber.error = 'idNumber must be atleast 12 letters'
    } else {
      formDetails.idNumber.error = ''
    }
  }
  if (value === 'Pan Card') {
    if (!(formDetails.idNumber.value.length === 10)) {
      formDetails.idNumber.error = 'idNumber must be atleast 10 letters'
    } else {
      formDetails.idNumber.error = ''
    }
  }
}

// eslint-disable-next-line
const resetFormError = (property: string, formDetails: any): void => {
  if (property === 'name') {
    formDetails.name.error = ''
  }
  if (property === 'username') {
    formDetails.username.error = ''
  }
  if (property === 'password') {
    formDetails.password.error = ''
  }
  if (property === 'photoIdNumber') {
    formDetails.idNumber.error = ''
  }
}

export { formValidator, resetFormError }
