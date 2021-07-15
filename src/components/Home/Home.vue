<template>
  <div class="home">
    <national-updates class="overall-data" :updatedData="stateWiseUpdates[0]" />
    <state-wise-list class="states" :stateWiseUpdates="stateWiseUpdates" />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import NationalUpdates from '@/components/Home/NationalUpdates.vue'
import StateWiseList from '@/components/Home/StateWiseList.vue'
import { namespace } from 'vuex-class'
import { UpdatesActions } from '@/types/types'
import { StateWiseUpdates } from '@/types/interface'

const updates = namespace('Updates')

@Component({
  components: {
    NationalUpdates,
    StateWiseList,
  },
})
export default class Home extends Vue {
  @updates.State
  public isLoading!: boolean

  @updates.Getter
  stateWiseUpdates!: StateWiseUpdates[]

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
    z-index: 1;
    height: 16rem;
    background: $color-background;
    margin-top: 7rem;
    @media only screen and (max-width: 960px) {
      margin-top: 6.5rem !important;
    }
  }
  .states {
    z-index: -1;
  }
}
</style>
