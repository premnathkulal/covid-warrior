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
import { StateDistrictsActions } from '@/types/types'

const stateDistricts = namespace('StateDistricts')

@Component({
  components: {
    VaccinationCentersList,
    VaccinationCenterForm,
  },
})
export default class VaccinationCenters extends Vue {
  @stateDistricts.State
  public isLoading!: boolean

  @stateDistricts.Getter
  statesList!: any[]

  @stateDistricts.Action(StateDistrictsActions.STATES)
  public loadStatesList!: () => void

  created(): void {
    this.loadStatesList()
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
