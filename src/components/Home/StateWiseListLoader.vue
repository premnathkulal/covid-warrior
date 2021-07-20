<template>
  <div class="statewise-information-loader mb-5">
    <div class="state-header">
      <p class="state-title"></p>
      <span class="address pl-3 mt-1"></span>
      <div class="state-map ml-auto"></div>
    </div>
    <div class="data-field py-5">
      <div class="display-data">
        <p class="data-title"></p>
        <p class="data-count"></p>
      </div>
      <div class="display-data">
        <p class="data-title text-danger"></p>
        <p class="data-count"></p>
      </div>
      <div class="display-data">
        <p class="data-title text-success"></p>
        <p class="data-count"></p>
      </div>
      <div class="display-data">
        <p class="data-title text-danger"></p>
        <p class="data-count"></p>
      </div>
    </div>
    <div class="delta-updates pr-4">
      <div class="delta-header">
        <p class="delta-title"></p>
        <div class="lottie-player"></div>
      </div>
      <div class="delta">
        <div class="delta-data">
          <p class="data-title pr-5"></p>
          <p class="data-count"></p>
        </div>
        <div class="delta-data">
          <p class="data-title pr-5 text-success"></p>
          <p class="data-count"></p>
        </div>
        <div class="delta-data">
          <p class="data-title pr-5 text-danger"></p>
          <p class="data-count"></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import NationalUpdates from '@/components/Home/OverallUpdates.vue'

@Component({
  components: {
    NationalUpdates,
  },
})
export default class StateWiseListLoader extends Vue {}
</script>

<style lang="scss">
.statewise-information-loader {
  width: 80%;
  @media only screen and (max-width: 1400px) {
    width: 100%;
  }
  border-radius: 0.8rem;
  padding: 1rem;
  background: rgb(243, 241, 241);

  .state-header {
    display: flex;

    .state-title {
      margin-right: 0.5rem;
      width: 10rem;
      height: 1.5rem;
      background: $dark-gray;
      animation: pulse-bg 1.5s infinite;
    }
    .address {
      margin-right: 0.5rem;
      width: 7rem;
      height: 1rem;
      background: $dark-gray;
      animation: pulse-bg 1.5s infinite;
    }
    .state-map {
      width: 3rem;
      height: 3rem;
      background: $dark-gray;
      animation: pulse-bg 1.5s infinite;
    }
  }

  .data-field {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    font-weight: bold;

    .display-data {
      .data-title {
        width: 4rem;
        height: 1rem;
        background: $dark-gray;
        margin-right: 0.5rem;
        animation: pulse-bg 1.5s infinite;
      }
      .data-count {
        width: 5rem;
        height: 1rem;
        background: $dark-gray;
        animation: pulse-bg 1.5s infinite;
      }
    }
  }

  .delta-updates {
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-weight: bold;
    background: $gray-background;
    border-radius: 0.5rem;
    padding: 0.5rem;
    padding-top: 1.5rem;

    .delta-header {
      display: flex;
      justify-content: center;
      font-size: 1.3rem;
      border-radius: 0.5rem;
      height: 5rem;

      .delta-title {
        width: 16rem;
        height: 2rem;
        margin-right: 1rem;
        background: $dark-gray;
        animation: pulse-bg 1.5s infinite;
      }

      .lottie-player {
        position: relative;
        top: -1rem;
        width: 4rem;
        height: 4rem;
        margin-right: 1rem;
        background: $dark-gray;
        animation: pulse-bg 1.5s infinite;
      }
    }
    .delta {
      display: flex;
      flex-direction: column;
      align-self: center;

      .delta-data {
        display: flex;

        .data-title {
          width: 7rem;
          height: 1rem;
          margin-right: 1rem;
          background: $dark-gray;
          animation: pulse-bg 1.5s infinite;
        }

        .data-count {
          width: 7rem;
          height: 1rem;
          background: $dark-gray;
          animation: pulse-bg 1.5s infinite;
        }
      }
    }
  }
}
</style>
