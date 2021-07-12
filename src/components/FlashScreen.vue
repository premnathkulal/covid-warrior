<template>
  <div class="flash-screen">
    <lottie-player
      autoplay
      loop
      mode="normal"
      src="/assets/lotties/corona-virus.json"
      style="width: 300px; height: 200px"
      background="transparent"
    ></lottie-player>
    <p class="title">Covid Warrior</p>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class FlashScreen extends Vue {}
</script>

<style lang="scss">
body {
  background: $color-primary !important;
}
.flash-screen {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 90vh;

  .title {
    font-family: $sun-shiny;
    font-weight: bold;
    font-size: 2rem;
  }
}
</style>
