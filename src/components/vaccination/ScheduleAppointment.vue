<template>
  <v-row justify="center">
    <v-dialog v-model="showDialog" persistent max-width="600px">
      <v-card>
        <v-card-title> </v-card-title>
        <v-card-text>
          <custom-input
            id="pincode"
            placeHolder="Pincode"
            inputType="text"
            v-model="pincode"
            @keypressAction="checkInputIsNumber($event, 'pincode', pincode)"
          />
          <v-select
            v-model="scheduleDetails.centerName"
            :items="centerId"
            label="Center Id"
            :disabled="disableInput()"
            solo
          ></v-select>
          <v-select
            v-model="scheduleDetails.slot"
            :items="slots"
            label="Select Slot"
            solo
          ></v-select>
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
                  label="Date"
                  color="dark"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="scheduleDetails.date"
                :max="date"
                color="primary text-dark"
                scrollable
              >
                <v-spacer></v-spacer>
                <v-btn text color="dark" @click="modal = false"> Cancel </v-btn>
                <v-btn
                  text
                  color="dark"
                  @click="$refs.dialog.save(scheduleDetails.date)"
                >
                  OK
                </v-btn>
              </v-date-picker>
            </v-dialog>
          </div>
          <v-select
            v-model="scheduleDetails.vaccine"
            :items="vaccine"
            label="vaccine"
            solo
          ></v-select>
          <custom-button
            :btnText="formType === 'schedule' ? 'Confirm' : 'Update'"
            btnName="normal-btn"
            :isDisabled="disableButton()"
          />
          <custom-button
            btnText="Cancel"
            btnType="cancel"
            btnName="normal-btn"
            @btnAction="$emit('toggleDialog')"
          />
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import CustomInput from '@/components/shared/CustomInput.vue'
import CustomButton from '@/components/shared/CustomButton.vue'
import { isNumber } from '@/utils/formValidator'

@Component({
  components: {
    CustomInput,
    CustomButton,
  },
})
export default class ScheduleAppointment extends Vue {
  @Prop({ default: false }) dialog!: boolean
  @Prop({ default: 'schedule' }) formType!: boolean

  date = new Date().toISOString().substr(0, 10)
  showDialog = false
  gender = ['Male', 'Female', 'Other']
  photoIdType = ['Aadhar Card', 'Pan Card']
  centerId = ['123456', '123456']
  slots = ['123456', '123456']
  vaccine = ['COVAXIN', 'COVISHIELD']
  modal = false
  errorMessage = '*This Field is required'
  selectedPhotoIdType = ''
  pincode = ''
  checkInputIsNumber = isNumber

  scheduleDetails = {
    beneficiaryId: '',
    centerName: '',
    slot: '',
    date: this.date,
    vaccine: '',
  }

  @Watch('dialog')
  toggleDialog(): void {
    this.showDialog = this.dialog
  }

  disableInput(): boolean {
    const re = /^[1-9]{1}[0-9]{2}[0-9]{3}$/
    return !re.test(this.pincode)
  }

  disableButton(): boolean {
    return !(
      this.scheduleDetails.centerName &&
      this.scheduleDetails.slot &&
      this.scheduleDetails.vaccine
    )
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
