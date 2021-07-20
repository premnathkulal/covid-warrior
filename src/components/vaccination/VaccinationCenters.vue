<template>
  <div class="vaccination-center">
    <vaccination-center-form />
    <vaccination-centers-list />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import VaccinationCentersList from '@/components/vaccination/VaccinationCentersList.vue'
import VaccinationCenterForm from '@/components/vaccination/VaccinationCenterForm.vue'

@Component({
  components: {
    VaccinationCentersList,
    VaccinationCenterForm,
  },
})
export default class VaccinationCenters extends Vue {}
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
