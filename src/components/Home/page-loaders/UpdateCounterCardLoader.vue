<template>
  <div class="updated-data-loader mr-4">
    <div class="data-header">
      <p class="data-title"></p>
      <div class="lottie-player"></div>
    </div>
    <div class="data-number"></div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class UpdateCounterCardCardLoadr extends Vue {
  created(): void {
    //
  }
}
</script>

<style lang="scss">
.updated-data-loader {
  width: 20rem;
  height: 9rem;
  display: inline-block;
  border-radius: 0.8rem;
  background: $white;

  &:hover {
    box-shadow: 0 20px 16px 0 rgba(0, 0, 0, 0.2);
  }

  .data-header {
    display: flex;
    padding: 0.5rem 1rem;

    .data-title {
      width: 150px;
      height: 24px;
      margin-right: 0.5rem;
      background: $dark-gray;
      animation: pulse-bg 1.5s infinite;
    }
    .lottie-player {
      width: 3.6rem;
      height: 3.6rem;
      margin-left: auto;
      background: $dark-gray;
      animation: pulse-bg 1.5s infinite;
    }
  }
  .data-number {
    width: 150px;
    height: 30px;
    margin: auto;
    position: relative;
    top: -0.2rem;
    background: $dark-gray;
    animation: pulse-bg 1.5s infinite;
    align-content: center;
  }
}
</style>
