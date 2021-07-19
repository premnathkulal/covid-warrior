<template>
  <div class="home">
    <national-updates class="overall-data" :updatedData="stateWiseUpdates[0]" />
    <state-wise-list
      class="states"
      :stateWiseUpdates="stateWiseUpdates"
      :address="getAddress"
    />
    <news />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import NationalUpdates from '@/components/Home/OverallUpdates.vue'
import StateWiseList from '@/components/Home/StateWiseList.vue'
import News from '@/components/Home/News.vue'
import { namespace } from 'vuex-class'
import { UpdatesActions } from '@/types/types'
import { Address, StateWiseUpdates } from '@/types/interface'

const updates = namespace('Updates')
const location = namespace('Location')

@Component({
  components: {
    NationalUpdates,
    StateWiseList,
    News,
  },
})
export default class Home extends Vue {
  @updates.State
  public isLoading!: boolean

  @updates.Getter
  stateWiseUpdates!: StateWiseUpdates[]

  @location.Getter
  getAddress!: Address[]

  @updates.Action(UpdatesActions.UPDATES)
  public loadUpdates!: () => void

  created(): void {
    this.loadUpdates()
  }
}
</script>

<style lang="scss">
.home {
  background: $color-background;
  .overall-data {
    height: 16rem;
    background: $color-background;
    margin-top: 7rem;
    @media only screen and (max-width: 960px) {
      margin-top: 6.5rem !important;
    }
  }
  .states {
    margin-top: 1rem;
  }
}
</style>
