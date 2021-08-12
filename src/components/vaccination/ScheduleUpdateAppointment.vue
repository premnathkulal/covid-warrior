<template>
  <v-row justify="center">
    <success-failuer-alert
      :dialog="successFailuerDialog"
      :alertMessage="alertMessage"
      :isSuccess="isSuccess"
      @toggleAlertBox="toggleAlertBox"
    />
    <v-dialog v-model="showDialog" persistent max-width="600px">
      <v-card>
        <v-card-title> </v-card-title>
        <v-card-text>
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
                :min="currentDate"
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
          <custom-input
            id="pincode"
            placeHolder="Pincode"
            inputType="text"
            v-model="pincode"
            @keypressAction="checkInputIsNumber($event, 'pincode', pincode)"
          />
          <v-select
            v-model="scheduleDetails.centerId"
            :items="vaccinationCenters"
            item-text="name"
            item-value="center_id"
            label="Center Name"
            :disabled="disableInput()"
            solo
          ></v-select>
          <v-select
            v-model="scheduleDetails.slot"
            :items="slots"
            label="Select Slot"
            :disabled="!scheduleDetails.centerId"
            solo
          ></v-select>
          <v-select
            v-model="scheduleDetails.vaccine"
            :items="vaccine"
            label="vaccine"
            :disabled="!scheduleDetails.centerId"
            solo
          ></v-select>
          <custom-button
            btnName="normal-btn"
            :btnText="formType === 'schedule' ? 'Confirm' : 'Update'"
            :isDisabled="disableButton()"
            @btnAction="formType === 'schedule' ? schedule() : update()"
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
import { namespace } from 'vuex-class'
import {
  CreateUpdateSchedule,
  ScheduleInfo,
  VaccinationCenter,
  VaccinationCenterFilter,
} from '@/types/interface'
import { ScheduleActions, VaccinationCenterActions } from '@/types/types'
import SuccessFailuerAlert from '@/components/shared/SuccessFailuerAlert.vue'

const vaccinationCenter = namespace('VaccinationCenter')
const schedule = namespace('Schedule')

@Component({
  components: {
    CustomInput,
    CustomButton,
    SuccessFailuerAlert,
  },
})
export default class ScheduleUpdateAppointment extends Vue {
  @Prop({ default: false }) dialog!: boolean
  @Prop({ default: 'schedule' }) formType!: string
  @Prop({ default: null }) idNumber!: string

  currentDate = new Date().toISOString().substr(0, 10)
  showDialog = false
  gender = ['Male', 'Female', 'Other']
  photoIdType = ['Aadhar Card', 'Pan Card']
  slots: string[] = []
  vaccine: string[] = []
  modal = false
  errorMessage = '* This Field is required'
  selectedPhotoIdType = ''
  pincode = ''
  date = this.currentDate
  checkInputIsNumber = isNumber

  scheduleDetails = {
    beneficiaryId: '',
    centerId: '',
    slot: '',
    date: this.date,
    vaccine: '',
  }
  vaccinationCenters: VaccinationCenter[] = []
  successFailuerDialog = false
  alertMessage = ''
  isSuccess = false

  @vaccinationCenter.Getter
  vaccinationCentersList!: VaccinationCenter[]

  @schedule.Getter
  scheduleSuccess!: boolean

  @schedule.Getter
  scheduleError!: boolean

  @schedule.Getter
  public getScheduleInfo!: ScheduleInfo

  @vaccinationCenter.Action(VaccinationCenterActions.VACCINATION_CENTER)
  // eslint-disable-next-line no-unused-vars
  public loadVaccinationCenters!: (filterData: VaccinationCenterFilter) => void

  @schedule.Action(ScheduleActions.SCHEDULE)
  // eslint-disable-next-line no-unused-vars
  public scheduleSlot!: (scheduleDetails: CreateUpdateSchedule) => void

  @schedule.Action(ScheduleActions.UPDATE)
  // eslint-disable-next-line no-unused-vars
  public updateSchedule!: (scheduleDetails: CreateUpdateSchedule) => void

  @schedule.Action(ScheduleActions.SCHEDULE_BY_ID)
  // eslint-disable-next-line no-unused-vars
  public loadScheduleById!: (idNumber: string) => void

  @Watch('date')
  @Watch('pincode')
  loadVaccinationCenter(): void {
    this.vaccinationCenters = []
    if (this.pincode && this.pincode.length === 6) {
      this.loadVaccinationCenters({
        date: this.scheduleDetails.date,
        pincode: this.pincode,
      })
    }
  }

  @Watch('vaccinationCentersList')
  setVaccinationCenters(): void {
    this.vaccinationCenters = this.vaccinationCentersList
  }

  @Watch('scheduleSuccess')
  onSuccess(): void {
    if (this.scheduleSuccess) {
      this.alertMessage = 'Success'
      this.isSuccess = true
      this.successFailuerDialog = true
      this.scheduleDetails = {
        beneficiaryId: '',
        centerId: '',
        slot: '',
        date: this.date,
        vaccine: '',
      }
      this.$emit('toggleDialog')
    }
  }

  @Watch('scheduleError')
  onFailuer(): void {
    if (this.scheduleError) {
      this.alertMessage = 'Operation Failed'
      this.isSuccess = false
      this.successFailuerDialog = true
    }
  }

  @Watch('scheduleDetails.centerId')
  setSlots(): void {
    this.scheduleDetails.slot = ''
    this.scheduleDetails.vaccine = ''
    this.vaccinationCenters.forEach((center: VaccinationCenter) => {
      if (
        center.center_id.toString() === this.scheduleDetails.centerId.toString()
      ) {
        this.slots = center.slots
        this.vaccine.push(center.vaccine)
      }
    })
  }

  @Watch('dialog')
  toggleDialog(): void {
    this.showDialog = this.dialog
  }

  @Watch('formType')
  loadScheduleInfoById(): void {
    if (this.formType === 'update') {
      this.loadScheduleById(this.idNumber)
    }
  }

  @Watch('getScheduleInfo')
  setScheduleInfo(): void {
    if (this.formType === 'update') {
      this.date = this.getScheduleInfo.date
      this.pincode = this.getScheduleInfo.pincode
    }
  }

  disableInput(): boolean {
    const re = /^[1-9]{1}[0-9]{2}[0-9]{3}$/
    return !re.test(this.pincode)
  }

  disableButton(): boolean {
    return !(
      this.scheduleDetails.centerId &&
      this.scheduleDetails.slot &&
      this.scheduleDetails.vaccine
    )
  }

  schedule(): void {
    this.scheduleSlot({
      ...this.scheduleDetails,
      beneficiaryId: this.idNumber,
    })
  }

  update(): void {
    this.updateSchedule({
      ...this.scheduleDetails,
      beneficiaryId: this.idNumber,
    })
  }

  toggleAlertBox(): void {
    this.successFailuerDialog = !this.successFailuerDialog
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
