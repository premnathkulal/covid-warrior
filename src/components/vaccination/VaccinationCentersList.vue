<template>
  <div class="vaccination-center-list">
    <template v-for="(item, index) in 4">
      <vaccinationCenter-info :key="index" />
    </template>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import VaccinationCenterInfo from '@/components/vaccination/VaccinationCentersInfo.vue'

@Component({ components: { VaccinationCenterInfo } })
export default class VaccinationCentersList extends Vue {}
</script>

<style lang="scss">
.vaccination-center-list {
  width: 80%;
  @media only screen and (max-width: 1400px) {
    width: 100%;
  }
}
</style>
