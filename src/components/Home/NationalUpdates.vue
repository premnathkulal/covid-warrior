<template>
  <div class="national-updates">
    <div class="info-text">
      <p class="overview-title">COIVD-19 Cases Overview</p>
      <p class="updated-date">Updated 14 Jul 21</p>
    </div>
    <div class="updates-container">
      <div class="updates container-fluid">
        <div class="updates-stats total-count">1</div>
        <div class="updates-stats total-active ml-4">3</div>
        <div class="updates-stats total-recovered ml-4">3</div>
        <div class="updates-stats total-recovered ml-4">3</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class NationalUpdates extends Vue {}
</script>

<style lang="scss">
.national-updates {
  .info-text {
    background: linear-gradient(
      90deg,
      rgba(66, 173, 35, 0.7208672086720866) 19%,
      rgba(2, 245, 247, 0.8157181571815718) 44%,
      rgba(47, 186, 149, 0.8509485094850948) 75%
    );
    height: 10rem;
    width: 100%;
    color: rgb(5, 7, 121);

    padding-top: 1.8rem;
    text-align: center;

    .overview-title {
      font-weight: bold;
      font-size: 1.1rem;
      line-height: 0;
    }
    .updated-date {
      line-height: 0.8rem;
    }
  }
}

.updates-container {
  position: relative;
  top: -5.5rem;
  display: flex;
  align-items: center;
  justify-content: center;

  .updates {
    overflow-x: scroll;
    white-space: nowrap;

    width: 80%;
    @media only screen and (max-width: 1400px) {
      width: 100%;
    }

    &-stats {
      background: red;
      width: 20rem;
      height: 12rem;
      display: inline-block;
    }
  }
}

::-webkit-scrollbar {
  width: 0;
  background: transparent;
}
::-webkit-scrollbar-thumb {
  //   background: #ff0000;
}
</style>
