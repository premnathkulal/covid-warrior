<template>
  <div class="vaccination-center-list">
    <template v-if="vaccinationCentersList.length">
      <template v-for="(item, index) in vaccinationCentersList">
        <vaccinationCenter-info :centerInfo="item" :key="index" />
      </template>
    </template>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import VaccinationCenterInfo from '@/components/vaccination/VaccinationCentersInfo.vue'
import { namespace } from 'vuex-class'

const vaccinationCenter = namespace('VaccinationCenter')

@Component({ components: { VaccinationCenterInfo } })
export default class VaccinationCentersList extends Vue {
  @vaccinationCenter.Getter
  vaccinationCentersList!: any[]
}
</script>

<style lang="scss">
.vaccination-center-list {
  padding-top: 17rem;
  width: 80%;
  position: relative;
  z-index: 0;
  @media only screen and (max-width: 960px) {
    padding-top: 10rem;
    width: 100%;
  }
  margin-bottom: 3.5rem;
}
</style>
