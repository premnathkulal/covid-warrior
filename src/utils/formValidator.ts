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
    const aadharPattern = /^[2-9]{1}[0-9]{11}$/
    if (!aadharPattern.test(formDetails.idNumber.value)) {
      formDetails.idNumber.error = 'Enter Valid Aadhar Number'
    } else {
      formDetails.idNumber.error = ''
    }
  }
  if (value === 'Pan Card') {
    const panCardPattern = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/
    if (!panCardPattern.test(formDetails.idNumber.value)) {
      formDetails.idNumber.error = 'Enter Valid Pan Card Number'
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

const isNumber = (evt: KeyboardEvent, id = 'id', value = 0): boolean | void => {
  evt = (evt ? evt : window.event) as KeyboardEvent
  const charCode = evt.keyCode
  if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode !== 46) {
    evt.preventDefault()
  } else if (!(value.toString().length <= 5) && id === 'pincode') {
    evt.preventDefault()
  } else if (!(value.toString().length <= 11) && id === 'aadharcard') {
    evt.preventDefault()
  } else {
    return true
  }
}

const setLimitToInput = (
  evt: KeyboardEvent,
  id = 'id',
  value: string
): boolean | void => {
  evt = (evt ? evt : window.event) as KeyboardEvent
  if (!(value.toString().length <= 9) && id === 'pancard') {
    evt.preventDefault()
  } else {
    return true
  }
}

export { formValidator, resetFormError, isNumber, setLimitToInput }
