<template>
  <div class="home">
    <national-updates class="fixed-top overall-data" />
    <state-wise-list class="states" />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import NationalUpdates from '@/components/Home/NationalUpdates.vue'
import StateWiseList from '@/components/Home/StateWiseList.vue'

@Component({
  components: {
    NationalUpdates,
    StateWiseList,
  },
})
export default class Home extends Vue {}
</script>

<style lang="scss">
.home {
  background: $color-background;
  .overall-data {
    z-index: 1;
    height: 18rem;
    background: $color-background;
    top: 7rem !important;
    @media only screen and (max-width: 960px) {
      top: 6.5rem !important;
    }
  }
  .states {
    z-index: -1;
    padding-top: 27rem;
  }
}
</style>
