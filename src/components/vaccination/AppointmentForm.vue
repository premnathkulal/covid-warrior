<template>
  <v-row class="appointment" justify="center">
    <beneficiary
      :dialog="beneficiaryDalog"
      @toggleDialog="toggleBeneficiaryDalog"
    />
    <schedule-appointment
      :dialog="scheduleDalog"
      :formType="formType"
      :idNumber="idNumber"
      @toggleDialog="toggleScheduleDalog"
    />
    <alert-box
      :msg="'Are you sure want to remove this beneficiary?'"
      :dialog="alertBox"
      @toggleAlertBox="toggleAlertBox"
    />
    <success-failuer-alert
      :msg="'Are you sure want to remove this beneficiary?'"
      :dialog="alertBox"
      @toggleAlertBox="successFailuerAlert"
    />
    <v-dialog
      v-model="showDialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
      class="dialog"
    >
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon light @click="$emit('toggleDialog')">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <span class="page-title">Appointments</span>
          <v-spacer></v-spacer>
          <v-toolbar-items class="add-btn">
            <v-btn light text @click="toggleBeneficiaryDalog()">
              <v-icon>mdi-plus-circle-outline</v-icon>
              <span class="pl-1 d-none d-md-block">Add Beneficiary</span>
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <div class="beneficiary-list-field container">
          <template v-if="beneficiaries.length">
            <div class="beneficiary-info">
              <v-expansion-panels>
                <template v-for="(beneficiary, i) in beneficiaries">
                  <v-expansion-panel
                    @click="
                      loadScheduleData(
                        beneficiary.photo_id_number,
                        beneficiary.scheduled
                      )
                    "
                    :key="i"
                    class="info-card"
                    :class="{ 'avoid-clicks': !beneficiary.scheduled }"
                  >
                    <v-expansion-panel-header>
                      <h5>{{ beneficiary.name }}</h5>
                      <v-spacer></v-spacer> <v-spacer></v-spacer>
                      <!-- <span class="btn-text">Schedule</span> -->
                      <span
                        class="btn-text text-primary"
                        v-if="beneficiary.scheduled"
                        @click.stop="
                          toggleScheduleDalog(
                            'update',
                            beneficiary.photo_id_number
                          )
                        "
                        >Update</span
                      >
                      <span
                        class="btn-text text-danger"
                        v-else
                        @click.stop="
                          toggleScheduleDalog(
                            'schedule',
                            beneficiary.photo_id_number
                          )
                        "
                        >Schedule</span
                      >
                    </v-expansion-panel-header>
                    <v-expansion-panel-content v-if="beneficiary.scheduled">
                      <p class="appointment-info">
                        <span class="appointment-info-label">Date:</span>
                        {{ getScheduleInfo.date }}
                      </p>
                      <p class="appointment-info">
                        <span class="appointment-info-label">Slot:</span>
                        {{ getScheduleInfo.slot }}
                      </p>
                      <p class="appointment-info">
                        <span class="appointment-info-label">Vaccine:</span>
                        {{ getScheduleInfo.vaccine }}
                      </p>
                      <p class="appointment-info">
                        <span class="appointment-info-label">Center Name:</span>
                        {{ getScheduleInfo.centerName }}
                      </p>
                      <p class="appointment-info">
                        <span class="appointment-info-label">Adress:</span>
                        {{ getScheduleInfo.centerAddress }}
                      </p>
                      <div
                        class="delete-btn"
                        @click="showConfirmBox(beneficiary.photo_id_number)"
                      >
                        Remove Beneficiary
                      </div>
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </template>
              </v-expansion-panels>
            </div>
          </template>
          <template v-else>
            <div class="emty-state">
              <lottie-player
                class="lottie-player"
                autoplay
                loop
                mode="normal"
                :src="`/assets/lotties/empty-state.json`"
                :style="`width: 200px`"
                background="transparent"
              >
              </lottie-player>
              <p class="emty-text">No Center Found</p>
            </div>
          </template>
        </div>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import Beneficiary from '@/components/vaccination/Beneficiary.vue'
import ScheduleAppointment from '@/components/vaccination/ScheduleAppointment.vue'
import AlertBox from '@/components/shared/AlertBox.vue'
import SuccessFailuerAlert from '@/components/shared/SuccessFailuerAlert.vue'
import { namespace } from 'vuex-class'
import { BeneficiaryActions, ScheduleActions } from '@/types/types'
import { BeneficiaryDetailsResponse } from '@/types/interface'

const beneficiary = namespace('Beneficiary')
const schedule = namespace('Schedule')
const login = namespace('Login')

@Component({
  components: {
    Beneficiary,
    ScheduleAppointment,
    AlertBox,
    SuccessFailuerAlert,
  },
})
export default class AppointmentForm extends Vue {
  @Prop({ default: false }) showDialog!: boolean
  beneficiaryDalog = false
  scheduleDalog = false
  formType = 'schedule'
  alertBox = false
  successFailuerAlert = false
  idNumber = ''

  @beneficiary.Getter
  public beneficiaries!: BeneficiaryDetailsResponse[]

  @schedule.Getter
  public getScheduleInfo!: any

  @beneficiary.Action(BeneficiaryActions.BENEFICIARIES)
  public loadBeneficiaries!: () => void

  @schedule.Action(ScheduleActions.SCHEDULE_BY_ID)
  // eslint-disable-next-line no-unused-vars
  public loadScheduleById!: (idNumber: string) => void

  @beneficiary.Action(BeneficiaryActions.DELETE_BENEFICIARIES)
  // eslint-disable-next-line no-unused-vars
  public deleteBeneficiary!: (idNumber: string) => void

  @login.Getter
  public isLoginSuccess!: boolean

  @Watch('isLoginSuccess')
  loadBeneficiaryList(): void {
    if (this.isLoginSuccess && this.beneficiaries.length === 0) {
      this.loadBeneficiaries()
    }
  }

  toggleBeneficiaryDalog(): void {
    this.beneficiaryDalog = !this.beneficiaryDalog
  }

  toggleScheduleDalog(formType = 'schedule', idNumber: string): void {
    this.scheduleDalog = !this.scheduleDalog
    this.formType = formType
    this.idNumber = idNumber
  }

  toggleAlertBox(msg: boolean): void {
    if (msg && this.isLoginSuccess) {
      this.deleteBeneficiary(this.idNumber)
    }
    this.alertBox = false
  }

  toggleSuccessFailuerAlert(): void {
    this.successFailuerAlert = !this.successFailuerAlert
  }

  loadScheduleData(photoIdNumber: string, isScheduled: boolean): void {
    if (isScheduled) {
      this.loadScheduleById(photoIdNumber)
    }
  }

  showConfirmBox(photoIdNumber: string): void {
    this.idNumber = photoIdNumber
    this.alertBox = true
  }

  created(): void {
    this.loadBeneficiaryList()
  }
}
</script>

<style lang="scss">
.appointment {
  position: fixed;
  z-index: 4000;
}

.beneficiary-list-field {
  .info-card {
    margin-top: 1rem;
    border-left: 0.4rem solid $color-primary;
  }
  .beneficiary-info {
    .btn-text {
      text-align: right;
      margin-right: 1rem;
      pointer-events: auto;
    }
    .appointment-info {
      font-size: 0.9rem;
      .appointment-info-label {
        font-weight: bold;
      }
    }
    .delete-btn {
      background: $light-red;
      color: $white;
      font-weight: bold;
      font-size: 0.9rem;
      width: 10rem;
      padding: 0.5rem;
      border-radius: 0.3rem;
      cursor: pointer;
    }
  }
}
.page-title {
  color: $black;
  font-weight: bold;
  font-size: 1.2rem;
}
.emty-state {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 30vh;
}
</style>
