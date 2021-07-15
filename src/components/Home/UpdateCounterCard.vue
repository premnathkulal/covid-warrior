<template>
  <div class="updated-data mr-4" :class="`${className}`">
    <div class="data-header">
      <p class="data-title">{{ title }}</p>
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
    <div class="data-number" :style="`--count: ${count}`"></div>
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

<style lang="scss">
.updated-data {
  width: 20rem;
  height: 12rem;
  display: inline-block;
  border-radius: 0.8rem;

  &:hover {
    box-shadow: 0 20px 16px 0 rgba(0, 0, 0, 0.2);
  }

  .data-header {
    display: flex;
    padding: 0.5rem 1rem;

    .data-title {
      font-weight: bold;
      font-size: 1.5rem;
      color: $text-color;
    }
    .lottie-player {
      margin-left: auto;
    }
  }
  .data-number {
    text-align: center;
    font-weight: bold;
    font-size: 1.7rem;
    padding: 1rem;

    animation: counter 2s alternate ease-in-out forwards;
    counter-reset: num var(--num);

    &::after {
      content: counter(num);
    }
  }
}
.total-count {
  background: $blue-gradient;
}
.total-active {
  background: $red-gradient;
}
.total-recovered {
  background: $green-gradient;
}
.total-death {
  background: $gray-gradient;
}
</style>
