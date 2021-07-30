<template>
  <div class="vaccination-center">
    <vaccination-center-form :states="statesList" />
    <vaccination-centers-list />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'
import VaccinationCentersList from '@/components/vaccination/VaccinationCentersList.vue'
import VaccinationCenterForm from '@/components/vaccination/VaccinationCenterForm.vue'
import { namespace } from 'vuex-class'
import { StateDistrictsActions, VaccinationCenterActions } from '@/types/types'
import { State, VaccinationCenterFilter } from '@/types/interface'

const stateDistricts = namespace('StateDistricts')
const vaccinationCenter = namespace('VaccinationCenter')
const location = namespace('Location')
@Component({
  components: {
    VaccinationCentersList,
    VaccinationCenterForm,
  },
})
export default class VaccinationCenters extends Vue {
  date = new Date().toISOString().substr(0, 10)
  isLoaded = false

  @stateDistricts.State
  public isLoading!: boolean

  @location.Getter
  public getLatitude!: number

  @location.Getter
  public getLongitude!: number

  @stateDistricts.Getter
  statesList!: State[]

  @stateDistricts.Action(StateDistrictsActions.STATES)
  public loadStatesList!: () => void

  @vaccinationCenter.Action(VaccinationCenterActions.VACCINATION_CENTER)
  // eslint-disable-next-line no-unused-vars
  public loadVaccinationCenters!: (filterData: VaccinationCenterFilter) => void

  @Watch('getLatitude')
  @Watch('getLongitude')
  loadVaccinationCenter(): void {
    if (!this.isLoaded) {
      this.isLoaded = true
      this.loadVaccinationCenters({
        date: this.date,
        lat: this.getLatitude,
        lon: this.getLongitude,
      })
    }
  }

  created(): void {
    this.loadStatesList()
    if (this.getLatitude && this.getLongitude) {
      this.loadVaccinationCenter()
    }
  }
}
</script>

<style lang="scss">
.vaccination-center {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: $color-background;
}
</style>
