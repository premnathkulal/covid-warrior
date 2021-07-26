<template>
  <div class="vaccination-center">
    <appointment-form :showDialog="showDialog" @toggleDialog="toggleDialog()" />
    <div class="btn-mobile d-flex d-md-none" @click="toggleDialog()">
      <p class="btn-text">Book Appointment</p>
    </div>
    <div class="vaccination-center-form">
      <div class="form">
        <div
          class="toggle-btn d-flex d-md-none justify-content-end"
          @click="toggleForm()"
        >
          <v-icon class="icons">{{
            showForm ? 'mdi-chevron-up' : 'mdi-chevron-down'
          }}</v-icon>
        </div>
        <span
          class="form-inputs"
          :class="showForm ? 'd-block d-md-flex' : 'd-none d-md-flex'"
        >
          <v-select
            v-model="state"
            class="select"
            :items="states"
            item-text="state_name"
            label="Select State"
            dense
            solo
            @change="onFilter()"
          ></v-select>
          <v-select
            v-model="district"
            class="select"
            :items="districtsList"
            item-text="district_name"
            label="Select District"
            dense
            solo
            @change="onFilter()"
            :disabled="!state"
          ></v-select>
          <v-select
            v-model="Pincode"
            class="select"
            :items="items"
            label="Select Pincode"
            dense
            solo
            @change="onFilter()"
            :disabled="!district"
          ></v-select>
          <div class="select">
            <v-dialog
              ref="dialog"
              v-model="datePickerModal"
              :return-value.sync="date"
              persistent
              width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="date"
                  label="Date"
                  color="light"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                color="primary text-dark"
                :min="currentDate"
                v-model="date"
                scrollable
              >
                <v-spacer></v-spacer>
                <v-btn text color="dark" @click="datePickerModal = false">
                  Cancel
                </v-btn>
                <v-btn
                  text
                  color="dark"
                  @click="
                    $refs.dialog.save(date)
                    onFilter()
                  "
                >
                  OK
                </v-btn>
              </v-date-picker>
            </v-dialog>
          </div>
        </span>
      </div>
      <div class="button d-none d-md-flex">
        <p class="btn-text" @click="showDialog = true">Book Appointment</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import AppointmentForm from '@/components/vaccination/AppointmentForm.vue'
import { namespace } from 'vuex-class'
import { StateDistrictsActions, VaccinationCenterActions } from '@/types/types'

const stateDistricts = namespace('StateDistricts')
const vaccinationCenter = namespace('VaccinationCenter')

@Component({
  components: { AppointmentForm },
})
export default class VaccinationCenterForm extends Vue {
  @Prop({ default: null }) states!: any[]

  items = ['Foo', 'Bar', 'Fizz', 'Buzz']
  currentDate = new Date().toISOString().substr(0, 10)
  menu = false
  datePickerModal = false
  showForm = false
  showDialog = false

  state = ''
  district = ''
  Pincode = ''
  date = this.currentDate

  @stateDistricts.Getter
  districtsList!: any[]

  @vaccinationCenter.Getter
  vaccinationCenterList!: any[]

  @stateDistricts.Action(StateDistrictsActions.DISTRICTS)
  public loadDistrictsList!: (stateId: string) => void

  @stateDistricts.Action(StateDistrictsActions.PINCODES)
  public loadPinCodesList!: (stateId: string) => void

  @vaccinationCenter.Action(VaccinationCenterActions.VACCINATION_CENTER)
  public loadVaccinationCenters!: (filterData: {
    state?: string
    district?: string
    pincode?: string
    date: string
    lat?: string
    lon?: string
  }) => void

  @Watch('state')
  loadDistricts(): void {
    const stateInfo: any = this.states.filter((state: any) => {
      return state.state_name === this.state
    })
    this.loadDistrictsList(stateInfo[0].state_id)
  }

  @Watch('district')
  createPinCodes(): void {
    const districtInfo: any = this.districtsList.filter((district: any) => {
      return district.district_name === this.district
    })
    // console.log(districtInfo[0].district_id)
    // this.loadPinCodesList(districtInfo[0].district_id)
  }

  toggleForm(): void {
    this.showForm = !this.showForm
  }

  toggleDialog(): void {
    this.showDialog = !this.showDialog
  }

  onFilter(): void {
    this.loadVaccinationCenters({
      state: this.state,
      district: this.district,
      date: this.date,
    })
    // console.log(this.state, this.district, this.Pincode, this.date)
  }
}
</script>

<style lang="scss">
.vaccination-center-form {
  position: fixed;
  z-index: 2;
  top: 7rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: $color-background;

  @media only screen and (max-width: 960px) {
    top: 6.5rem;
    box-shadow: 0px 1px 8px rgb(168, 167, 167);
  }
  .form {
    margin: 2rem 0 1rem 1rem;
    display: flex;
    justify-content: space-around;
    width: 80%;
    .form-inputs {
      width: 100%;
      padding: 0 0.5rem;
      .select {
        margin-right: 1rem;
      }
    }
  }

  @media only screen and (max-width: 960px) {
    .form {
      display: block;
      margin: 1rem;
      padding: 0 0;
      width: 100%;
      .form-inputs {
        display: none;
        margin-top: 1rem;
        .select {
          width: 100%;
          margin-right: 1rem;
        }
        height: 16.5rem;
        overflow-y: scroll;
      }
      .toggle-btn {
        height: 1rem;
        .icons {
          font-size: 2rem;
          cursor: pointer;
        }
      }
    }
  }
}
.button {
  width: 80%;
  display: flex;
  .btn-text {
    margin-left: auto;
    border-radius: 0.3rem;
    margin-top: -1rem;
    background: $button-gradient;
    padding: 0.4rem;
    color: $white;
    cursor: pointer;
    box-shadow: 0px 5px 8px rgb(168, 167, 167);
  }
}
.btn-mobile {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  background: $green-button;
  display: flex;
  align-items: center;
  cursor: pointer;
  justify-content: center;
  box-shadow: 0px -2px 8px rgb(168, 167, 167);
  z-index: 2;
  .btn-text {
    padding-top: 1rem;
    font-weight: bold;
    color: $white;
  }
}

.theme--dark input[type='date']::-webkit-calendar-picker-indicator {
  background-color: rgb(221, 7, 7);
}
</style>
