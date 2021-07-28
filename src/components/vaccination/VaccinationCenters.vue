<template>
  <div class="vaccination-center">
    <vaccination-center-form :states="statesList" />
    <vaccination-centers-list />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
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

  @stateDistricts.State
  public isLoading!: boolean

  @location.State
  public latitude!: number

  @location.State
  public longitude!: number

  @stateDistricts.Getter
  statesList!: State[]

  @stateDistricts.Action(StateDistrictsActions.STATES)
  public loadStatesList!: () => void

  @vaccinationCenter.Action(VaccinationCenterActions.VACCINATION_CENTER)
  // eslint-disable-next-line no-unused-vars
  public loadVaccinationCenters!: (filterData: VaccinationCenterFilter) => void

  created(): void {
    this.loadStatesList()
    this.loadVaccinationCenters({
      date: this.date,
      lat: this.latitude,
      lon: this.longitude,
    })
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
