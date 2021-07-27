<template>
  <div class="vaccination-center-list">
    <template v-if="vaccinationCentersList.length">
      <v-expansion-panels>
        <v-expansion-panel
          v-for="(item, index) in vaccinationCentersList"
          :key="index"
          class="info-card mt-2"
        >
          <v-expansion-panel-header>
            <h6>{{ item.name }}</h6>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <vaccinationCenter-info :centerInfo="item" />
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
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
  padding: 0.5rem;
  padding-top: 17rem;
  width: 80%;
  position: relative;
  z-index: 0;
  margin: 1rem 0.8rem;

  @media only screen and (max-width: 960px) {
    padding-top: 10rem;
    width: 100%;
  }
  margin-bottom: 3.5rem;
}
</style>
