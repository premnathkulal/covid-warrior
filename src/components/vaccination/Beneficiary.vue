<template>
  <v-row justify="center">
    <v-dialog v-model="showDialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="text-h5 mb-5">Add Beneficiary</span>
        </v-card-title>
        <v-card-text>
          <custom-input
            id="name"
            v-model="beneficiaryDetails.name.value"
            placeHolder="Name"
            inputType="text"
            :errorMessage="beneficiaryDetails.name.error"
            @keyDownAction="keyDownAction('name')"
            @blurAction="validate('name')"
          />
          <div class="select">
            <v-dialog
              ref="dialog"
              v-model="modal"
              :return-value.sync="date"
              persistent
              width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="date"
                  label="Birth Date"
                  color="dark"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="date"
                :max="currentDate"
                color="primary text-dark"
                scrollable
              >
                <v-spacer></v-spacer>
                <v-btn text color="dark" @click="modal = false"> Cancel </v-btn>
                <v-btn text color="dark" @click="$refs.dialog.save(date)">
                  OK
                </v-btn>
              </v-date-picker>
            </v-dialog>
          </div>
          <v-select
            :items="genderList"
            v-model="gender"
            label="Gender"
            class="select"
            solo
          ></v-select>
          <v-select
            id="photoIdTypeList"
            :items="photoIdTypeList"
            v-model="photoIdType"
            label="Select Photo ID Type"
            class="select"
            solo
          ></v-select>
          <custom-input
            id="photoId"
            v-model="beneficiaryDetails.idNumber.value"
            @input="convertToUppercase(beneficiaryDetails.idNumber.value)"
            :placeHolder="photoIdPlaceholder"
            inputType="text"
            :errorMessage="beneficiaryDetails.idNumber.error"
            :disabled="desableInputBox()"
            @keyDownAction="keyDownAction('photoIdNumber')"
            @blurAction="validate(photoIdType)"
            @keypressAction="idNumberKeyPressActions($event)"
          />
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="$emit('toggleDialog')">
            Close
          </v-btn>
          <v-btn color="blue darken-1" text @click="addBenebiciary()">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import CustomInput from '@/components/shared/CustomInput.vue'
import CustomButton from '@/components/shared/CustomButton.vue'
import {
  formValidator,
  isNumber,
  resetFormError,
  setLimitToInput,
} from '@/utils/formValidator'
import { BeneficiaryActions } from '@/types/types'
import { namespace } from 'vuex-class'
import { BeneficiaryDetails } from '@/types/interface'
import { NameErrorMessages, PhotoIdErrorMessages } from '@/utils/errorMessage'
import SuccessFailuerAlert from '@/components/shared/SuccessFailuerAlert.vue'

const beneficiary = namespace('Beneficiary')

@Component({
  components: {
    CustomInput,
    CustomButton,
    SuccessFailuerAlert,
  },
})
export default class Beneficiary extends Vue {
  @Prop({ default: false }) dialog!: boolean
  showDialog = false
  currentDate = new Date().toISOString().substr(0, 10)
  genderList = ['Male', 'Female', 'Other']
  photoIdTypeList = ['Aadhar Card', 'Pan Card']
  modal = false
  errorMessage = '*This Field is required'
  gender = 'Male'
  photoIdType = ''
  photoIdPlaceholder = 'ID Number'
  date = this.currentDate

  beneficiaryDetails = {
    name: {
      value: '',
      error: '',
    },
    idNumber: {
      value: '',
      error: '',
    },
  }

  @beneficiary.Getter
  public beneficiaryError!: string

  @beneficiary.Getter
  public beneficiarySuccess!: boolean

  @beneficiary.Action(BeneficiaryActions.SET_ERROR)
  public setErrorMsg!: (errorMessage: string) => void

  @beneficiary.Action(BeneficiaryActions.ADD_BENEFICIARY)
  public addBeneficiary!: (beneficiaryDetails: BeneficiaryDetails) => void

  @Watch('beneficiaryError')
  setError(): void {
    if (this.beneficiaryError) {
      if (PhotoIdErrorMessages.includes(this.beneficiaryError)) {
        this.beneficiaryDetails.idNumber.error = this.beneficiaryError
      }
      if (NameErrorMessages.includes(this.beneficiaryError)) {
        this.beneficiaryDetails.name.error = this.beneficiaryError
      }
    }
  }

  @Watch('beneficiarySuccess')
  onSuccess(): void {
    if (this.beneficiarySuccess) {
      this.beneficiaryDetails = {
        name: {
          value: '',
          error: '',
        },
        idNumber: {
          value: '',
          error: '',
        },
      }
      this.gender = 'Male'
      this.photoIdType = ''
    }
  }

  @Watch('dialog')
  toggleDialog(): void {
    this.showDialog = this.dialog
  }

  @Watch('photoIdType')
  getPlaceholder(): void {
    this.beneficiaryDetails.idNumber.value = ''
    resetFormError('photoIdNumber', this.beneficiaryDetails)
    if (this.photoIdType) {
      this.photoIdPlaceholder = `${(this.photoIdPlaceholder =
        this.photoIdType)} Number`
    }
  }

  validate(property: string): void {
    formValidator(property, this.beneficiaryDetails)
  }

  keyDownAction(property: string): void {
    this.setErrorMsg('')
    resetFormError(property, this.beneficiaryDetails)
  }

  desableInputBox(): boolean {
    return !this.photoIdType
  }

  addBenebiciary(): void {
    if (this.beneficiaryDetails.name.value === '') {
      this.beneficiaryDetails.name.error = this.errorMessage
    } else if (this.beneficiaryDetails.idNumber.value === '') {
      this.beneficiaryDetails.idNumber.error = this.errorMessage
    } else if (
      !this.beneficiaryDetails.idNumber.error &&
      !this.beneficiaryDetails.name.error
    ) {
      const beneficiaryDetails = {
        ...this.beneficiaryDetails,
        birthDate: {
          value: this.date,
          error: '',
        },
        photoIdType: {
          value: this.photoIdTypeList.indexOf(this.photoIdType).toString(),
          error: '',
        },
        gender: {
          value: this.genderList.indexOf(this.gender).toString(),
          error: '',
        },
      }
      this.addBeneficiary(beneficiaryDetails)
    }
  }

  idNumberKeyPressActions(event: KeyboardEvent): boolean | void {
    if (this.photoIdType === 'Aadhar Card') {
      return isNumber(
        event,
        'aadharcard',
        parseInt(this.beneficiaryDetails.idNumber.value)
      )
    } else if (this.photoIdType === 'Pan Card') {
      return setLimitToInput(
        event,
        'pancard',
        this.beneficiaryDetails.idNumber.value
      )
    }
    return true
  }

  convertToUppercase(value: string): void {
    this.beneficiaryDetails.idNumber.value = value.toUpperCase()
  }
}
</script>

<style lang="scss">
.v-list .v-list-item--active {
  background-color: $color-primary !important;
}

.v-list .v-list-item--active .v-list-item__title {
  color: $black !important;
}
</style>
