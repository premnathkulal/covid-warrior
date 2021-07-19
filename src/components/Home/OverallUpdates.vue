<template>
  <div class="national-updates">
    <div class="info-text">
      <p class="overview-title">COIVD-19 Cases Overview</p>
      <p class="updated-date">Updated 14 Jul 21</p>
    </div>
    <div class="updates-container">
      <div class="updates container-fluid" v-if="updatedData && !isLoading">
        <update-counter-card
          animation="confirmed"
          animationSize="100"
          title="Confirmed"
          :count="updatedData.confirmed"
          className="total-count"
        />
        <update-counter-card
          animation="active"
          animationSize="77"
          title="Active"
          :count="updatedData.active"
          className="total-active"
        />
        <update-counter-card
          animation="recovered"
          animationSize="55"
          title="Recovered"
          :count="updatedData.recovered"
          className="total-recovered"
        />
        <update-counter-card
          animation="death"
          animationSize="55"
          title="Death"
          :count="updatedData.deaths"
          className="total-death"
        />
      </div>
      <div class="updates container-fluid" v-else>
        <template v-for="(i, index) in 4">
          <update-counter-card-card-loader :key="index" />
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import UpdateCounterCard from '@/components/Home/UpdateCounterCard.vue'
import UpdateCounterCardCardLoader from '@/components/Home/UpdateCounterCardLoader.vue'
import { StateWiseUpdates } from '@/types/interface'
import { namespace } from 'vuex-class'

const updates = namespace('Updates')

@Component({ components: { UpdateCounterCard, UpdateCounterCardCardLoader } })
export default class NationalUpdates extends Vue {
  @updates.State
  public isLoading!: boolean

  @Prop({ default: null }) updatedData!: StateWiseUpdates
}
</script>

<style lang="scss" scoped>
.national-updates {
  .info-text {
    background: $green-blue-gradient;
    height: 10rem;
    width: 100%;
    color: $text-color;

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
  .updates-container {
    position: relative;
    top: -4.8rem;
    display: flex;
    align-items: center;
    justify-content: center;

    .updates {
      overflow-x: scroll;
      white-space: nowrap;
      width: 81.5%;
      @media only screen and (max-width: 1400px) {
        width: 100%;
      }
    }
  }
}

::-webkit-scrollbar {
  width: 0;
  background: transparent;
}
</style>
