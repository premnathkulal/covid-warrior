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
          <div>
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
              <v-date-picker v-model="date" scrollable>
                <v-spacer></v-spacer>
                <v-btn text color="dark" @click="modal = false"> Cancel </v-btn>
                <v-btn text color="dark" @click="$refs.dialog.save(date)">
                  OK
                </v-btn>
              </v-date-picker>
            </v-dialog>
          </div>
          <v-select
            :items="gender"
            v-model="selectedGender"
            label="Gender"
            solo
          ></v-select>
          <v-select
            id="photoIdType"
            :items="photoIdType"
            v-model="selectedPhotoIdType"
            label="Select Photo ID Type"
            solo
            @change="changePhotoIdType()"
          ></v-select>
          <custom-input
            id="photoId"
            v-model="beneficiaryDetails.idNumber.value"
            placeHolder="ID Number"
            inputType="text"
            :errorMessage="beneficiaryDetails.idNumber.error"
            :disabled="desableInputBox()"
            @keyDownAction="keyDownAction('photoIdNumber')"
            @blurAction="validate(selectedPhotoIdType)"
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
import { formValidator, resetFormError } from '@/utils/formValidator'

@Component({
  components: {
    CustomInput,
    CustomButton,
  },
})
export default class Beneficiary extends Vue {
  @Prop({ default: false }) dialog!: boolean
  showDialog = false
  date = new Date().toISOString().substr(0, 10)
  gender = ['Male', 'Female', 'Other']
  photoIdType = ['Aadhar Card', 'Pan Card']
  modal = false
  errorMessage = '*This Field is required'
  selectedGender = 'Male'
  selectedPhotoIdType = ''

  beneficiaryDetails = {
    name: {
      value: '',
      error: '',
    },
    birthDate: {
      value: '',
      error: '',
    },
    idNumber: {
      value: '',
      error: '',
    },
  }

  @Watch('dialog')
  toggleDialog(): void {
    this.showDialog = this.dialog
  }

  validate(property: string): void {
    formValidator(property, this.beneficiaryDetails)
  }

  keyDownAction(property: string): void {
    resetFormError(property, this.beneficiaryDetails)
  }

  desableInputBox(): boolean {
    return !this.selectedPhotoIdType
  }

  changePhotoIdType(): void {
    this.beneficiaryDetails.idNumber.value = ''
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
      console.log('Adding...')
    }
  }
}
</script>

<style lang="scss"></style>
