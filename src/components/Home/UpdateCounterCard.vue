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
    <div class="data-number" ref="childElement" :id="className">0</div>
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

  obj = document.getElementById(this.className)

  animateValue(
    obj: HTMLElement,
    start: number,
    end: number,
    duration: number
  ): void {
    let startTimestamp: number | null = null
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp
      const progress = Math.min((timestamp - startTimestamp) / duration, 1)
      obj.innerHTML = Math.floor(progress * (end - start) + start).toString()
      if (progress < 1) {
        window.requestAnimationFrame(step)
      }
    }
    window.requestAnimationFrame(step)
  }

  mounted(): void {
    const obj = document.getElementById(this.className)
    if (obj) {
      this.animateValue(obj, 0, +this.count, 2000)
    }
  }
}
</script>

<style lang="scss">
.updated-data {
  width: 20rem;
  height: 9rem;
  display: inline-block;
  border-radius: 0.8rem;

  &:hover {
    box-shadow: 0 0.5rem 0.2rem rgba(0, 0, 0, 0.2);
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
    position: relative;
    text-align: center;
    font-weight: bold;
    font-size: 1.7rem;
    top: -1rem;
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
