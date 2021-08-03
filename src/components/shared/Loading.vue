<template>
  <div class="dialog" v-if="dialog" persistent max-width="320">
    <lottie-player
      class="lottie-player"
      autoplay
      loop
      mode="normal"
      :src="`/assets/lotties/loading.json`"
      :style="`width: 200px`"
      background="transparent"
    >
    </lottie-player>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class Loading extends Vue {
  @Prop({ default: true }) dialog!: boolean
}
</script>

<style lang="scss">
.dialog {
  z-index: 3000;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
