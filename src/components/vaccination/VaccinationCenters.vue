<template>
  <div class="vaccination-center">
    <vaccination-centers-list />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import VaccinationCentersList from '@/components/vaccination/VaccinationCentersList.vue'

@Component({
  components: {
    VaccinationCentersList,
  },
})
export default class VaccinationCenters extends Vue {}
</script>

<style lang="scss">
.vaccination-center {
  display: flex;
  align-items: center;
  justify-content: center;
  background: $color-background;
  margin-top: 7rem;
  @media only screen and (max-width: 960px) {
    margin-top: 6.5rem !important;
  }
}
</style>
