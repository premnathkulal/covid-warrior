<template>
  <div class="updates-stats mr-4" :class="`${className}`">
    <div class="stat-header">
      <p class="stat-title">{{ title }}</p>
      <lottie-player
        class="lottie-player"
        autoplay
        loop
        mode="normal"
        :src="`/assets/lotties/${animation}.json`"
        :style="`width: ${animationSize}px`"
        background="transparent"
      >
      </lottie-player>
    </div>
    <div class="stat-number" :style="`--count: ${count}`"></div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class UpdateCounterCard extends Vue {
  @Prop({ default: null }) animation!: string
  @Prop({ default: '50' }) animationSize!: string
  @Prop({ default: null }) title!: string
  @Prop({ default: null }) color!: string
  @Prop({ default: null }) count!: string
  @Prop({ default: null }) className!: string
}
</script>

<style lang="scss"></style>
